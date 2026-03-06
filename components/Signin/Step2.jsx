import React, { useEffect, useRef, useState } from "react";
import { Field, ErrorMessage, useField } from "formik";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { HiArrowNarrowLeft } from "react-icons/hi";

const Step2 = ({ formData, setFormData, handlePrev }) => {
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="space-y-5 md:min-w-96">
      <div className="">
        <h1 className="text-[#6B7280] text-sm font-bold">Step 2 of 2</h1>
        <h1 className="text-[#111827] text-[28px] font-bold">
          Log in to ArticDesign
        </h1>
        <p
          onClick={handlePrev}
          className="flex flex-row items-center gap-2 text-primaryColor text-base py-3 font-semibold cursor-pointer"
        >
          <HiArrowNarrowLeft className="text-2xl" />{" "}
          <span>{formData.identifier}</span>
        </p>
      </div>

      <div className="flex flex-col space-y-4">
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
                passwordMeta.touched && passwordMeta.error
                  ? "border-red-500"
                  : ""
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
    </div>
  );
};

export default Step2;
