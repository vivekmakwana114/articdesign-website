"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { HiArrowNarrowLeft } from "react-icons/hi";

const initialValues = {
  email: "",
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPasswordForm = ({ onSubmit, onBack, loading }) => {
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
          <Form className="md:flex md:flex-col space-y-6 max-w-[500px] ">
            <button type="button" onClick={onBack}>
              <p className=" font-bold text-sm text-[#0071E3] flex justify-start items-center gap-3 my-5">
                <HiArrowNarrowLeft className="cursor-pointer text-3xl font-bold" />
                Back
              </p>
            </button>
            <h1 className="text-[#111827] md:text-[28px] text-base font-bold">
              Reset password to ArticDesign
            </h1>
            <p className="text-[#111827] text-sm font-normal md:my-5">
              Enter the email address you used when you joined and we&apos;ll
              send you instructions to reset your password.
            </p>

            <div className="flex flex-col space-y-2">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className="form__input"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div className="flex flex-col space-y-4 pt-2">
              <button
                type="submit"
                className="cursor-pointer border bg-[#0071E3] rounded-[6px] p-3 text-white font-medium text-base text-center"
                disabled={loading}
              >
                {loading ? "Sending..." : "Reset password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default ForgotPasswordForm;
