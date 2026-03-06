"use client";

import "react-datepicker/dist/react-datepicker.css";
import SignUpForm from "@/components/Signup/SignUpForm";
import { useEffect } from "react";

const Signup = () => {
  useEffect(() => {
    document.title = `SignUp`;
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="flex justify-center items-start h-screen p-5 mt-10">
      <SignUpForm />
    </section>
  );
};

export default Signup;
