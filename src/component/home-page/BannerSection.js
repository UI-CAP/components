"use client";

import { useState } from "react";
import Image from "next/image";
import data from "@/data/home-page/data.json";
import CTAButton from "@/component/shared/CTAButton";

export default function BannerSection({
  name = data.banner.title,
  subtitle = data.banner.subtitle,
  ctas = data.banner.ctas || [],
  profileImage,
  bannerImages
}) {
  const primaryCta = ctas[0] || {};
  const secondaryCta = ctas[1] || {};
  const ctaText = primaryCta.label || 'Start Your AI Journey Today';
  const secondaryCtaText = secondaryCta.label || 'Talk to Us';
  // Use centralized default images if no props provided
  const defaultImages = data.banner.images;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Determine which images to use
  const images = bannerImages && bannerImages.length > 0
    ? bannerImages
    : profileImage
      ? [profileImage]
      : defaultImages;

  // Removed automatic image/video rotation. Now only switches on preview click.

  const isVideo = (src) => src?.toString().endsWith(".mp4");

  return (
    <div
      className="w-full min-h-[1080px] h-screen relative overflow-hidden flex flex-col"
      style={{ backgroundColor: '#1A1F37F2' }}
    >
      {/* 2. Global Dynamic Background Video/Image */}
      {isVideo(images[currentImageIndex]) ? (
        <video
          key={images[currentImageIndex]} // Force re-render on source change
          className="absolute inset-0 w-full h-full object-contain z-0"
          src={images[currentImageIndex]}
          autoPlay
          loop
          muted
          playsInline
        />
      ) : (
        <Image
          src={images[currentImageIndex]}
          alt={name || "Banner Background"}
          fill
          className="absolute inset-0 w-full h-full object-contain z-0"
          priority
          key={images[currentImageIndex]}
        />
      )}

      {/* Gradient Shadows - Left (70%) and Right (Lower Opacity) */}
      <div className="absolute inset-y-0 left-0 w-[70%] bg-gradient-to-r from-black via-black/60 to-transparent z-[5] pointer-events-none"></div>
      <div className="absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-black/40 to-transparent z-[5] pointer-events-none"></div>
      
      {/* Bottom to Top Gradient Shadow */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-t from-black via-black/90 to-transparent z-[5] pointer-events-none"></div>

      <div className="absolute inset-0 z-0"></div>

      {/* 3. Main Layout Container - Full Width Overlay */}
      <div className="relative z-10 w-full flex-1 flex flex-col justify-center px-[3%] lg:px-[7%]">

        {/* Text Content */}
        <div className="w-full lg:max-w-3xl z-10">
          <h1 className="text-white">
            Let&rsquo;s AI Your <br /> Business.
          </h1>
          <p className="text-white mt-8 mb-14 max-w-xl">
            {subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <CTAButton
              label={ctaText}
              href={primaryCta.link || "#"}
              bg={primaryCta.bg || "#FFFFFF"}
              textColor={primaryCta.textColor || "#000000"}
              hoverBg={primaryCta.hoverBg || "#F22E62"}
              hoverTextColor={primaryCta.hoverTextColor || "#FFFFFF"}
              icon={primaryCta.icon || "/assets/icon/grayBtn.png"}
              hoverIcon={primaryCta.hoverIcon || "/assets/icon/whiteBtn.png"}
              iconSize={44}
              target={primaryCta.target}
              variant="primary"
            />

            <CTAButton
              label={secondaryCtaText}
              href={secondaryCta.link || "#"}
              bg={secondaryCta.bg || "transparent"}
              textColor={secondaryCta.textColor || "#FFFFFF"}
              hoverBg={secondaryCta.hoverBg || "#F22E62"}
              hoverTextColor={secondaryCta.hoverTextColor || "#FFFFFF"}
              icon={secondaryCta.icon || "/assets/icon/redBtn.png"}
              hoverIcon={secondaryCta.hoverIcon || "/assets/icon/whiteBtn.png"}
              iconSize={40}
              borderColor="#FFFFFF"
              hoverBorderColor="#F22E62"
              target={secondaryCta.target}
              variant="secondary"
            />
          </div>
        </div>

        {/* Previews - Positioned at bottom right on large screens, centered on small */}
        {images.length > 1 && (
          <div className="absolute bottom-56 w-full left-4 md:left-2/3 items-center flex gap-2 md:gap-4 z-50 justify-start md:justify-start">
            {images.map((imgSrc, index) => (
              <div
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`relative overflow-hidden cursor-pointer transition-all p-0.5 duration-300 border-2 ${index === currentImageIndex
                  ? "border-white w-32 h-16 scale-110 shadow-lg"
                  : "border-none w-28 h-14 hover:scale-105"
                  }`}
              >
                {isVideo(imgSrc) ? (
                  <video
                    src={imgSrc}
                    className="w-full h-full object-cover"
                    muted
                    preload="metadata"
                  />
                ) : (
                  <Image
                    src={imgSrc}
                    alt={`Banner preview ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

