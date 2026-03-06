"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import api from "@/lib/api";

function Sectionthree() {
  const [topproducts, setTopproducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(8);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    fetchTopProducts();
  }, []);

  const fetchTopProducts = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/orders/top/products?limit=${limit}`);
      setTopproducts(response.data);
    } catch (err) {
      console.error("Failed to load top products:", err.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <section className=" bg-[#F5F5F7] md:p-10 p-5 mt-10">
        {/* md:grid md:grid-col-2 md:my-12 md:mx-20 md:gap-x-9 */}
        <div className="md:pl-20">
          <div className="m-2 py-5">
            <p className="text-[#86868B] text-[17px] font-inter font-bold">
              NEW SKINS
            </p>
            <p className="md:w-[690px] w-full font-bold md:text-[36px] text-[18px] text-[#1D1D1F]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC00FF] to-[#00DBDE] font-semibold">
                Style Redefined:
              </span>{" "}
              Unleash the Artistry with our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FC00FF] to-[#00DBDE] font-semibold">
                new Cutting-Edge Skins!
              </span>{" "}
            </p>
          </div>
        </div>
        {!isMounted || loading ? (
          <section className="p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: limit }).map((_, index) => (
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
          <div className="md:flex md:flex-wrap md:ml-16 grid grid-cols-2">
            {isMounted &&
              Array.isArray(topproducts) &&
              topproducts.map((frame, index) => (
                <div
                  key={index}
                  className="w-full md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-10px] md:mx-[-7px] h-[329px]"
                >
                  <Link href={`/details/${frame.slug}`}>
                    <div className="bg-[#ffffff] md:p-4 p-2 rounded-[8px] shadow-sm">
                      <Image
                        src={frame.thumbnailImage}
                        alt={frame.productName}
                        width={100}
                        height={400}
                        className="md:w-[249px] w-full md:h-[232px] h-[130px] bg-contain"
                      />
                      <p className="mt-2 text-start text-[#000000] text-base font-medium">
                        {frame.productName}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
          </div>
        )}
      </section>
    </>
  );
}

export default Sectionthree;
