import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { VideoMedia } from '../../types/cms';

interface HeroMediaProps {
  imageUrl?: string;
  imageAlt?: string;
  video?: VideoMedia;
  caption?: string;
  credit?: string;
}

export const HeroMedia: React.FC<HeroMediaProps> = ({
  imageUrl,
  imageAlt,
  video,
  caption,
  credit,
}) => {
  const [videoLoaded, setVideoLoaded] = useState(false);

  if (!imageUrl && !video) return null;

  return (
    <div className="pt-8 sm:pt-12 lg:pt-16 pb-12 sm:pb-16 lg:pb-20">
      <div className="max-w-[1280px] mx-auto px-0 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 sm:gap-6">
          {/* Hero Media Container: cols 2 to 11 at 1440 (~1062px), full bleed on mobile */}
          <div className="lg:col-span-10 lg:col-start-2">
            {video ? (
              <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-[#16233F] overflow-hidden">
                {videoLoaded ? (
                  <iframe
                    src={`${video.embedUrl}?autoplay=1`}
                    title={video.videoTitle}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <div className="relative w-full h-full group">
                    <img
                      src={video.posterUrl || imageUrl}
                      alt={video.videoTitle}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-[1.02] transition-transform duration-700"
                    />

                    {/* 72px square Deep Navy play button with Premium Gold triangle */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                      <button
                        type="button"
                        onClick={() => setVideoLoaded(true)}
                        className="w-[72px] h-[72px] bg-[#16233F] hover:bg-[#7A2142] text-[#C6A455] flex items-center justify-center transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[#C6A455] focus-visible:outline-offset-4 shadow-none"
                        aria-label={`Play video: ${video.videoTitle}`}
                      >
                        <Play size={28} fill="#C6A455" className="ml-1" aria-hidden="true" />
                      </button>

                      {/* Notice below button on hover/focus */}
                      <p className="mt-3 text-[12px] text-[#FDFCF8]/90 bg-[#16233F]/80 px-3 py-1">
                        Playing this video loads content from {video.platform}.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative aspect-[4/3] sm:aspect-[16/9] bg-[#16233F] overflow-hidden">
                <img
                  src={imageUrl}
                  alt={imageAlt || caption || ''}
                  className="print-hero-img w-full h-full object-cover transition-transform duration-1000 ease-out"
                  loading="eager"
                />
              </div>
            )}

            {/* Caption: 12px below, 14/22 Instrument Sans, --muted-text #5F5D55, aligned with body measure column */}
            {(caption || credit) && (
              <div className="px-5 sm:px-0 pt-3">
                <p className="text-[14px] leading-[22px] text-[#5F5D55] max-w-[680px]">
                  {caption}
                  {credit && (
                    <span className="text-[#5F5D55]/80"> Photo: {credit}</span>
                  )}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
