import React, { useState, useEffect } from 'react';
import { Group, Rect, Text } from 'react-konva';
import { Shape } from '@/pages/infinite-canvas';
import { useCanvasStore } from '@/store/canvasStore';
import { Html } from 'react-konva-utils';
import Konva from 'konva';

interface TableProps {
  shape: Shape;
  // Konva props will be passed through a rest operator
  [key: string]: any;
}

export const Table: React.FC<TableProps> = ({ shape, ...props }) => {
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
  } = shape;

  const [editingCell, setEditingCell] = useState<{ row: number; col: number } | null>(null);

  useEffect(() => {
    const recalculateTableSize = () => {
      const newColumnWidths = [...columnWidths];
      const newRowHeights = [...rowHeights];

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
          }
          if (textHeight > (newRowHeights[rowIndex] || 0)) {
            newRowHeights[rowIndex] = textHeight;
          }
        });
      });

      updateShape({ id: shape.id, columnWidths: newColumnWidths, rowHeights: newRowHeights });
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
    updateShapeAndPushHistory({ id: shape.id, tableData: newTableData });
  };

  return (
    <Group {...props}>
      {/* Draw rows and cells */}
      {tableData.map((row, rowIndex) => {
        let y = 0;
        for (let i = 0; i < rowIndex; i++) {
          y += rowHeights[i] || 0;
        }
        return row.map((cell, colIndex) => {
          let x = 0;
          for (let i = 0; i < colIndex; i++) {
            x += columnWidths[i] || 0;
          }
          const cellWidth = columnWidths[colIndex] || 150;
          const cellHeight = rowHeights[rowIndex] || 40;

          return (
            <Group key={`${rowIndex}-${colIndex}`} x={x} y={y} onDblClick={() => setEditingCell({ row: rowIndex, col: colIndex })}>
              <Rect
                width={cellWidth}
                height={cellHeight}
                stroke={stroke}
                strokeWidth={strokeWidth}
                fill={backgroundColor}
              />
              <Text
                text={cell.text}
                width={cellWidth}
                height={cellHeight}
                padding={padding}
                verticalAlign="middle"
                fontSize={fontSize}
                fontFamily={fontFamily}
                visible={!editingCell || editingCell.row !== rowIndex || editingCell.col !== colIndex}
              />
            </Group>
          );
        });
      })}
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
            onBlur={() => setEditingCell(null)}
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
            }}
          />
        </Html>
      )}
    </Group>
  );
};
