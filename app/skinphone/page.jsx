"use client";
import { Suspense } from "react";
import Footer from "../../components/Footer";
import SkinSectionone from "@/components/skin/SkinSectionone";
import Sectiontwo from "@/components/Home/Sectiontwo";
import SkinSectiontwo from "@/components/skin/SkinSectiontwo";
import Sectionfive from "@/components/Home/Sectionfive";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import api from "@/lib/api";

function SkinPhoneContent() {
  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);
  const [device, setDevice] = useState({});
  const [devicesLoading, setDevicesLoading] = useState(false);
  const searchParams = useSearchParams(); // Use useSearchParams to get query params
  const skin = searchParams.get("skin");
  useEffect(() => {
    fetchProducts();
    fetchDevice();
  }, [skin]);

  const fetchProducts = async () => {
    setProductsLoading(true);
    try {
      const response = await api.get(`/products?skin=${skin}`);
      setProducts(response.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setProductsLoading(false);
    }
  };
  const fetchDevice = async () => {
    setDevicesLoading(true);
    try {
      const response = await api.get(`/devices/${skin}`);
      setDevice(response.data.device || {});
    } catch (err) {
      console.error(err);
    } finally {
      setDevicesLoading(false);
    }
  };

  return (
    <>
      <SkinSectionone
        params={skin}
        products={products}
        loading={productsLoading}
        spantext={device.deviceName}
        title="Wrap it in Skinsational Style!"
        subspantext="Elevate "
        subtitle=" to Iconic Status"
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

function SkinPhone() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SkinPhoneContent />
    </Suspense>
  );
}

export default SkinPhone;
