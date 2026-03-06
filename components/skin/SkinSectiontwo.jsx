import React from "react";
import { skinframe } from "../../assets";
import Image from "next/image";

function SkinSectiontwo() {
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
      <Image src={skinframe} alt={skinframe} className="w-full h-full" />
    </section>
  );
}

export default SkinSectiontwo;
