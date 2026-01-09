"use client";

import React, { useState } from 'react';
import Image from 'next/image';
// Replaced reusable Button component with an inline button to avoid dependency
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import data from '../data/data.json';

const AITransformation = () => {
    const [activeTab, setActiveTab] = useState(data.aiTransformation.tabs[0]);
    const [direction, setDirection] = useState(1); // 1 for forward, -1 for back

    const tabs = data.aiTransformation.tabs;

    const content = data.aiTransformation.content;

    const currentContent = content[activeTab];

    const handleTabChange = (tab) => {
        const newIndex = tabs.indexOf(tab);
        const oldIndex = tabs.indexOf(activeTab);

        // Direction based on index change
        setDirection(newIndex > oldIndex ? 1 : -1);
        setActiveTab(tab);
    };

    const isVideo = (src) => {
        return src?.toLowerCase().endsWith('.mp4') || src?.toLowerCase().endsWith('.webm');
    };

    // Animation variants
    const variants = {
        enter: (dir) => ({
            y: dir > 0 ? -50 : 50,
            opacity: 0
        }),
        center: {
            y: 0,
            opacity: 1
        },
        exit: (dir) => ({
            y: dir > 0 ? 50 : -50,
            opacity: 0
        })
    };

    return (
        <section className="bg-white py-16 md:py-24 px-4 md:px-8 lg:px-16 text-[#1A1A1A]">
            <div>
                {/* Top Section: Heading and Tabs */}
                <div className="flex flex-col items-center mb-6">
                    <h2 className="text-center mb-10 text-black tracking-tight">
                        {data.aiTransformation.title}
                    </h2>

                    <div className="p-3 rounded-full flex flex-wrap justify-center gap-2 border border-[#FFE4E9]">
                        {tabs.map((tab) => (
                            <button
                                key={tab}
                                onClick={() => handleTabChange(tab)}
                                className={`px-6 md:px-8 py-3 cursor-pointer bg-[#FFF5F7] rounded-full font-semibold transition-all duration-300 relative ${activeTab === tab ? 'text-white' : 'text-[#F22E62] hover:bg-[#FFE4E9]'
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
                <div className="grid grid-cols-1 px-[7%] lg:grid-cols-[3fr_7fr] gap-12 lg:gap-20 items-center overflow-hidden min-h-[500px]">
                    {/* Left side content */}
                    <div className="order-2 lg:order-1 relative">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeTab}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    y: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 }
                                }}
                            >
                                <h3 className="font-bold mb-8 text-black leading-[1.1]">
                                    {currentContent.title}
                                </h3>
                                <p className="text-gray-500 mb-10 max-w-lg leading-relaxed font-medium">
                                    {currentContent.description}
                                </p>
                                <button
                                    type="button"
                                    className="!py-3 !px-8 !bg-[#383E5B] !text-white !rounded-full flex items-center gap-3"
                                >
                                    <span className="font-medium">Explore More</span>
                                    <span className="!bg-white !text-black !p-1.5 rounded-full flex items-center justify-center">
                                        <ArrowUpRight size={18} />
                                    </span>
                                </button>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Right side media container */}
                    <div className="order-1 lg:order-2 relative rounded-[20px] overflow-hidden aspect-[4/3] md:aspect-video text-white bg-gray-50">
                        <AnimatePresence mode="wait" custom={direction}>
                            <motion.div
                                key={activeTab}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    y: { type: "spring", stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.3 }
                                }}
                                className="w-full h-full"
                            >
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
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AITransformation;
