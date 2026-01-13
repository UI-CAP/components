import React from 'react';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import data from '../../data/aboutUs-page/data.json';

const Error404 = () => {
    const { error404 } = data;

    return (
        <section className="w-full min-h-[80vh] flex items-center justify-center bg-white px-6 py-12 lg:px-20 overflow-hidden">
            <div className="container">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between">

                    {/* Left Content */}
                    <div className="w-[40%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <div>
                            <span className="font-medium tracking-wide uppercase mb-4 block">
                                {error404.label}
                            </span>
                            <h1 className="font-medium text-[86.1px] leading-[90px] tracking-[0] align-middle text-gray-900">
                                {error404.title}
                            </h1>
                        </div>

                        <span
                            className="group flex items-center justify-between gap-4 pl-6 pr-2 py-2 border border-gray-900 rounded-full hover:bg-gray-50 transition-all duration-300 w-auto"
                            aria-label={error404.buttonText}
                        >
                            <span>
                                {error404.buttonText}
                            </span>
                            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#FF3B6B] text-white transition-transform duration-300 group-hover:rotate-45">
                                <ArrowUpRight size={20} strokeWidth={2.5} />
                            </div>
                        </span>
                    </div>

                    {/* Right Image */}
                    <div className="w-[60%] flex justify-center lg:justify-end relative">
                        {/* Decorative elements could be added here if not in the image */}
                        <div className="relative w-full max-w-3xl aspect-[4/3] lg:aspect-[16/9]">
                            <Image
                                src={error404.image}
                                alt="404 Illustration"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Error404;
