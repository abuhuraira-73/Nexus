import React from 'react';
import { Line, Circle } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import { Shape } from '@/pages/infinite-canvas';
import { useCanvasStore } from '@/store/canvasStore';

interface ConnectorProps {
  shape: Shape;
  isSelected: boolean;
  selectShape: (id: string | null) => void;
}

export const Connector: React.FC<ConnectorProps> = ({ shape, isSelected, selectShape }) => {
  const { shapes, updateShape, updateShapeAndPushHistory } = useCanvasStore();
  const { fromShapeId, toShapeId, stroke = 'black', strokeWidth = 2 } = shape;

  const fromShape = shapes.find(s => s.id === fromShapeId);
  const toShape = shapes.find(s => s.id === toShapeId);

  if (!fromShape || !toShape) {
    return null;
  }

  const startX = fromShape.x + (fromShape.width || 0) / 2;
  const startY = fromShape.y + (fromShape.height || 0) / 2;
  const endX = toShape.x + (toShape.width || 0) / 2;
  const endY = toShape.y + (toShape.height || 0) / 2;

  const controlX = shape.controlX || (startX + endX) / 2;
  const controlY = shape.controlY || (startY + endY) / 2;

  const points = [startX, startY, controlX, controlY, endX, endY];

  const handleDragMove = (e: KonvaEventObject<DragEvent>) => {
    updateShape({ id: shape.id, controlX: e.target.x(), controlY: e.target.y() });
  };

  const handleDragEnd = (e: KonvaEventObject<DragEvent>) => {
    updateShapeAndPushHistory({ id: shape.id, controlX: e.target.x(), controlY: e.target.y() });
  };

  return (
    <>
      <Line
        points={points}
        stroke={stroke}
        strokeWidth={strokeWidth}
        tension={0.5}
        onClick={() => selectShape(shape.id)}
        onTap={() => selectShape(shape.id)}
      />
      {isSelected && (
        <Circle
          x={controlX}
          y={controlY}
          radius={5}
          fill="black"
          stroke="white"
          strokeWidth={1}
          draggable
          onDragMove={handleDragMove}
          onDragEnd={handleDragEnd}
        />
      )}
    </>
  );
};