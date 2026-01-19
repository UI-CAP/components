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

  // No separate right-side media: only main background (image/video) is used

  return (
    <section className={`relative rounded-[40px] overflow-hidden h-[49.2vh] min-h-[49.2vh] my-10 flex items-center mx-[2%] md:mx-[4%] lg:mx-[7%] justify-start shadow-lg ${bgType === "color" ? "bg-[#252A41]" : ""}`}>
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
      <div className="relative z-10 w-full flex items-center justify-start px-[4vw] py-12">
        {/* Left-aligned Content */}
        <div className="w-full max-w-[600px] text-white text-left flex flex-col pl-16 items-start justify-center gap-6">
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
      </div>
    </section>
  );
};

export default AgenticCtaSection;
