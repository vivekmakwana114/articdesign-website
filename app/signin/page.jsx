"use client";
import React, { useEffect, useState } from "react";
import SignInForm from "@/components/Signin/SignInForm";

const SignIn = () => {
  useEffect(() => {
    document.title = `Signin`;
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="flex justify-center items-start h-screen p-5 mt-10">
      <SignInForm />
    </section>
  );
};

export default SignIn;
