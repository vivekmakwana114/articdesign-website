"use client";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function TermsandConditions() {
  const [openSection, setOpenSection] = useState("one");
  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };
  return (
    <>
      <section className="flex flex-col justify-center items-center mt-10">
        <h1 className=" text-[#1D1D1F] font-semibold md:text-[48px] text-[24px] py-10">
          Terms & Conditions
        </h1>
        <p className="md:w-[608px] w-[348px]">
          Lorem ipsum dolor sit amet consectetur. Vitae blandit sit risus dolor
          mauris leo nam sed. Mattis arcu vestibulum eu id enim quisque facilisi
          vitae. Eget leo proin rutrum ultrices aliquam cras. Vitae ante dui et
          porttitor tristique vestibulum. Fermentum neque donec diam tincidunt
          nulla pretium. Netus interdum sollicitudin et eget malesuada commodo.
          In lectus venenatis interdum et vestibulum volutpat maecenas et. Amet
          hendrerit mattis sit diam enim. Faucibus quam non mauris habitasse
          venenatis commodo. Convallis volutpat phasellus quam scelerisque
          sagittis amet consequat diam elit. Massa consectetur nullam habitasse
          elementum tempor duis. Id in dui est turpis massa eu id donec
          porttitor.
        </p>
        <br />
        <p className="md:w-[608px] w-[348px]">
          Magna in dictumst metus vel ultrices sapien vel nisi. Diam vulputate
          aliquet urna aliquet sodales diam elit. Et volutpat est tristique et
          lacus id eu nunc. Aliquet pellentesque nulla diam ipsum sit. Bibendum
          feugiat leo scelerisque mauris tellus lacus interdum magnis integer.
          Morbi sagittis pulvinar tincidunt donec auctor enim in lorem. Quisque
          feugiat urna enim massa sapien facilisis eros. Felis ac tincidunt leo
          neque arcu lacus ultrices sapien. Vestibulum facilisis diam eu
          senectus scelerisque amet nisi donec quisque. Diam nisl risus congue
          habitasse.
        </p>

        <div className="space-y-2 my-8">
          <div className=" rounded-lg md:w-[611px] w-[346px]">
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-[#F5F5F7]"
              onClick={() => toggleSection("one")}
            >
              <span className="flex justify-center items-center gap-2 text-[17px] font-medium text-[#1D1D1F]">
                Condition Topic
              </span>
              <span className="text-2xl font-semibold">
                {openSection === "one" ? <AiOutlineMinus /> : <AiOutlinePlus />}
              </span>
            </div>
            {openSection === "one" && (
              <div className="p-4 bg-[#F5F5F7] my-1">
                <div className="p-2">
                  <p className=" text-[16px] font-normal text-[#111827] ">
                    Magna in dictumst metus vel ultrices sapien vel nisi. Diam
                    vulputate aliquet urna aliquet sodales diam elit. Et
                    volutpat est tristique et lacus id eu nunc. Aliquet
                    pellentesque nulla diam ipsum sit. Bibendum feugiat leo
                    scelerisque mauris tellus lacus interdum magnis integer.
                    Morbi sagittis pulvinar tincidunt donec auctor enim in
                    lorem. Quisque feugiat urna enim massa sapien facilisis
                    eros. Felis ac tincidunt leo neque arcu lacus ultrices
                    sapien. Vestibulum facilisis diam eu senectus scelerisque
                    amet nisi donec quisque. Diam nisl risus congue habitass
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Orders Section */}
          <div className="rounded-lg md:w-[611px] w-[346px]">
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-[#F5F5F7]"
              onClick={() => toggleSection("orders")}
            >
              <span className="flex justify-center items-center gap-2 text-[17px] font-medium text-[#1D1D1F]">
                Condition Topic
              </span>
              <span className="text-2xl font-semibold">
                {openSection === "orders" ? (
                  <AiOutlineMinus />
                ) : (
                  <AiOutlinePlus />
                )}
              </span>
            </div>

            {openSection === "orders" && (
              <div className="p-4 bg-[#F5F5F7] my-1">
                <div className="p-2">
                  <p className=" text-[16px] font-normal text-[#111827]">
                    Magna in dictumst metus vel ultrices sapien vel nisi. Diam
                    vulputate aliquet urna aliquet sodales diam elit. Et
                    volutpat est tristique et lacus id eu nunc. Aliquet
                    pellentesque nulla diam ipsum sit. Bibendum feugiat leo
                    scelerisque mauris tellus lacus interdum magnis integer.
                    Morbi sagittis pulvinar tincidunt donec auctor enim in
                    lorem. Quisque feugiat urna enim massa sapien facilisis
                    eros. Felis ac tincidunt leo neque arcu lacus ultrices
                    sapien. Vestibulum facilisis diam eu senectus scelerisque
                    amet nisi donec quisque. Diam nisl risus congue habitass
                  </p>
                </div>
              </div>
            )}
          </div>
          {/* Inbox Section */}
          <div className="rounded-lg md:w-[611px] w-[346px]">
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-[#F5F5F7]"
              onClick={() => toggleSection("inbox")}
            >
              <span className="flex justify-center items-center gap-2 text-[17px] font-medium text-[#1D1D1F]">
                Condition Topic
              </span>
              <span className="text-2xl font-semibold">
                {openSection === "inbox" ? (
                  <AiOutlineMinus />
                ) : (
                  <AiOutlinePlus />
                )}
              </span>
            </div>
            {openSection === "inbox" && (
              <div className="p-4 bg-[#F5F5F7] my-1">
                <div className="p-2">
                  <p className=" text-[16px] font-normal text-[#111827]">
                    Magna in dictumst metus vel ultrices sapien vel nisi. Diam
                    vulputate aliquet urna aliquet sodales diam elit. Et
                    volutpat est tristique et lacus id eu nunc. Aliquet
                    pellentesque nulla diam ipsum sit. Bibendum feugiat leo
                    scelerisque mauris tellus lacus interdum magnis integer.
                    Morbi sagittis pulvinar tincidunt donec auctor enim in
                    lorem. Quisque feugiat urna enim massa sapien facilisis
                    eros. Felis ac tincidunt leo neque arcu lacus ultrices
                    sapien. Vestibulum facilisis diam eu senectus scelerisque
                    amet nisi donec quisque. Diam nisl risus congue habitass
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className="rounded-lg md:w-[611px] w-[346px]">
            <div
              className="flex items-center justify-between p-4 cursor-pointer bg-[#F5F5F7]"
              onClick={() => toggleSection("trackorder")}
            >
              <span className="flex justify-center items-center gap-2 text-[17px] font-medium text-[#1D1D1F]">
                Condition Topic
              </span>
              <span className="text-2xl font-semibold">
                {openSection === "trackorder" ? (
                  <AiOutlineMinus />
                ) : (
                  <AiOutlinePlus />
                )}
              </span>
            </div>
            {openSection === "trackorder" && (
              <div className="p-4 bg-[#F5F5F7] my-1">
                <div className="p-2">
                  <p className=" text-[16px] font-normal text-[#111827]">
                    Magna in dictumst metus vel ultrices sapien vel nisi. Diam
                    vulputate aliquet urna aliquet sodales diam elit. Et
                    volutpat est tristique et lacus id eu nunc. Aliquet
                    pellentesque nulla diam ipsum sit. Bibendum feugiat leo
                    scelerisque mauris tellus lacus interdum magnis integer.
                    Morbi sagittis pulvinar tincidunt donec auctor enim in
                    lorem. Quisque feugiat urna enim massa sapien facilisis
                    eros. Felis ac tincidunt leo neque arcu lacus ultrices
                    sapien. Vestibulum facilisis diam eu senectus scelerisque
                    amet nisi donec quisque. Diam nisl risus congue habitass
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default TermsandConditions;
