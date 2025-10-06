import { useState, useEffect } from 'react';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Crown } from 'lucide-react';

export const SubscriptionPane = () => {
    const [plan, setPlan] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchSubscription = async () => {
            try {
                setIsLoading(true);
                const res = await api<{ plan: string }>('/api/subscription');
                setPlan(res.plan);
            } catch (error) {
                toast.error('Could not load subscription details.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchSubscription();
    }, []);

    const handleUpgrade = () => {
        const promise = api<{ plan: string }>('/api/subscription/upgrade', { method: 'POST' });

        toast.promise(promise, {
            loading: 'Upgrading to Premium...',
            success: (data) => {
                setPlan(data.plan);
                return 'Welcome to Premium!';
            },
            error: 'Upgrade failed. Please try again.',
        });
    };

    if (isLoading) {
        return <div className="flex items-center"><Loader2 className="mr-2 h-4 w-4 animate-spin" />Loading subscription details...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Subscription</h2>
            <div className="space-y-4 max-w-md p-6 rounded-lg bg-white/5">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">Your Current Plan</h3>
                    <span className={`font-bold text-lg capitalize px-3 py-1 rounded-full ${plan === 'premium' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-300'}`}>
                        {plan}
                    </span>
                </div>
                <p className="text-sm text-muted-foreground">
                    {plan === 'free' 
                        ? 'Upgrade to Premium to unlock unlimited canvases and real-time collaboration.'
                        : 'You have access to all Premium features. Thank you for your support!'
                    }
                </p>
                {plan === 'free' && (
                    <Button onClick={handleUpgrade} className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold">
                        <Crown className="mr-2 h-4 w-4" /> Upgrade to Premium
                    </Button>
                )}
            </div>
        </div>
    );
};