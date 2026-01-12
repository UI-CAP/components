"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/data/industry-page/data.json";

const Benefits = () => {
  const { benefits } = data;
  const [activeTab, setActiveTab] = useState(1);
  const [imgVh, setImgVh] = useState(0);

  useEffect(() => {
    const update = () => {
      const vhValue = (758 / window.innerHeight) * 100;
      setImgVh(vhValue);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const activeContent = benefits.tabs.find((tab) => tab.id === activeTab);

  return (
    <section className="w-full py-16 md:py-20 lg:py-24 px-[2%] md:px-[4%] lg:px-[7%] bg-white relative overflow-hidden">
      {/* Background (image or video) */}
      {benefits.background && (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
          {benefits.background.type === 'video' ? (
            <video
              src={benefits.background.src}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full">
              <Image
                src={benefits.background.src}
                alt={benefits.background.alt || ''}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      )}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <div className="relative flex flex-col items-start pr-[28%]">
            {/* Vertical side tabs (desktop) */}
            <div className="hidden md:flex absolute -left-12 h-full flex-col justify-center items-center gap-1">
              {benefits.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  aria-label={`Tab ${tab.id}`}
                  className={`transition-all duration-200 cursor-pointer focus:outline-none ${
                    activeTab === tab.id
                      ? 'w-2 h-8 rounded-full bg-[#F22E62]'
                      : 'w-2 h-2 rounded-full bg-pink-200'
                  }`}
                />
              ))}
            </div>

            {/* Badge */}
            <span className="inline-flex items-center justify-center text-white px-4 py-1 mb-6 bg-[#F22E62] rounded-full w-fit">
              {benefits.badge}
            </span>

            {/* Dynamic Title */}
            <h2 className="text-left mb-6">
              {activeContent?.title}
            </h2>

            {/* Dynamic Description */}
            <p className="pr-[10%]">
              {activeContent?.description}
            </p>

            {/* Mobile tab indicators */}
            <div className="flex gap-3 md:hidden">
              {benefits.tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-12 h-1.5 rounded-full transition-all duration-300 ${
                    activeTab === tab.id ? 'bg-[#F22E62]' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Tab ${tab.id}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Image Container */}
          <div className="w-full flex justify-center lg:justify-end">
            <div
              className="relative w-full max-w-[600px]"
              style={{ height: imgVh ? `${imgVh}vh` : undefined }}
            >
              <Image
                src={benefits.image}
                alt={benefits.imageAlt}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
