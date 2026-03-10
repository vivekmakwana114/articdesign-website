"use client";
import { Suspense, useEffect, useState } from "react";
import SkinSectionone from "@/components/skin/SkinSectionone";
import SkinSectiontwo from "@/components/skin/SkinSectiontwo";
import Sectionfive from "@/components/Home/Sectionfive";
import { useParams, useSearchParams } from "next/navigation";
import Sectiontwo from "@/components/Home/Sectiontwo";
import Footer from "@/components/Footer";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/state/product/productSlice";
import { fetchDevices } from "@/state/device/deviceSlice";

function SkinLaptopContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const skin = searchParams.get("skin");

  const { productsData, productsStatus } = useSelector((state) => state.product);
  const { devicesData, devicesStatus } = useSelector((state) => state.device);

  // Find the specific device if devicesData is fetched
  const device = devicesData.find((d) => d._id === skin) || {};

  useEffect(() => {
    dispatch(fetchDevices({ category: "laptop" }));
  }, [dispatch]);

  useEffect(() => {
    if (device._id) {
      dispatch(fetchProducts({ deviceId: device._id }));
    }
  }, [device._id, dispatch]);

  const products = productsData;
  const productsLoading = productsStatus === "loading";
  const devicesLoading = devicesStatus === "loading";

  return (
    <section className="md:py-0 py-5">
      <SkinSectionone
        params={skin}
        products={products}
        loading={productsLoading}
        spantext={device?.name}
        title="Wrap it in Skinsational Style! "
        subspantext="Elevate "
        subtitle=" to Iconic Status "
        slogan="Unlock a World of Exquisite Designs: Discover "
        subslogan="Your Perfect Match from Our Captivating Selection!"
      />

      <Sectiontwo />
      <SkinSectiontwo />
      <Sectionfive />
      <Footer />
    </section>
  );
}

function SkinLaptop() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SkinLaptopContent />
    </Suspense>
  );
}

export default SkinLaptop;
