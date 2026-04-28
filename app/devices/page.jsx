"use client";
import React, { useEffect, useState, Suspense } from "react";
import {
  taponeimage,
  taptwoimage,
  tapthreeimage, 
  laptop,
  ipad,
  smartphogeometry,
} from "../../assets";

import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/components/Footer";
import Sectiontwo from "@/components/Home/Sectiontwo";
import TabLink from "@/components/TabLink";


import { useDispatch, useSelector } from "react-redux";
import { fetchDevices } from "@/state/device/deviceSlice";

function DevicesContent() {
  const dispatch = useDispatch();
  const { devicesData, devicesStatus } = useSelector((state) => state.device);

  const searchParams = useSearchParams(); // Use useSearchParams to get query params
  const category = searchParams.get("category") || "laptop"; // Get the 'category' param or default to 'laptop'
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(category); // Initialize activeTab with category from URL

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    router.push(`/devices?category=${tab}`); // Update URL with category param
  };

  useEffect(() => {
    // Update activeTab based on query param only when it exists, otherwise fallback to 'laptop'
    if (category) {
      setActiveTab(category);
    } else {
      setActiveTab("laptop");
    }
  }, [category]);

  useEffect(() => {
    dispatch(fetchDevices({ category }));
    window.scrollTo(0, 0);
  }, [category, dispatch]);

  const devices = devicesData.filter((device) =>
    device.name
      ?.toLowerCase()
      .includes(activeTab === "laptop" ? "mac" : activeTab),
  );
  const deviceLoading = devicesStatus === "loading";

  const renderTabContent = () => {
    if (activeTab === "laptop") {
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
            <div className="md:flex md:flex-wrap md:ml-16 px-3 grid grid-cols-2">
              {devices && devices.length > 0 ? (
                devices.map((frame, index) => (
                  <div
                    key={index}
                    className="w-full  md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-2px] md:mx-[-7px]"
                  >
                    <Link href={`/skinlaptop?skin=${frame._id}`}>
                      <div className="bg-[#F5F5F7] p-4 rounded-[8px] shadow-sm h-[215px] md:h-[300px] flex flex-col">
                        <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden">
                          <Image
                            src={frame.image || laptop}
                            alt={frame.name || "laptop image"}
                            width={100}
                            height={300}
                            className="w-full h-full md:h-full object-contain p-2"
                          />
                        </div>
                        <div className="mt-2 text-center">
                          <p className="text-[#000000] md:text-base text-sm font-medium">
                            {frame.name}
                          </p>
                          {frame.chipSet && (
                            <p className="text-[#86868B] md:text-sm text-xs font-medium mt-1">
                              {frame.chipSet}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="w-full flex justify-center items-center py-20">
                  <p className="text-gray-500 text-lg font-medium">
                    No Products found for MacBook devices.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      );
    } else if (activeTab === "ipad") {
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
              {devices && devices.length > 0 ? (
                devices.map((frame, index) => (
                  <div
                    key={index}
                    className="w-full  md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-2px] md:mx-[-7px] "
                  >
                    <Link href={`/skinipad?skin=${frame._id}`}>
                      <div className="bg-[#F5F5F7] p-4 rounded-[8px] shadow-sm h-[215px] md:h-[300px] flex flex-col">
                        <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden">
                          <Image
                            src={frame.image || ipad}
                            alt={frame.name || "ipad image"}
                            width={100}
                            height={300}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="mt-2 text-center">
                          <p className="text-[#000000] md:text-base text-sm font-medium">
                            {frame.name}
                          </p>
                          {frame.chipSet && (
                            <p className="text-[#86868B] md:text-sm text-xs font-medium mt-1">
                              {frame.chipSet}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="w-full flex justify-center items-center py-20">
                  <p className="text-gray-500 text-lg font-medium">
                    No Products found for iPad devices.
                  </p>
                </div>
              )}
            </div>
          )}
        </>
      );
    } else if (activeTab === "iphone") {
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
              {devices && devices.length > 0 ? (
                devices.map((frame, index) => (
                  <div
                    key={index}
                    className="w-full  md:w-1/2 lg:w-1/4 md:p-4 p-2 md:my-[-2px] md:mx-[-7px] "
                  >
                    <Link href={`/skinphone?skin=${frame._id}`}>
                      <div className="bg-[#F5F5F7] p-4 rounded-[8px] shadow-sm h-[215px] md:h-[300px] flex flex-col">
                        <div className="flex-1 w-full relative flex items-center justify-center overflow-hidden">
                          <Image
                            src={frame.image || smartphogeometry}
                            alt={frame.name || "phone image"}
                            width={100}
                            height={300}
                            className="w-full h-full object-contain p-2"
                          />
                        </div>
                        <div className="mt-2 text-center">
                          <p className="text-[#000000] md:text-base text-sm font-medium">
                            {frame.name}
                          </p>
                          {frame.chipSet && (
                            <p className="text-[#86868B] md:text-sm text-xs font-medium mt-1">
                              {frame.chipSet}
                            </p>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="w-full flex justify-center items-center py-20">
                  <p className="text-gray-500 text-lg font-medium">
                    No Products found for iPhone devices.
                  </p>
                </div>
              )}
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
        <div className="p-8 max-w-[550px] text-center mt-20">
          <h1 className="font-bold md:text-4xl text-xl">
            Turn Heads with a Skin: Elevate Your Device Style{" "}
          </h1>
        </div>
      </div>
      <div className="flex items-center justify-center my-3">
        <div className="border-b border-gray-500 w-80 flex justify-center items-center">
          <div className="flex rounded-lg justify-center items-center gap-4 relative">
            <TabLink
              category="laptop"
              activeTab={activeTab}
              tabStyles={tabStyles}
              image={taponeimage}
              label="Mac"
              onClick={handleTabClick}
              imageClass="w-[60px] h-[60px] object-contain"
            />

            <TabLink
              category="ipad"
              activeTab={activeTab}
              tabStyles={tabStyles}
              image={taptwoimage}
              label="iPad"
              onClick={handleTabClick}
              imageClass="w-[50px] h-[40px] object-contain"
            />

            <TabLink
              category="iphone"
              activeTab={activeTab}
              tabStyles={tabStyles}
              image={tapthreeimage}
              label="iPhone"
              onClick={handleTabClick}
              imageClass="w-[50px] h-[40px] object-contain"
            />
          </div>
        </div>
      </div>
      <br />
      <div className="mb-8">{renderTabContent()}</div>

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
