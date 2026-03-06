"use client";
import React, { useEffect, useState, Suspense } from "react";
import { taponeimage, taptwoimage, tapthreeimage } from "../../assets";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Sectiontwo from "@/components/Home/Sectiontwo";
import TabLink from "@/components/TabLink";

import api from "@/lib/api";

function DevicesContent() {
  const [devices, setDevices] = useState([]);
  const [deviceLoading, setDeviceLoading] = useState(false);
  const searchParams = useSearchParams(); // Use useSearchParams to get query params
  const category = searchParams.get("category") || "laptops"; // Get the 'category' param or default to 'laptops'
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(category); // Initialize activeTab with category from URL

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    router.push(`/devices?category=${tab}`); // Update URL with category param
  };
  useEffect(() => {
    // Update activeTab based on query param only when it exists, otherwise fallback to 'laptops'
    if (category) {
      setActiveTab(category);
    }
  }, [category]);

  useEffect(() => {
    fetchDevices();
    window.scrollTo(0, 0);
  }, [category]);

  const fetchDevices = async () => {
    setDeviceLoading(true);
    try {
      const response = await api.get(`/devices?category=${category}`);
      setDevices(response.data.devices);
    } catch (err) {
      console.error(err);
    } finally {
      setDeviceLoading(false);
    }
  };

  const renderTabContent = () => {
    if (activeTab === "laptops") {
      return (
        <>
          {deviceLoading ? (
            <section className="p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
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
              {devices?.map((frame, index) => (
                <div
                  key={index}
                  className="w-full  md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-2px] md:mx-[-7px]"
                >
                  <Link href={`/skinlaptop?skin=${frame.slug}`}>
                    <div className="bg-[#F5F5F7] p-4 rounded-[8px] shadow-sm h-[329px]">
                      <div className="h-[70%]  relative flex items-center justify-center">
                        <Image
                          src={frame.deviceImage}
                          alt={frame.deviceName}
                          width={100}
                          height={300}
                          className="w-full h-auto object-contain p-2"
                        />
                      </div>
                      <p className="mt-2 text-center text-[#000000] md:text-base text-sm  font-medium">
                        {frame.deviceName}
                      </p>
                      <p className="mt-2 text-center text-[#86868B] text-base font-medium">
                        {frame.chipSet}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      );
    } else if (activeTab === "ipads") {
      return (
        <>
          {deviceLoading ? (
            <section className="p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
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
              {devices?.map((frame, index) => (
                <div
                  key={index}
                  className="w-full  md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-2px] md:mx-[-7px] "
                >
                  <Link href={`/skinipad?skin=${frame.slug}`}>
                    <div className="bg-[#F5F5F7] p-4 rounded-[8px] shadow-sm h-[329px]">
                      <div className="h-[70%]  relative flex items-center justify-center">
                        <Image
                          src={frame.deviceImage}
                          alt={frame.deviceName}
                          width={100}
                          height={300}
                          className="w-[70%] h-auto object-contain p-2"
                        />
                      </div>
                      <p className="mt-2 text-center text-[#000000] md:text-base text-sm  font-medium">
                        {frame.deviceName}
                      </p>
                      <p className="mt-2 text-center text-[#86868B] text-base font-medium">
                        {frame.chipSet}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      );
    } else if (activeTab === "phones") {
      return (
        <>
          {deviceLoading ? (
            <section className="p-10">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {Array.from({ length: 12 }).map((_, index) => (
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
              {devices?.map((frame, index) => (
                <div
                  key={index}
                  className="w-full  md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-2px] md:mx-[-7px] "
                >
                  <Link href={`/skinphone?skin=${frame.slug}`}>
                    <div className="bg-[#F5F5F7] p-4 rounded-[8px] shadow-sm  h-[329px]">
                      <div className="h-[70%]  relative flex items-center justify-center">
                        <Image
                          src={frame.deviceImage}
                          alt={frame.deviceName}
                          width={100}
                          height={300}
                          className="w-auto h-[80%] object-contain p-2"
                        />
                      </div>
                      <p className="mt-2 text-center text-[#000000] md:text-base text-sm  font-medium">
                        {frame.deviceName}
                      </p>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </>
      );
    }
    // Handle additional tabs here if needed
    return null;
  };
  const tabStyles = {
    inactive: {
      color: "#86868B",
      fontWeight: "normal",
      textDecoration: "none", // Remove underline for inactive tabs
    },
    active: {
      color: "#0071E3",
      fontWeight: "bold",
      textDecoration: "none", // No underline for active tab (will use borderBottom)
      borderBottom: "2px solid #0080ff", // Underline color for active tab
      zIndex: 20, // Set z-index for active tab
    },
  };

  return (
    <>
      <div className="flex items-center justify-center">
        {/* The content you want to center */}
        <div className="p-8 max-w-[550px] text-center">
          <h1 className="font-bold md:text-4xl text-xl">
            Turn Heads with a Skin: Elevate Your Device Style{" "}
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center my-3">
        <div className="border-b border-gray-500 w-80 flex justify-center items-center">
          <div className="flex rounded-lg justify-center items-center gap-4 relative">
            <TabLink
              category="laptops"
              activeTab={activeTab}
              tabStyles={tabStyles}
              image={taponeimage}
              label="Mac"
              onClick={handleTabClick}
            />

            <TabLink
              category="ipads"
              activeTab={activeTab}
              tabStyles={tabStyles}
              image={taptwoimage}
              label="iPad"
              onClick={handleTabClick}
              imageClass="w-[40px] h-[50px]"
            />

            <TabLink
              category="phones"
              activeTab={activeTab}
              tabStyles={tabStyles}
              image={tapthreeimage}
              label="Phone"
              onClick={handleTabClick}
              imageClass="w-[40px] h-[45px]"
            />
          </div>
        </div>
      </div>
      <br />
      <div className="mb-24">{renderTabContent()}</div>

      <Sectiontwo />
      <Footer />
    </>
  );
}

function Devices() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DevicesContent />
    </Suspense>
  );
}
export default Devices;
