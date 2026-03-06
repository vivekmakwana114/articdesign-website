"use client";
import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { postRequest } from "@/api/fetchWrapper";
import toast from "react-hot-toast";

// Initial form values
const initialValues = {
  email: "",
};

// Yup schema for validation
const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

function ForgotPassword() {
  useEffect(() => {
    document.title = `Forgot Password`;
    window.scrollTo(0, 0);
  }, []);
  const handleResetPassword = async (values, actions) => {
    try {
      // Simulate an async operation (e.g., API call)
      const res = await postRequest(`/auth/forgotpassword`, {
        ...values,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        actions.setResetting(false); // Ensure submitting state is reset
        return;
      }
      toast.success(data.message);
      actions.setResetting(false); // Ensure submitting state is reset
      actions.resetForm();

      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async delay
    } catch (error) {
      console.error("Submission error:", error);
      actions.setResetting(false);
    }
  };

  return (
    <section className="flex flex-col justify-center md:items-center p-10 ">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onReset={handleResetPassword}
      >
        {({ isResetting }) => (
          <Form className="md:flex md:flex-col space-y-6 max-w-[500px] ">
            <Link href="/signin">
              <p className=" font-bold text-sm text-[#0071E3] flex justify-start items-center gap-3 my-5">
                <HiArrowNarrowLeft className="cursor-pointer text-3xl font-bold" />
                Back
              </p>
            </Link>
            <h1 className="text-[#111827] md:text-[28px] text-base font-bold">
              Reset password to ArticDesign
            </h1>
            <p className="text-[#111827] text-sm font-normal md:my-5">
              Enter the email address you used when you joined and we’ll send
              you instructions to reset your password.
            </p>

            <div className="flex flex-col">
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

            <div className="flex flex-col space-y-4">
              <button
                type="Reset password"
                className="cursor-pointer border bg-[#0071E3] rounded-[6px] p-3 text-white font-medium text-base text-center"
                disabled={isResetting}
              >
                {isResetting ? "Resetting..." : "Reset password"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default ForgotPassword;
