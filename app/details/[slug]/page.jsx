"use client";

import { getRequest } from "@/api/fetchWrapper";
import Footer from "@/components/Footer";
import Sectionfive from "@/components/Home/Sectionfive";
import Sectiontwo from "@/components/Home/Sectiontwo";
import SkinSectiontwo from "@/components/skin/SkinSectiontwo";
import {
  singleProductFailure,
  singleProductStart,
  singleProductSuccess,
} from "@/redux/products/productsSlice";
import { useDispatch, useSelector } from "react-redux";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import DetailsSection from "@/components/Details/DetailsSection";
import Banner from "@/components/Banner/Banner";
import BannerData from "@/components/Banner/BannerData";

function Details() {
  const pathname = usePathname();
  const slug = pathname.split("/").pop();
  const dispatch = useDispatch();
  const {
    product,
    loading: productsLoading,
    error: productsErorr,
  } = useSelector((state) => state.products);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug, dispatch]);

  const fetchProduct = async () => {
    dispatch(singleProductStart());
    try {
      const response = await getRequest(`/products/${slug}`);
      const data = await response.json();
      dispatch(singleProductSuccess(data.product));
    } catch (err) {
      dispatch(singleProductFailure());
    }
  };
  return (
    <>
      <DetailsSection product={product} loading={productsLoading} />
      <div className="md:px-10 md:py-5 mx-auto px-4">

      {BannerData.map((item, index) => (
        <div key={index} className="md:h-[500px] md:flex md:flex-row flex flex-col-reverse my-20  md:mx-20 md:gap-x-2 md:justify-center bg-[#F5F5F7] md:rounded-[16px] md:pr-20">
          <Banner
            image={item.image}
            title={item.title}
            description={item.description}
            reverse={item.reverse}
          />
        </div>
      ))}
    </div>

      <SkinSectiontwo />
      <Sectiontwo />
      <Sectionfive />
      <Footer />
    </>
  );
}

export default Details;
