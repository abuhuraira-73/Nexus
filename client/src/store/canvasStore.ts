import { create } from 'zustand';
import type { Shape } from '../pages/infinite-canvas';

export type CanvasMode = 'select' | 'draw' | 'erase';
export type BackgroundPattern = 'solid' | 'dotted' | 'lined';

// The history will now store a tuple of [shapes, backgroundColor]
type HistoryEntry = [Shape[], string];

interface CanvasState {
  shapes: Shape[];
  backgroundColor: string;
  backgroundPattern: BackgroundPattern;
  history: HistoryEntry[];
  future: HistoryEntry[];
  selectedId: string | null;
  mode: CanvasMode;
  strokeColor: string;
  strokeWidth: number;
  stageScale: number;
  stageX: number;
  stageY: number;

  addShape: (newShape: Shape) => void;
  updateShape: (updatedShape: Partial<Shape> & { id: string }) => void;
  deleteShape: (id: string) => void;
  selectShape: (id: string | null) => void;
  setMode: (mode: CanvasMode) => void;
  setStrokeColor: (color: string) => void;
  setStrokeWidth: (width: number) => void;
  setBackgroundColor: (color: string) => void;
  setBackgroundPattern: (pattern: BackgroundPattern) => void;
  setStage: (stage: { scale?: number; x?: number; y?: number }) => void;
  undo: () => void;
  redo: () => void;
  setCanvas: (shapes: Shape[], backgroundColor?: string) => void;
}

export const useCanvasStore = create<CanvasState>()((set) => ({
      shapes: [],
      backgroundColor: '#F8F8F8', // Default background color
      backgroundPattern: 'solid',
      history: [],
      future: [],
      selectedId: null,
      mode: 'select',
      strokeColor: '#000000',
      strokeWidth: 2,
      stageScale: 1,
      stageX: 0,
      stageY: 0,

      addShape: (newShape) => {
        set((state) => {
          const newHistory: HistoryEntry[] = [...state.history, [state.shapes, state.backgroundColor]];
          return {
            shapes: [...state.shapes, newShape],
            history: newHistory,
            future: [],
          };
        });
      },

      updateShape: (updatedShape) => {
        set((state) => {
          const newHistory: HistoryEntry[] = [...state.history, [state.shapes, state.backgroundColor]];
          return {
            shapes: state.shapes.map((shape) =>
              shape.id === updatedShape.id
                ? { ...shape, ...updatedShape }
                : shape
            ),
            history: newHistory,
            future: [],
          };
        });
      },

      deleteShape: (id) => {
        set((state) => {
          const newHistory: HistoryEntry[] = [...state.history, [state.shapes, state.backgroundColor]];
          return {
            shapes: state.shapes.filter((shape) => shape.id !== id),
            history: newHistory,
            future: [],
            selectedId: null,
          };
        });
      },

      selectShape: (id) => set({ selectedId: id }),

      setMode: (mode) => set({ mode }),

      setStrokeColor: (color) => set({ strokeColor: color }),

      setStrokeWidth: (width) => set({ strokeWidth: width }),

      setStage: (stage) => set((state) => ({ 
        stageScale: stage.scale ?? state.stageScale, 
        stageX: stage.x ?? state.stageX, 
        stageY: stage.y ?? state.stageY 
      })),

      setBackgroundColor: (color) => {
        set((state) => {
          const newHistory: HistoryEntry[] = [...state.history, [state.shapes, state.backgroundColor]];
          return {
            backgroundColor: color,
            history: newHistory,
            future: [],
          };
        });
      },

      setBackgroundPattern: (pattern) => set({ backgroundPattern: pattern }),

      undo: () => {
        set((state) => {
          if (state.history.length === 0) return state;

          const [previousShapes, previousBgColor] = state.history[state.history.length - 1];
          const newHistory = state.history.slice(0, -1);
          const newFuture: HistoryEntry[] = [[state.shapes, state.backgroundColor], ...state.future];

          return {
            shapes: previousShapes,
            backgroundColor: previousBgColor,
            history: newHistory,
            future: newFuture,
            selectedId: null,
          };
        });
      },

      redo: () => {
        set((state) => {
          if (state.future.length === 0) return state;

          const [nextShapes, nextBgColor] = state.future[0];
          const newFuture = state.future.slice(1);
          const newHistory: HistoryEntry[] = [...state.history, [state.shapes, state.backgroundColor]];

          return {
            shapes: nextShapes,
            backgroundColor: nextBgColor,
            history: newHistory,
            future: newFuture,
            selectedId: null,
          };
        });
      },

      setCanvas: (shapes, backgroundColor) => {
        set({
          shapes: shapes,
          backgroundColor: backgroundColor || '#F8F8F8', // Use provided color or default
          history: [],
          future: [],
          selectedId: null,
        });
      },
}));