'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import data from '../../data/standalone-page/data.json';

const DemoDetails = () => {
    const { demoDetails } = data;
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlayClick = () => {
        setIsPlaying(true);
        const video = document.getElementById('demo-video');
        if (video) {
            video.play();
        }
    };

    return (
        <section className="relative w-full bg-white px-[2%] md:px-[4%] lg:px-[7%] py-8 lg:py-12">

            {/* Header Section */}
                {/* Top Row: Back Button & Title | Share Button */}
                <div className="flex items-start justify-between mb-4">

                    {/* Left: Back Button and Title */}
                    <div className="flex items-center gap-3">
                        {/* Back Arrow */}
                        <button
                            className="flex items-center justify-center w-8 h-8 hover:opacity-80 transition-opacity"
                            aria-label="Go back"
                        >
                            <div className="w-6 h-6 relative">
                                <Image
                                    src="/assets/icon/back.png"
                                    alt="Back"
                                    fill
                                    className="object-contain"
                                />
                            </div>
                        </button>

                        {/* Title and Date */}
                        <div>
                            <h3 className="text-gray-900 font-semibold">{demoDetails.title}</h3>

                            {/* Date with Clock Icon */}
                            <div className="flex items-center gap-2 mt-1">
                                <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    className="text-[#F43F5E]"
                                >
                                    <circle cx="12" cy="12" r="10" />
                                    <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <span className="text-gray-500">{demoDetails.publishedDate}</span>
                            </div>
                        </div>
                    </div>

                    {/* Right: Share Button */}
                    <button className="flex items-center gap-2 py-8 text-[#F43F5E] hover:text-[#e11d48] transition-colors font-medium">
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
                            <polyline points="16 6 12 2 8 6" />
                            <line x1="12" y1="2" x2="12" y2="15" />
                        </svg>
                        <span>Share</span>
                    </button>
                </div>

                {/* Video Preview Section (centered, responsive, full-width up to max) */}
                <div className="w-full mx-auto mb-8 flex justify-center">
                    <div className="relative w-full max-w-[1200px] rounded-2xl overflow-hidden">
                        {/* Video Element - show poster as preview and controls */}
                        <video
                            id="demo-video"
                            className="w-full aspect-video object-cover"
                            controls
                            poster={demoDetails.videoPoster}
                        >
                            <source src={demoDetails.videoSrc} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        {/* Play Button Overlay - optional, clicks will autoplay when present */}
                        {!isPlaying && (
                            <div
                                className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/10 hover:bg-black/20 transition-colors"
                                onClick={handlePlayClick}
                            >
                                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform">
                                    <svg
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="text-gray-800 ml-1"
                                    >
                                        <path d="M8 5v14l11-7z" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Description Section */}
                <div className="max-w-full">
                    <p className="text-gray-700 leading-relaxed">
                        {demoDetails.description}
                    </p>
                </div>

        </section>
    );
};

export default DemoDetails;
