import Link from "next/link";
import React from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";

function ForgetSuccessMessage() {
  return (
    <section className="flex flex-col justify-center items-center md:m-28 my-20">
      <form className="flex flex-col space-y-5 md:min-w-96">
        <Link href="/login">
          <p className=" font-bold text-sm text-[#0071E3] flex justify-start items-center gap-3 my-5">
            <HiArrowNarrowLeft className="cursor-pointer text-3xl font-bold" />
            Back
          </p>
        </Link>
        <h1 className=" text-[#111827] text-[20px] font-bold ">
          Reset password to ArticDesign
        </h1>
        <p className=" text-[#111827] text-sm flex  font-normal my-5">
          Enter your email to reset your password
        </p>
        <div className="flex flex-col space-y-4">
          <p className="font-normal text-sm w-full">
            Please follow the instructions in the Email to rest your password.
            If you do not recieve an Email, check in your spam
          </p>
        </div>
        <p className=" text-center text-[20px] font-medium py-5">
          johndoe@email.com
        </p>
        <div className="flex flex-col space-y-4">
          <button className="btn rounded-[8px] w-full my-[12px]">
            Reset Email
          </button>
        </div>
      </form>
    </section>
  );
}

export default ForgetSuccessMessage;
