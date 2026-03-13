"use client";
import React, { useState } from "react";
import { menus } from "./Mymenus";
import Link from "next/link";

const NavLinks = () => {
  return (
    <>
      {menus.map((menu, i) => (
        <div key={i} className="relative group">
          <div className="px-2 text-left md:cursor-pointer group font-inter font-normal ">
            <h1
              className="py-2 flex justify-between items-center md:pr-0 pr-5 group text-sm font-normal
               hover:text-sm  hover:text-[#aeaeaeb3] hover:duration-500 hover:transition-all
               "
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
          {/* Submenu dropdown */}
          {menu.submenus && (
            <div className="absolute top-full left-0 hidden group-hover:block bg-[#1D1D1F] min-w-[150px] shadow-lg py-2 z-[100]">
              {menu.submenus.map((sub, j) => (
                <Link
                  key={j}
                  href={sub.link}
                  className="block px-4 py-2 text-sm text-white hover:bg-[#303030c7] transition-colors"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default NavLinks;
