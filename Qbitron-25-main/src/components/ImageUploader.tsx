import { useRef, useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
  onImageSelect: (file: File, imageUrl: string) => void;
  onClear: () => void;
  previewUrl: string | null;
}

export const ImageUploader = ({ onImageSelect, onClear, previewUrl }: ImageUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        onImageSelect(file, imageUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileChange(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      {!previewUrl ? (
        <div
          onClick={handleClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-16 text-center cursor-pointer transition-all duration-300 bg-white ${
            isDragging
              ? 'border-blue-500 bg-blue-50 scale-[1.02] shadow-lg'
              : 'border-gray-300 hover:border-blue-400 hover:shadow-md'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
            className="hidden"
          />
          <div className={`transition-transform duration-300 ${isDragging ? 'scale-110' : ''}`}>
            <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500" />
          </div>
          <p className="text-lg font-semibold text-gray-900 mb-2">
            Drop your image here
          </p>
          <p className="text-sm text-gray-500">
            or click to browse • JPG, PNG, GIF, WebP
          </p>
        </div>
      ) : (
        <div className="relative border-2 border-gray-200 rounded-xl overflow-hidden bg-white shadow-lg transform transition-all duration-300 hover:shadow-xl">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-auto max-h-96 object-contain"
          />
          <button
            onClick={onClear}
            className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2.5 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};
