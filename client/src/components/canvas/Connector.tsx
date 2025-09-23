import React from 'react';
import { Line } from 'react-konva';
import { Shape } from '@/pages/infinite-canvas';
import { useCanvasStore } from '@/store/canvasStore';

interface ConnectorProps {
  shape: Shape;
}

export const Connector: React.FC<ConnectorProps> = ({ shape }) => {
  const { shapes } = useCanvasStore();
  const { fromShapeId, toShapeId, stroke = 'black', strokeWidth = 2 } = shape;

  const fromShape = shapes.find(s => s.id === fromShapeId);
  const toShape = shapes.find(s => s.id === toShapeId);

  if (!fromShape || !toShape) {
    return null;
  }

  const points = [
    fromShape.x + (fromShape.width || 0) / 2,
    fromShape.y + (fromShape.height || 0) / 2,
    toShape.x + (toShape.width || 0) / 2,
    toShape.y + (toShape.height || 0) / 2,
  ];

  return (
    <Line
      points={points}
      stroke={stroke}
      strokeWidth={strokeWidth}
    />
  );
};
