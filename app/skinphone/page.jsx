"use client";
import Footer from "../../components/Footer";
import SkinSectionone from "@/components/skin/SkinSectionone";
import Sectiontwo from "@/components/Home/Sectiontwo";
import SkinSectiontwo from "@/components/skin/SkinSectiontwo";
import Sectionfive from "@/components/Home/Sectionfive";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import {
  productsFailure,
  productsStart,
  productsSuccess,
} from "@/redux/products/productsSlice";
import {
  singleDeviceFailure,
  singleDeviceStart,
  singleDeviceSuccess,
} from "@/redux/devices/devicesSlice";
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "@/api/fetchWrapper";

function SkinPhone() {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsErorr,
  } = useSelector((state) => state.products);
  const {
    device,
    loading: devicesLoading,
    error: devicesError,
  } = useSelector((state) => state.devices);
  const searchParams = useSearchParams(); // Use useSearchParams to get query params
  const skin = searchParams.get("skin");
  useEffect(() => {
    fetchProducts();
    fetchDevice();
  }, [skin, dispatch]);

  const fetchProducts = async () => {
    dispatch(productsStart());
    try {
      const response = await getRequest(`/products?skin=${skin}`);
      const data = await response.json();
      dispatch(productsSuccess(data.products));
    } catch (err) {
      dispatch(productsFailure());
    }
  };
  const fetchDevice = async () => {
    dispatch(singleDeviceStart());
    try {
      const response = await getRequest(`/devices/${skin}`);
      const data = await response.json();
      dispatch(singleDeviceSuccess(data.device));
    } catch (err) {
      dispatch(singleDeviceFailure());
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

export default SkinPhone;
