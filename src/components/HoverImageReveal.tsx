import React, { useEffect, useRef } from 'react';

interface HoverImageRevealProps {
  imageUrl: string | null;
  targetX: number;
  targetY: number;
  visible: boolean;
}

export const HoverImageReveal: React.FC<HoverImageRevealProps> = ({
  imageUrl,
  targetX,
  targetY,
  visible,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const currentPos = useRef({ x: targetX, y: targetY });

  useEffect(() => {
    let animationFrameId: number;

    const updatePosition = () => {
      // Lerp 0.12 smoothing per frame
      const factor = 0.12;
      currentPos.current.x += (targetX - currentPos.current.x) * factor;
      currentPos.current.y += (targetY - currentPos.current.y) * factor;

      if (containerRef.current) {
        // Offset 32px right of cursor, flip left if near right viewport edge
        const offset = 32;
        const width = 320;
        const screenWidth = window.innerWidth;
        const shouldFlip = currentPos.current.x + width + offset > screenWidth - 40;
        const posX = shouldFlip ? currentPos.current.x - width - offset : currentPos.current.x + offset;
        const posY = currentPos.current.y - 120; // center vertically to cursor

        containerRef.current.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(updatePosition);
    };

    animationFrameId = requestAnimationFrame(updatePosition);
    return () => cancelAnimationFrame(animationFrameId);
  }, [targetX, targetY]);

  if (!imageUrl) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="hidden lg:block fixed top-0 left-0 pointer-events-none z-40 transition-opacity duration-300 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: `translate3d(${targetX + 32}px, ${targetY - 120}px, 0)`,
      }}
    >
      <div className="w-[320px] h-[240px] overflow-hidden bg-[#16233F] border border-[#C6A455]/40 shadow-none">
        <img
          src={imageUrl}
          alt=""
          className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
            visible ? 'scale-100' : 'scale-95'
          }`}
        />
      </div>
    </div>
  );
};
