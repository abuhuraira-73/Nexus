'use client'

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UploadCloud, X } from 'lucide-react';

interface ImageUploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onImageAdd: (src: string, width: number, height: number) => void;
}

export const ImageUploadModal = ({ isOpen, onClose, onImageAdd }: ImageUploadModalProps) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (file) {
            // For now, we just handle the preview. Validation will be in the next step.
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result as string);
                setImageFile(file);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/png': ['.png'],
            'image/jpeg': ['.jpg', '.jpeg'],
        },
        multiple: false,
    });

    const handleAddImage = () => {
        if (preview && imageFile) {
            const img = new Image();
            img.src = preview;
            img.onload = () => {
                onImageAdd(preview, img.width, img.height);
                handleClose();
            }
        }
    };

    const handleClose = () => {
        setPreview(null);
        setImageFile(null);
        onClose();
    }

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Upload Image</DialogTitle>
                    <DialogDescription>
                        Drag and drop an image file here, or click to select a file. Max size: 2MB.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {preview ? (
                        <div className="relative">
                            <img src={preview} alt="Image preview" className="w-full h-auto rounded-md" />
                            <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={() => setPreview(null)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </div>
                    ) : (
                        <div
                            {...getRootProps()}
                            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                isDragActive ? 'border-primary bg-primary/10' : 'border-input hover:border-primary/50'
                            }`}>
                            <input {...getInputProps()} />
                            <UploadCloud className="w-10 h-10 text-muted-foreground" />
                            <p className="mt-2 text-sm text-muted-foreground">
                                {isDragActive ? "Drop the image here ..." : "Drag 'n' drop an image, or click to select"}
                            </p>
                        </div>
                    )}
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleAddImage} disabled={!preview}>Add to Canvas</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
