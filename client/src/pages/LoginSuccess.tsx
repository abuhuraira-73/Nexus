import { useEffect } from 'react';
import { useNavigate, useSearchParams, useParams } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { toast } from 'sonner';
import Loader from '@/components/ui/loader';

export default function LoginSuccess() {
  const { userId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!userId) {
      toast.error('Missing user ID.');
      navigate('/login');
      return;
    }

    if (!token) {
      toast.error('Authentication failed. No token provided.');
      navigate('/login');
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/auth/me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const user = await response.json();

        login(token, user); // Save auth state globally

        toast.success('Logged in successfully!');

        navigate('/app'); // Redirect into the app
      } catch (error) {
        console.error('Login success error:', error);
        toast.error('Failed to process login. Please try again.');
        navigate('/login');
      }
    };

    fetchUser();
  }, [searchParams, navigate, login, userId]);

  return (
    <div className="flex min-h-svh flex-col items-center justify-center">
      <Loader />
      <p className="text-lg mt-4">Finalizing your login...</p>
    </div>
  );
}
