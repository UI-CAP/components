import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import defaultData from '@/data/industry-page/data.json';

const Services = ({ data }) => {
  const [iconVh, setIconVh] = useState(0);

  useEffect(() => {
    const update = () => {
      const vh = (70.4 / window.innerHeight) * 100;
      setIconVh(vh);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // use passed `data` prop if provided, otherwise fall back to site data
  const source = data || defaultData.services;
  if (!source) return null;

  const { title, subtitle, cards } = source;

  return (
    <section className="w-full bg-white px-[2%] md:px-[4%] lg:px-[7%] py-16">
      <div>
        <div className="text-center mb-12">
          <h2>{title}</h2>
          <p className="mx-auto text-gray-500 max-w-xl">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {cards.map((card) => (
            <article
              key={card.id}
              className="flex flex-col gap-4 p-8 bg-white border border-gray-200 rounded-2xl transition-transform transform hover:-translate-y-1 hover:shadow-lg"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: iconVh ? `${iconVh}vh` : '70.4px',
                  height: iconVh ? `${iconVh}vh` : '70.4px'
                }}
              >
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <Image src={card.icon} alt={`${card.title} icon`} fill className="object-contain" />
                </div>
              </div>

              <div className="flex-1 pt-4">
                <h6 className="font-bold mb-2">{card.title}</h6>
                <span className="text-gray-500">{card.description}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
