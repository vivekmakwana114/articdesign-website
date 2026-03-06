"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const initialValues = {
  password: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const ResetPasswordForm = ({ onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          onSubmit(values);
          actions.resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="md:flex md:flex-col space-y-6 ">
            <h1 className="text-[#111827] md:text-[28px] text-base font-bold">
              Reset password to ArticDesign
            </h1>
            <p className="text-[#111827] text-sm font-normal md:my-5">
              Enter your new password
            </p>

            <div className="flex flex-col">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="form__input pr-10"
                />
                <span className="absolute inset-y-0  bottom-3  md:top-4 top-2 flex items-center right-1 md:pr-2">
                  {showPassword ? (
                    <HiOutlineEyeOff
                      className="text-gray-400 cursor-pointer text-2xl"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <HiOutlineEye
                      className="text-gray-400 cursor-pointer text-2xl"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </span>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="cursor-pointer border bg-[#0071E3] rounded-[6px] p-3 text-white font-medium text-base text-center"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ResetPasswordForm;
