import React from 'react';

interface SectionLabelProps {
  label: string;
  variant?: 'eyebrow' | 'numbered';
  number?: string;
  className?: string;
  dark?: boolean;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({
  label,
  variant = 'eyebrow',
  number,
  className = '',
  dark = false,
}) => {
  if (variant === 'numbered') {
    return (
      <div
        className={`inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] font-semibold ${
          dark ? 'text-[var(--paper)]/70' : 'text-[var(--muted-text)]'
        } ${className}`}
      >
        <span>
          {number ? `${number} // ` : ''}
          {label}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] font-semibold ${
        dark ? 'text-[var(--paper)]' : 'text-[var(--navy)]'
      } ${className}`}
    >
      <span className="w-1.5 h-1.5 rotate-45 bg-[var(--gold)]" aria-hidden="true" />
      <span>{label}</span>
      <span className="w-1.5 h-1.5 rotate-45 bg-[var(--gold)]" aria-hidden="true" />
    </div>
  );
};
