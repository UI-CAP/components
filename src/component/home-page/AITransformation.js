"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import data from "@/data/home-page/data.json";
import CTAButton from "@/component/shared/CTAButton";

const AITransformation = () => {
  const [activeTab, setActiveTab] = useState(data.aiTransformation.tabs[0]);
  const [direction, setDirection] = useState(1); // 1 for forward, -1 for back
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const lastDirectionRef = useRef(direction);

  const tabs = data.aiTransformation.tabs;
  const content = data.aiTransformation.content;
  const currentContent = content[activeTab];
  const aiCta = data.aiTransformation.cta || {};

  const handleTabChange = (tab) => {
    const newIndex = tabs.indexOf(tab);
    const oldIndex = tabs.indexOf(activeTab);
    const dir = newIndex > oldIndex ? 1 : -1;
    setDirection(dir);
    lastDirectionRef.current = dir;

    // Animate out current content
    const timeline = gsap.timeline({
      onComplete: () => {
        setActiveTab(tab);
      }
    });

    // Text slides opposite to image
    timeline.to(textRef.current, {
      y: dir > 0 ? -50 : 50,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    }, 0);

    timeline.to(imageRef.current, {
      y: dir > 0 ? 50 : -50,
      opacity: 0,
      duration: 0.4,
      ease: "power2.inOut"
    }, 0);
  };

  useEffect(() => {
    // Animate in new content — use lastDirectionRef to avoid running on direction change alone
    const dir = lastDirectionRef.current || 1;

    gsap.fromTo(textRef.current, 
      {
        y: dir > 0 ? 50 : -50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }
    );

    gsap.fromTo(imageRef.current, 
      {
        y: dir > 0 ? -50 : 50,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      }
    );
  }, [activeTab]);

  const isVideo = (src) => {
    return (
      src?.toLowerCase().endsWith(".mp4") ||
      src?.toLowerCase().endsWith(".webm")
    );
  };

  return (
    <section className="bg-white py-16 md:py-24 px-[2%] md:px-[4%] lg:px-[7%] text-[#1A1A1A]">
      <div>
        {/* Top Section: Heading and Tabs */}
        <div className="flex flex-col items-center mb-6">
          <h2 className="text-center mb-10 text-black tracking-tight">
            {data.aiTransformation.title}
          </h2>

          <div className="p-3 rounded-full flex flex-wrap justify-center shadow-lg gap-2 border border-[#FFE4E9]">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className={`px-6 md:px-8 py-3 cursor-pointer bg-[#FFF5F7] rounded-full font-semibold transition-all duration-300 relative ${
                  activeTab === tab
                    ? "text-white"
                    : "text-[#F22E62] hover:bg-[#FFE4E9]"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#F22E62] rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Bottom Section: Content and Media */}
        <div className="grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-12 pt-20 lg:gap-20 items-center overflow-hidden min-h-[500px]">
          {/* Left side content */}
          <div className="order-2 lg:order-1 relative">
            <div ref={textRef} className="max-w-xl">
              <h3 className="font-bold mb-4 text-black leading-[1.1]">
                {currentContent.title}
              </h3>
              <span className="mb-4 max-w-lg leading-relaxed font-medium">
                {currentContent.description}
              </span>
            </div>

            {/* CTA stays static (no animation) so it doesn't flicker or animate with text */}
            <div className="mt-6">
              <CTAButton
                label={aiCta.label || "Explore More"}
                href={aiCta.link || "#"}
                bg={aiCta.bg || "#383E5B"}
                textColor={aiCta.textColor || "#FFFFFF"}
                hoverBg={aiCta.hoverBg || "#FFFFFF"}
                hoverTextColor={aiCta.hoverTextColor || "#FFFFFF"}
                borderColor={aiCta.borderColor || "#FFFFFF"}
                hoverBorderColor={aiCta.hoverBorderColor || "#383E5B"}
                icon={aiCta.icon || "/assets/icon/grayBtn.png"}
                hoverIcon={aiCta.hoverIcon || "/assets/icon/whiteBtn.png"}
                iconSize={44}
                target={aiCta.target}
                variant="primary"
              />
            </div>
          </div>

          {/* Right side media container */}
          <div className="order-1 lg:order-2 relative rounded-[20px] overflow-hidden aspect-[4/3] md:aspect-video text-white">
            <div ref={imageRef} className="w-full h-full">
              {isVideo(currentContent.image) ? (
                <video
                  src={currentContent.image}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="relative w-full h-full">
                  <Image
                    src={currentContent.image}
                    alt={currentContent.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AITransformation;
