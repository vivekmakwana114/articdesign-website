import React from "react";
import Button from "../Button";
import { sectiononeimage, macbook2, macbook1 } from "../../assets";
import Image from "next/image";

function Sectionone() {
  return (
    <section className=" bg-[#F5F5F7] md:p-10">
      <div className="flex md:flex-row flex-col-reverse md:mt-12  md:mx-20 md:gap-x-9 md:justify-center">
        <div className="bg-[#090A0E] h-[433px] md:h-[650px] md:w-[650px]  md:rounded-[16px] flex flex-col justify-between">
          <div className="flex flex-col items-center gap-y-3 mt-10">
            <p className="md:text-[28px] text-[20.21px] font-bold text-white">
              Elevate Your iPad's Style
            </p>
            <h3 className="font-normal text-[#86868B] md:text-[17px] text-[12.27px]">
              Peel, Stick, and Transform!
            </h3>
            <Button
              title="Customize yours"
              textsize="16"
              fontweight="normal"
              link="devices?category=ipads"
            />
          </div>
          <div className="flex flex-col items-center gap-y-3">
            <Image
              src={sectiononeimage}
              alt="image"
              className="md:h-[329px] md:w-[429px] h-[206.6px]"
            />
          </div>
        </div>
        <div className="bg-[#F6F6F6] md:h-[650px] md:w-[650px]  h-[539px]  md:rounded-[16px] flex flex-col  py-5 bg-[url('/image2.png')] bg-no-repeat md:bg-cover bg-center">
          <div className="flex flex-col items-center gap-y-3">
            <p className="md:text-[22px] text-[19.83px] font-medium text-[#1D1D1F] w-[370.58px] text-center">
              Wrap Your iPhone in Elegance
            </p>
            <h3 className="font-normal text-[#86868B] text-[17px]">
              Unleash Your iPhone's True Beauty:
            </h3>

            <Button
              title="Get Started"
              width={108}
              height={50}
              textsize="11.33"
              buttonpadding={2}
              link="devices?category=phones"
            />
          </div>
        </div>
      </div>
      <div className="md:flex md:justify-center md:my-10">
        <div className="md:px-0 px-5 md:h-[594px] md:w-[1300px] md:mx-0  md:rounded-[16px] md:shadow-sm md:shadow-[#00000084] md:ring-opacity-50 flex md:flex-row flex-col-reverse md:gap-0 gap-10">
          <div className="md:mt-20">
            <Image
              src={macbook1}
              alt="image"
              className="md:h-[380px] md:w-[790px] w-full md:block hidden"
            />
            <Image
              src={macbook2}
              alt="image"
              className="md:h-[480px] md:w-[790px] w-full md:hidden"
            />
          </div>
          <div className="flex flex-col md:mt-20 mt-10 md:justify-start md:items-end justify-center items-center">
            <div>
              <p className="text-[#1D1D1F] font-medium  md:text-[56px] text-[19.83px] ">
                Unlock Macbook Beauty
              </p>
              <p className="text-[#494949] font-noraml md:text-[17px] text-[12.04px]">
                Your Style, Your Canvas, Your Statement
              </p>
              <Button
                title="Get Started"
                width={108}
                height={50}
                textsize="11.33px"
                buttonpadding={2}
                link="devices?category=laptops"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sectionone;
