import React from 'react';
import Image from 'next/image';
import data from "@/data/home-page/data.json";
import CTAButton from "@/component/shared/CTAButton";

const StatsSection = () => {
    const stats = data.stats.items;
    const bgImage = data.stats.image; // Can be video or image

    // Helper function to check if asset is video
    const isVideo = (src) => src?.toString().endsWith('.mp4');

    return (
        <section
            className="relative w-full min-h-[76.8vh] flex items-center py-12 px-4 overflow-hidden text-white"
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
            <div className="relative z-10 px-4 mx-auto w-full max-w-7xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">

                    {/* Left Content */}
                    <div className='text-left flex flex-col items-start'>
                        <h2 className="mb-6 text-left pr-16">{data.stats.title}</h2>
                        <p className="mb-8 max-w-xl">
                            {data.stats.description}
                        </p>

                        <div className="flex flex-wrap gap-4">
                            {data.stats.ctas && data.stats.ctas.map((cta, index) => (
                                <CTAButton
                                    key={index}
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
