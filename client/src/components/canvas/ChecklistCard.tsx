import React from 'react';
import { Group, Rect } from 'react-konva';
import { Shape } from '@/pages/infinite-canvas';
import { useCanvasStore } from '@/store/canvasStore';
import { Html } from 'react-konva-utils';

interface ChecklistCardProps {
  shape: Shape;
  // Konva props will be passed through a rest operator
  [key: string]: any;
}

export const ChecklistCard: React.FC<ChecklistCardProps> = ({ shape, ...props }) => {
  const { updateShapeAndPushHistory } = useCanvasStore();
  const {
    items = [{ id: '1', text: 'To-do item', checked: false }],
    width = 250,
    backgroundColor = '#ffffff',
    stroke = '#E0E0E0',
    cornerRadius = 8,
    padding = 16,
    shadowBlur = 10,
    textColor,
    fontSize,
    fontFamily,
  } = shape;

  const handleItemChange = (itemId: string, newText: string) => {
    const newItems = items.map(item =>
      item.id === itemId ? { ...item, text: newText } : item
    );
    updateShapeAndPushHistory({ id: shape.id, items: newItems });
  };

  const handleToggleCheck = (itemId: string) => {
    const newItems = items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    updateShapeAndPushHistory({ id: shape.id, items: newItems });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, itemId: string) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const newItems = [...items, { id: String(Date.now()), text: '', checked: false }];
      updateShapeAndPushHistory({ id: shape.id, items: newItems });
    } else if (e.key === 'Backspace' && items.find(item => item.id === itemId)?.text === '') {
        const newItems = items.filter(item => item.id !== itemId);
        updateShapeAndPushHistory({ id: shape.id, items: newItems });
    }
  };
  
  const itemHeight = 30;
  const totalHeight = items.length * itemHeight + padding * 2;

  return (
    <Group {...props}>
      <Rect
        width={width}
        height={totalHeight}
        fill={backgroundColor}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={cornerRadius}
        shadowColor="rgba(0,0,0,0.1)"
        shadowBlur={shadowBlur}
        shadowOffsetX={0}
        shadowOffsetY={4}
      />
      <Html
        groupProps={{ x: padding, y: padding }}
        divProps={{ style: { display: 'flex', flexDirection: 'column', gap: '10px', width: `${width - padding * 2}px` } }}
      >
        {items.map(item => (
          <div key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleToggleCheck(item.id)}
              style={{ marginRight: '10px' }}
            />
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleItemChange(item.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              style={{
                border: 'none',
                outline: 'none',
                background: 'transparent',
                width: '100%',
                color: textColor,
                fontSize: `${fontSize}px`,
                fontFamily: fontFamily,
              }}
            />
          </div>
        ))}
      </Html>
    </Group>
  );
};
