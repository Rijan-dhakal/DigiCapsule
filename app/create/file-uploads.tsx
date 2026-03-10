"use client";

import { useDropzone } from "react-dropzone";
import { Card } from "@/components/ui/card";
import { X } from "lucide-react";

interface FileUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
}

const FileUpload = ({ value = [], onChange }: FileUploadProps) => {

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      const newFiles = [...value, ...acceptedFiles];
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
      className={`flex h-48 cursor-pointer flex-col items-center justify-center border-2 border-dashed ${
        isDragActive ? "border-primary bg-muted" : ""
      }`}
    >
      <input {...getInputProps()} />

      <div className="text-4xl font-bold">+</div>

      <p className="text-sm text-muted-foreground">
        Drag & drop files or click to upload
      </p>

      {value.length > 0 && (
        <ul
          onClick={(e) => e.stopPropagation()}
          className="mt-3 space-y-2 text-sm cursor-default"
        >
          {value.map((file, i) => (
            <li
              key={i}
              className="flex items-center justify-between rounded-md border px-3 py-1"
            >
              <span>{file.name}</span>

              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(i);
                }}
                className="cursor-pointer text-red-500 hover:text-red-700"
              >
                <X size={18} className="ml-2" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
};
export default FileUpload;
