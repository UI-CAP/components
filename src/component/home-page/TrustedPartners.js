"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/data/home-page/data.json";

export default function TrustedPartners({ partners = data.trustedPartners }) {
  const items = partners?.items || [];
  const [heightVh, setHeightVh] = useState("auto");

  useEffect(() => {
    function updateHeight() {
      const vh = (189 / window.innerHeight) * 100; // convert 189px to viewport-height units
      setHeightVh(`${vh}vh`);
    }

    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);

  return (
    <section
      style={{ height: heightVh }}
      className="relative z-20 py-8 rounded-t-[40px] md:rounded-t-[80px] bg-[#30354FB2] lg:rounded-t-[90px] overflow-hidden backdrop-blur-[50px]"
    >
      <div className="mb-8">
        <h6 className="text-white opacity-60 text-center font-semibold">
          {partners.title}
        </h6>
      </div>

      <div className="relative w-full overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap min-w-max">
          {[...items, ...items].map((logo, index) => (
            <div
              key={index}
              className="relative w-28 h-8 md:w-36 md:h-12 mx-8 md:mx-12 lg:mx-16 flex-shrink-0 transition-all duration-300 hover:scale-110 cursor-pointer"
            >
              <Image
                src={logo.image}
                alt={logo.name}
                fill
                className="object-contain grayscale brightness-200 opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>

        <div className="absolute inset-y-0 left-0 w-20 md:w-40 bg-gradient-to-r from-[#30354F] to-transparent z-10 pointer-events-none opacity-50"></div>
        <div className="absolute inset-y-0 right-0 w-20 md:w-40 bg-gradient-to-l from-[#30354F] to-transparent z-10 pointer-events-none opacity-50"></div>
      </div>
    </section>
  );
}
