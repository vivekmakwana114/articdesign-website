import React, { useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Field, ErrorMessage, useField } from "formik";
import Link from "next/link";
import SocialLogin from "../SocialLogin";

const Step1 = ({ formData, setFormData }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailField, emailMeta] = useField("email");
  const [passwordField, passwordMeta] = useField("password");
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className=" space-y-5">
      <br />
      <hr />
      <div className=" space-y-2">
        <h2 className="font-bold text-base">Sign up with email</h2>
        <h3 className="font-normal text-sm text-[#000000]">
          Already have an account?
          <Link href="/signin">
            <span className=" text-[#0071E3]"> Sign in</span>
          </Link>
        </h3>
      </div>
      <div className="flex flex-col space-y-4 w-full">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="form__label mb-0">
           Username or Email
          </label>
          <input
            id="email"
            name="email"
            type="text"
            className={`form__input pr-10 ${
              passwordMeta.touched && passwordMeta.error ? "border-red-500" : ""
            }`}
            // value={formData.email}
            onChange={handleChange} // Handle change here
          />
          <ErrorMessage
            component="p"
            name="email"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex flex-col space-y-1 relative">
          <label htmlFor="password" className="form__label mb-0">
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              className={`form__input pr-10 ${
                emailMeta.touched && emailMeta.error ? "border-red-500" : ""
              }`}
              // value={formData.password}
              onChange={handleChange} // Handle change here
            />
            <span className="absolute inset-y-0 right-2 top-1 flex items-center">
              {showPassword ? (
                <HiOutlineEye
                  className="cursor-pointer text-base"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <HiOutlineEyeOff
                  className="cursor-pointer text-base"
                  onClick={togglePasswordVisibility}
                />
              )}
            </span>
          </div>
          <ErrorMessage
            component="p"
            name="password"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
      <div className="flex flex-col space-y-4 md:w-[430px] w-full">
        <p className="text-[#000000] font-normal text-sm  ">
          By continuing, I understand and agree to ArticDesign’s{" "}
          <Link href="/privacypolicy">
            <span className=" underline underline-offset-1">
              Privacy Notice
            </span>{" "}
          </Link>
          and{" "}
          <Link href="/termsandconditions">
            <span className=" underline underline-offset-1">Terms of Use</span>
          </Link>{" "}
          for creating an ArticDesign account
        </p>
      </div>
    </div>
  );
};

export default Step1;
