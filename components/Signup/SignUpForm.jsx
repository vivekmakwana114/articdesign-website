import React, { useState } from "react";
import { Formik, Form } from "formik";
import Step1 from "./Step1";
import Step2 from "./Step2";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SaveLoader from "../SaveLoader";
import { postRequest } from "@/api/fetchWrapper";
import SocialLogin from "../SocialLogin";
import OAuth from "../Social/OAuth";

const steps = ["Step 1 of 2", "Step 2 of 2"];

// Initial values based on the specified structure
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  phonenumber: "",
  birthday: "",
  country: "",
  password: "",
};

const validationSchema = Yup.object().shape({
  firstname: Yup.string().required("First name is required"),
  lastname: Yup.string().required("Last name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phonenumber: Yup.number().required("Phone number is required"),
  birthday: Yup.date().required("Birthday is required"),
  country: Yup.string().required("Country is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const SignUpForm = () => {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialValues);

  const handleNext = async (values, setErrors) => {
    let fieldsToValidate = {};
    // Validate based on the current step
    if (step === 0) {
      fieldsToValidate = {
        email: values.email,
        password: values.password,
      };
    } else {
      fieldsToValidate = values; // Validate all fields for Step 2
    }

    // Initialize an empty errors object
    const errors = {};

    // Loop through each field and validate it using Yup
    await Promise.all(
      Object.keys(fieldsToValidate).map(async (field) => {
        try {
          await validationSchema.validateAt(field, values);
        } catch (err) {
          errors[field] = err.message; // Store the error message
        }
      })
    );

    // If no errors, proceed to the next step
    if (Object.keys(errors).length === 0) {
      setStep((prevStep) => prevStep + 1);
    } else {
      setErrors(errors);
    }
  };

  const handlePrev = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await postRequest("/auth/signup", { ...values });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      // Simulate successful submission
      toast.success("success!");
      // setStep(0); // Reset form step
      setFormData(initialValues); // Reset form data
      router.push("/login"); // Redirect after successful submission
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Failed to add event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="my-4">
        <h1 className="text-[#6B7280] text-sm font-bold">
          {step === 0 ? steps[0] : steps[1]}
        </h1>
        <h1 className="text-[#111827] text-[28px] font-bold">
          Create an Account
        </h1>
      </div>
      {step === 0 && (
        <OAuth />

        // <SocialLogin
        //   googelName="Sign up with Google"
        //   appleName="Sign up with Apple"
        // />
      )}

      <Formik
        initialValues={formData}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ values, setErrors }) => (
          <Form>
            {step === 0 && (
              <Step1 formData={values} setFormData={setFormData} />
            )}
            {step === 1 && (
              <Step2 formData={values} setFormData={setFormData} />
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
                    className={`btn rounded-[8px] w-full my-[18px]`}
                    type="submit"
                    disabled={loading}
                  >
                    {loading ? <SaveLoader /> : "Sign Up"}
                  </button>
                  {step > 0 && (
                    <div className="flex flex-row justify-between items-center">
                      <button
                        onClick={handlePrev}
                        className="rounded-[8px] text-sm font-normal text-gray-500 "
                      >
                        Previous
                      </button>
                      <Link
                        href="/"
                        className="p-2 text-sm text-red-500 font-normal"
                      >
                        Cancel
                      </Link>
                    </div>
                  )}
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUpForm;
