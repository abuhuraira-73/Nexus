import React from 'react';
import { Group, Rect, Text, RegularPolygon } from 'react-konva';
import { Shape } from '@/pages/infinite-canvas';

interface CommentCardProps {
  shape: Shape;
  // Konva props will be passed through a rest operator
  [key: string]: any;
}

export const CommentCard: React.FC<CommentCardProps> = ({ shape, ...props }) => {
  const {
    text = 'Add a comment...',
    width = 250,
    height = 100,
    backgroundColor = '#ffffff',
    stroke = '#E0E0E0',
    cornerRadius = 8,
    padding = 16,
    shadowBlur = 10,
    textColor = '#333333',
    fontSize = 14,
    fontFamily = 'Inter',
    author = 'User Name',
  } = shape;

  const timestamp = new Date().toLocaleTimeString(); // Placeholder

  return (
    <Group {...props}>
      {/* Comment bubble tail */}
      <RegularPolygon
        sides={3}
        radius={10}
        fill={backgroundColor}
        stroke={stroke}
        strokeWidth={1}
        x={width / 4}
        y={height}
        rotation={180}
        shadowColor="rgba(0,0,0,0.1)"
        shadowBlur={shadowBlur}
        shadowOffsetX={0}
        shadowOffsetY={4}
      />
      {/* Card background */}
      <Rect
        width={width}
        height={height}
        fill={backgroundColor}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={cornerRadius}
        shadowColor="rgba(0,0,0,0.1)"
        shadowBlur={shadowBlur}
        shadowOffsetX={0}
        shadowOffsetY={4}
      />
      
      {/* Header */}
      <Group x={padding} y={padding}>
        <Text
          text={author}
          fontFamily={fontFamily}
          fontSize={fontSize}
          fontStyle="bold"
          fill="#555555"
        />
        <Text
          text={timestamp}
          fontFamily={fontFamily}
          fontSize={fontSize - 2}
          fill="#999999"
          x={width - padding * 2 - 60} // Adjust position
        />
      </Group>

      {/* Comment Text */}
      <Text
        text={text}
        x={padding}
        y={padding + 24}
        width={width - padding * 2}
        height={height - padding * 2 - 24}
        fill={textColor}
        fontSize={fontSize}
        fontFamily={fontFamily}
        lineHeight={1.5}
      />
    </Group>
  );
};
