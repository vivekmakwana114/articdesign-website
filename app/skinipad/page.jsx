"use client";
import { Suspense } from "react";

import Footer from "../../components/Footer";
import SkinSectionone from "@/components/skin/SkinSectionone";
import Sectiontwo from "@/components/Home/Sectiontwo";
import SkinSectiontwo from "@/components/skin/SkinSectiontwo";
import Sectionfive from "@/components/Home/Sectionfive";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/state/product/productSlice";
import { fetchDevices } from "@/state/device/deviceSlice";

function SkinipadContent() {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const skin = searchParams.get("skin");

  const { productsData, productsStatus } = useSelector((state) => state.product);
  const { devicesData, devicesStatus } = useSelector((state) => state.device);

  // Find the specific device if devicesData is fetched
  const device = devicesData.find((d) => d._id === skin) || {};

  useEffect(() => {
    dispatch(fetchDevices({ category: "ipad" }));
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
    <>
      <SkinSectionone
        params={skin}
        products={products}
        loading={productsLoading}
        spantext={device.name}
        title="Wrap it in Skinsational Style! "
        subspantext="Elevate "
        subtitle=" to Iconic Status "
        slogan="Unlock a World of Exquisite Designs: Discover"
        subslogan="Your Perfect Match from Our Captivating Selection!"
      />
      <Sectiontwo />
      <SkinSectiontwo />
      <Sectionfive />
      <Footer />
    </>
  );
}

function Skinipad() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SkinipadContent />
    </Suspense>
  );
}

export default Skinipad;
