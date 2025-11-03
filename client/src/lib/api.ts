import { useAuthStore } from '@/store/authStore';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * A wrapper around the native fetch function that automatically adds the
 * authentication token to the request headers and handles automatic logout
 * for 401 Unauthorized responses.
 *
 * @param endpoint The API endpoint to call (e.g., '/users/me').
 * @param options Optional fetch options (method, body, etc.).
 * @returns A promise that resolves to the JSON response.
 */
export const api = async <T>(endpoint: string, options: RequestInit = {}): Promise<T> => {
  const { token, logout } = useAuthStore.getState();

  const headers = new Headers(options.headers || {});
  if (token) {
    headers.append('Authorization', `Bearer ${token}`);
  }
  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.append('Content-Type', 'application/json');
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token is invalid or expired, log the user out
    logout();
    // Optionally, redirect to login page or show a message
    // window.location.href = '/login'; 
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    // Handle other HTTP errors
    const errorData = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorData.message || 'An error occurred');
  }

  // If the response has no content, return an empty object or null
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    return {} as T;
  }

  return response.json() as Promise<T>;
};


/**
 * Updates a canvas with new data.
 *
 * @param canvasId The ID of the canvas to update.
 * @param canvasData The data to update (e.g., name, content).
 * @returns A promise that resolves to the updated canvas data.
 */
export const updateCanvas = async (canvasId: string, canvasData: { name?: string; data?: unknown; backgroundColor?: string, backgroundPattern?: string }) => {
  return api(`/api/canvases/${canvasId}`, {
    method: 'PUT',
    body: JSON.stringify(canvasData),
  });
};

/**
 * Fetches all canvases marked as 'trashed' for the current user.
 */
export const getTrashedCanvases = async () => {
  return api('/api/canvases/trash');
};

/**
 * Updates the status of a specific canvas.
 *
 * @param canvasId The ID of the canvas to update.
 * @param status The new status: 'active', 'trashed', or 'archived'.
 * @returns A promise that resolves to the updated canvas data.
 */
export const updateCanvasStatus = async (canvasId: string, status: 'active' | 'trashed' | 'archived') => {
  return api(`/api/canvases/${canvasId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
};
