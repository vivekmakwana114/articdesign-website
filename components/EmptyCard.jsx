import React from "react";
import { emptyBasket } from "../assets";
import Image from "next/image";

const EmptyCard = () => {
  return (
    <section className="md:mx-20 mb-10 mx-5 my-5">
      <div className=" border-b">
        <h1 className=" text-[32px] font-bold md:py-5 ">Cart is Empty</h1>
      </div>
      <div className="flex flex-col justify-center items-center my-10">
        <Image
          src={emptyBasket}
          alt="image"
          className="md:w-[165px] md:h-[129px] "
        />

        <p className="text-[#1D1D1F] font-normal text-sm py-5">
          Sign in to see if you saved some items in cart
        </p>
        <button className=" bg-[#0071E3] rounded-[26px] text-base text-white p-3 w-[163px]">
          Sign in
        </button>
        <p className="text-[#0071E3] text-base font-normal py-10 underline underline-offset-2">
          Continue shopping
        </p>
      </div>
    </section>
  );
};

export default EmptyCard;
