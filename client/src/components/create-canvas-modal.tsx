'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface CreateCanvasModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate: (name: string) => void;
}

export const CreateCanvasModal = ({ isOpen, onClose, onCreate }: CreateCanvasModalProps) => {
    const [name, setName] = useState('');

    const handleCreate = () => {
        if (name.trim()) {
            onCreate(name.trim());
            handleClose();
        }
    };

    const handleClose = () => {
        setName('');
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px] bg-gray-900/50 backdrop-blur-sm border-none">
                <DialogHeader>
                    <DialogTitle>Create New Canvas</DialogTitle>
                    <DialogDescription>
                        Give your new canvas a name to get started.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="col-span-3"
                            autoComplete="off"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleCreate} disabled={!name.trim()}>Create Canvas</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
