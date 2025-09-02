import { useState, useRef, useEffect } from 'react';
import { Stage, Layer, Rect, Transformer } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Transformer as TransformerType } from 'konva/lib/shapes/Transformer';
import type { Rect as RectType } from 'konva/lib/shapes/Rect';


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

  // New state to track the selected shape's id
  const [selectedId, selectShape] = useState<string | null>(null);

  // Refs for the transformer and the shapes
  const trRef = useRef<TransformerType>(null);
  const shapeRefs = useRef<(RectType | null)[]>([]);

  // useEffect to attach the transformer to the selected shape
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

  

  const handleStageDragEnd = (e: KonvaEventObject<DragEvent>) => {
    setStage({
      ...stage,
      x: e.target.x(),
      y: e.target.y(),
    });
  }

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

  const checkDeselect = (e: KonvaEventObject<MouseEvent | TouchEvent>) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    if (clickedOnEmpty) {
      selectShape(null);
    }
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
        onDragEnd={handleStageDragEnd} // Renamed for clarity
        draggable
        scaleX={stage.scale}
        scaleY={stage.scale}
        x={stage.x}
        y={stage.y}
        onMouseDown={checkDeselect} // Add mousedown event listener for deselection
        onTouchStart={checkDeselect} // Add touchstart event listener for deselection on mobile
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
              onClick={() => {
                selectShape(shape.id); // Select shape on click
              }}
              onTap={() => {
                selectShape(shape.id); // Select shape on tap for mobile
              }}
              draggable
              onDragEnd={(e) => {
                const newShapes = shapes.slice();
                const shapeToUpdate = newShapes.find(s => s.id === shape.id);
                if (shapeToUpdate) {
                  shapeToUpdate.x = e.target.x();
                  shapeToUpdate.y = e.target.y();
                  setShapes(newShapes);
              }
            }}
            />
          ))}
          {/* Add the Transformer component */}
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        </Layer>
      </Stage>
    </div>
  );
};

export default InfiniteCanvas;