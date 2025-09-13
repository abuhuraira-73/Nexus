import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, RegularPolygon, Arrow, Transformer, Line, Text, Group, Image as KonvaImage } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import Konva from 'konva';
import { useCanvasStore } from '../store/canvasStore';
import { Button } from '@/components/ui/button';

export type ShapeType = 'rectangle' | 'square' | 'circle' | 'triangle' | 'star' | 'arrow' | 'line' | 'text' | 'image';

export interface Shape {
  id: string;
  type: ShapeType;
  subType?: 'plain' | 'heading' | 'stickyNote';
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
  fontSize?: number;
  fontFamily?: string;
  fontStyle?: string; // 'normal', 'bold', 'italic', 'bold italic'
  textDecoration?: string; // 'underline'
  align?: string; // 'left', 'center', 'right'
  backgroundColor?: string; // For sticky note background
  padding?: number;
  // Image-specific properties
  src?: string;
}

const URLImage = ({ shape, commonProps }: { shape: Shape, commonProps: any }) => {
    const [image, setImage] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        if (!shape.src) return;
        const img = new window.Image();
        img.src = shape.src;
        img.onload = () => {
            setImage(img);
        };
    }, [shape.src]);

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  const { shapes, addShape, updateShape, deleteShape, undo, redo, selectedId, selectShape, mode, strokeColor, strokeWidth } = useCanvasStore();

  const [currentLine, setCurrentLine] = useState<Shape | null>(null);
  const [isErasing, setIsErasing] = useState(false);

  const trRef = useRef<TransformerType>(null);
  const shapeRefs = useRef<(Konva.Node | null)[]>([]);

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      });
    }
  }, []);

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
      if ((event.key === 'Delete' || event.key === 'Backspace') && selectedId) {
        deleteShape(selectedId);
        selectShape(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedId, deleteShape, selectShape]);


  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const scaleBy = 1.05;
    const stage = e.target.getStage();
    if (!stage) return;
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) return;
    const mousePointTo = {
      x: pointer.x / oldScale - stage.x() / oldScale,
      y: pointer.y / oldScale - stage.y() / oldScale,
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
        setStage({ ...stage, x: e.target.x(), y: e.target.y() });
      }
    }
  };

  const handleMouseDown = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
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

  const handleMouseUp = () => {
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
      key: shape.id,
      ref: (el: Konva.Node | null) => { shapeRefs.current[i] = el; },
      id: shape.id,
      x: shape.x,
      y: shape.y,
      rotation: shape.rotation,
      onClick: () => {
        if (mode === 'erase') {
            deleteShape(shape.id);
        } else {
            selectShape(shape.id);
        }
      },
      onTap: () => {
        if (mode === 'erase') {
            deleteShape(shape.id);
        } else {
            selectShape(shape.id);
        }
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
        updateShape({ ...shape, x: e.target.x(), y: e.target.y() });
      },
      onTransformEnd: (e: KonvaEventObject<Event>) => {
        const node = e.target;
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        node.scaleX(1);
        node.scaleY(1);
        updateShape({
          ...shape,
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
        return <Rect {...commonProps} fill={shape.fill} shadowBlur={shape.shadowBlur} width={shape.width} height={shape.height} />;
      case 'circle':
        return <Circle {...commonProps} fill={shape.fill} shadowBlur={shape.shadowBlur} radius={shape.radius} />;
      case 'triangle':
        return <RegularPolygon {...commonProps} fill={shape.fill} shadowBlur={shape.shadowBlur} sides={3} radius={shape.radius || 60} />;
      case 'star':
        return <RegularPolygon {...commonProps} fill={shape.fill} shadowBlur={shape.shadowBlur} sides={5} radius={shape.radius || 70} innerRadius={(shape.radius || 70) / 2} outerRadius={shape.radius || 70} />;
      case 'arrow':
        return <Arrow {...commonProps} fill={shape.fill} shadowBlur={shape.shadowBlur} points={[0, 0, shape.width || 100, 0]} pointerLength={20} pointerWidth={20} stroke="black" strokeWidth={4} />;
      case 'line':
        return <Line {...commonProps} points={shape.points} stroke={shape.stroke} strokeWidth={shape.strokeWidth} tension={0.5} lineCap="round" lineJoin="round" />;
      case 'text':
        return (
            <Group {...commonProps}>
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
        return <URLImage shape={shape} commonProps={commonProps} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] flex flex-col">
      <div className="p-2 border-b flex gap-2">
        <Button onClick={undo} size="sm" variant="outline">Undo</Button>
        <Button onClick={redo} size="sm" variant="outline">Redo</Button>
      </div>
      <div 
        ref={containerRef} 
        className="relative flex-1 w-full h-full"
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
            x: (position.x - stage.x) / stage.scale,
            y: (position.y - stage.y) / stage.scale,
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
                type: 'text',
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
          width={dimensions.width}
          height={dimensions.height}
          onWheel={handleWheel}
          onDragEnd={handleStageDragEnd}
          draggable={mode === 'select'}
          scaleX={stage.scale}
          scaleY={stage.scale}
          x={stage.x}
          y={stage.y}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchMove={handleMouseMove}
          onTouchEnd={handleMouseUp}
        >
          <Layer>
            {shapes.map(renderShape)}
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
