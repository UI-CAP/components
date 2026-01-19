"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import data from '@/data/product-page/data.json';
import { motion } from 'framer-motion';

const AdvancedFeaturesSection = () => {
    const { advancedFeatures } = data;

    // Card configuration: prefer data.json cards, fallback to defaults
    const cards = (advancedFeatures.cards && advancedFeatures.cards.length)
        ? advancedFeatures.cards
        : [
            { id: 'card-1', color: '#3D3F5C' },
            { id: 'card-2', color: '#636595' },
            { id: 'card-3', color: '#8A8CCF' }
        ];

    const [cardOrder, setCardOrder] = useState(['card-1', 'card-2', 'card-3']);

    const handleCardClick = (clickedId) => {
        // Find index of clicked card
        const clickedIndex = cardOrder.indexOf(clickedId);
        
        // If it's the front card (index 0), do nothing
        if (clickedIndex === 0) return;

        // Rotate array so clickedId moves to front (index 0)
        const newOrder = [...cardOrder];
        // Rotate loop
        for (let i = 0; i < clickedIndex; i++) {
            newOrder.push(newOrder.shift());
        }
        setCardOrder(newOrder);
    };

    return (
        <section className="w-full py-16 md:py-20 lg:py-24 px-[2%] md:px-[4%] lg:px-[7%] bg-white">
            <div className="flex flex-col items-center mx-auto">
                {/* Section Title */}
                <h2 className="text-black max-w-3xl text-center mb-[10%] tracking-tight">
                    {advancedFeatures.title}
                </h2>

                {/* Main Content Grid with Card Stack */}
                <div className="relative w-full" style={{ height: '75vh' }}>
                    {cards.map((card) => {
                        const index = cardOrder.indexOf(card.id);
                        const isFront = index === 0;
                        
                        return (
                            <motion.div
                                key={card.id}
                                className={`absolute top-0 left-0 w-full h-full rounded-[24px] lg:rounded-[32px] p-8 md:p-12 lg:p-16 shadow-xl ${!isFront ? 'cursor-pointer' : ''}`}
                                style={{ 
                                    backgroundColor: card.color,
                                    transformOrigin: 'top center'
                                }}
                                animate={{
                                    y: index * -30,
                                    scale: 1 - (index * 0.05),
                                    zIndex: cards.length - index,
                                }}
                                transition={{
                                    duration: 0.5,
                                    ease: "easeInOut"
                                }}
                                onClick={() => handleCardClick(card.id)}
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center h-full">
                                    {/* Left Side - Network Visualization */}
                                    <div className="w-full flex justify-center h-full items-center">
                                        <div className="relative w-full max-w-[500px] aspect-square">
                                            <Image
                                                src={advancedFeatures.image}
                                                alt={advancedFeatures.imageAlt}
                                                fill
                                                className="object-contain"
                                                priority={isFront}
                                            />
                                        </div>
                                    </div>

                                    {/* Right Side - Content */}
                                    <div className="w-full text-white">
                                        {/* Main Feature */}
                                        <h4 className="text-white font-bold mb-4">
                                            {advancedFeatures.mainFeature.title}
                                        </h4>
                                        <p className="text-gray-300 mb-8 md:mb-10 leading-relaxed">
                                            {advancedFeatures.mainFeature.description}
                                        </p>

                                        {/* Benefits Section */}
                                        <h4 className="text-white font-semibold mb-6">
                                            {advancedFeatures.benefits.title}
                                        </h4>

                                        {/* Benefits List */}
                                        <ul className="list-none p-0 m-0 flex flex-col gap-5">
                                            {advancedFeatures.benefits.items.map((benefit) => (
                                                <li 
                                                    key={benefit.id} 
                                                    className="text-gray-300  leading-relaxed pl-5 relative before:content-['•'] before:absolute before:left-0 before:text-white before:font-bold"
                                                >
                                                    <p>
                                                        {benefit.heading} {benefit.text}
                                                    </p>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default AdvancedFeaturesSection;
