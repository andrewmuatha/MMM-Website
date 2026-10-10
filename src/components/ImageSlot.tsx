import React, { useState } from 'react';

interface ImageSlotProps {
  src: string;
  alt: string;
  filename: string;
  className?: string;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
}

export const ImageSlot: React.FC<ImageSlotProps> = ({
  src,
  alt,
  filename,
  className = '',
  style,
  loading = 'lazy',
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`bg-[#E8E6E0] flex items-center justify-center p-4 text-[#86847A] text-[12px] font-mono select-none ${className}`}
        style={style}
        role="img"
        aria-label={alt}
      >
        <span>{filename}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      style={style}
      loading={loading}
    />
  );
};

export default ImageSlot;
