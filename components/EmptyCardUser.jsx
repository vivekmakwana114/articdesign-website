import React from "react";
import { shopping_cart } from "../assets";
import Image from "next/image";

const EmptyCardUser = () => {
  return (
    <section className="md:mx-20 mb-10 mx-5 my-5">
      <div className="flex flex-col justify-center items-center my-10">
        <div className="md:h-[65px] md:w-[65px] rounded-full bg-[#E0EFFF] flex justify-center items-center my-4">
          <Image
            src={shopping_cart}
            alt="image"
            className="md:w-[31.03px] md:h-[29.28px] "
          />
        </div>

        <p className="text-[#000000] font-medium text-base py-5">
          You have placed no order yet!
        </p>
        <p className=" text-sm text-[#86868B] p-3 md:w-[391px] py-2">
          Uh-oh, it looks like you haven't placed any orders yet!
        </p>
        <p className="text-[#0071E3] text-sm font-normal  underline underline-offset-2">
          Continue shopping
        </p>
      </div>
    </section>
  );
};

export default EmptyCardUser;
