"use client";
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Button from "./Button";
// Add custom styles
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

const Slider = ({ images }) => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      infiniteLoop={true}
      transitionTime={1000}
      interval={5000}
      renderArrowPrev={(clickHandler, hasPrev) => {
        return (
          <div
            className={`${
              hasPrev ? "absolute" : "hidden"
            } top-0 bottom-0 left-0 flex justify-center items-center p-2 opacity-30 hover:opacity-100 cursor-pointer z-20`}
            onClick={clickHandler}
          >
            <MdKeyboardArrowLeft className="w-[35px] h-[35px] text-[#ffffff]" />
          </div>
        );
      }}
      renderArrowNext={(clickHandler, hasNext) => {
        return (
          <div
            className={`${
              hasNext ? "absolute" : "hidden"
            } top-0 bottom-0 right-[-8px] flex justify-center items-center p-2 opacity-30 hover:opacity-100 cursor-pointer z-20`}
            onClick={clickHandler}
          >
            <MdKeyboardArrowRight className="w-[35px] h-[35px] text-[#ffffff]" />
          </div>
        );
      }}
    >
      {/*  w-[610px] */}
      {images.map((image, index) => (
        <div
          key={index}
          className="carousel-item  w-full  md:h-[593px] h-[407px]  relative bg-contain"
        >
          <Image
            src={image.image}
            alt={`Slide ${index}`}
            className="md:h-full h-full object-cover"
          />
          <div className="md:w-[956px] h-full bg-gradient-to-r from-[#000000c9] to-[#4D4D4D00] absolute md:left-0"></div>
          <div className="md:ml-[-59px] ml-[20px] md:flex md:flex-col md:justify-start md:items-start carousel-caption text-white transform -translate-x-1/2 md:space-y-5 space-y-2">
            <h2 className="md:text-2xl text-[#86868B] md:font-bold text-base font-bold">
              {image.subcaption}
            </h2>
            <h2 className="md:text-[96px] text-[64px] font-semibold">
              {image.caption}
            </h2>
            <p className="md:text-lg md:w-[600px] w-[261px]">
              {image.description}
            </p>
            {/* <p className="md:text-lg ">{image.subdescription}</p> */}
            <div className="">
              <Button
                title="Customize now"
                textsize="24px"
                fontweight="medium"
                link="devices?category=iphone"
              />
            </div>
          </div>
        </div>
      ))}
    </Carousel>
  );
};

export default Slider;
