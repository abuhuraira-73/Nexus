'use client'

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface DeleteAccountModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (password: string) => void;
    isDeleting: boolean;
}

export const DeleteAccountModal = ({ isOpen, onClose, onConfirm, isDeleting }: DeleteAccountModalProps) => {
    const [password, setPassword] = useState('');

    const handleConfirm = () => {
        if (password) {
            onConfirm(password);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px] bg-gray-900/50 backdrop-blur-sm border-none">
                <DialogHeader>
                    <DialogTitle className="text-red-500">Delete Account</DialogTitle>
                    <DialogDescription>
                        This action is irreversible. All your data, including all canvases, will be permanently deleted. 
                        To confirm, please enter your password.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password-confirm" className="text-right">
                            Password
                        </Label>
                        <Input
                            id="password-confirm"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={isDeleting}>Cancel</Button>
                    <Button variant="destructive" onClick={handleConfirm} disabled={!password || isDeleting}>
                        {isDeleting ? 'Deleting...' : 'Delete My Account'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};