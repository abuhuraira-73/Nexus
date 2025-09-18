import { create } from 'zustand';

// Define the structure of our authentication state
interface AuthState {
  token: string | null;
  user: { id: string; name: string; email: string } | null;
  isAuthenticated: boolean;
  isLoading: boolean; // Optional: to indicate if the store is currently loading from storage
}

// Define the actions that can modify our authentication state
interface AuthActions {
  login: (token: string, user: { id: string; name: string; email: string }) => void;
  logout: () => void;
  // Optional: an action to set loading state if needed
  setLoading: (loading: boolean) => void;
}

// Combine state and actions into a single type for the store
type AuthStore = AuthState & AuthActions;

// Helper function to get initial state from localStorage
const getInitialState = (): AuthState => {
  if (typeof window !== 'undefined') { // Ensure localStorage is available (client-side)
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        return {
          token: storedToken,
          user: user,
          isAuthenticated: true,
          isLoading: false,
        };
      } catch (e) {
        console.error("Failed to parse user from localStorage", e);
        // Clear invalid data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
  }
  return {
    token: null,
    user: null,
    isAuthenticated: false,
    isLoading: false,
  };
};

// Create the Zustand store
export const useAuthStore = create<AuthStore>((set) => ({
  // Initial state
  ...getInitialState(),
  
  // Actions
  login: (token, user) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
    }
    set({ token, user, isAuthenticated: true });
  },
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    set({ token: null, user: null, isAuthenticated: false });
  },
  setLoading: (loading: boolean) => set({ isLoading: loading }),
}));
