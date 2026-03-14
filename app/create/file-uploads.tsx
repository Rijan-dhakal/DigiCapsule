"use client";

import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { FileText, X } from "lucide-react";
import Image from "next/image";

interface FileUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
}

const FileUpload = ({ value = [], onChange }: FileUploadProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    maxFiles: 2,
    maxSize: 30 * 1024 * 1024,
    accept: {
      "image/*": [],
      "video/*": [],
      "application/pdf": [".pdf"],
    },
    onDrop: (acceptedFiles) => {
      const newFiles = [...value, ...acceptedFiles].slice(0, 2);
      onChange?.(newFiles);
    },
  });

  const removeFile = (index: number) => {
    const updatedFiles = value.filter((_, i) => i !== index);
    onChange?.(updatedFiles);
  };

  return (
    <Card
      {...getRootProps()}
      className={`cursor-pointer border-2 border-dashed p-4 transition-colors ${
        isDragActive ? "border-primary bg-muted" : ""
      }`}
    >
      <input {...getInputProps()} />

      <div className="flex min-h-40 flex-col items-center justify-center rounded-md border border-dashed border-border/60 bg-muted/20 px-4 py-6 text-center">
        <div className="text-4xl font-bold leading-none text-primary">+</div>
        <p className="mt-2 text-sm font-medium text-foreground">
          Drop files here, or browse from your device
        </p>
        <div className="mt-2 space-y-1 text-xs text-muted-foreground">
          <p>Images, videos, and PDF documents are supported</p>
          <p>Limit 2 files, up to 30 MB per file</p>
        </div>
      </div>

      {value.length > 0 && (
        <ul
          onClick={(e) => e.stopPropagation()}
          className="mt-4 flex w-full cursor-default flex-wrap gap-3"
        >
          {value.map((file, i) => (
            <li
              key={`${file.name}-${file.lastModified}-${i}`}
              className="relative h-24 w-24 overflow-hidden rounded-md border bg-muted/30 sm:h-28 sm:w-28"
            >
              {file.type.startsWith("image/") ? (
                <Image
                  src={URL.createObjectURL(file)}
                  fill
                  alt={file.name}
                  sizes="(max-width: 640px) 96px, 112px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center bg-muted px-2 text-center">
                  <FileText size={22} className="text-muted-foreground" />
                  <span className="mt-1 line-clamp-1 text-[10px] font-semibold uppercase text-muted-foreground">
                    {file.name.split(".").pop() || "file"}
                  </span>
                  <span className="line-clamp-1 text-[10px] text-muted-foreground">
                    {file.name}
                  </span>
                </div>
              )}

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="absolute right-1 top-1 z-10 rounded-full bg-black/70 p-1 text-white transition hover:bg-red-600"
                aria-label={`Remove ${file.name}`}
              >
                <X size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};
export default FileUpload;
