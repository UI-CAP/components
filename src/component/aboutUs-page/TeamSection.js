import React from 'react';
import { FaJava, FaNodeJs, FaPython, FaReact, FaAngular } from "react-icons/fa";
import { SiDotnet, SiJavascript, SiTypescript } from "react-icons/si";
import data from '../../data/aboutUs-page/data.json';

const iconMap = {
    java: FaJava,
    nodejs: FaNodeJs,
    python: FaPython,
    dotnet: SiDotnet,
    javascript: SiJavascript,
    typescript: SiTypescript,
    react: FaReact,
    angular: FaAngular
};

const TeamSection = () => {
    const { teamSection } = data;

    return (
        <section className="w-full bg-[#F1F0FB] flex items-center justify-center py-16 px-[4%] lg:px-[10%] overflow-hidden">
            <div className="w-full max-w-[1920px] min-h-[500px] flex flex-col lg:flex-row items-center lg:items-center justify-between">

                {/* Left Content - Text */}
                <div className="w-full lg:w-4/12 flex flex-col items-center pl-10 lg:items-start text-center lg:text-left space-y-6">
                    <h2 className="font-bold text-gray-900 leading-tight text-nowrap">
                        {teamSection.title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed max-w-lg">
                        {teamSection.description}
                    </p>
                </div>

                {/* Right Content - Tech Stack Grid */}
                <div className="w-full lg:w-7/12 flex flex-col items-center gap-10">
                    {teamSection.categories.map((category) => (
                        <div key={category.id} className="flex flex-col gap-4">
                            <h4 className="font-semibold">
                                {category.title}
                            </h4>
                            <div className="flex flex-wrap gap-4">
                                {category.items.map((item) => {
                                    const IconComponent = iconMap[item.icon];
                                    return (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-3 bg-white pl-3 pr-6 py-3 rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 min-w-[140px]"
                                        >
                                            {IconComponent && (

                                                <IconComponent
                                                    size={24}
                                                    color={item.color}
                                                    className="shrink-0"
                                                />
                                            )}
                                            <span className="font-medium text-gray-700">
                                                {item.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TeamSection;
