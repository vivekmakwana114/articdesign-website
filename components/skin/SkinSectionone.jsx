"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import FormatCurrencyRate from "../Currency/FormatCurrencyRate";
import { imageskin } from "../../assets";

function SkinSectionone({
  products,
  title,
  spantext,
  subspantext,
  subtitle,
  slogan,
  subslogan,
  loading,
}) {
  const [visibleProducts, setVisibleProducts] = useState(8); // Initial number of products to show
  const loadMoreProducts = () => setVisibleProducts((prev) => prev + 8); // Load 4 more items on each click

  return (
    <section className="bg-[#ffffff] md:p-5 md:m-8">
      <div className="md:ml-5 ml-5 flex flex-col gap-5">
        <div className="md:w-full md:h-[108px] w-[230px]">
          <p className="md:text-[36px] text-[14px] font-bold text-[#86868B]">
            {title}
          </p>
          <span className="md:text-[36px] text-[14px] font-bold text-[#86868B] ">
            {subspantext}
          </span>
          <span className="text-[#1D1D1F] md:text-[36px] text-[14px] font-bold">
            {spantext}
            <span className="text-[#86868B]">{subtitle}</span>
          </span>
        </div>
        <div>
          <h5 className="font-bold md:text-[16px] text-[13px] text-[#000000] md:w-full">
            {slogan}
          </h5>
          <h5 className="font-bold md:text-[16px] text-[13px] text-[#000000] md:w-full">
            {subslogan}
          </h5>
        </div>
      </div>
      {loading ? (
        <section className="p-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse transition-all duration-500 bg-gray-200 rounded-md p-4 md:h-[329px] h-full"
              >
                <div className="bg-gray-300 md:h-48 h-32 rounded-md mb-4"></div>
                <div className="bg-gray-300 h-4 rounded mb-2"></div>
                <div className="bg-gray-300 h-4 rounded mb-2 w-3/4"></div>
              </div>
            ))}
          </div>
        </section>
      ) : (
        <>
          <div className="md:flex md:flex-wrap md:ml-2 md:mx-0 mx-2 grid grid-cols-2 md:my-5 ">
            {products?.slice(0, visibleProducts)?.map((frame, index) => (
              <div
                key={index}
                className="w-full md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-2px] md:mx-[-4px] transition-all duration-500"
              >
                <Link href={`/details/${frame.slug || frame._id}`}>
                  <div className="bg-[#F5F5F7] p-4 rounded-[8px] shadow-sm md:h-[329px] h-full flex flex-col items-center">
                    <Image
                      src={
                        (frame.images && frame.images[0]) ||
                        frame.thumbnailImage ||
                        imageskin
                      }
                      alt={frame.name || frame.productName || "skin image"}
                      width={100}
                      height={400}
                      className="w-full h-auto object-contain flex-grow"
                      style={{ maxHeight: "200px" }}
                    />
                    <div className="mt-auto w-full">
                      <p className="mt-2 text-center text-[#000000] md:text-base text-xs font-medium line-clamp-2">
                        {frame.name || frame.productName}
                      </p>
                      <p className="mt-1 text-center text-[#86868B] md:text-sm text-xs font-medium">
                        {frame.deviceSeriesId?.name ||
                          frame.deviceId?.name ||
                          frame.device ||
                          frame.deviceName}
                      </p>
                      <p className="mt-2 text-center text-[#86868B] md:text-base text-xs font-medium">
                        <FormatCurrencyRate
                          num={frame.basePrice || frame.productPrice}
                        />
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
          {visibleProducts < products?.length && (
            <div className="flex justify-center items-center md:mt-10 md:mr-10">
              <button
                onClick={loadMoreProducts}
                className="text-base underline underline-offset-4 font-medium text-[#0071E3] text-center"
              >
                Load more
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}

export default SkinSectionone;
