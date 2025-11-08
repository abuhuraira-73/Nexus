'use client'

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface RenameCanvasModalProps {
    isOpen: boolean;
    onClose: () => void;
    onRename: (newName: string) => void;
    currentName: string;
}

export const RenameCanvasModal = ({ isOpen, onClose, onRename, currentName }: RenameCanvasModalProps) => {
    const [name, setName] = useState(currentName);

    useEffect(() => {
        setName(currentName);
    }, [currentName]);

    const handleRename = () => {
        if (name.trim()) {
            onRename(name.trim());
            handleClose();
        }
    };

    const handleClose = () => {
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px] bg-gray-900/50 backdrop-blur-sm border-none">
                <DialogHeader>
                    <DialogTitle>Rename Canvas</DialogTitle>
                    <DialogDescription>
                        Enter a new name for your canvas.
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
                    <Button onClick={handleRename} disabled={!name.trim()}>Rename</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
