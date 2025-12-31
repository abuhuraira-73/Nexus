'use client'

import { useState } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
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
            {/* 
              The DialogContent will be the main container. It has a fixed height on mobile (h-[85vh]) 
              and desktop (md:h-[70vh]). We set its padding to 0 and apply flex display to it.
              This makes the DialogContent itself a flex container.
            */}
            <DialogContent className="sm:max-w-3xl h-[85vh] md:h-[70vh] flex flex-col p-0 bg-black/50 backdrop-blur-sm border-none">
                
                {/* 
                  This div will contain the sidebar and the main content.
                  On mobile, it will be a column (flex-col), and on desktop, a row (md:flex-row).
                  'min-h-0' is a crucial fix for flexbox overflow issues. It tells the flex item
                  that its minimum height can be zero, allowing it to shrink properly and enabling scrolling
                  within its children.
                */}
                <div className="flex flex-col md:flex-row flex-1 min-h-0">

                    {/* Sidebar Navigation */}
                    <aside className="w-full md:w-64 p-4 border-b md:border-r md:border-b-0 border-gray-700/50">
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

                    {/* 
                      Main Content Area. 
                      'flex-1' makes it take up the remaining space.
                      'min-w-0' is the horizontal equivalent of 'min-h-0', preventing horizontal overflow.
                      'overflow-auto' will add scrollbars if content overflows either vertically or horizontally.
                    */}
                    <main className="flex-1 min-w-0 p-6 overflow-auto">
                        {renderContent()}
                    </main>
                </div>
            </DialogContent>
        </Dialog>
    );
};