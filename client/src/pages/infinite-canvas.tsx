import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Circle, RegularPolygon, Arrow, Transformer } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import Konva from 'konva';
import { useCanvasStore } from '../store/canvasStore'; // Import the new store
import { Button } from '@/components/ui/button'; // Import Button component

export type ShapeType = 'rectangle' | 'square' | 'circle' | 'triangle' | 'star' | 'arrow';

export interface Shape {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width?: number;
  height?: number;
  radius?: number;
  points?: number[];
  fill: string;
  shadowBlur: number;
  rotation?: number;
}

const InfiniteCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  // Get state and actions from the Zustand store
  const { shapes, addShape, updateShape, deleteShape, undo, redo, selectedId, selectShape } = useCanvasStore();

  const trRef = useRef<TransformerType>(null);
  const shapeRefs = useRef<(Konva.Node | null)[]>([]);

  // Effect to set initial dimensions
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
  }, [selectedId, deleteShape]);


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
    setStage({ ...stage, x: e.target.x(), y: e.target.y() });
  };

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  const renderShape = (shape: Shape, i: number) => {
    const commonProps = {
      key: shape.id,
      ref: (el: Konva.Node | null) => { shapeRefs.current[i] = el; },
      id: shape.id,
      x: shape.x,
      y: shape.y,
      fill: shape.fill,
      shadowBlur: shape.shadowBlur,
      rotation: shape.rotation,
      onClick: () => selectShape(shape.id),
      onTap: () => selectShape(shape.id),
      draggable: true,
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
        return <Rect {...commonProps} width={shape.width} height={shape.height} />;
      case 'circle':
        return <Circle {...commonProps} radius={shape.radius} />;
      case 'triangle':
        return <RegularPolygon {...commonProps} sides={3} radius={shape.radius || 60} />;
      case 'star':
        return <RegularPolygon {...commonProps} sides={5} radius={shape.radius || 70} innerRadius={(shape.radius || 70) / 2} outerRadius={shape.radius || 70} />;
      case 'arrow':
        return <Arrow {...commonProps} points={[0, 0, shape.width || 100, 0]} pointerLength={20} pointerWidth={20} stroke="black" strokeWidth={4} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative w-full h-[calc(100vh-8rem)] flex flex-col">
      <div className="p-2 border-b flex gap-2">
        {/* This button is for debugging and can be removed */}
        <Button onClick={() => addShape({ type: 'rectangle', id: String(Date.now()), x: 100, y: 100, width: 100, height: 100, fill: 'green', shadowBlur: 5 })} size="sm">Add Shape</Button>
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
            fill: 'green',
            shadowBlur: 5,
            rotation: 0,
          };

          switch (type) {
            case 'rectangle':
              newShape = { ...baseShape, type, width: 120, height: 80 };
              break;
            case 'square':
              newShape = { ...baseShape, type, width: 100, height: 100 };
              break;
            case 'circle':
              newShape = { ...baseShape, type, radius: 50 };
              break;
            case 'triangle':
              newShape = { ...baseShape, type, radius: 60 };
              break;
            case 'star':
              newShape = { ...baseShape, type, radius: 70 };
              break;
            case 'arrow':
              newShape = { ...baseShape, type, width: 150 };
              break;
            default:
              return;
          }
          addShape(newShape);
        }}
      >
        <Stage
          width={dimensions.width}
          height={dimensions.height}
          onWheel={handleWheel}
          onDragEnd={handleStageDragEnd}
          draggable
          scaleX={stage.scale}
          scaleY={stage.scale}
          x={stage.x}
          y={stage.y}
          onMouseDown={checkDeselect}
          onTouchStart={checkDeselect}
        >
          <Layer>
            {shapes.map(renderShape)}
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
