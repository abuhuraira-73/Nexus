import React from 'react';
import { Group, Rect, Text } from 'react-konva';
import type { KonvaEventObject } from 'konva/lib/Node';
import type { Shape } from '@/pages/infinite-canvas'; // Assuming Shape is exported from here

interface TextCardProps {
  shape: Shape;
  editingShapeId: string | null;
  // Event handlers and other props from Konva
  id: string;
  draggable: boolean;
  rotation?: number;
  onClick: (e: KonvaEventObject<MouseEvent>) => void;
  onTap: (e: KonvaEventObject<MouseEvent>) => void;
  onDragEnd: (e: KonvaEventObject<DragEvent>) => void;
  onTransformEnd: (e: KonvaEventObject<Event>) => void;
  onDblClick: (e: KonvaEventObject<MouseEvent>) => void;
}

const defaultStyles = {
  backgroundColor: '#F9F9F9',
  stroke: '#E0E0E0',
  strokeWidth: 1,
  cornerRadius: 8,
  shadowColor: 'black',
  shadowBlur: 10,
  shadowOpacity: 0.2,
  shadowOffsetX: 0,
  shadowOffsetY: 2,
  textColor: '#333333',
  fontFamily: 'Metropolis-Regular',
  fontSize: 14,
  padding: 16,
  opacity: 1,
  fontStyle: 'normal',
  textDecoration: 'normal',
  align: 'left',
};

import { useCanvasStore } from '@/store/canvasStore';
import { useEffect, useRef } from 'react';
import type { Text as TextType } from 'konva/lib/shapes/Text';

export const TextCard: React.FC<TextCardProps> = ({ shape, editingShapeId, ...commonProps }) => {
  const { updateShape } = useCanvasStore();
  const textRef = useRef<TextType>(null);

  const padding = shape.padding ?? defaultStyles.padding;
  const width = shape.width ?? 250;
  const height = shape.height ?? 58;

  useEffect(() => {
    const textNode = textRef.current;
    if (textNode) {
      const newHeight = textNode.height();
      const requiredCardHeight = newHeight + padding * 2;
      if (Math.abs(requiredCardHeight - height) > 1) { // Only update if height differs significantly
        updateShape({ id: shape.id, height: requiredCardHeight });
      }
    }
  }, [shape.text, width, shape.fontSize, shape.fontFamily, padding, height, shape.id, updateShape]);

  return (
    <Group 
      x={shape.x}
      y={shape.y}
      opacity={shape.opacity ?? defaultStyles.opacity}
      visible={editingShapeId !== shape.id}
      {...commonProps}
    >
      <Rect
        width={width}
        height={height}
        fill={shape.backgroundColor ?? defaultStyles.backgroundColor}
        stroke={shape.stroke ?? defaultStyles.stroke}
        strokeWidth={defaultStyles.strokeWidth}
        cornerRadius={shape.cornerRadius ?? defaultStyles.cornerRadius}
        shadowColor={defaultStyles.shadowColor}
        shadowBlur={shape.shadowBlur ?? defaultStyles.shadowBlur}
        shadowOpacity={defaultStyles.shadowOpacity}
        shadowOffsetX={defaultStyles.shadowOffsetX}
        shadowOffsetY={defaultStyles.shadowOffsetY}
      />
      <Text
        ref={textRef}
        text={shape.text ?? ''}
        width={width - padding * 2}
        x={padding}
        y={padding}
        fill={shape.textColor ?? defaultStyles.textColor}
        fontFamily={shape.fontFamily ?? defaultStyles.fontFamily}
        fontSize={shape.fontSize ?? defaultStyles.fontSize}
        fontStyle={shape.fontStyle ?? defaultStyles.fontStyle}
        textDecoration={shape.textDecoration ?? defaultStyles.textDecoration}
        align={shape.align ?? defaultStyles.align}
        lineHeight={1.5}
        listening={false}
      />
    </Group>
  );
};