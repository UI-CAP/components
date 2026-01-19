import React from "react";
import Image from "next/image";
import data from "@/data/home-page/data.json";
import CTAButton from "@/component/shared/CTAButton";

// Utility to check if asset is video
const isVideo = (src) => src && src.match(/\.mp4$/);

/**
 * AgenticCtaSection - Dynamic, responsive, and reusable CTA section
 * Data is fetched from data.json
 *
 * @returns {JSX.Element}
 */
const AgenticCtaSection = () => {
  const ctaData = data.agenticCta;
  if (!ctaData) return null;

  // Main background asset (image/video) or fallback color
  const bgImage = ctaData.image || ctaData.video || null;
  const bgType = isVideo(bgImage) ? "video" : bgImage ? "image" : "color";

  // Right section asset (image/video)
  const secondaryImage = ctaData.secondaryImage || ctaData.secondaryVideo || null;
  const secondaryType = isVideo(secondaryImage) ? "video" : secondaryImage ? "image" : "none";

  return (
    <section className={`relative rounded-[40px] overflow-hidden h-[49.2vh] min-h-[49.2vh] my-10 mx-auto max-w-[1800px] w-[95%] flex items-center justify-center shadow-lg ${bgType === "color" ? "bg-[#252A41]" : ""}`}>
      {/* Main BG */}
      {bgType === "video" && (
        <video
          src={bgImage}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        />
      )}
      {bgType === "image" && (
        <Image
          src={bgImage}
          alt="Background"
          fill
          className="object-cover z-0"
          priority
        />
      )}

        {/* Content */}
      <div className="relative z-10 w-full flex flex-row items-center justify-between px-[4vw] py-12 gap-8">
        {/* Left Section */}
        <div className="flex-1 min-w-[260px] max-w-[600px] text-white text-left flex flex-col items-start justify-center gap-6">
          <h2
            className="text-[2.4rem] font-bold leading-tight m-0 text-white tracking-tight text-left"
            dangerouslySetInnerHTML={{ __html: ctaData.title }}
          />
          <p className="text-[1.1rem] font-normal m-0 text-[#E0E3F1] text-left">
            {ctaData.description}
          </p>
          <div className="flex gap-6 mt-6">
            {ctaData.ctas?.map((cta, i) => (
              <CTAButton
                key={i}
                label={cta.label}
                href={cta.link}
                bg={cta.bg}
                textColor={cta.textColor}
                hoverBg={cta.hoverBg}
                hoverTextColor={cta.hoverTextColor}
                icon={cta.icon}
                hoverIcon={cta.hoverIcon}
                iconSize={44}
                borderColor={cta.bg === 'transparent' ? '#FFFFFF' : 'transparent'}
                hoverBorderColor={cta.hoverBg}
                target={cta.target}
                variant={cta.bg === 'transparent' ? 'secondary' : 'primary'}
              />
            ))}
          </div>
        </div>

        {/* Right Section (Image/Video) */}
        <div className="flex-1 min-w-[260px] flex items-center justify-center relative h-80">
          {secondaryType === "video" && (
            <video
              src={secondaryImage}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-contain rounded-3xl bg-[#181B2B]"
            />
          )}
          {secondaryType === "image" && (
            <Image
              src={secondaryImage}
              alt="Visual"
              width={400}
              height={320}
              className="object-contain rounded-3xl bg-[#181B2B]"
              priority
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default AgenticCtaSection;
