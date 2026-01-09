import React from 'react';
import Image from 'next/image';
import { BsArrowUpRight, BsDownload } from 'react-icons/bs';
import data from "@/data/data.json";

const StatsSection = () => {
    const stats = data.stats.items;
    const bgImage = data.stats.image; // Can be video or image

    // Helper function to check if asset is video
    const isVideo = (src) => src?.toString().endsWith('.mp4');

    return (
        <section
            className="relative w-full min-h-[76.8vh] flex items-center py-12 pl-[18%] overflow-hidden text-white"
        >
            {/* Background Asset - Video or Image (Conditional) */}
            {bgImage && (
                isVideo(bgImage) ? (
                    <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover"
                    >
                        <source src={bgImage} type="video/mp4" />
                    </video>
                ) : (
                    <Image
                        src={bgImage}
                        alt="Background"
                        fill
                        className="absolute inset-0 w-full h-full object-cover"
                        priority
                    />
                )
            )}

            {/* Content Container */}
            <div className="relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">

                    {/* Left Content */}
                    <div>
                        <h2 className="mb-6" dangerouslySetInnerHTML={{ __html: data.stats.title }} />
                        <p className="mb-8 max-w-xl">
                            {data.stats.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            <button
                                className="flex items-center gap-2 p-6 button border-1 border-white text-white rounded-full hover:bg-white hover:text-[#292F44] transition-colors duration-200"
                            >
                                About Us
                                <BsArrowUpRight size={16} />
                            </button>

                            <button
                                className="flex items-center text-black bg-white gap-2 button p-6 bg-[#292F44] rounded-full"
                            >
                                Download Brochure
                                <BsDownload size={16} />
                            </button>
                        </div>
                    </div>

                    {/* Right Content - Stats Grid */}
                    <div className="grid grid-cols-2 gap-10">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="rounded-3xl aspect-square flex flex-col justify-center border-1 border-white/20 items-center text-center p-8 backdrop-blur-sm bg-white/10"
                            >
                                <h2 className="mb-2">{stat.value}</h2>
                                <p>{stat.description}</p>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    );
};

export default StatsSection;
