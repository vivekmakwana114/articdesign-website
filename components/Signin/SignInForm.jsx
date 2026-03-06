import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import Step1 from "./Step1";
import Step2 from "./Step2";
import toast from "react-hot-toast";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import SaveLoader from "../SaveLoader";
import { postRequest } from "@/api/fetchWrapper";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "@/redux/users/userSlice";
import SocialLogin from "../SocialLogin";
import OAuth from "../Social/OAuth";
const steps = ["Step 1", "Step 2"];

// Initial values based on the specified structure
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

const SignInForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(initialValues);
  const { currentUser } = useSelector((state) => state.user);
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");
  useEffect(() => {
    if (currentUser) {
      router.push(returnUrl || "/");
    }
  }, [currentUser]);

  const handleNext = async (values, setErrors) => {
    let fieldsToValidate = {};

    // Validate based on the current step
    if (step === 0) {
      fieldsToValidate = {
        identifier: values.identifier,
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
    dispatch(signInStart());
    setLoading(true);
    try {
      const res = await postRequest("/auth/signin", {
        ...values,
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message);
        setLoading(false);
        return;
      }
      // Simulate successful submission
      toast.success("success!");
      dispatch(signInSuccess(data));
      localStorage.setItem("accessToken", data.accessToken);
      // setStep(0); // Reset form step
      setFormData(initialValues); // Reset form data
      router.push(returnUrl || "/"); // Redirect after successful submission
      setLoading(false);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
      toast.error("Failed to add event.");
      dispatch(signInFailure(error.message));
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
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
                      {/* <button
                    onClick={handlePrev}
                    className="rounded-[8px] text-sm font-normal text-gray-500 "
                  >
                    Previous
                  </button> */}
                      <Link
                        href="/forgotpassword"
                        className="text-[#0071E3] text-sm font-normal underline my-2 underline-offset-4"
                      >
                        Forgot password?
                      </Link>
                      <Link
                        href="/"
                        className="p-2 text-sm text-red-500 font-normal"
                      >
                        Cancel
                      </Link>
                    </div>
                  )}
                  <Link href="/signup">
                    <p className=" border bg-[#ffffff] text-[#374151] rounded-[6px] md:w-[384px] w-[300px] my-3 p-3 font-medium text-base flex justify-center items-center gap-2">
                      Create an account
                    </p>
                  </Link>
                </>
              )}
            </div>
          </Form>
        )}
      </Formik>
      {step === 0 && (
        <>
          <div className="flex flex-row justify-between items-center">
            <Link
              href="/signup"
              className="text-[#0071E3] text-sm font-normal underline my-2 underline-offset-4"
            >
              Create an account
            </Link>
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
