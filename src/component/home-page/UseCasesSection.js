"use client";

import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import data from "@/data/home-page/data.json";

const UseCasesSection = () => {
    const useCasesData = data.useCases;
    if (!useCasesData) return null;

    const { title, description, items, image } = useCasesData;

    // Helper function to check if asset is video
    const isVideo = (src) => src?.toString().endsWith('.mp4');

    return (
        <section className="w-full py-16 md:py-24 lg:py-32 px-4 md:px-8 lg:px-12 relative overflow-hidden">
            {/* Background Asset - Video or Image (Conditional) */}
            {image && (
                isVideo(image) ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src={image} type="video/mp4" />
                    </video>
                ) : (
                    <Image
                        src={image}
                        alt="Background"
                        fill
                        className="absolute inset-0 w-full h-full object-cover"
                        priority
                    />
                )
            )}
            

            <div className="relative z-20">
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-center font-bold text-black mb-4 md:mb-6">
                        {title}
                    </h2>
                    <p className="text-center text-gray-700 max-w-3xl mx-auto px-4">
                        {description}
                    </p>
                </div>

                {/* Tags Cloud */}
                <div className="flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-6xl mx-auto">
                    {items.map((tag, index) => (
                        <div
                            key={`${tag}-${index}`}
                            className="group hover:scale-105 transition-transform duration-300"
                        >
                            <div className="flex items-center gap-2 bg-[#383E5B] text-white px-4 md:px-6 py-2.5 md:py-3 rounded-full cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg">
                                <p className="whitespace-nowrap">
                                    {tag}
                                </p>
                                <ArrowUpRight 
                                    size={14} 
                                    className="text-[#F22E62] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" 
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UseCasesSection;
