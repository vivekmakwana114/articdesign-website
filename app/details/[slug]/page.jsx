"use client";

import Footer from "@/components/Footer";
import Sectionfive from "@/components/Home/Sectionfive";
import Sectiontwo from "@/components/Home/Sectiontwo";
import SkinSectiontwo from "@/components/skin/SkinSectiontwo";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import DetailsSection from "@/components/Details/DetailsSection";
import Banner from "@/components/Banner/Banner";
import { BannerData } from "@/components/Banner/BannerData";

import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails } from "@/state/product/productSlice";

function Details() {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const slug = pathname.split("/").pop();

  const { product, detailsStatus } = useSelector((state) => state.product);

  useEffect(() => {
    if (slug) {
      dispatch(fetchProductDetails(slug));
    }
    window.scrollTo(0, 0);
  }, [slug, dispatch]);

  const productsLoading =
    detailsStatus === "loading" || detailsStatus === "idle";
  return (
    <>
      <DetailsSection product={product} loading={productsLoading} />
      <div className="md:px-10 md:py-5 mx-auto">
        {BannerData.map((item, index) => (
          <div key={index} className="my-20 md:mx-20">
            <Banner {...item} />
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
