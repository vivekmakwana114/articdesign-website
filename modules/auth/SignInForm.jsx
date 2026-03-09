"use client";

import React, { useState } from "react";
import { Formik, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import {
  HiOutlineEye,
  HiOutlineEyeOff,
  HiArrowNarrowLeft,
} from "react-icons/hi";
import SaveLoader from "@/components/SaveLoader";
import OAuth from "@/components/Social/OAuth";

const steps = ["Step 1", "Step 2"];

const initialValues = {
  identifier: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  identifier: Yup.string().required("Username or Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Step 1 sub-component (identifier input)
const Step1 = ({ formData, setFormData }) => {
  const [emailField, emailMeta] = useField("identifier");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className=" space-y-5 md:min-w-96">
      <div className="topsection">
        <h1 className="text-[#6B7280] text-sm font-bold">Step 1 of 2</h1>
        <h1 className=" text-[#111827] text-[28px]  font-bold">
          Log in to ArticDesign
        </h1>
      </div>

      <div className="flex flex-col space-y-4 w-full">
        <div className="flex flex-col space-y-1">
          <label htmlFor="identifier" className="form__label mb-0">
            Username or Email
          </label>
          <input
            id="identifier"
            name="identifier"
            type="text"
            className={`form__input pr-10 ${
              emailMeta.touched && emailMeta.error ? "border-red-500" : ""
            }`}
            onChange={handleChange}
          />
          <ErrorMessage
            component="p"
            name="identifier"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

// Step 2 sub-component (password input)
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

      {/* <div className="flex flex-col space-y-4">
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
              onChange={handleChange}
            />
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center">
              {showPassword ? (
                <HiOutlineEye
                  className="cursor-pointer text-[20px] text-gray-500 hover:text-gray-700"
                  onClick={togglePasswordVisibility}
                />
              ) : (
                <HiOutlineEyeOff
                  className="cursor-pointer text-[20px] text-gray-500 hover:text-gray-700"
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
      </div> */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="form__label mb-0">
          Password
        </label>

        <div className="relative w-full">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            className={`form__input w-full pr-12 ${
              passwordMeta.touched && passwordMeta.error ? "border-red-500" : ""
            }`}
            onChange={handleChange}
          />

          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pt-3"
          >
            {showPassword ? (
              <HiOutlineEye className="text-xl" />
            ) : (
              <HiOutlineEyeOff className="text-xl" />
            )}
          </button>
        </div>

        <ErrorMessage
          component="p"
          name="password"
          className="text-red-500 text-sm"
        />
      </div>
    </div>
  );
};

const SignInForm = ({
  onSubmit,
  onForgotPassword,
  onSwitchToSignUp,
  loading,
}) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialValues);

  const handleNext = async (values, setErrors) => {
    let fieldsToValidate = {};

    if (step === 0) {
      fieldsToValidate = {
        identifier: values.identifier,
      };
    } else {
      fieldsToValidate = values;
    }

    const errors = {};

    await Promise.all(
      Object.keys(fieldsToValidate).map(async (field) => {
        try {
          await validationSchema.validateAt(field, values);
        } catch (err) {
          errors[field] = err.message;
        }
      }),
    );

    if (Object.keys(errors).length === 0) {
      setStep((prevStep) => prevStep + 1);
    } else {
      setErrors(errors);
    }
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFormSubmit = async (values) => {
    onSubmit(values);
  };

  return (
    <div className="flex flex-col">
      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleFormSubmit}
        enableReinitialize={true}
      >
        {({ values, setErrors }) => (
          <Form>
            {step === 0 && (
              <Step1 formData={values} setFormData={setFormData} />
            )}
            {step === 1 && (
              <Step2
                formData={values}
                setFormData={setFormData}
                handlePrev={handlePrev}
              />
            )}

            <div className="flex flex-col">
              {step < steps.length - 1 ? (
                <button
                  onClick={() => handleNext(values, setErrors)}
                  className="btn rounded-[8px] w-full my-[18px] "
                >
                  Continue
                </button>
              ) : (
                <>
                  <button
                    className={`btn rounded-[8px] w-full my-[12px]`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <SaveLoader /> : "Signin"}
                  </button>
                  {step > 0 && (
                    <div className="flex flex-row justify-between items-center">
                      <button
                        type="button"
                        onClick={onForgotPassword}
                        className="text-[#0071E3] text-sm font-normal underline my-2 underline-offset-4"
                      >
                        Forgot password?
                      </button>
                      <button
                        type="button"
                        onClick={() => (window.location.href = "/")}
                        className="p-2 text-sm text-red-500 font-normal"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                  <button
                    type="button"
                    onClick={onSwitchToSignUp}
                    className=" border bg-[#ffffff] text-[#374151] rounded-[6px] md:w-[384px] w-[300px] my-3 p-3 font-medium text-base flex justify-center items-center gap-2"
                  >
                    Create an account
                  </button>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
      {step === 0 && (
        <>
          <div className="flex flex-row justify-between items-center">
            <button
              type="button"
              onClick={onSwitchToSignUp}
              className="text-[#0071E3] text-sm font-normal underline my-2 underline-offset-4"
            >
              Create an account
            </button>
          </div>

          <span className="my-5">
            <hr />
          </span>
          <OAuth />
        </>
      )}
    </div>
  );
};

export default SignInForm;
