"use client";
import React, { useState } from "react";
import { avatar1, avatar2, avatar3 } from "../../assets";
import Image from "next/image";

function SectionTestimonail() {
  const testimonials = [
    {
      name: "John Smith",
      image: avatar1,
      content:
        "Faucibus orci id quis consectetur laoreet sed. Enim congue molestie nam odio pulvinar ac ultricies. Elementum ut pellentesque volutpat mi. Faucibus sit posuere nisi aenean ultrices. Suscipit malesuada aenean nullam et sit dapibus eget a eu. Nisl tortor arcu et.",
    },
    {
      name: "Loki Bright",
      image: avatar2,
      content:
        "Ac consectetur laoreet sed. Enim congue molestie nam odio pulvinar ac ultricies. Elementum ut pellentesque volutpat mi. Faucibus sit posuere nisi aenean ultrices. Suscipit malesuada aenean nullam et sit dapibus eget a eu. Nisl tortor arcu et.",
    },
    {
      name: "Joy Dacor",
      image: avatar3,
      content:
        "Ac faucibus orci id quis consectetur laoreet sed. Enim congue molestie nam odio pulvinar ac ultricies. Elementum ut pellentesque volutpat mi. Faucibus sit posuere nisi aenean ultrices. Suscipit malesuada aenean nullam et sit dapibus eget a eu. Nisl tortor arcu et.",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(1);

  const isLeftArrowActive = activeIndex > 0;
  const isRightArrowActive = activeIndex < testimonials.length - 1;

  const navigate = (direction) => {
    const newIndex = activeIndex + direction;
    if (newIndex >= 0 && newIndex < testimonials.length) {
      setActiveIndex(newIndex);
    }
  };
  //
  return (
    <section className="bg-[#FCFCFC] md:px-20  flex flex-col md:justify-center items-center ">
      <div className="flex flex-col justify-center p-2 md:p-2 items-center md:w-[795px] md:h-[339px] w-full  rounded-md mt-5">
        {testimonials.map((testimonial, index) => (
          <>
            <div
              key={index}
              className={` ${
                activeIndex === index
                  ? "relative transition-all duration-1000"
                  : " transition-all duration-1000"
              }`}
            >
              {activeIndex === index && (
                <div className="relative ">
                  <p className="md:w-[592px] md:h-[112px] h-[42px]  w-full text-[#111827]  text-base  font-normal text-center italic">
                    {testimonial.content}
                  </p>

                  <div className="md:mb-8 md:mt-0 mt-20 md:pt-5 pt-10">
                    <h3 className=" text-center md:text-[19.2px] text-base font-semibold text-[#252525]">
                      {testimonial.name}
                    </h3>
                  </div>
                </div>
              )}
            </div>
          </>
        ))}
        <div className="flex relative ">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`card bg-cover p-2   rounded-full flex flex-row gap-5 ${
                activeIndex === index ? "active-card" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={testimonial.image}
                alt="Testimonial Image"
                width={50}
                height={50}
                className={` w-[50px] h-[50px] hover:cursor-pointer ${
                  activeIndex !== index
                    ? " opacity-60 filter brightness-125 transition-all duration-1000"
                    : "transition-all duration-1000"
                }`}
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SectionTestimonail;
