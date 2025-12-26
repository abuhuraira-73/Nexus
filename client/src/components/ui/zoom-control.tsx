import { useState, useEffect } from 'react';
import { useCanvasStore } from '@/store/canvasStore';
import { Input } from './input';
import { Button } from './button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './tooltip';
import { Frame } from 'lucide-react';

export const ZoomControl = () => {
  const { stageScale, setStage } = useCanvasStore();
  const [displayValue, setDisplayValue] = useState(Math.round(stageScale * 100).toString());

  useEffect(() => {
    setDisplayValue(Math.round(stageScale * 100).toString());
  }, [stageScale]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDisplayValue(e.target.value);
  };

  const handleBlur = () => {
    const newScale = parseInt(displayValue, 10);
    if (!isNaN(newScale)) {
      setStage({ scale: Math.max(10, Math.min(500, newScale)) / 100 });
    } else {
      setDisplayValue(Math.round(stageScale * 100).toString());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
  };

  const handleResetView = () => {
    setStage({ scale: 1, x: 0, y: 0 });
  };

  return (
    <TooltipProvider>
      <div className="flex items-center gap-2 p-1 bg-black/50 backdrop-blur-sm rounded-lg">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleResetView}>
              <Frame className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Reset View</p>
          </TooltipContent>
        </Tooltip>
        <div className="flex items-center">
          <Input
            type="text"
            className="w-13 h-8 text-center bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0"
            value={displayValue}
            onChange={handleInputChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
          <span className="text-sm font-medium text-neutral-40 pr-2">ㅤ%</span>
        </div>
      </div>
    </TooltipProvider>
  );
};