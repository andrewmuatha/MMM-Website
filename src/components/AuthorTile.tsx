import React from 'react';
import { PartnerInitials } from '../types/cms';

interface AuthorTileProps {
  initials: PartnerInitials;
  size?: 'sm' | 'md' | 'portrait';
  className?: string;
  name?: string;
}

export const AuthorTile: React.FC<AuthorTileProps> = ({
  initials,
  size = 'sm',
  className = '',
  name,
}) => {
  // Size variations:
  // sm: 32x32 square crop for byline row
  // md: 48x48 square crop
  // portrait: 4:5 ratio for partner grids / author feature
  const sizeClasses = {
    sm: 'w-8 h-8 text-[12px]',
    md: 'w-12 h-12 text-[14px]',
    portrait: 'w-24 h-30 text-[18px]',
  }[size];

  return (
    <div
      className={`relative inline-flex items-center justify-center bg-[#16233F] select-none shrink-0 overflow-hidden ${sizeClasses} ${className}`}
      aria-hidden="true"
      title={name}
    >
      {/* Kuba cloth pattern overlay at 6% opacity */}
      <div className="absolute inset-0 bg-kuba opacity-[0.06] pointer-events-none" />

      {/* Initials in gold serif Cormorant Garamond */}
      <span className="relative z-10 font-serif font-semibold text-[#C6A455] tracking-widest leading-none">
        {initials}
      </span>
    </div>
  );
};
