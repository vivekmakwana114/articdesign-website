"use client";
import React, { useState } from "react";
import { facebook, instagram, youtube } from "../assets"; // Ensure these are properly imported
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import Link from "next/link";
import Image from "next/image";

function Footer() {
  const [sections, setSections] = useState([
    {
      title: "Help & Support",
      content: [
        { label: "FAQ", href: "/faq" },
        { label: "How to Apply", href: "/how-to-apply" },
        { label: "Payments & Shipping", href: "/payment-shipping" },
        { label: "Contact Us", href: "/contactus" },
      ],
    },
    {
      title: "Resources",
      content: [
        { label: "Skins", href: "/devices?category=laptop" },
        { label: "iPhone", href: "/devices?category=iphone" },
        { label: "iPad", href: "/devices?category=ipad" },
        { label: "MacBook", href: "/devices?category=laptop" },
      ],
    },
    {
      title: "About",
      content: [
        { label: "Our Story", href: "/whyus" },
        { label: "Email us", href: "mailto:info@articwood.com" },
      ],
    },
  ]);

  const [activeSection, setActiveSection] = useState(
    Array.from({ length: sections.length }, (_, index) => index)
  );

  const toggleSection = (index) => {
    if (activeSection.includes(index)) {
      setActiveSection(activeSection.filter((item) => item !== index));
    } else {
      setActiveSection([...activeSection, index]);
    }
  };

  return (
    <section className="bg-[#F5F5F7] md:p-10  md:flex md:justify-center md:items-center">
      <div className="md:pt-12 md:ml-[150px] md:mr-[50px] ml-5 mr-10 gap-y-7 md:block hidden">
        <div className="md:grid md:grid-cols-4 h-full w-full md:gap-24 gap-10 border-b-2 py-9 flex flex-col">
          <section className="md:block hidden">
            <h3 className="text-sm font-inter font-semibold">ArticWood</h3>
            <h3 className="text-sm font-inter font-normal pt-3 text-[#6B7280]">
              Gain new customers with our brand new acquisition funnels.
            </h3>
            <div className="flex gap-4 my-3">
              <Link href="/instagram" target="blank">
                <Image src={instagram} alt="Instagram" width={24} height={24} />
              </Link>

              <Link href="/facebook" target="blank">
                <Image src={facebook} alt="Facebook" width={24} height={24} />
              </Link>

              <Link href="/youtube" target="blank">
                <Image src={youtube} alt="YouTube" width={24} height={24} />
              </Link>
            </div>
          </section>
          <section>
            <h3 className="text-sm font-inter font-semibold">Help & Support</h3>
            <ul className="flex flex-col gap-2 font-medium text-base font-inter pt-2 text-[#6B7280]">
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
              <li>
                <Link href="/how-to-apply">How to Apply</Link>
              </li>
              <li>
                <Link href="/payment-shipping">Payments & Shipping</Link>
              </li>
              <li>
                <Link href="/contactus">Contact Us</Link>
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-sm font-Inter font-semibold">Resources</h3>
            <ul className="flex flex-col gap-2 font-medium text-base font-inter pt-2 text-[#6B7280]">
              <Link href="/devices?category=laptop">
                <li>Skins</li>
              </Link>
              <Link href="/devices?category=iphone">
                <li>iPhone</li>
              </Link>
              <Link href="/devices?category=ipad">
                <li>iPad</li>
              </Link>
              <Link href="/devices?category=laptop">
                <li>MacBook</li>
              </Link>
            </ul>
          </section>
          <section>
            <h3 className="text-sm font-inter font-semibold">About</h3>
            <ul className="flex flex-col gap-2 font-medium text-base font-inter pt-2 text-[#6B7280]">
              <li>
                <Link href="/whyus">Our Story</Link>
              </li>
              {/* <li>Media Kit</li>
              <li>Blog</li> */}
              <li>
                <a href="mailto:info@articwood.com">Email us</a>
              </li>
            </ul>
          </section>
        </div>
        <section className="flex md:items-end md:justify-end md:pt-10 py-5 gap-10">
          <Link href="/termsandconditions">
            <h3 className="font-normal text-sm md:text-end font-inter text-[#6B7280]">
              Terms of Service
            </h3>
          </Link>
          <Link href="/privacypolicy">
            <h3 className="font-normal md:text-end text-sm font-inter text-[#6B7280]">
              Privacy Policy
            </h3>
          </Link>
        </section>
      </div>

      <div className="gap-10 border-b-2 pt-8 flex flex-col-reverse pr-5 pl-3 md:hidden">
        {sections.map((section, index) => (
          <div key={index} className="mb-4 border-t">
            <div
              className="flex justify-between cursor-pointer pt-2"
              onClick={() => toggleSection(index)}
            >
              <h3 className="text-[16px] font-inter font-semibold">
                {section.title}
              </h3>
              {activeSection.includes(index) ? (
                <IoIosArrowUp className="text-[#000000] text-xl" />
              ) : (
                <IoIosArrowDown className="text-[#000000] text-xl" />
              )}
            </div>
            {activeSection.includes(index) && (
              <div className="mt-2">
                {typeof section.content === "string" ? (
                  <p className="text-sm font-inter font-normal text-[#6B7280]">
                    {section.content}
                  </p>
                ) : (
                  <ul className="flex flex-col gap-2 font-medium text-base font-inter text-[#6B7280]">
                    {section.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="pl-2">
                        {item.label === "Email us" ? (
                          <a href={item.href}>{item.label}</a>
                        ) : (
                          <Link href={item.href}>{item.label}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Mobile-only social links section moved here so it's visible on small screens */}
      <section className="px-5 pb-8 pt-8 md:hidden">
        <h3 className="text-[16px] font-inter font-semibold">ArticWood</h3>
        <h3 className="text-[14px] font-inter font-normal pt-3 text-[#6B7280]">
          Gain new customers with our brand new acquisition funnels.
        </h3>
        <div className="flex gap-4 my-3">
          <Link href="/instagram" target="blank">
            <Image src={instagram} alt="Instagram" width={24} height={24} />
          </Link>

          <Link href="/facebook" target="blank">
            <Image src={facebook} alt="Facebook" width={24} height={24} />
          </Link>

          <Link href="/youtube" target="blank">
            <Image src={youtube} alt="YouTube" width={24} height={24} />
          </Link>
        </div>

        <div className="flex gap-5">
          <Link href="/termsandconditions">
            <span className="text-sm font-inter font-normal pt-3 text-[#6B7280]">Terms of Service</span>
          </Link>
          <Link href="/privacypolicy">
            <span className="text-sm font-inter font-normal pt-3 text-[#6B7280]">Privacy Policy </span>
          </Link>
        </div>
      </section>
    </section>
  );
}

export default Footer;
