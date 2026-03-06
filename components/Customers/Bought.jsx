import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import {
  topproductsFailure,
  topproductsStart,
  topproductsSuccess,
} from "@/redux/products/topproductsSlice";
import { getRequest } from "@/api/fetchWrapper";

const Bought = () => {
  const dispatch = useDispatch();
  const { topproducts, loading } = useSelector((state) => state.topproducts);
  useEffect(() => {
    fetchTopProducts();
  }, []);

  const fetchTopProducts = async () => {
    dispatch(topproductsStart());
    try {
      const response = await getRequest(`/orders/top/products?limit=${4}`);
      const data = await response.json();
      dispatch(topproductsSuccess(data));
    } catch (err) {
      dispatch(topproductsFailure(err.message));
    }
  };

  return (
    <section className="bg-[#F5F5F7] px-5 md:p-10">
      <div>
        <h1 className="text-[#1D1D1F] font-semibold text-[28px] text-center py-10">
          Customers also Bought
        </h1>
        {loading ? (
          <section className="p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Array.from({ length: topproducts?.length }).map((_, index) => (
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
              {Array.isArray(topproducts) &&
                topproducts?.map((frame, index) => (
                  <div
                    key={index}
                    className="w-full  md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-10px] md:mx-[-10px] h-[329px]"
                  >
                    <Link href={`/details/${frame.slug}`}>
                      <div className="bg-[#ffffff] md:p-4 p-3 rounded-[8px] shadow-sm h[271px]">
                        <Image
                          src={frame.thumbnailImage}
                          alt={frame.productName}
                          width={100}
                          height={400}
                          className="md:w-[249px] w-full md:h-[232px] h-[130px]"
                        />
                        <p className="mt-2 text-center text-[#000000] md:text-base text-xs  font-medium">
                          {frame.productName}
                        </p>
                        {/* <p className="mt-2 text-center text-[#86868B] text-base font-medium">
                    {frame.model}
                  </p> */}
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
