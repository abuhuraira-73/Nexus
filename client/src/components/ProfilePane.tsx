import { useState, useEffect, useRef } from 'react';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ProfilePane = () => {
    const { user, setUser } = useAuthStore();
    const [name, setName] = useState(user?.name || '');
    const [isSaving, setIsSaving] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setName(user?.name || '');
    }, [user?.name]);

    const hasChanged = name !== user?.name;

    const getInitials = (name: string) => {
        const names = name.split(' ');
        if (names.length > 1) {
            return `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase();
        }
        return name.substring(0, 2).toUpperCase();
    };

    const handleAvatarClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        const promise = api('/api/users/profile/picture', {
            method: 'POST',
            body: formData,
        });

        toast.promise(promise, {
            loading: 'Uploading picture...',
            success: (updatedUser) => {
                setUser(updatedUser);
                return 'Profile picture updated!';
            },
            error: (err) => {
                return err.message || 'Failed to upload picture.';
            },
        });
    };

    const handleSave = async () => {
        if (!hasChanged) return;

        setIsSaving(true);
        const promise = api(`/api/users/profile`, {
            method: 'PUT',
            body: JSON.stringify({ name }),
        });

        toast.promise(promise, {
            loading: 'Saving changes...',
            success: (updatedUser) => {
                setUser(updatedUser);
                setIsSaving(false);
                return 'Profile updated successfully!';
            },
            error: (err) => {
                setIsSaving(false);
                return err.message || 'Failed to update profile.';
            },
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Profile</h2>
            <div className="space-y-6 max-w-md">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20 cursor-pointer" onClick={handleAvatarClick}>
                        <AvatarImage src={user?.avatarUrl ? `${API_URL}${user.avatarUrl}` : undefined} />
                        <AvatarFallback className="text-2xl">
                            {user?.name ? getInitials(user.name) : 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                        <Button onClick={handleAvatarClick} variant="outline">Change Picture</Button>
                        <p className="text-xs text-muted-foreground">JPG, GIF or PNG. 5MB max.</p>
                        <input 
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileChange}
                            accept="image/png, image/jpeg, image/gif"
                            style={{ display: 'none' }}
                        />
                    </div>
                </div>

                <Separator />

                <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="col-span-3"
                    />
                     <p className="text-xs text-muted-foreground">Email address cannot be changed.</p>
                </div>
                <Button onClick={handleSave} disabled={!hasChanged || isSaving}>
                    {isSaving ? 'Saving...' : 'Save Changes'}
                </Button>
            </div>
        </div>
    );
};