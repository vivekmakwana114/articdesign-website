import React from "react";
import { shipping, rotate, lock } from "../../assets";
import Image from "next/image";

function Sectionfive() {
  return (
    <section className=" bg-[#090A0E] py-5 px-0 md:px-5 md:h-[136px] h-[344px] flex md:flex-row md:justify-center flex-col justify-around items-center mt-20">
      <div className="flex flex-row md:my-12 md:mx-20 gap-x-7">
        <div className="md:h-[38px] md:w-[50px] h-[38.24px] w-[44.11px] mt-2">
          <Image
            src={shipping}
            alt="image"
            className=""
            width={50}
            height={38}
            priority={true}
          />
        </div>
        <div>
          <p className="text-white font-medium font-inter text-base uppercase">
            FREE SHIPPING
          </p>
          <p className="text-white font-noraml text-[14px] w-[208px]">
            Free shipping for orders above INR 100
          </p>
        </div>
      </div>
      <div className="flex flex-row md:my-12 md:mx-20 gap-x-7">
        <div className="md:h-[38px] md:w-[50px] h-[38.24px] w-[44.11px] mt-2">
          <Image src={rotate} alt="image" className="" width={50} height={38} />
        </div>
        <div>
          <p className="text-white font-medium font-inter text-base uppercase">
            30 DAYS RETURN
          </p>
          <p className="text-white font-noraml text-[14px] w-[208px]">
            Free shipping for orders above INR 100
          </p>
        </div>
      </div>
      <div className="flex flex-row  md:my-12 md:mx-20 gap-x-7">
        <div className="md:h-[38px] md:w-[50px] h-[38.24px] w-[44.11px] ">
          <Image src={lock} alt="image" className="" width={50} height={38} />
        </div>
        <div>
          <p className="text-white font-medium font-inter text-base uppercase ">
            100% PAYMENT SECURE
          </p>
          <p className="text-white font-noraml text-[14px] w-[208px]">
            Free shipping for orders above INR 100
          </p>
        </div>
      </div>
    </section>
  );
}

export default Sectionfive;
