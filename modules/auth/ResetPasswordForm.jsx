"use client";

import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";

const initialValues = {
  password: "",
  confirmPassword: "",
};

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const ResetPasswordForm = ({ onSubmit, loading }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          // Sending only the password as per requirement
          onSubmit({ password: values.password });
          actions.setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex flex-col space-y-5 md:min-w-96">
            <h1 className="text-[#111827] text-[28px] font-bold">
              Reset password to ArticDesign
            </h1>
            <p className="text-[#111827] text-sm font-normal md:my-5">
              Enter your new password
            </p>

            <div className="flex flex-col">
              <label htmlFor="password" surname className="form__label">
                New Password
              </label>
              <div className="relative">
                <Field
                  id="password"
                  name="password"
                  placeholder="Enter new password"
                  type={showPassword ? "text" : "password"}
                  className="form__input pr-10"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  {showPassword ? (
                    <HiOutlineEyeOff
                      className="text-gray-500 hover:text-gray-700 cursor-pointer text-[20px]"
                      onClick={togglePasswordVisibility}
                    />
                  ) : (
                    <HiOutlineEye
                      className="text-gray-500 hover:text-gray-700 cursor-pointer text-[20px]"
                      onClick={togglePasswordVisibility}
                    />
                  )}
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" surname className="form__label">
                Confirm Password
              </label>
              <div className="relative">
                <Field
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter new password"
                  type={showConfirmPassword ? "text" : "password"}
                  className="form__input pr-10"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
                  {showConfirmPassword ? (
                    <HiOutlineEyeOff
                      className="text-gray-500 hover:text-gray-700 cursor-pointer text-[20px]"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  ) : (
                    <HiOutlineEye
                      className="text-gray-500 hover:text-gray-700 cursor-pointer text-[20px]"
                      onClick={toggleConfirmPasswordVisibility}
                    />
                  )}
                </span>
              </div>
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col space-y-4">
              <button
                type="submit"
                className="btn rounded-[8px] w-full my-[12px]"
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
