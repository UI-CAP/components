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
                          className="social-icon"
                          aria-label="LinkedIn"
                        >
                          <img
                            src="/assets/icon/linkedin.png"
                            alt="LinkedIn"
                            className="w-9 h-9"
                          />
                        </a>
                      )}
                      {(member.socials?.twitter || member.socials?.xtrends) && (
                        <a
                          href={member.socials?.twitter || member.socials?.xtrends}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon flex items-center"
                          aria-label="XTrends"
                        >
                          <img
                            src="/assets/icon/xtrends.png"
                            alt="XTrends"
                            className="w-9 h-9"
                          />
                        </a>
                      )}
                      {member.socials?.youtube && (
                        <a
                          href={member.socials.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-icon"
                          aria-label="YouTube"
                        >
                          <img
                            src="/assets/icon/youtube.png"
                            alt="YouTube"
                            className="w-10 h-10"
                          />
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
