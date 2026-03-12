"use client";
import Footer from "@/components/Footer";
import React, { useState } from "react";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

function FAQ() {
  const [openSection, setOpenSection] = useState(null);
  
  const faqData = [
    {
      id: "q1",
      question: "What is ArticWood?",
      answer: "ArticWood is a premium brand and acquisition funnel platform that provides high-quality skins and accessories for your devices."
    },
    {
      id: "q2",
      question: "How do I apply the skins?",
      answer: "Applying ArticWood skins is easy. Each skin comes with a step-by-step guide and we have video tutorials on our YouTube channel to help you achieve a bubble-free finish."
    },
    {
      id: "q3",
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for unused products in their original packaging. Please visit our Returns page for more detailed information."
    },
    {
      id: "q4",
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. Shipping times and costs vary depending on the destination."
    }
  ];

  const toggleSection = (section) => {
    if (openSection === section) {
      setOpenSection(null);
    } else {
      setOpenSection(section);
    }
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center md:px-80 md:py-1 px-20">
        <h1 className=" text-[#1D1D1F] font-semibold md:text-[48px] text-[24px] py-10">
          Frequently Asked Questions
        </h1>
        
        <div className="space-y-2 my-8">
          {faqData.map((item) => (
            <div key={item.id} className="rounded-lg md:w-[611px] w-[346px]">
              <div
                className="flex items-center justify-between p-4 cursor-pointer bg-[#F5F5F7]"
                onClick={() => toggleSection(item.id)}
              >
                <span className="flex justify-center items-center gap-2 text-[17px] font-medium text-[#1D1D1F]">
                  {item.question}
                </span>
                <span className="text-2xl font-semibold">
                  {openSection === item.id ? <AiOutlineMinus /> : <AiOutlinePlus />}
                </span>
              </div>
              {openSection === item.id && (
                <div className="p-4 bg-[#F5F5F7] my-1">
                  <div className="p-2">
                    <p className=" text-[16px] font-normal text-[#111827] ">
                      {item.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default FAQ;
