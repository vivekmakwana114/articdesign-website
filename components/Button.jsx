import Link from "next/link";
import React from "react";

const Button = ({ title, width = "208", textsize, link, height = "53" }) => {
  return (
    <Link href={`${link}`}>
      <button
        className={`text-[${textsize}px] flex justify-center md:my-5 my-2 md:font-medium items-center rounded-[26px] md:w-[${width}px] md:h-[${height}px] bg-[#0071E3] md:px-4 px-2 md:py-[11.5px] py-[8px] text-white md:text-[${textsize}px] text-center`}
      >
        {title}
      </button>
    </Link>
  );
};

export default Button;
