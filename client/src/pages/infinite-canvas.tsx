import React, { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Stage, Layer, Rect, Circle, RegularPolygon, Arrow, Transformer, Line, Text, Group, Image as KonvaImage } from 'react-konva';
import type { KonvaEventObject, NodeConfig } from 'konva/lib/Node';
import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import Konva from 'konva';
import { useCanvasStore } from '../store/canvasStore';
import { useAppStore } from '../store/appStore';
import { useAuthStore } from '../store/authStore';
import { api, updateCanvas } from '@/lib/api';
import { toast } from 'sonner';
import { TextCard } from '@/components/canvas/TextCard';
import { CommentCard } from '@/components/canvas/CommentCard';
import { ChecklistCard } from '@/components/canvas/ChecklistCard';
import { Table } from '@/components/canvas/Table';
import { Connector } from '@/components/canvas/Connector'; 

export type ShapeType = 'rectangle' | 'square' | 'circle' | 'triangle' | 'star' | 'arrow' | 'line' | 'text' | 'image' | 'connector';


export interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

export interface TableCell {
  text: string;
}

export interface Shape {
  id: string;
  type: ShapeType;
  subType?: 'plain' | 'heading' | 'stickyNote' | 'comment' | 'textCard' | 'checklist' | 'table';
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  points?: number[];
  fill: string; // For shapes, it's fill color. For text, it's font color.
  shadowBlur: number;
  rotation?: number;
  stroke?: string;
  strokeWidth?: number;
  // Text-specific properties
  text?: string;
  textColor?: string;
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string; // 'normal', 'bold', 'italic', 'bold italic'
  textDecoration?: string; // 'underline'
  align?: string; // 'left', 'center', 'right'
  cornerRadius?: number; // For rounded corners on cards
  backgroundColor?: string; // For sticky note background
  padding?: number;
  author?: string;
  items?: ChecklistItem[];
  tableData?: TableCell[][];
  columnWidths?: number[];
  rowHeights?: number[];
  fromShapeId?: string;
  toShapeId?: string;
  // Image-specific properties
  src?: string;
  opacity?: number;
}

interface CanvasData {
    _id: string;
    name: string;
    data: { shapes: Shape[] };
    backgroundColor?: string;
}

// Define a type for the common props to avoid using `any`
type CommonShapeProps = NodeConfig & {
    onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
    onTransformEnd: (e: KonvaEventObject<Event>) => void;
    onClick: (e: KonvaEventObject<MouseEvent>) => void;
    onTap: (e: KonvaEventObject<MouseEvent>) => void;
};

const URLImage = ({ shape, commonProps }: { shape: Shape, commonProps: Partial<CommonShapeProps> }) => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!shape.src) return;
        const img = new window.Image();
        img.src = shape.src;
        img.onload = () => {
            setImage(img);
        };
    }, [shape.src]);

    if (!image) {
        return null;
    }

    return (
        <KonvaImage
            {...commonProps}
            image={image}
            width={shape.width}
            height={shape.height}
        />
    );
};

const InfiniteCanvas = () => {
  const gridSize = 20;
  const getSnapPosition = (pos: number) => Math.round(pos / gridSize) * gridSize;
  const { id: canvasId } = useParams<{ id: string }>();
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isLoading, setIsLoading] = useState(true);

  const { 
    shapes, 
    addShape, 
    updateShape, 
    deleteShape, 
    selectedId, 
    selectShape, 
    mode, 
    strokeColor, 
    strokeWidth, 
    setCanvas, 
    backgroundColor, 
    stageScale, 
    stageX, 
    stageY, 
    setStage, 
    backgroundPattern,
    moveSelectedShape,
    updateShapeAndPushHistory,
    setStageRef
  } = useCanvasStore();
  const { setCurrentCanvasName, triggerAddComment } = useAppStore();
  const { user } = useAuthStore();

  // Effect to add a comment when triggered from the header
  useEffect(() => {
    if (triggerAddComment > 0) { // Check to prevent running on initial render
      const newPos = {
        x: (dimensions.width / 2 - stageX) / stageScale,
        y: (dimensions.height / 2 - stageY) / stageScale,
      };

      const newShape: Shape = {
        id: String(Date.now()),
        type: 'text',
        subType: 'comment',
        x: newPos.x - 125, // Offset to center the card
        y: newPos.y - 50,
        width: 250,
        height: 100,
        text: 'Add a comment...',
        author: user?.name || 'User',
        fontSize: 14,
        backgroundColor: '#ffffff',
        stroke: '#E0E0E0',
        cornerRadius: 8,
        padding: 16,
        shadowBlur: 10,
        textColor: '#333333',
        fill: '#333333', // fill is required but managed by textColor for this component
      };
      addShape(newShape);
    }
  }, [triggerAddComment, addShape, dimensions, stageX, stageY, stageScale, user]); // Dependency array ensures this runs only when the trigger changes


  const [currentLine, setCurrentLine] = useState<Shape | null>(null);
  const [isErasing, setIsErasing] = useState(false);
  const [drawingConnector, setDrawingConnector] = useState<{ from: string; to: { x: number; y: number } } | null>(null);

  const trRef = useRef<TransformerType>(null);
  const stageRef = useRef<Konva.Stage>(null);
  const shapeRefs = useRef<(Konva.Node | null)[]>([]);

  // Set the stage ref in the global store
  useEffect(() => {
    setStageRef(stageRef);
  }, [setStageRef]);

  // Fetch and load canvas data
  useEffect(() => {
    setIsLoading(true);
    if (canvasId) {
      const fetchCanvasData = async () => {
        try {
          const canvasData = await api<CanvasData>(`/api/canvases/${canvasId}`);
          if (canvasData) {
            setCanvas(canvasData.data?.shapes || [], canvasData.backgroundColor);
            setCurrentCanvasName(canvasData.name);
          } else {
            setCanvas([]);
            setCurrentCanvasName(null);
          }
        } catch (error) {
          console.error("Failed to load canvas:", error);
          toast.error(`Failed to load canvas: ${error instanceof Error ? error.message : String(error)}`);
          setCurrentCanvasName(null);
        } finally {
          setIsLoading(false);
        }
      };
      fetchCanvasData();
    } else {
        setCanvas([]);
        setCurrentCanvasName(null);
        setIsLoading(false);
    }

    // Reset stage position and zoom when canvas changes
    setStage({ scale: 1, x: 0, y: 0 });

  }, [canvasId, setCanvas, setCurrentCanvasName]);

  // Auto-save canvas content with debounce
  useEffect(() => {
    // Don't save when the component is first loading or if there's no canvasId
    if (isLoading || !canvasId) {
      return;
    }

    const handler = setTimeout(() => {
      const saveData = async () => {
        const { setIsSaving, setLastSaved } = useAppStore.getState();
        setIsSaving(true);
        try {
          await updateCanvas(canvasId, { 
            data: { shapes }, 
            backgroundColor: backgroundColor, 
            backgroundPattern: backgroundPattern 
          });
          setLastSaved(new Date());
        } catch (error) {
          console.error("Failed to save canvas:", error);
          toast.error(`Failed to save canvas: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
          setIsSaving(false);
        }
      };
      saveData();
    }, 1500); // Wait 1.5 seconds after the last change

    // Cleanup function to cancel the timeout if shapes change again
    return () => {
      clearTimeout(handler);
    };

  }, [shapes, backgroundColor, backgroundPattern, canvasId, isLoading]);

  // Set up ResizeObserver to keep canvas dimensions in sync with its container
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(() => {
      setDimensions({
        width: container.offsetWidth,
        height: container.offsetHeight,
      });
    });

    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []); // Empty dependency array ensures this runs once to set up the observer

  useEffect(() => {
    if (selectedId && trRef.current) {
      const selectedNode = shapeRefs.current.find(
        (node) => node?.id() === selectedId
      );
      if (selectedNode) {
        trRef.current.nodes([selectedNode]);
        trRef.current.getLayer()?.batchDraw();
      }
    } else {
      trRef.current?.nodes([]);
      trRef.current?.getLayer()?.batchDraw();
    }
  }, [selectedId]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedId) return;

      const moveAmount = event.shiftKey ? 10 : 1;
      let moved = false;

      switch (event.key) {
        case 'Delete':
        case 'Backspace':
          deleteShape(selectedId);
          selectShape(null);
          break;
        case 'ArrowUp':
          moveSelectedShape(0, -moveAmount);
          moved = true;
          break;
        case 'ArrowDown':
          moveSelectedShape(0, moveAmount);
          moved = true;
          break;
        case 'ArrowLeft':
          moveSelectedShape(-moveAmount, 0);
          moved = true;
          break;
        case 'ArrowRight':
          moveSelectedShape(moveAmount, 0);
          moved = true;
          break;
        default:
          break;
      }

      if (moved) {
        event.preventDefault(); // Prevent browser from scrolling
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId, deleteShape, selectShape, moveSelectedShape]);

  const backgroundStyle = React.useMemo(() => {
    const style: React.CSSProperties = { backgroundColor };
    const dotColor = 'rgba(0,0,0,0.1)';
    const lineColor = 'rgba(0,0,0,0.07)';

    if (backgroundPattern === 'dotted') {
      style.backgroundImage = `radial-gradient(${dotColor} 1px, transparent 1px)`;
      style.backgroundSize = `20px 20px`;
    } else if (backgroundPattern === 'lined') {
      style.backgroundImage = `linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`;
      style.backgroundSize = `100% 20px`;
    }
    return style;
  }, [backgroundColor, backgroundPattern]);


  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = e.target.getStage();
    if (!stage) return;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;
    const mousePointTo = {
      x: pointer.x / oldScale - stageX / oldScale,
      y: pointer.y / oldScale - stageY / oldScale,
    };
    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
    setStage({
      scale: newScale,
      x: -(mousePointTo.x - pointer.x / newScale) * newScale,
      y: -(mousePointTo.y - pointer.y / newScale) * newScale,
    });
  };

  const handleStageDragEnd = (e: KonvaEventObject<DragEvent>) => {
    // only update stage position if the drag was directly on the stage
    if (e.target === e.currentTarget) {
      if (mode === 'select') {
        setStage({ x: e.target.x(), y: e.target.y() });
      }
    }
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (mode === 'connector') {
      const targetShape = shapes.find(s => s.id === e.target.id());
      if (targetShape) {
        const fromShape = shapes.find(s => s.id === e.target.id());
        if(fromShape) {
            setDrawingConnector({ from: fromShape.id, to: { x: fromShape.x, y: fromShape.y } });
        }
      }
      return;
    }

    if (mode === 'erase') {
        setIsErasing(true);
    }

    if (mode === 'select') {
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        selectShape(null);
      }
      return;
    }

    if (mode === 'draw') {
      const stage = e.target.getStage();
      if (!stage) return;
      const pos = stage.getPointerPosition();
      if (!pos) return;

      const newPos = {
        x: (pos.x - stage.x()) / stage.scaleX(),
        y: (pos.y - stage.y()) / stage.scaleY(),
      };

      setCurrentLine({
        id: String(Date.now()),
        type: 'line',
        points: [newPos.x, newPos.y],
        x: 0,
        y: 0,
        fill: strokeColor,
        stroke: strokeColor,
        strokeWidth: strokeWidth,
        shadowBlur: 0,
      });
    }
  };

  const handleMouseMove = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (mode === 'connector' && drawingConnector) {
      const stage = e.target.getStage();
      if (stage) {
        const pos = stage.getPointerPosition();
        if (pos) {
          setDrawingConnector({ ...drawingConnector, to: { x: (pos.x - stage.x()) / stage.scaleX(), y: (pos.y - stage.y()) / stage.scaleY() } });
        }
      }
      return;
    }

    if (mode !== 'draw' || !currentLine) {
      return;
    }

    const stage = e.target.getStage();
    if (!stage) return;
    const point = stage.getPointerPosition();
    if (!point) return;

    const newPos = {
      x: (point.x - stage.x()) / stage.scaleX(),
      y: (point.y - stage.y()) / stage.scaleY(),
    };

    setCurrentLine(prevLine => {
      if (!prevLine) return null;
      return {
        ...prevLine,
        points: [...(prevLine.points || []), newPos.x, newPos.y],
      };
    });
  };

  const handleMouseUp = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    if (mode === 'connector' && drawingConnector) {
        const toShape = shapes.find(s => s.id === e.target.id());
        if (toShape && toShape.id !== drawingConnector.from) {
            addShape({
                id: String(Date.now()),
                type: 'connector',
                fromShapeId: drawingConnector.from,
                toShapeId: toShape.id,
                stroke: strokeColor,
                strokeWidth: strokeWidth,
                fill: ''
            });
        }
        setDrawingConnector(null);
        return;
    }

    if (isErasing) {
        setIsErasing(false);
    }

    if (mode !== 'draw' || !currentLine) {
      return;
    }

    addShape(currentLine);
    setCurrentLine(null);
  };

  const renderShape = (shape: Shape, i: number) => {
    const commonProps = {
      ref: (el: Konva.Node | null) => { shapeRefs.current[i] = el; },
      id: shape.id,
      x: shape.x,
      y: shape.y,
      rotation: shape.rotation,
      onClick: (e: KonvaEventObject<MouseEvent>) => {
        if (mode === 'erase') {
            deleteShape(shape.id);
        } else {
            selectShape(shape.id);
        }
        e.cancelBubble = true;
      },
      onTap: (e: KonvaEventObject<MouseEvent>) => {
        if (mode === 'erase') {
            deleteShape(shape.id);
        } else {
            selectShape(shape.id);
        }
        e.cancelBubble = true;
      },
      onMouseEnter: () => {
        if (mode === 'erase' && isErasing) {
            deleteShape(shape.id);
        }
      },
      draggable: mode === 'select',
      onDragStart: (e: KonvaEventObject<DragEvent>) => {
        e.evt.stopPropagation();
      },
      onDragEnd: (e: KonvaEventObject<DragEvent>) => {
        const newX = getSnapPosition(e.target.x());
        const newY = getSnapPosition(e.target.y());
        updateShapeAndPushHistory({ id: shape.id, x: newX, y: newY });
      },
      onTransformEnd: (e: KonvaEventObject<Event>) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        updateShapeAndPushHistory({
          id: shape.id,
          x: node.x(),
          y: node.y(),
          width: shape.width ? Math.max(5, shape.width * scaleX) : undefined,
          height: shape.height ? Math.max(5, shape.height * scaleY) : undefined,
          radius: shape.radius ? Math.max(5, shape.radius * scaleX) : undefined,
          rotation: node.rotation(),
        });
      },
    };

    switch (shape.type) {
      case 'rectangle':
      case 'square':
        return <Rect key={shape.id} {...commonProps} fill={shape.fill} shadowBlur={shape.shadowBlur} width={shape.width} height={shape.height} />;
      case 'circle':
        return <Circle key={shape.id} {...commonProps} fill={shape.fill} shadowBlur={shape.shadowBlur} radius={shape.radius} />;
      case 'triangle':
        return <RegularPolygon key={shape.id} {...commonProps} fill={shape.fill} shadowBlur={shape.shadowBlur} sides={3} radius={shape.radius || 60} />;
      case 'star':
        return <RegularPolygon key={shape.id} {...commonProps} fill={shape.fill} shadowBlur={shape.shadowBlur} sides={5} radius={shape.radius || 70} innerRadius={(shape.radius || 70) / 2} outerRadius={shape.radius || 70} />;
      case 'arrow':
        return <Arrow key={shape.id} {...commonProps} fill={shape.fill} shadowBlur={shape.shadowBlur} points={[0, 0, shape.width || 100, 0]} pointerLength={20} pointerWidth={20} stroke="black" strokeWidth={4} />;
      case 'line':
        return <Line key={shape.id} {...commonProps} points={shape.points} stroke={shape.stroke} strokeWidth={shape.strokeWidth} tension={0.5} lineCap="round" lineJoin="round" />;
      case 'connector':
        return <Connector key={shape.id} shape={shape} />;
      case 'text':
        if (shape.subType === 'textCard') {
          return <TextCard key={shape.id} shape={shape} {...commonProps} />;
        }
        if (shape.subType === 'comment') {
            return <CommentCard key={shape.id} shape={shape} {...commonProps} />;
        }
        if (shape.subType === 'checklist') {
            return <ChecklistCard key={shape.id} shape={shape} {...commonProps} />;
        }
        if (shape.subType === 'table') {
            return <Table key={shape.id} shape={shape} {...commonProps} />;
        }
        return (
            <Group key={shape.id} {...commonProps}>
                {shape.backgroundColor && (
                    <Rect
                        width={shape.width}
                        height={shape.height}
                        fill={shape.backgroundColor}
                        shadowBlur={shape.shadowBlur}
                    />
                )}
                <Text
                    text={shape.text}
                    fontSize={shape.fontSize}
                    fontFamily={shape.fontFamily}
                    fontStyle={shape.fontStyle}
                    textDecoration={shape.textDecoration}
                    align={shape.align}
                    fill={shape.fill}
                    width={shape.width}
                    padding={shape.padding}
                />
            </Group>
        )
      case 'image':
        return <URLImage key={shape.id} shape={shape} commonProps={commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="absolute inset-0">
      {isLoading && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <p className="text-white text-lg">Loading Canvas...</p>
        </div>
      )}
      <div 
        ref={containerRef} 
        className="absolute inset-0"
        style={backgroundStyle}
        onDragOver={(e) => e.preventDefault()} // Allow drop
        onDrop={(e) => {
          e.preventDefault();
          const type = e.dataTransfer.getData("application/reactflow") as ShapeType;
          const subType = e.dataTransfer.getData("application/subtype") as Shape['subType'];

          if (!type) return;

          if (!containerRef.current) return;

          const rect = containerRef.current.getBoundingClientRect();
          const position = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
          };

          const newPos = {
            x: (position.x - stageX) / stageScale,
            y: (position.y - stageY) / stageScale,
          };

          let newShape: Shape;
          const baseShape = {
            id: String(Date.now()),
            x: newPos.x,
            y: newPos.y,
            shadowBlur: 0,
            rotation: 0,
          };

          if (type === 'text') {
            const textBase = {
                ...baseShape,
                type: 'text' as const,
                fill: '#000000',
                fontFamily: 'Inter',
            }
            switch (subType) {
                case 'heading':
                    newShape = { ...textBase, subType, text: 'Heading', fontSize: 32, fontStyle: 'bold', width: 200 };
                    break;
                case 'stickyNote':
                    newShape = { ...textBase, subType, text: 'Sticky note...', fontSize: 18, width: 200, height: 200, backgroundColor: '#FFFFA5', padding: 20, fontFamily: 'Caveat' };
                    break;
                case 'textCard':
                    newShape = { ...textBase, subType, text: 'New Text Card', fontSize: 14, width: 250, height: 58, backgroundColor: '#F9F9F9', stroke: '#E0E0E0', cornerRadius: 8, padding: 16, shadowBlur: 10, textColor: '#333333', opacity: 1 };
                    break;
                case 'comment':
                    const user = useAuthStore.getState().user;
                    newShape = { ...textBase, subType, text: 'Add a comment...', author: user?.name || 'User', fontSize: 14, width: 250, height: 100, backgroundColor: '#ffffff', stroke: '#E0E0E0', cornerRadius: 8, padding: 16, shadowBlur: 10, textColor: '#333333' };
                    break;
                case 'checklist':
                    newShape = { ...textBase, subType, items: [{ id: String(Date.now()), text: 'To-do item', checked: false }], width: 250, backgroundColor: '#ffffff', stroke: '#E0E0E0', cornerRadius: 8, padding: 16, shadowBlur: 10 };
                    break;
                case 'table':
                    newShape = { ...textBase, subType, tableData: [[{ text: 'Header 1' }, { text: 'Header 2' }],[{ text: 'Cell 1' }, { text: 'Cell 2' }]], columnWidths: [150, 150], rowHeights: [40, 40], stroke: '#000000', strokeWidth: 1 };
                    break;
                case 'plain':
                default:
                    newShape = { ...textBase, subType: 'plain', text: 'Plain Text', fontSize: 16, width: 150 };
                    break;
            }
          } else {
            const shapeBase = {
                ...baseShape,
                fill: 'green',
                shadowBlur: 5,
            }
            switch (type) {
                case 'rectangle':
                newShape = { ...shapeBase, type, width: 120, height: 80 };
                break;
                case 'square':
                newShape = { ...shapeBase, type, width: 100, height: 100 };
                break;
                case 'circle':
                newShape = { ...shapeBase, type, radius: 50 };
                break;
                case 'triangle':
                newShape = { ...shapeBase, type, radius: 60 };
                break;
                case 'star':
                newShape = { ...shapeBase, type, radius: 70 };
                break;
                case 'arrow':
                newShape = { ...shapeBase, type, width: 150 };
                break;
                case 'image':
                newShape = { ...shapeBase, type, width: 200, height: 200, src: 'https://via.placeholder.com/200' }; // Placeholder src
                break;
                default:
                return;
            }
          }
          addShape(newShape);
        }}
      >
        <Stage
          ref={stageRef}
          width={dimensions.width}
          height={dimensions.height}
          onWheel={handleWheel}
          onDragEnd={handleStageDragEnd}
          draggable={mode === 'select'}
          scaleX={stageScale}
          scaleY={stageScale}
          x={stageX}
          y={stageY}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <Layer>
            {shapes.filter(s => s.type === 'connector').map(renderShape)}
            {shapes.filter(s => s.type !== 'connector').map(renderShape)}
            {currentLine && (
              <Line
                points={currentLine.points}
                stroke={currentLine.stroke}
                strokeWidth={currentLine.strokeWidth}
                tension={0.5}
                lineCap="round"
                lineJoin="round"
              />
            )}
            {drawingConnector && (
                (() => {
                    const fromShape = shapes.find(s => s.id === drawingConnector.from);
                    if (!fromShape) return null;
                    return (
                        <Line
                            points={[
                                fromShape.x + (fromShape.width || 0) / 2,
                                fromShape.y + (fromShape.height || 0) / 2,
                                drawingConnector.to.x,
                                drawingConnector.to.y,
                            ]}
                            stroke={strokeColor}
                            strokeWidth={strokeWidth}
                        />
                    );
                })()
            )}
            <Transformer
              ref={trRef}
              boundBoxFunc={(oldBox, newBox) => {
                if (newBox.width < 5 || newBox.height < 5) return oldBox;
                return newBox;
              }}
            />
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

export default InfiniteCanvas;