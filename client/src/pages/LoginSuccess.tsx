import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import Loader from '@/components/ui/loader';

export default function LoginSuccess() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = searchParams.get('token');

    if (token) {
      // The backend redirects with the token, but the user object is not in the URL.
      // We need to fetch the user data using the token.
      const fetchUser = async () => {
        try {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, { // Assuming you have a /api/auth/me endpoint
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user data');
          }
          const user = await response.json();
          login(token, user); // Update global state
          toast.success('Logged in successfully!');
          navigate('/'); // Redirect to the main app
        } catch (error) {
          console.error('Login success error:', error);
          toast.error('Failed to process login. Please try again.');
          navigate('/login');
        }
      };

      fetchUser();

    } else {
      toast.error('Authentication failed. No token provided.');
      navigate('/login');
    }
  }, [searchParams, navigate, login]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Loader />
      <p className="text-lg mt-4">Finalizing your login...</p>
    </div>
  );
}
