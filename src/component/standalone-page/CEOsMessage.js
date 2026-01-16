'use client';

import React from 'react';
import Image from 'next/image';
import data from '../../data/standalone-page/data.json';

const CEOsMessage = () => {
    const { ceosMessage } = data;
    const isVideo = (src) => typeof src === 'string' && src.toLowerCase().endsWith('.mp4');
    const bgAsset = ceosMessage.background?.src;

    return (
        <section className="relative w-full flex items-center justify-center overflow-hidden px-[2%] md:px-[4%] lg:px-[7%]">

            {/* Background Layer */}
            <div className="absolute inset-0 z-0">
                {isVideo(bgAsset) ? (
                    <video
                        src={bgAsset}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                    />
                ) : (
                    /* Fallback to gradient if image is missing, or overlay image */
                    <div className="relative w-full h-full">
                        {bgAsset && (
                            <Image
                                src={bgAsset}
                                alt="Background"
                                fill
                                className="object-cover"
                                priority
                            />
                        )}
                        {/* distinct blue gradient overlay to match screenshot */}
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1e3a8a] to-[#3b3c8e] opacity-90 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-[#1e293b]/60" /> {/* Darkener */}
                    </div>
                )}
            </div>

            {/* Main Content Grid */}
            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">

                {/* Left Section */}
                <div className="py-8 lg:py-12 w-full flex flex-col items-start text-left space-y-18">

                    {/* Quote Icon */}
                    <div className="w-14 h-14 relative">
                        <Image
                            src="/assets/icon/group-white.png"
                            alt="Quote Icon"
                            fill
                            className="object-contain"
                        />
                    </div>

                    {/* Quote Text */}
                    <h4 className="text-white/90">
                        {ceosMessage.quote}
                    </h4>

                    {/* Button / Tag */}
                    <div>
                        <h4 className="bg-[#F43F5E] text-white font-semibold italic px-5 py-2.5 transition-colors cursor-default">
                            {ceosMessage.tagText}
                        </h4>
                    </div>

                    {/* Author Info */}
                    <div className="pt-2">
                        <h3 className="font-medium text-white">{ceosMessage.name}</h3>
                        <p className="text-white/70">{ceosMessage.designation}</p>
                    </div>
                </div>

            </div>
        </section>
    );
};

export default CEOsMessage;
