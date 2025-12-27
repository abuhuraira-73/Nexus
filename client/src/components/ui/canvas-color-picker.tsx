'use client';

import { Droplet } from 'lucide-react';
import { useCanvasStore } from '@/store/canvasStore';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const PRESET_COLORS = [
  '#FFFFFF', // White
  '#F8F8F8', // Light Gray (Default)
  '#FFF9C4', // Light Yellow
  '#E3F2FD', // Light Blue
  '#E8F5E9', // Light Green
  '#212121', // Dark Gray
];

export function CanvasColorPicker() {
  const { backgroundColor, setBackgroundColor } = useCanvasStore();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon">
          <Droplet className="h-4 w-4" />
          <span className="sr-only">Change canvas color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="rounded-lg bg-black/50 backdrop-blur-sm border-none p-4">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-medium text-white">Change canvas color</p>
          <div className="grid grid-cols-6 gap-2">
            {PRESET_COLORS.map((color) => (
              <Button
                key={color}
                variant="outline"
                className={`h-8 w-8 rounded-full p-0 border-2 ${backgroundColor === color ? 'border-blue-500' : 'border-transparent'}`}
                style={{ backgroundColor: color }}
                onClick={() => setBackgroundColor(color)}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="custom-color-picker" className="text-sm text-white">Custom</label>
            <input
              id="custom-color-picker"
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
              className="h-8 w-16 rounded border-none bg-transparent cursor-pointer"
            />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
