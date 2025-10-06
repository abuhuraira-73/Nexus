import { useState } from 'react';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store/appStore'; // Import the store

export const SecurityPane = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const { openDeleteModal } = useAppStore(); // Get the action from the store

    const handlePasswordChange = async () => {
        if (newPassword !== confirmPassword) {
            toast.error('New passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            toast.error('New password must be at least 6 characters long.');
            return;
        }

        setIsSaving(true);

        const promise = api('/api/auth/change-password', {
            method: 'PUT',
            body: JSON.stringify({ currentPassword, newPassword }),
        });

        toast.promise(promise, {
            loading: 'Updating password...',
            success: () => {
                setCurrentPassword('');
                setNewPassword('');
                setConfirmPassword('');
                setIsSaving(false);
                return 'Password updated successfully!';
            },
            error: (err) => {
                setIsSaving(false);
                return err.message || 'Failed to update password.';
            },
        });
    };

    const isButtonDisabled = !currentPassword || !newPassword || !confirmPassword || isSaving;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Security</h2>
            
            {/* Change Password Section */}
            <div className="space-y-4 max-w-md">
                <h3 className="text-lg font-medium">Change Password</h3>
                <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                        id="current-password"
                        type="password"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                        id="new-password"
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <Button onClick={handlePasswordChange} disabled={isButtonDisabled}>
                    {isSaving ? 'Updating Password...' : 'Update Password'}
                </Button>
            </div>

            <Separator className="my-8" />

            {/* Danger Zone */}
            <div className="space-y-4 max-w-md">
                 <h3 className="text-lg font-medium text-red-500">Danger Zone</h3>
                 <p className="text-sm text-muted-foreground">Once you delete your account, there is no going back. Please be certain.</p>
                 <Button variant="destructive" onClick={openDeleteModal}>
                    Delete Account
                 </Button>
            </div>
        </div>
    );
};