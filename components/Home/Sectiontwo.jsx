"use client";

import React from "react";
import { ipadwithskin } from "../../assets";
import Button from "../Button";
import Image from "next/image";
import { useEffect, useState } from "react";
import api from "@/lib/api";

function Sectiontwo() {
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchContent = async () => {
      setLoading(true);
      setError(null);
      try {
        // Adjust this endpoint to your actual CMS/Backend route
        const res = await api.get(`/home/section-two`);
        const data = res.data;
        if (data) setContent(data?.section || data);
      } catch (e) {
        if (isMounted) setError(e?.message || "Failed to load content");
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    fetchContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const titlePrefix = content?.titlePrefix || "Unleash";
  const highlight = content?.highlight || "Skinsational Protection!";
  const subtitle =
    content?.subtitle || "Fortify Your Gear, Embrace Invincibility";
  const description =
    content?.description ||
    "Elevate Your Devices to Match Your Impeccable Style. Discover a World of Exquisite Possibilities: From Sleek Wood and Daring Carbon Fiber to Luxurious Leather and Edgy Grunge. It's More Than a Skin, It's a Revolution in Design.";
  const ctaText = content?.ctaText || "Style your device";
  const ctaLink = content?.ctaLink || "devices?category=ipads";
  const imageSrc = content?.imageUrl || ipadwithskin;

  return (
    <section className=" bg-[#FCFCFC]  md:px-2 ">
      <div className="flex lg:flex-row  md:mx-20 md:gap-x-9 md:justify-center items-center flex-col py-28 md:py-0 gap-16">
        <Image
          src={imageSrc}
          alt="image"
          className="md:h-[560px] md:w-[510px] h-[309px] w-[309px] bg-contain"
          priority={true}
        />
        <div className="space-y-3 md:flex  md:flex-col md:justify-center">
          <h1 className="md:text-[36px] text-[21px] md:font-bold font-semibold text-[#000000]">
            {titlePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00F260] to-[#0575E6]">
              {highlight}
            </span>
          </h1>
          <h4 className="text-[#8C8C8C] md:text-2xl text-base font-semibold">
            {subtitle}
          </h4>
          <p className="text-[#86868B] md:text-base text-sm md:font-medium font-normal md:w-[543px] w-[294px] ">
            {description}
          </p>
          <br />
          <div className="file:">
            <Button
              title={loading ? "Loading..." : ctaText}
              textsize="17px"
              fontweight="normal"
              link={ctaLink}
              className="p-10"
            />
          </div>
          {/* {error ? (
            <p className="text-red-500 text-sm">{error}</p>
          ) : null} */}
        </div>
      </div>
    </section>
  );
}

export default Sectiontwo;
