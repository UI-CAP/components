"use client";
import React, { useRef, useState } from 'react';
import { ChevronLeft, Share2, Clock, Play } from 'lucide-react';
import data from '@/data/industry-page/data.json';

const DemoDetails = () => {
    const { demoDetails } = data;
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
            setIsPlaying(true);
        }
    };

    return (
        <section className="w-full bg-white px-[20px] md:px-[60px] py-[40px] max-w-[1440px] mx-auto font-sans">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-[30px] gap-4">
                <div className="flex flex-col gap-[6px]">
                    <div className="flex items-center gap-[15px]">
                        <button
                            className="hover:bg-gray-100 p-2 rounded-full transition-colors -ml-2"
                            aria-label="Go back"
                        >
                            <ChevronLeft size={28} className="text-black" />
                        </button>
                        <h1 className="text-[28px] md:text-[36px] font-bold text-black leading-tight">
                            {demoDetails.title}
                        </h1>
                    </div>
                    <div className="flex items-center gap-[8px] pl-[12px] md:pl-[52px]">
                        <Clock size={16} className="text-[#F22E62]" />
                        <span className="text-[13px] text-gray-500 font-medium tracking-wide">
                            {demoDetails.date}
                        </span>
                    </div>
                </div>

                <button className="flex items-center gap-[8px] text-[#F22E62] font-semibold hover:bg-pink-50 px-4 py-2 rounded-lg transition-colors self-end md:self-auto">
                    <Share2 size={20} />
                    <span className="text-[16px]">Share</span>
                </button>
            </div>

            {/* Video Section */}
            <div className="relative w-full aspect-video md:aspect-[2.4/1] rounded-[24px] overflow-hidden mb-[40px] group bg-gray-100 shadow-sm border border-gray-100">
                <video
                    ref={videoRef}
                    src={demoDetails.video}
                    className="w-full h-full object-cover"
                    controls={isPlaying}
                    onPause={() => setIsPlaying(false)}
                    onPlay={() => setIsPlaying(true)}
                // Use a placeholder if video fails to load or while loading
                // poster="/assets/image/industry1.png" 
                />

                {/* Overlay - Only show if not playing */}
                {!isPlaying && (
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-black/10 hover:bg-black/20 transition-all duration-300 cursor-pointer"
                        onClick={handlePlay}
                    >
                        {/* Play Button */}
                        <div className="w-[80px] h-[80px] rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                            <div className="w-[60px] h-[60px] rounded-full bg-[#fceef2] flex items-center justify-center shadow-lg">
                                <Play size={24} className="text-[#F22E62] ml-1 fill-[#F22E62]" />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            <div className="w-full">
                <p className="text-[16px] md:text-[18px] leading-[1.8] text-gray-600 text-justify">
                    {demoDetails.description}
                </p>
            </div>
        </section>
    );
};

export default DemoDetails;
