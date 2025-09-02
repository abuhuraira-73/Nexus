import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import type { Rect as RectType } from 'konva/lib/shapes/Rect';
import { useCanvasStore } from '../store/canvasStore'; // Import the new store

export interface Shape {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  shadowBlur: number;
  rotation?: number;
}

const InfiniteCanvas = () => {
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  // Get state and actions from the Zustand store
  const { shapes, addShape, updateShape, deleteShape, undo, redo } = useCanvasStore((state) => state);

  const [selectedId, selectShape] = useState<string | null>(null);

  const trRef = useRef<TransformerType>(null);
  const shapeRefs = useRef<(RectType | null)[]>([]);

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

  const handleAddShape = () => {
    const newShape: Shape = {
      id: String(Date.now()), // Use a more unique ID
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width: 100,
      height: 100,
      fill: 'green',
      shadowBlur: 5,
      rotation: 0,
    };
    addShape(newShape);
  };

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
  };

  return (
    <div>
      <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 1, display: 'flex', gap: '10px' }}>
        <button onClick={handleAddShape}>Add Shape</button>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
      </div>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
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
          {shapes.map((shape, i) => (
            <Rect
              key={shape.id}
              ref={(el) => { shapeRefs.current[i] = el; }}
              id={shape.id}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
              shadowBlur={shape.shadowBlur}
              rotation={shape.rotation}
              onClick={() => selectShape(shape.id)}
              onTap={() => selectShape(shape.id)}
              draggable
              onDragEnd={(e) => {
                updateShape({ id: shape.id, x: e.target.x(), y: e.target.y() });
              }}
              onTransformEnd={(e) => {
                const node = e.target;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                node.scaleX(1);
                node.scaleY(1);
                updateShape({
                  id: shape.id,
                  x: node.x(),
                  y: node.y(),
                  width: Math.max(5, node.width() * scaleX),
                  height: Math.max(5, node.height() * scaleY),
                  rotation: node.rotation(),
                });
              }}
            />
          ))}
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
  );
};

export default InfiniteCanvas;