"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import data from "@/data/home-page/data.json";
import CTAButton from '@/component/shared/CTAButton';

const InsightsSection = () => {
    const [activeFilter, setActiveFilter] = useState('All');
    
    const insightsData = data.insights;
    if (!insightsData) return null;

    const { subtitle, title, categories, items } = insightsData;

    // Filter articles based on active filter (handle plural/singular mismatches)
    const matchCategory = (articleCat, filter) => {
        const a = String(articleCat || '').trim().toLowerCase();
        const f = String(filter || '').trim().toLowerCase();
        if (f === 'all') return true;
        if (a === f) return true;
        if ((a + 's') === f) return true; // article 'blog' vs filter 'blogs'
        if (a === f.replace(/s$/, '')) return true; // filter 'news' vs article 'news' (no-op) or 'blogs' vs 'blog'
        return false;
    };

    const filteredArticles = items.filter(article => matchCategory(article.category, activeFilter));



    return (
        <section className="w-full bg-[#F8F9FB] py-16 md:py-24 lg:py-32 px-[2%] md:px-[4%] lg:px-[7%]">
            <div>
                {/* Header Section */}
                <div className="text-center mb-8 md:mb-12">
                    <p className="text-gray-600 mb-3 md:mb-4 font-medium">
                        {subtitle}
                    </p>
                    <h2 className="text-black mb-6 md:mb-8 leading-tight">
                        {title}
                    </h2>

                    {/* Filter Tabs - pill container */}
                    <div className="flex justify-center">
                        <div className="inline-flex items-center bg-white rounded-full py-3 px-3 shadow-lg">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    onClick={() => setActiveFilter(category)}
                                    className={`px-6 py-3 rounded-full font-medium cursor-pointer transition-all duration-200 ${
                                        activeFilter === category
                                            ? 'bg-[#252A41] text-white'
                                            : 'bg-transparent text-gray-600 hover:text-black'
                                    }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12 md:mb-16">
                    {filteredArticles.slice(0, 4).map((article) => (
                        <div key={article.id}>
                            <ArticleCard article={article} />
                        </div>
                    ))}
                </div>

                {/* View All Button */}
                <div className="flex justify-center mt-6">
                    {
                        (() => {
                            const defaultCta = {
                                label: 'View All',
                                link: '#',
                                bg: 'transparent',
                                textColor: '#252A41',
                                hoverBg: '#252A41',
                                hoverTextColor: '#FFFFFF',
                                icon: '/assets/icon/grayBtn.png',
                                hoverIcon: '/assets/icon/whiteBtn.png',
                                borderColor: '#252A41',
                                hoverBorderColor: '#252A41'
                            };

                            const v = insightsData.viewAllCta || defaultCta;

                            return (
                                <CTAButton
                                    label={v.label}
                                    href={v.link}
                                    bg={v.bg}
                                    textColor={v.textColor}
                                    hoverBg={v.hoverBg}
                                    hoverTextColor={v.hoverTextColor}
                                    icon={v.icon}
                                    hoverIcon={v.hoverIcon}
                                    borderColor={v.borderColor}
                                    hoverBorderColor={v.hoverBorderColor}
                                    className="px-8 space-x-3"
                                />
                            );
                        })()
                    }
                </div>
            </div>
        </section>
    );
};

const ArticleCard = ({ article }) => {
    return (
        <div className="border border-gray-100 p-4 rounded-4xl bg-white shadow-sm">
            <a
                href={article.link}
                className="group block bg-white rounded-4xl overflow-hidden"
            >
                {/* Image Container - fixed height, rounded, with shadow */}
                <div className="relative w-full h-64 md:h-72 lg:w-full rounded-2xl overflow-hidden bg-gray-100 shadow-md">
                    <Image
                        src={article.image}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />

                    {/* White gradient overlay (bottom -> top) */}
                    <div aria-hidden="true" className="absolute inset-0 pointer-events-none z-10 bg-gradient-to-t from-white/80 via-white/10 to-transparent" />

                    {/* Category Badge (above overlay) */}
                    <div className="absolute top-3 left-3 z-20">
                        <span className="inline-block px-3 py-1 bg-white rounded-full font-semibold text-gray-800 shadow-sm text-xs">
                            {article.category}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="py-5 px-1">
                    <p className="font-bold text-black mb-3 leading-tight group-hover:text-[#F22E62] transition-colors duration-300 line-clamp-2">
                        {article.title}
                    </p>
                    <span className="text-gray-600 leading-relaxed text-sm">
                        {article.description}
                    </span>
                </div>
            </a>
        </div>

    );
};

export default InsightsSection;
