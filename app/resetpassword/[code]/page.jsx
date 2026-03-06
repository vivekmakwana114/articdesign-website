"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { patchRequest } from "@/api/fetchWrapper";

// Initial form values
const initialValues = {
  password: "",
};

// Yup schema for validation
const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

function ResetPassword() {
  const pathname = usePathname();
  const router = useRouter();
  const code = pathname.split("/").pop();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    document.title = `Reset Password`;
    window.scrollTo(0, 0);
  }, [code]);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (values, actions) => {
    try {
      // Simulate an async operation (e.g., API call)
      const res = await patchRequest(`/auth/resetPassword/${code}`, {
        ...values,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        actions.setSubmitting(false); // Ensure submitting state is reset
        return;
      }
      toast.success("success");
      router.push("/signin"); // Redirect after successful submission
      actions.setSubmitting(false); // Ensure submitting state is reset
      actions.resetForm();

      // await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate async delay
    } catch (error) {
      console.error("Submission error:", error);
      actions.setSubmitting(false);
    }
  };

  return (
    <section className="flex flex-col justify-center md:items-center p-10">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </section>
  );
}

export default ResetPassword;
