"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import data from "@/data/aboutUs-page/data.json";

const Leaders = () => {
  const leadersData = data.leaders || {};
  const { title, subtitle, members = [] } = leadersData;

  const [cardWidthVw, setCardWidthVw] = useState(null);
  const [cardHeightVh, setCardHeightVh] = useState(null);

  useEffect(() => {
    const update = () => {
      if (typeof window === "undefined") return;
      const vw = (360 / window.innerWidth) * 100; // 360px target -> vw (slightly smaller)
      const vh = (420 / window.innerHeight) * 100; // 420px target -> vh (slightly smaller)
      const widthValue = window.innerWidth < 640 ? 100 : vw; // small screens: full width
      setCardWidthVw(widthValue);
      setCardHeightVh(vh);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (members.length === 0) return null;

  return (
    <section className="w-full px-[2%] bg-[#F6F6F6] py-16 md:py-20 lg:py-24">
      <div>
        {/* Header Section */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-bold text-black mb-4">{title}</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        </div>

        {/* Leaders Grid (flex-wrap to support fixed card widths) */}
        <div className="flex flex-wrap gap-6 md:gap-8 justify-center">
          {members &&
            members.map((member) => (
              <div key={member.id} className="rounded-3xl bg-white p-2">
                  <div
                  className="leader-card group relative overflow-hidden rounded-3xl bg-gradient-to-b from-gray-100 to-gray-200"
                  style={{
                    width: cardWidthVw ? `${cardWidthVw}vw` : undefined,
                    height: cardHeightVh ? `${cardHeightVh}vh` : undefined,
                    minWidth: "220px",
                    maxWidth: "420px",
                  }}
                >
                  {/* Image Container */}
                  <div className="absolute inset-0">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h4 className="font-semibold mb-1 text-white">
                      {member.name}
                    </h4>
                    <span
                      className="text-gray-200 opacity-90"
                    >
                      {member.title}
                    </span>

                    {/* Social Media Icons */}
                    <div className="flex mt-4 gap-3">
                      {member.socials?.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                          aria-label="LinkedIn"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      )}
                      {member.socials?.twitter && (
                        <a
                          href={member.socials.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                          aria-label="Twitter"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      )}
                      {member.socials?.youtube && (
                        <a
                          href={member.socials.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 transition-all duration-300"
                          aria-label="YouTube"
                        >
                          <svg
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                              fill="currentColor"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
};

export default Leaders;
