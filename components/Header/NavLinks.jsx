"use client";
import React, { useState } from "react";
import { menus } from "./Mymenus";
import Link from "next/link";

const NavLinks = () => {
  const [heading, setHeading] = useState("");
  const [subHeading, setSubHeading] = useState("");

  return (
    <>
      {menus.map((menu, i) => (
        <div key={i}>
          <div className="px-2 text-left md:cursor-pointer group font-inter font-normal ">
            <h1
              className="py-2 flex justify-between items-center md:pr-0 pr-5 group text-sm font-normal
               hover:text-sm  hover:text-[#aeaeaeb3] hover:duration-500 hover:transition-all
               "
              onClick={() => {
                heading !== menu.name ? setHeading(menu.name) : setHeading("");
                setSubHeading("");
              }}
            >
              <Link
                href={`${
                  menu.params ? `/devices?category=${menu.link}` : menu.link
                }`}
              >
                {menu.name}
              </Link>
            </h1>
          </div>
          {/* Mobile menus */}
        </div>
      ))}
    </>
  );
};

export default NavLinks;
