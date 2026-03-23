"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { imageskin } from "../../assets";

import { useDispatch, useSelector } from "react-redux";
import { fetchTopProducts } from "@/state/product/productSlice";

const Bought = () => {
  const dispatch = useDispatch();
  const { topProducts, topProductsStatus } = useSelector((state) => state.product);
  const loading = topProductsStatus === "loading";
  const pathname = usePathname();

  React.useEffect(() => {
    dispatch(fetchTopProducts());
  }, [dispatch]);

  return (
    <section className="bg-[#F5F5F7] px-5 md:p-10">
      <div>
        {pathname === "/checkout" && (
          <h1 className="text-[#1D1D1F] font-semibold text-[28px] text-center py-10">
            Customers also Bought
          </h1>
        )}
        {loading ? (
          <section className="p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: 4 }).map((_, index) => (
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
            <div className="md:flex md:flex-wrap md:ml-16 grid grid-cols-2">
              {Array.isArray(topProducts) &&
                topProducts?.map((frame, index) => (
                  <div
                    key={index}
                    className="w-full  md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-10px] md:mx-[-10px] md:h-[329px] h-auto"
                  >
                    <Link href={`/details/${frame.slug || frame._id}`}>
                      <div className="bg-[#ffffff] md:p-4 p-2 rounded-[8px] shadow-sm">
                        <Image
                          src={
                            frame?.images?.[0] ||
                            frame?.thumbnailImage ||
                            imageskin
                          }
                          alt={frame?.productName || "Product image"}
                          width={100}
                          height={400}
                          className="md:w-[249px] w-full md:h-[232px] h-[130px]"
                        />
                        <p className="mt-2 text-center text-[#000000] md:text-base text-xs font-medium">
                          {frame?.productName || frame?.name}
                        </p>
                        <p className="mt-1 text-center text-[#86868B] md:text-sm text-xs font-medium">
                          {frame?.device || frame?.deviceName || frame?.model}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Bought;
