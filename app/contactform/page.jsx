"use client";
import Footer from "@/components/Footer";
import Sectionfive from "@/components/Home/Sectionfive";
import Link from "next/link";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";

// Initial values for the form fields
const initialValues = {
  firstname: "",
  lastname: "",
  companyName: "",
  phoneNumber: "",
  message: "",
};

// Yup validation schema
const validationSchema = Yup.object({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  companyName: Yup.string(),
  phoneNumber: Yup.string()
    .required("Phone number is required")
    .matches(
      /^\+?(\d{1,3})?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
      "Invalid phone number"
    ),
  message: Yup.string().required("Message is required"),
});

function ContactForm() {
  const handleSubmit = async (values, actions) => {
    try {
     
      toast.success("Form submitted successfully!");
      actions.resetForm();
    } catch (error) {
      console.error("Submission error:", error);
      toast.error("Form submission failed!");
    }
    actions.setSubmitting(false);
  };

  return (
    <>
      <section className="flex flex-col justify-center items-center md:px-80 md:py-1 px-10">
        <div className=" flex justify-center items-center flex-col my-10">
          <h1 className=" text-[48px] text-[#1D1D1F] font-semibold">
            SayHello
          </h1>
          <h5 className="text-[#86868B] font-medium text-base">sdfsd’flsd</h5>
        </div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-5 p-10">
              <div className="md:grid md:grid-cols-2 md:gap-10 flex flex-col">
                <div className="flex flex-col">
                  <label htmlFor="firstname" className="form__label">
                    First name
                  </label>
                  <Field
                    id="firstname"
                    name="firstname"
                    placeholder="Enter your first name"
                    className="form__input"
                  />
                  <ErrorMessage
                    name="firstname"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="lastname" className="form__label">
                    Last name
                  </label>
                  <Field
                    id="lastname"
                    name="lastname"
                    placeholder="Enter your last name"
                    className="form__input"
                  />
                  <ErrorMessage
                    name="lastname"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="companyName" className="form__label">
                  Company Name (Optional)
                </label>
                <Field
                  id="companyName"
                  name="companyName"
                  placeholder="Company Name (Optional)"
                  className="form__input"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="form__label">
                  Phone number
                </label>
                <Field
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="+1 201-555-0123"
                  className="form__input"
                />
                <ErrorMessage
                  name="phoneNumber"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="message" className="form__label">
                  Message
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Please provide a short description of your business and any questions you have about articDesign."
                  className="form__input"
                />
                <ErrorMessage
                  name="message"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              <div className="flex md:flex-row flex-col gap-5">
                <button
                  type="submit"
                  className="rounded-md bg-[#4B4EFC] w-[96px] text-white p-2 h-[40px]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
                <p className="md:w-[680px] w-[336px] text-sm text-[#9CA3AF]">
                  By pressing the submit button, I agree to articdesign
                  contacting me by email and/or phone to share opportunities
                  exclusively available to Select or Enterprise customers. I
                  also understand that any information I’ve shared in this form
                  is subject to articdesign Privacy Policy.
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </section>

      <section className="bg-[#FAFAFA] h-[380px] md:px-20">
        <div className="md:grid md:grid-cols-3 h-full w-full   md:gap-24 gap-10 py-9 flex flex-col justify-center items-center">
          <div className="">
            <h3 className=" text-sm font-inter font-semibold md:text-start text-center">
              Address
            </h3>
            <br />
            <div className="flex flex-col">
              <p className="text-[#6B7280] font-normal text-base">
                4556 Brendan Ferry
              </p>
              <p className="text-[#6B7280] font-normal text-base">
                Los Angeles, CA 90210
              </p>
            </div>
          </div>
          <div className="">
            <h3 className="text-sm font-Inter font-semibold md:text-start text-center">
              Call Us
            </h3>
            <p className="text-[#6B7280] font-normal text-base pt-3">
              123-123-1234-123
            </p>
          </div>
          <div className="">
            <h3 className="text-sm font-Inter font-semibold md:text-start text-center">
              Socials
            </h3>
            <ul className="flex  gap-2 font-normal text-base font-inter pt-3 text-[#6B7280]">
              <li className=" underline underline-offset-2">
                <Link href="#">facebook</Link>
              </li>
              <li className=" underline underline-offset-2">
                <Link href="#">twitter</Link>
              </li>
              <li className=" underline underline-offset-2">
                <Link href="#">Instagram</Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      <Sectionfive />
      <Footer />
    </>
  );
}

export default ContactForm;
