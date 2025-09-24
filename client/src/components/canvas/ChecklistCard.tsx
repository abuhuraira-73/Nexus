import React, { useState, useEffect, useRef } from 'react';
import { Group, Rect, Text, Path } from 'react-konva';
import { Shape } from '@/pages/infinite-canvas';
import { useCanvasStore } from '@/store/canvasStore';
import { Html } from 'react-konva-utils';
import Konva from 'konva';

interface ChecklistCardProps {
  shape: Shape;
  editingShapeId: string | null;
  // Konva props will be passed through a rest operator
  [key: string]: any;
}

// Refactored to be a pure Konva component to solve z-index issues
export const ChecklistCard: React.FC<ChecklistCardProps> = ({ shape, editingShapeId, ...props }) => {
  const { updateShapeAndPushHistory, updateShape } = useCanvasStore();
  const {
    items = [{ id: '1', text: 'To-do item', checked: false }],
    width = 250,
    backgroundColor = '#ffffff',
    stroke = '#E0E0E0',
    cornerRadius = 8,
    padding = 16,
    shadowBlur = 10,
    textColor = '#000000', // Default to black
    fontSize = 14,
    fontFamily = 'Inter',
  } = shape;

  const [editingItem, setEditingItem] = useState<string | null>(null);
  const itemRowHeight = 30; // Height for each row

  // --- DYNAMIC RESIZING --- //
  useEffect(() => {
    // 1. Calculate Width
    let maxWidth = 0;
    items.forEach(item => {
      const text = new Konva.Text({
        text: item.text,
        fontSize: fontSize,
        fontFamily: fontFamily,
      });
      if (text.width() > maxWidth) {
        maxWidth = text.width();
      }
    });
    const checkboxWidth = 30; // checkbox + margin
    const newWidth = maxWidth + checkboxWidth + padding * 2;
    const minWidth = 150;

    // 2. Calculate Height
    const newHeight = items.length * itemRowHeight + padding * 2;

    // 3. Update if changed
    if ((Math.abs(newWidth - width) > 1 && newWidth > minWidth) || Math.abs(newHeight - (shape.height || 0)) > 1) {
      updateShape({ id: shape.id, width: newWidth > minWidth ? newWidth : minWidth, height: newHeight });
    }
  }, [items, fontSize, fontFamily, padding, shape.id, updateShape, width, shape.height]);


  // --- EVENT HANDLERS --- //
  const handleItemChange = (newText: string) => {
    if (!editingItem) return;
    const newItems = items.map(item =>
      item.id === editingItem ? { ...item, text: newText } : item
    );
    updateShape({ id: shape.id, items: newItems }); // Use updateShape for live typing
  };

  const handleToggleCheck = (itemId: string) => {
    const newItems = items.map(item =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    updateShapeAndPushHistory({ id: shape.id, items: newItems });
  };

  const stopEditing = () => {
    if (editingItem) {
        // Push final state to history
        updateShapeAndPushHistory({ id: shape.id, items: shape.items });
        setEditingItem(null);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        stopEditing();
        const newItemId = String(Date.now());
        const newItems = [...items, { id: newItemId, text: '', checked: false }];
        updateShapeAndPushHistory({ id: shape.id, items: newItems });
        setEditingItem(newItemId); // Set focus to the new item
    } else if (e.key === 'Escape') {
        stopEditing();
    }
  };

  return (
    <Group {...props}>
      {/* Card Background */}
      <Rect
        width={width}
        height={shape.height || 100}
        fill={backgroundColor}
        stroke={stroke}
        strokeWidth={1}
        cornerRadius={cornerRadius}
        shadowColor="rgba(0,0,0,0.1)"
        shadowBlur={shadowBlur}
        shadowOffsetX={0}
        shadowOffsetY={4}
      />

      {/* Render Checklist Items as Konva objects */}
      {items.map((item, index) => (
        <Group key={item.id} y={padding + index * itemRowHeight}>
          {/* Checkbox */}
          <Rect
            x={padding}
            y={5} // Center vertically in the row
            width={16}
            height={16}
            stroke="#888"
            strokeWidth={1.5}
            cornerRadius={3}
            onClick={() => handleToggleCheck(item.id)}
            onTap={() => handleToggleCheck(item.id)}
          />
          {/* Checkmark */}
          {item.checked && (
            <Path
              data="M5 10 l3 3 l6 -6"
              x={padding + 2}
              y={7}
              stroke={textColor}
              strokeWidth={2}
              listening={false} // Pass clicks through to the box
            />
          )}
          {/* Text */}
          <Text
            text={item.text}
            x={padding + 28}
            y={7} // Align with checkbox
            fontSize={fontSize}
            fontFamily={fontFamily}
            fill={textColor}
            width={width - (padding * 2) - 28}
            visible={editingItem !== item.id} // Hide when editing
            onDblClick={() => setEditingItem(item.id)}
            onDblTap={() => setEditingItem(item.id)}
          />
        </Group>
      ))}

      {/* HTML Textarea for editing */}
      {editingItem && (() => {
        const item = items.find(i => i.id === editingItem);
        if (!item) return null;
        const itemIndex = items.findIndex(i => i.id === editingItem);

        return (
            <Html
                groupProps={{
                    x: padding + 28,
                    y: padding + itemIndex * itemRowHeight + 7,
                }}
                divProps={{ style: { display: 'block' } }}
            >
                <textarea
                    value={item.text}
                    onChange={(e) => handleItemChange(e.target.value)}
                    onBlur={stopEditing}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    style={{
                        width: `${width - (padding * 2) - 28}px`,
                        height: `${itemRowHeight}px`,
                        border: 'none',
                        padding: '0',
                        margin: '0',
                        background: 'none',
                        outline: 'none',
                        resize: 'none',
                        fontSize: `${fontSize}px`,
                        fontFamily: fontFamily,
                        lineHeight: '1.4',
                        color: textColor,
                    }}
                />
            </Html>
        );
      })()}
    </Group>
  );
};