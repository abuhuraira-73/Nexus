'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { User, CreditCard, Settings, Shield } from 'lucide-react';
import { ProfilePane } from './ProfilePane';
import { SubscriptionPane } from './SubscriptionPane';
import { PreferencesPane } from './PreferencesPane';
import { SecurityPane } from './SecurityPane';

interface UserProfileModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type NavItemId = 'profile' | 'subscription' | 'preferences' | 'security';

const NAV_ITEMS = [
    { id: 'profile' as NavItemId, label: 'Profile', icon: User },
    { id: 'subscription' as NavItemId, label: 'Subscription', icon: CreditCard },
    { id: 'preferences' as NavItemId, label: 'Preferences', icon: Settings },
    { id: 'security' as NavItemId, label: 'Security', icon: Shield },
];

export const UserProfileModal = ({ isOpen, onClose }: UserProfileModalProps) => {
    const [activeTab, setActiveTab] = useState<NavItemId>('profile');

    const renderContent = () => {
        switch (activeTab) {
            case 'profile':
                return <ProfilePane />;
            case 'subscription':
                return <SubscriptionPane />;
            case 'preferences':
                return <PreferencesPane />;
            case 'security':
                return <SecurityPane />;
            default:
                return null;
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-3xl h-[70vh] bg-black/50 backdrop-blur-sm border-none p-0">
                <div className="flex h-full">
                    {/* Step 2: Sidebar Navigation */}
                    <aside className="w-1/4 h-full border-r border-gray-700/50 p-4">
                        <h3 className="text-lg font-semibold mb-4">Settings</h3>
                        <div className="flex flex-col space-y-1">
                            {NAV_ITEMS.map((item) => (
                                <Button
                                    key={item.id}
                                    variant={activeTab === item.id ? 'secondary' : 'ghost'}
                                    className="justify-start"
                                    onClick={() => setActiveTab(item.id)}
                                >
                                    <item.icon className="mr-2 h-4 w-4" />
                                    {item.label}
                                </Button>
                            ))}
                        </div>
                    </aside>

                    {/* Main Content Area (for Steps 3 & 4) */}
                    <main className="w-3/4 h-full p-6 overflow-y-auto">
                        {renderContent()}
                    </main>
                </div>
            </DialogContent>
        </Dialog>
    );
};
