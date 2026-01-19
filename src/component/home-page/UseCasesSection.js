"use client";

import React from 'react';
import Image from 'next/image';
// replaced ArrowUpRight icon with local redArr image
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
                            className="group transition-all duration-300"
                        >
                            <div className="flex items-center gap-2 bg-[#383E5B] text-white pl-4 pr-4 md:pl-6 md:pr-6 group-hover:pr-8 md:group-hover:pr-10 py-2.5 md:py-3 rounded-full cursor-pointer transition-all duration-300 shadow-md hover:shadow-lg group-hover:bg-[#F22E62]">
                                <p className="whitespace-nowrap">
                                    {tag}
                                </p>
                                <div className="relative pl-2 w-4 h-4">
                                    {/* small default icon stays in layout */}
                                    <Image
                                        src="/assets/icon/redArr.png"
                                        alt="arrow"
                                        fill
                                        className="absolute inset-0 object-contain transition-opacity duration-200 opacity-100 group-hover:opacity-0"
                                    />

                                    {/* larger hover icon overlaid and centered without affecting layout */}
                                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 opacity-0 group-hover:opacity-100 transform transition-all duration-300 pointer-events-none">
                                        <Image
                                            src="/assets/icon/redBtn.png"
                                            alt="arrow-hover"
                                            fill
                                            className="object-contain group-hover:rotate-45 ml-4 group-hover:scale-150 origin-center"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default UseCasesSection;
