import React, { useState } from "react";
import { skinframe } from "../../assets";
import Image from "next/image";

function SkinSectiontwo() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="md:px-20 px-5 bg-[#ffffff]   flex flex-col justify-center items-center">
      <div className="flex flex-col gap-2 justify-center items-center md:my-5 my-5 md:mx-0 mx-10 ">
        <h1 className="font-bold text-[#1D1D1F] text-center md:text-[38px] text-[23.4px] md:w-[498px] w-full">
          How to Apply Skin
        </h1>
        <p className="md:w-[629px] w-full h-[58px] text-center md:text-2xl text-[13px] font-semibold text-[#8C8C8C] md:mb-10">
          Effortless Application, Uncompromised Protection Unleash the Power of
          Skins That Safeguard with Ease!
        </p>
      </div>
      <div className="w-full max-w-4xl aspect-video rounded-2xl overflow-hidden shadow-lg mb-10 cursor-pointer relative">
        {!isPlaying ? (
          <div className="relative w-full h-full" onClick={() => setIsPlaying(true)}>
            <Image
              src={skinframe}
              alt="How to Apply Skin"
              fill
              className="object-cover"
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all duration-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-white text-opacity-80 hover:text-opacity-100 hover:scale-110 transition-transform duration-200"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        ) : (
          <iframe
            src="https://www.youtube.com/embed/Q5aE7h-AX5Q?autoplay=1"
            className="w-full h-full border-0"
            title="How to Apply Skin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        )}
      </div>
    </section>
  );
}

export default SkinSectiontwo;
