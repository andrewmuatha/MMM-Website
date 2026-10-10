import React from 'react';

interface PlaceholderChipProps {
  label?: string;
  className?: string;
}

export const PlaceholderChip: React.FC<PlaceholderChipProps> = ({
  label = 'Pending appointment',
  className = '',
}) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] font-mono border border-[var(--warm-gray)]/30 bg-[var(--paper-alt)] text-[var(--muted-text)] select-none ${className}`}
    >
      {label}
    </span>
  );
};

export default PlaceholderChip;
