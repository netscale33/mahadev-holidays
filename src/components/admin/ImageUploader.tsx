"use client";

import { useState, useRef, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ImageUploaderProps {
  onUpload: (files: File[]) => void;
  maxFiles?: number;
  accept?: string;
}

export default function ImageUploader({
  onUpload,
  maxFiles = 5,
  accept = "image/*",
}: ImageUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (newFiles: FileList) => {
      const remaining = maxFiles - files.length;
      const toAdd = Array.from(newFiles).slice(0, remaining);

      setFiles((prev) => [...prev, ...toAdd]);
      toAdd.forEach((f) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(f);
      });
    },
    [files.length, maxFiles]
  );

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) addFiles(e.dataTransfer.files);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragOver(false);
  }

  async function handleUpload() {
    if (files.length === 0) return;
    setUploading(true);
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((r) => setTimeout(r, 80));
      setProgress(i);
    }
    onUpload(files);
    setUploading(false);
    setProgress(0);
    setFiles([]);
    setPreviews([]);
  }

  return (
    <div>
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
          isDragOver
            ? "border-gold bg-gold/5"
            : "border-cream-dark/30 hover:border-gold/50 hover:bg-cream/50"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept={accept}
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <Upload
          size={32}
          className={cn(
            "mx-auto mb-3 transition-colors",
            isDragOver ? "text-gold" : "text-navy-300"
          )}
        />
        <p className="text-sm text-navy-500">
          <span className="font-medium text-gold">Click to upload</span> or drag
          and drop
        </p>
        <p className="text-xs text-navy-400 mt-1">
          PNG, JPG, WebP (max {maxFiles} files)
        </p>
      </div>

      {previews.length > 0 && (
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <AnimatePresence>
            {previews.map((src, i) => (
              <motion.div
                key={src}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="relative group aspect-square rounded-lg overflow-hidden border border-cream-dark/20 bg-cream"
              >
                <img
                  src={src}
                  alt={`Preview ${i + 1}`}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={12} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>

          {files.length < maxFiles && (
            <button
              onClick={() => inputRef.current?.click()}
              className="aspect-square rounded-lg border-2 border-dashed border-cream-dark/20 flex items-center justify-center text-navy-300 hover:border-gold/50 hover:text-gold transition-colors"
            >
              <ImageIcon size={24} />
            </button>
          )}
        </div>
      )}

      {uploading && (
        <div className="mt-4">
          <div className="w-full h-2 bg-cream-dark/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              className="h-full bg-gold rounded-full"
            />
          </div>
          <p className="text-xs text-navy-400 mt-1 text-right">
            {progress}%
          </p>
        </div>
      )}

      {files.length > 0 && !uploading && (
        <button
          onClick={handleUpload}
          className="mt-4 w-full py-2.5 bg-accent text-white font-medium rounded-lg hover:bg-accent-600 transition-colors text-sm"
        >
          Upload {files.length} file{files.length > 1 ? "s" : ""}
        </button>
      )}
    </div>
  );
}
