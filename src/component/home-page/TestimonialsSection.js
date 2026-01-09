"use client";

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import data from "@/data/data.json";

const TestimonialsSection = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const scrollContainerRef = useRef(null);
    
    const testimonialsData = data.testimonials;
    const { title, description, items } = testimonialsData || {};

    // Auto-scroll on mount to hide first card 80%
    useEffect(() => {
        if (scrollContainerRef.current && items && items.length) {
            const cardWidth = scrollContainerRef.current.scrollWidth / items.length;
            scrollContainerRef.current.scrollLeft = cardWidth * 0.8;
        }
    }, [items]);

    if (!testimonialsData) return null;

    const handleScroll = () => {
        if (scrollContainerRef.current) {
            const scrollLeft = scrollContainerRef.current.scrollLeft;
            const cardWidth = scrollContainerRef.current.offsetWidth;
            const newIndex = Math.round(scrollLeft / cardWidth);
            setActiveIndex(newIndex);
        }
    };

    const scrollToCard = (index) => {
        if (scrollContainerRef.current) {
            const cardWidth = scrollContainerRef.current.offsetWidth;
            scrollContainerRef.current.scrollTo({
                left: cardWidth * index,
                behavior: 'smooth'
            });
            setActiveIndex(index);
        }
    };

    return (
        <section className="w-full bg-[#F8F8FB] py-16 ">
            <div className="">
                {/* Header Section */}
                <div className="flex px-[7%] flex-col lg:flex-row justify-between items-center mb-12 gap-20">
                    <div className="flex-1 min-w-1/2">
                        <h2 className="font-bold text-black">
                            {title}
                        </h2>
                    </div>

                    <div className="flex-1 pl-[12%]">
                        <p className="text-gray-700 leading-relaxed">
                            {description}
                        </p>
                    </div>
                </div>

                {/* Scrollable Testimonials Container */}
                <div className="relative overflow-hidden">
                    <div
                        ref={scrollContainerRef}
                        onScroll={handleScroll}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4 pl-[7%]"
                        style={{
                            WebkitOverflowScrolling: 'touch'
                        }}
                    >
                        {items.map((review, index) => (
                            <div
                                key={review.id}
                                className="flex-shrink-0 w-[calc(30%-1.2rem)] snap-start"
                            >
                                <TestimonialCard review={review} index={index} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 mt-8">
                    {items.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => scrollToCard(index)}
                            className={`h-2 rounded-full transition-all duration-300 ${
                                index === activeIndex
                                    ? 'w-8 bg-[#F22E62]'
                                    : 'w-2 bg-gray-300'
                            }`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const TestimonialCard = ({ review }) => {
    const hasMedia = review.image && review.image.trim() !== '';
    
    return (
        <div className="aspect-[10/7] flex flex-col bg-[#F6F5FF] rounded-md overflow-hidden">
            {/* Video/Image Section */}
            <div className="relative w-full h-full overflow-hidden">
                {hasMedia ? (
                    <>
                        <Image
                            src={review.image}
                            alt={review.name}
                            fill
                            className="object-cover"
                        />
                        
                        {/* Always show Play Button in center */}
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center cursor-pointer">
                                <Image 
                                    src="/assets/icon/play.png" 
                                    alt="Play" 
                                    width={28} 
                                    height={28}
                                    className="ml-1"
                                />
                            </div>
                        </div>
                    </>
                ) : (
                    /* No media - show group icon on top left with short quote below */
                    <div className="absolute top-4 left-4">
                        <div>
                            <Image src="/assets/icon/Group.png" alt="Group" width={24} height={24} />
                        </div>
                        <p className="mt-2 w-full">
                            {review.description}
                        </p>
                    </div>
                )}

                {/* Person Info - always bottom-left (styled based on media presence) */}
                <div className="absolute bottom-0 left-0 w-full z-10">
                    {hasMedia ? (
                        <div className="bg-gradient-to-t from-black/80 via-black/40 w-full to-transparent px-4 py-2 rounded-md">
                            <p className="font-bold text-white">
                                {review.name}
                            </p>
                            <p className="text-gray-200">
                                {review.subtitle}
                            </p>
                        </div>
                    ) : (
                        <div className='px-4 pb-2'>
                            <p className="font-bold text-[#F22E62]">
                                {review.name}
                            </p>
                            <p className="text-black">
                                {review.subtitle}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TestimonialsSection;
