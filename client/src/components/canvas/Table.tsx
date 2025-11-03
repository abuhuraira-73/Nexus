import React, { useState, useEffect } from 'react';
import { Group, Rect, Text, Line } from 'react-konva';
import { Shape } from '@/pages/infinite-canvas';
import { useCanvasStore } from '@/store/canvasStore';
import { Html } from 'react-konva-utils';
import Konva from 'konva';

interface TableProps {
  shape: Shape;
  editingShapeId: string | null;
  // Konva props will be passed through a rest operator
  [key: string]: any;
}

export const Table: React.FC<TableProps> = ({ shape, editingShapeId, ...props }) => {
  const { updateShape, updateShapeAndPushHistory } = useCanvasStore();
  const {
    tableData = [
      [{ text: 'Header 1' }, { text: 'Header 2' }],
      [{ text: 'Cell 1' }, { text: 'Cell 2' }],
    ],
    columnWidths = [150, 150],
    rowHeights = [40, 40],
    stroke = '#000000',
    strokeWidth = 1,
    backgroundColor,
    fontSize = 16,
    fontFamily = 'Inter',
    padding = 5,
    cornerRadius = 8,
  } = shape;

  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    const recalculateTableSize = () => {
      const newColumnWidths = [...columnWidths];
      const newRowHeights = [...rowHeights];
      let changed = false;

      tableData.forEach((row, rowIndex) => {
        row.forEach((cell, colIndex) => {
          const text = new Konva.Text({
            text: cell.text,
            fontSize,
            fontFamily,
            padding,
          });
          const textWidth = text.width() + padding * 2;
          const textHeight = text.height() + padding * 2;

          if (textWidth > (newColumnWidths[colIndex] || 0)) {
            newColumnWidths[colIndex] = textWidth;
            changed = true;
          }
          if (textHeight > (newRowHeights[rowIndex] || 0)) {
            newRowHeights[rowIndex] = textHeight;
            changed = true;
          }
        });
      });

      if (changed) {
        updateShape({ id: shape.id, columnWidths: newColumnWidths, rowHeights: newRowHeights });
      }
    };

    recalculateTableSize();
  }, [tableData, fontSize, fontFamily, padding, shape.id, updateShape]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!editingCell) return;
    const { row, col } = editingCell;
    const newTableData = tableData.map((r, rowIndex) =>
      rowIndex === row
        ? r.map((c, colIndex) => (colIndex === col ? { ...c, text: e.target.value } : c))
        : r
    );
    updateShape({ id: shape.id, tableData: newTableData });
  };
  
  const stopEditing = () => {
      if(editingCell) {
          updateShapeAndPushHistory({ id: shape.id, tableData });
          setEditingCell(null);
      }
  }

  const totalWidth = columnWidths.reduce((a, b) => a + b, 0);
  const totalHeight = rowHeights.reduce((a, b) => a + b, 0);

  return (
    <Group {...props}>
      {/* 1. Background with rounded corners */}
      <Rect
        width={totalWidth}
        height={totalHeight}
        fill={backgroundColor || 'transparent'}
        stroke={stroke}
        strokeWidth={strokeWidth}
        cornerRadius={cornerRadius}
      />

      {/* 2. Draw vertical lines */}
      {columnWidths.slice(0, -1).map((_, i) => {
        const x = columnWidths.slice(0, i + 1).reduce((a, b) => a + b, 0);
        return <Line key={`v-${i}`} points={[x, 0, x, totalHeight]} stroke={stroke} strokeWidth={strokeWidth} />;
      })}
      
      {/* 3. Draw horizontal lines */}
      {rowHeights.slice(0, -1).map((_, i) => {
        const y = rowHeights.slice(0, i + 1).reduce((a, b) => a + b, 0);
        return <Line key={`h-${i}`} points={[0, y, totalWidth, y]} stroke={stroke} strokeWidth={strokeWidth} />;
      })}

      {/* 4. Draw cell text content */}
      {tableData.map((row, rowIndex) => {
        const y = rowHeights.slice(0, rowIndex).reduce((a, b) => a + b, 0);
        return row.map((cell, colIndex) => {
          const x = columnWidths.slice(0, colIndex).reduce((a, b) => a + b, 0);
          const cellWidth = columnWidths[colIndex] || 150;
          const cellHeight = rowHeights[rowIndex] || 40;

          return (
            <Group key={`${rowIndex}-${colIndex}`} x={x} y={y} onDblClick={() => setEditingCell({ row: rowIndex, col: colIndex })}>
              <Text
                text={cell.text}
                width={cellWidth}
                height={cellHeight}
                padding={padding}
                verticalAlign="middle"
                align="center"
                fontSize={fontSize}
                fontFamily={fontFamily}
                fill="#000000"
                visible={!editingCell || editingCell.row !== rowIndex || editingCell.col !== colIndex}
              />
            </Group>
          );
        });
      })}

      {/* 5. HTML Textarea for editing */}
      {editingCell && (
        <Html
          groupProps={{
            x: (columnWidths || []).slice(0, editingCell.col).reduce((a, b) => a + b, 0),
            y: (rowHeights || []).slice(0, editingCell.row).reduce((a, b) => a + b, 0),
          }}
          divProps={{ style: { display: 'block' } }}
        >
          <textarea
            value={tableData[editingCell.row][editingCell.col].text}
            onChange={handleTextChange}
            onBlur={stopEditing}
            autoFocus
            style={{
              width: `${(columnWidths || [])[editingCell.col] || 150}px`,
              height: `${(rowHeights || [])[editingCell.row] || 40}px`,
              border: 'none',
              padding: `${padding}px`,
              margin: '0',
              background: 'none',
              outline: 'none',
              resize: 'none',
              fontSize: `${fontSize}px`,
              fontFamily: fontFamily,
              textAlign: 'center',
              color: '#000000',
            }}
          />
        </Html>
      )}
    </Group>
  );
};