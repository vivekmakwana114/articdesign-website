// import React from "react";

// const Loader = () => {
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50">
//       <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
//     </div>
//   );
// };

// export default Loader;

// src/components/PageLoader.js

import React from "react";

const PageLoader = () => {
  return (
    <>
      <nav className="bg-[#FFFFFF] font-inter md:px-14 md:h-[64px]">
        <div className="flex items-center font-medium justify-between">
          <div className="z-50 p-5 md:w-auto w-full flex justify-between md:border-none border-b">
            <div className="w-[86px] h-[19px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
          </div>
          <div className="flex flex-row gap-3 md:ml-48">
            <div className="w-[86px] h-[19px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
            <div className="w-[86px] h-[19px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
            <div className="w-[86px] h-[19px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
            <div className="w-[86px] h-[19px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
          </div>
          <div className="flex flex-row gap-3">
            <div className="w-[86px] h-[19px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
            <div className="w-[86px] h-[19px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
            <div className="w-[86px] h-[19px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
          </div>
        </div>
      </nav>
      <div>
        <div className="flex flex-col items-center justify-center">
          {/* The content you want to center */}
          <div className="p-8 max-w-[550px] space-y-5">
            <div className="w-[550px] h-[38px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
            <div className="w-[550px] h-[38px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
          </div>
          <div className="my-8">
            <div className="grid grid-cols-3 gap-10">
              <div className="flex flex-col justify-between items-center">
                <p className="w-[39.64px] h-[22.95px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
                <p className="w-[55.68px] h-[3.62px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="w-[39.64px] h-[22.95px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
                <p className="w-[55.68px] h-[3.62px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="w-[39.64px] h-[22.95px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
                <p className="w-[55.68px] h-[3.62px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="w-[39.64px] h-[22.95px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
                <p className="w-[55.68px] h-[3.62px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="w-[39.64px] h-[22.95px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
                <p className="w-[55.68px] h-[3.62px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
              </div>
              <div className="flex flex-col justify-between items-center">
                <p className="w-[39.64px] h-[22.95px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
                <p className="w-[55.68px] h-[3.62px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded-[6px]"></p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex md:flex-wrap md:ml-16 grid grid-cols-2">
          {[
            "one",
            "two",
            "three",
            "foure",
            "five",
            "six",
            "seven",
            "eight",
            "nine",
            "ten",
            "elven",
            "twelve",
          ].map((frame, index) => (
            <div
              key={index}
              className="w-full  md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-10px] md:mx-[-7px] space-y-3"
            >
              <div className=" bg-gradient-to-r h-[351px]  from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse  p-4 rounded-[8px] shadow-sm ">
                {/* <p className="mt-2 text-center text-[#000000] md:text-base text-sm  font-medium">
                    {frame.name}
                  </p>
                  <p className="mt-2 text-center text-[#86868B] text-base font-medium">
                    {frame.model}
                  </p> */}
              </div>
              <div className="flex flex-col gap-4 justify-center items-center">
                <div className="w-[119px] h-[18px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
                <div className="w-[100px] h-[18px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 my-8 p-5 gap-x-5">
          <div className="flex justify-end items-end">
            <div className="w-[610px] h-[550px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
          </div>
          <div className="flex flex-col gap-5 justify-center items-start">
            <div className="w-[514px] h-[43px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
            <div className="w-[405px] h-[29px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
            <div className="w-[543px] h-[96px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
            <div className="ml-10 w-[121px] h-[19px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 my-8 p-20 gap-x-5">
          <div className="space-y-3 flex flex-col justify-center items-center ml-20">
            <div className="w-[305px] h-[20px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
            <div className="w-[305px] h-[40px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
          </div>
          <div className="col-span-2">
            <div className="flex space-x-10 justify-center items-end">
              <div className="space-y-3">
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
              </div>
              <div className="space-y-3">
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
                <div className="w-[314.33px] h-[24px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
              </div>
            </div>
          </div>
        </div>
        {/* <hr /> */}
        <section className="flex md:items-end md:justify-end md:pl-20 py-5 gap-10 border-t mx-20">
          <div className="w-[112px] h-[20px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
          <div className="w-[94px] h-[20px] bg-gradient-to-r from-[#F1EFEF] to-[#E7E5E5] animate-custom-pulse rounded"></div>
        </section>
        {/* <div className="mt-2 w-3/4 h-4 bg-gray-300 animate-custom-pulse rounded"></div> */}
      </div>
    </>
  );
};

export default PageLoader;
