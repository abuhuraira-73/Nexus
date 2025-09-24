import { create } from 'zustand';
import type { Shape } from '../pages/infinite-canvas';

export type CanvasMode = 'select' | 'draw' | 'erase' | 'connector';
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
  stageRef: React.RefObject<import('konva/lib/Stage').Stage> | null;

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
  setStageRef: (ref: React.RefObject<import('konva/lib/Stage').Stage>) => void;
  pushToHistory: () => void;
  undo: () => void;
  redo: () => void;
  setCanvas: (shapes: Shape[], backgroundColor?: string) => void;
  moveSelectedShape: (dx: number, dy: number) => void;
  updateShapeAndPushHistory: (updatedShape: Partial<Shape> & { id: string }) => void;
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
      stageRef: null,

      setStageRef: (ref) => set({ stageRef: ref }),

      pushToHistory: () => {
        set((state) => {
          // Don't push duplicate states
          if (state.history.length > 0) {
            const lastHistoryEntry = state.history[state.history.length - 1];
            if (
              JSON.stringify(lastHistoryEntry[0]) === JSON.stringify(state.shapes) &&
              lastHistoryEntry[1] === state.backgroundColor
            ) {
              return {};
            }
          }
          const newHistory: HistoryEntry[] = [...state.history, [state.shapes, state.backgroundColor]];
          return { history: newHistory, future: [] };
        });
      },

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
        set((state) => ({
          shapes: state.shapes.map((shape) =>
            shape.id === updatedShape.id
              ? { ...shape, ...updatedShape }
              : shape
          ),
        }));
      },

      deleteShape: (id) => {
        set((state) => {
          const newHistory: HistoryEntry[] = [...state.history, [state.shapes, state.backgroundColor]];
          return {
            shapes: state.shapes.filter((shape) => shape.id !== id),
            selectedId: null,
            history: newHistory,
            future: [],
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
        set({ backgroundColor: color });
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

      moveSelectedShape: (dx, dy) => {
        set((state) => {
          if (!state.selectedId) return state;
          const newShapes = state.shapes.map((shape) =>
            shape.id === state.selectedId
              ? { ...shape, x: shape.x + dx, y: shape.y + dy }
              : shape
          );
          const newHistory: HistoryEntry[] = [...state.history, [state.shapes, state.backgroundColor]];
          return { shapes: newShapes, history: newHistory, future: [] };
        });
      },

      updateShapeAndPushHistory: (updatedShape) => {
        set((state) => {
          const newShapes = state.shapes.map((shape) =>
            shape.id === updatedShape.id
              ? { ...shape, ...updatedShape }
              : shape
          );

          const newHistory: HistoryEntry[] = [...state.history, [state.shapes, state.backgroundColor]];
          return { shapes: newShapes, history: newHistory, future: [] };
        });
      },
}));