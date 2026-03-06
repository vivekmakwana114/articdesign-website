import { appleIcon, googleIcon } from "@/assets";
import Image from "next/image";
import React from "react";

const SocialLogin = ({ googelName, appleName }) => {
  return (
    <div className="flex flex-col space-y-4">
      <button className=" border bg-[#ffffff] rounded-[6px] p-3 font-medium text-base flex justify-center items-center gap-2">
        <Image src={googleIcon} className="w-[20px] h-[20px]" /> {googelName}
      </button>
      <button className=" border bg-[#ffffff] rounded-[6px] p-3 font-medium text-base flex justify-center items-center gap-2">
        <Image src={appleIcon} className="w-[20px] h-[20px]" /> {appleName}
      </button>
    </div>
  );
};

export default SocialLogin;
