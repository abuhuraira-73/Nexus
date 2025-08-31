import { useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';

interface Shape {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  shadowBlur: number;
}

const InfiniteCanvas = () => {
  const [stage, setStage] = useState({
    scale: 1,
    x: 0,
    y: 0,
  });

  const [shapes, setShapes] = useState<Shape[]>([
    { id: '1', x: 20, y: 20, width: 100, height: 100, fill: 'red', shadowBlur: 5 },
  ]);

  const handleWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();

    const scaleBy = 1.05;
    const stage = e.target.getStage();
    if (!stage) {
      return;
    }
    const oldScale = stage.scaleX();
    const pointer = stage.getPointerPosition();
    if (!pointer) {
      return;
    }
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

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    setStage({
      ...stage,
      x: e.target.x(),
      y: e.target.y(),
    });
  };

  const addShape = () => {
    const newShape: Shape = {
      id: String(shapes.length + 1),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width: 100,
      height: 100,
      fill: 'green',
      shadowBlur: 5,
    };
    setShapes([...shapes, newShape]);
  };

  return (
    <div>
      <button
        onClick={addShape}
        style={{ position: 'absolute', top: 20, left: 20, zIndex: 1 }}
      >
        Add Shape
      </button>
      <Stage
        width={window.innerWidth}
        height={window.innerHeight}
        onWheel={handleWheel}
        onDragEnd={handleDragEnd}
        draggable
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
      >
        <Layer>
          {shapes.map((shape) => (
            <Rect
              key={shape.id}
              x={shape.x}
              y={shape.y}
              width={shape.width}
              height={shape.height}
              fill={shape.fill}
              shadowBlur={shape.shadowBlur}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};

export default InfiniteCanvas;