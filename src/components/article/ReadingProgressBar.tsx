import React, { useEffect, useState } from 'react';

interface ReadingProgressBarProps {
  targetContainerId?: string;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({
  targetContainerId = 'article-body-container',
}) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const container = document.getElementById(targetContainerId);
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalHeight = container.offsetHeight;
      const startOffset = windowHeight * 0.3; // start when top reaches 30% viewport
      const currentScroll = -rect.top + startOffset;

      if (currentScroll <= 0) {
        setProgress(0);
      } else if (currentScroll >= totalHeight) {
        setProgress(1);
      } else {
        setProgress(currentScroll / totalHeight);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [targetContainerId]);

  return (
    <div
      id="progress-bar"
      className="fixed top-[72px] left-0 right-0 h-[3px] z-40 bg-transparent pointer-events-none print:hidden"
      aria-hidden="true"
    >
      <div
        className="h-full bg-[#7A2142] origin-left transition-transform duration-100 ease-out"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
};
