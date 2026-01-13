"use client";

import React from "react";
import Image from "next/image";
import data from "@/data/aboutUs-page/data.json";

const Culture = () => {
    const cultureData = data.culture;
    if (!cultureData) return null;

    const { title, subtitle, images } = cultureData;

    return (
        <section className="w-full bg-white py-16 px-[7%] md:py-20 lg:py-24">
            <div>
                {/* Header Section */}
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="font-bold text-black mb-4">
                        {title}
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        {subtitle}
                    </p>
                </div>

                {/* Masonry Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 auto-rows-[320px]">
                    {/* Column 1 - Left */}
                    <div className="flex flex-col gap-5 row-span-2">
                        {images[0] && (
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 flex-1 group">
                                <Image
                                    src={images[0].src}
                                    alt={images[0].alt}
                                    fill
                                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                                />
                            </div>
                        )}
                        {images[4] && (
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 flex-1 group">
                                <Image
                                    src={images[4].src}
                                    alt={images[4].alt}
                                    fill
                                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                                />
                            </div>
                        )}
                    </div>

                    {/* Column 2 - Middle Left */}
                    <div className="flex flex-col gap-5 row-span-2">
                        {images[1] && (
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 flex-1 group">
                                <Image
                                    src={images[1].src}
                                    alt={images[1].alt}
                                    fill
                                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                                />
                            </div>
                        )}
                        {images[2] && (
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 flex-[1.2] group">
                                <Image
                                    src={images[2].src}
                                    alt={images[2].alt}
                                    fill
                                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                                />
                            </div>
                        )}
                    </div>

                    {/* Column 3 - Middle Right (Tall Image) */}
                    <div className="flex flex-col gap-5 row-span-2">
                        {images[3] && (
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-full group">
                                <Image
                                    src={images[3].src}
                                    alt={images[3].alt}
                                    fill
                                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                                />
                            </div>
                        )}
                    </div>

                    {/* Column 4 - Right */}
                    <div className="flex flex-col gap-5 row-span-2 md:col-span-2 md:flex-row lg:col-span-1 lg:flex-col">
                        {images[5] && (
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 flex-1 group">
                                <Image
                                    src={images[5].src}
                                    alt={images[5].alt}
                                    fill
                                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                                />
                            </div>
                        )}
                        {images[6] && (
                            <div className="relative rounded-2xl overflow-hidden bg-gray-100 flex-1 group">
                                <Image
                                    src={images[6].src}
                                    alt={images[6].alt}
                                    fill
                                    className="object-cover transition-transform duration-400 group-hover:scale-105"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Culture;
