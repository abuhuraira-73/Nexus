import { useState, useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { CanvasColorPicker } from './ui/canvas-color-picker';
import { ToggleGroup, ToggleGroupItem } from './ui/toggle-group';

export const PreferencesPane = () => {
    const { user, setUser } = useAuthStore();
    const [color, setColor] = useState(user?.preferences?.defaultCanvasColor || '#1a1a1a');
    const [pattern, setPattern] = useState(user?.preferences?.defaultPattern || 'solid');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        setColor(user?.preferences?.defaultCanvasColor || '#1a1a1a');
        setPattern(user?.preferences?.defaultPattern || 'solid');
    }, [user?.preferences]);

    const hasChanged = color !== user?.preferences?.defaultCanvasColor || pattern !== user?.preferences?.defaultPattern;

    const handleSave = () => {
        setIsSaving(true);
        const promise = api('/api/users/profile', {
            method: 'PUT',
            body: JSON.stringify({ preferences: { defaultCanvasColor: color, defaultPattern: pattern } }),
        });

        toast.promise(promise, {
            loading: 'Saving preferences...',
            success: (updatedUser) => {
                setUser(updatedUser);
                setIsSaving(false);
                return 'Preferences saved!';
            },
            error: (err) => {
                setIsSaving(false);
                return err.message || 'Failed to save preferences.';
            },
        });
    };

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Preferences</h2>
            <div className="space-y-4 max-w-md">
                <div className="space-y-3">
                    <Label>Default Canvas Color</Label>
                    <p className="text-sm text-muted-foreground">Set the default background color for all new canvases you create.</p>
                    <CanvasColorPicker color={color} onChange={setColor} />
                </div>
                <div className="space-y-3">
                    <Label>Default Canvas Pattern</Label>
                    <p className="text-sm text-muted-foreground">Set the default background pattern for all new canvases.</p>
                    <ToggleGroup type="single" value={pattern} onValueChange={(value) => { if (value) setPattern(value); }} >
                        <ToggleGroupItem value="solid">Solid</ToggleGroupItem>
                        <ToggleGroupItem value="dotted">Dotted</ToggleGroupItem>
                        <ToggleGroupItem value="lined">Lined</ToggleGroupItem>
                    </ToggleGroup>
                </div>
                <Button onClick={handleSave} disabled={!hasChanged || isSaving}>
                    {isSaving ? 'Saving...' : 'Save Preferences'}
                </Button>
            </div>
        </div>
    );
};