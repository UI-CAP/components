"use client";

import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import data from '../data/data.json';
import { AnimatePresence } from 'framer-motion';

const MenuBar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const timeoutRef = useRef(null);
  const headerRef = useRef(null);

  const menuItems = data.menu.items;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(label);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <header
      ref={headerRef}
      onMouseLeave={handleMouseLeave}
      className={`fixed left-0 right-0 z-50 transition-all duration-300 shadow-md flex items-center justify-between px-[3%] lg:px-[7%] py-3 ${isScrolled
        ? 'top-5 mx-[2%] md:mx-[4%] lg:mx-[6%] rounded-full border border-gray-200/50 bg-white/90 backdrop-blur-sm'
        : 'top-0 rounded-none border-b border-gray-100 bg-white'
        }`}
    >
      {/* Left: Logo */}
      <div className="flex items-center gap-2">
        <img src="/assets/logo/menu.png" alt="Vishleshan Logo" className="h-10 object-contain" />
      </div>

      {/* Center: Menu */}
      <nav className="hidden lg:flex gap-8 pl-[18%] h-full">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-1 cursor-pointer group py-4 relative"
            onMouseEnter={() => item.hasDropdown && handleMouseEnter(item.label)}
          >
            <p className={`transition-colors duration-300 ${activeMenu === item.label ? 'text-black' : 'text-black group-hover:text-black'}`}>
              {item.label}
            </p>
            {item.hasDropdown && idx !== menuItems.length - 1 && (
              <IoIosArrowDown
                className={`text-[#F22E62] transition-transform duration-300 ${activeMenu === item.label ? 'rotate-180' : ''}`}
              />
            )}

            {/* Transition Indicator Line */}
            {activeMenu === item.label && (
              <div className="absolute bottom-1 left-0 right-0 h-0.5 bg-[#F22E62] rounded-full" />
            )}
          </div>
        ))}
      </nav>

      {/* Right: Buttons */}
      <div className="flex items-center gap-4">
        <button className="px-8 py-4 cursor-pointer text-black border border-black rounded-full button">
          Talk to Us
        </button>
        <button className="px-8 py-4 cursor-pointer text-white bg-[#DF4364] rounded-full button">
          Book A Demo
        </button>
      </div>







{/* --------------------------------------------------------------------------------------------------------------------------------------------------------------- */}




      {/* Mega Menu Dropdown */}
      <AnimatePresence>
        {activeMenu && (() => {
          const megaMenuData = data.menu.megaMenu[activeMenu];
          if (!megaMenuData) return null;

          const { leftSection, banner, rightSection } = megaMenuData;
          const itemCount = leftSection.items.length;
          const isColumnLayout = itemCount === 2;
          const leftSectionWidth = isColumnLayout ? '450px' : '640px';
          const needsScroll = itemCount > 4;

          return (
            <div
              onMouseEnter={() => {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
              }}
              className="absolute top-full left-0 right-0 pointer-events-auto flex justify-center"
            >
              <div className="w-full">
                <div
                  className="bg-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 z-40"
                  style={{
                    borderRadius: isScrolled ? '32px' : '0 0 32px 32px',
                    height: '72vh',
                    width: '90%',
                    margin: '0 auto'
                  }}
                >
                  <div className={`w-full h-full p-4 flex flex-col lg:flex lg:flex-row gap-8`}>

                    {/* Left Section: Pages Grid */}
                    <div className="flex flex-col rounded-4xl h-full bg-[#D9D9D933]" style={{ width: leftSectionWidth }}>
                      <h5 className="mb-4 p-8 font-bold">{activeMenu}</h5>
                      <div 
                        className={`${isColumnLayout ? 'flex flex-col' : 'grid grid-cols-[1fr_1px_1fr]'} my-18 px-6 ${needsScroll ? 'overflow-y-auto' : ''}`}
                      >
                        {leftSection.items.map((item, idx) => (
                          <React.Fragment key={idx}>
                            <div className="group cursor-pointer">
                              <div className="flex px-3 items-start">
                                <div className="flex flex-col py-6 flex-1">
                                  <div className="flex gap-2 items-center">
                                    <h5 className="font-bold text-black group-hover:text-[#F22E62] transition-colors">{item.title}</h5>
                                    <ArrowRight size={16} className="text-gray-400 group-hover:translate-x-1 group-hover:text-[#F22E62] transition-all" />
                                  </div>
                                  <h6 className="text-gray-500 leading-relaxed">
                                    {item.description}
                                  </h6>
                                </div>
                              </div>
                            </div>
                            {/* Vertical divider between columns in grid layout */}
                            {!isColumnLayout && idx % 2 === 0 && (
                              <div className="border-l border-gray-300"></div>
                            )}
                            {/* Horizontal divider after each row */}
                            {((isColumnLayout && idx < leftSection.items.length - 1) || 
                              (!isColumnLayout && idx % 2 === 1 && idx < leftSection.items.length - 1)) && (
                              <div className={`${isColumnLayout ? 'w-full' : 'col-span-3'} border-t border-gray-300`}></div>
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                      {/* Left Bottom: Socials */}
                      <div className="w-fit flex gap-3">
                        <span className='w-8'></span>
                        {leftSection.socials.map((social, idx) => (
                          <a
                            key={idx}
                            href={social.url}
                            className="flex border border-gray-300 rounded-3xl px-12 py-1 bg-white"
                          >
                            <div className="relative w-8 h-8 ">
                              <Image
                                src={social.icon}
                                alt={social.platform}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Middle Section: Banner */}
                    <div className="flex flex-col flex-1">
                      {banner && (
                        <div className="relative bg-[#252A41] rounded-3xl p-8 overflow-hidden h-full min-h-[400px]">
                          <div className="relative z-10 flex flex-col gap-3">
                            <h4 className="text-white font-bold leading-tight">
                              {banner.title}
                            </h4>
                            <p className="text-white/80">
                              {banner.description}
                            </p>
                            <button className="bg-white hover:bg-gray-100 button text-black font-medium px-4 py-3 rounded-full flex items-center gap-2 w-fit transition-all group">
                              {banner.ctaText}
                              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                          </div>
                          {/* Robot/AI Image */}
                          <div className="absolute bottom-3 flex items-center justify-center w-36 h-36">
                            <Image
                              src={banner.image}
                              alt="AI Robot"
                              fill
                              className="object-contain"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Right Section: Blogs */}
                    <div className="flex flex-col bg-[#02006D1F] p-8 rounded-4xl h-full flex-1">
                      <h5 className="mb-6 font-bold">{rightSection.title}</h5>
                      <div className="flex flex-col overflow-hidden overflow-y-auto gap-4 scrollbar-hide">
                        {rightSection.items.map((blog, idx) => (
                          <div
                            key={idx}
                            className="rounded-3xl group cursor-pointer flex items-center gap-4"
                          >
                            <div className="relative bg-white w-32 h-32 flex-shrink-0 rounded-3xl overflow-hidden">
                              <Image
                                src={blog.image}
                                alt={blog.title}
                                fill
                                className="object-cover p-2 rounded-3xl group-hover:scale-105 transition-transform duration-700"
                              />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
                              <span className="inline-block bg-white px-3 py-1 rounded-full text-black font-medium mb-2 w-fit">
                                {blog.tag}
                              </span>
                              <h6 className="font-semibold text-black mb-2 line-clamp-2">
                                {blog.title}
                              </h6>
                              <span className="text-black font-semibold underline hover:text-[#F22E62] transition-colors">
                                Read More
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          );
        })()}
      </AnimatePresence>
    </header>
  );
};

export default MenuBar;
