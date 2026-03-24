"use client";

import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, ErrorMessage, useField } from "formik";
import * as Yup from "yup";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Country } from "country-state-city";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdCalendarMonth } from "react-icons/md";
import SaveLoader from "@/components/SaveLoader";
import OAuth from "@/components/Social/OAuth";

const steps = ["Step 1 of 2", "Step 2 of 2"];

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthday: "",
  country: "",
  password: "",
  dialingCode: "",
  termsAccepted: false,
};

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone number is required"),
  birthday: Yup.date().required("Birthday is required"),
  country: Yup.string().required("Country is required"),
});

const Step1 = ({ formData, setFormData, onSwitchToSignIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [emailField, emailMeta] = useField("email");
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
    <div className="space-y-5 w-full max-w-[384px] md:pt-10">
      <div className="topsection">
        <h1 className="text-[#6B7280] text-sm font-bold">Step 1 of 2</h1>
        <h1 className="text-[#111827] text-[28px] font-bold">
          Create an Account
        </h1>
      </div>

      <OAuth />

      <span className="my-5 block">
        <hr />
      </span>

      <div className="space-y-2">
        <h2 className="font-bold text-base">Sign up with email</h2>
        <h3 className="font-normal text-sm text-[#000000]">
          Already have an account?
          <button
            type="button"
            onClick={onSwitchToSignIn}
            className="text-[#0071E3] pl-2"
          >
            Sign in
          </button>
        </h3>
      </div>

      <div className="flex flex-col space-y-4 w-full">
        <div className="flex flex-col space-y-1">
          <label htmlFor="email" className="form__label mb-0">
            Username or Email
          </label>

          <input
            id="email"
            name="email"
            type="text"
            className={`form__input pr-10 ${
              emailMeta.touched && emailMeta.error ? "border-red-500" : ""
            }`}
            onChange={handleChange}
          />

          <ErrorMessage
            component="p"
            name="email"
            className="text-red-500 text-sm"
          />
        </div>

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
                passwordMeta.touched && passwordMeta.error
                  ? "border-red-500"
                  : ""
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

      <p className="text-[#000000] font-normal text-sm leading-5 w-full max-w-[384px] break-words whitespace-normal">
        By continuing, I understand and agree to ArticDesign's <br />
        <a href="/privacypolicy">
          <span className="underline underline-offset-1">Privacy Notice</span>
        </a>{" "}
        and{" "}
        <a href="/termsandconditions">
          <span className="underline underline-offset-1">Terms of Use</span>
        </a>{" "}
        for creating an
        <br /> ArticDesign Account.
      </p>
    </div>
  );
};

// Step 2 sub-component (personal details)
const Step2 = ({ formData, setFormData }) => {
  const datepickerRef = useRef(null);
  const [countries, setCountries] = useState([]);
  const [maxDate, setMaxDate] = useState("");

  const handleIconClick = () => {
    if (datepickerRef.current) {
      datepickerRef.current.setOpen(true);
    }
  };

  useEffect(() => {
    const currentDate = new Date().toISOString().split("T")[0];
    setMaxDate(currentDate);
  }, []);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = await Country.getAllCountries();
        const allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        setFormData((prevData) => ({
          ...prevData,
          country: firstCountry || "",
        }));
      } catch (error) {
        setCountries([]);
        setFormData((prevData) => ({ ...prevData, country: "" }));
      }
    };
    getCountries();
  }, [setFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDateChange = (date) => {
    setFormData((prevData) => ({
      ...prevData,
      birthday: date,
    }));
  };

  return (
    <div className="space-y-5 w-full max-w-[384px] md:pt-10">
      <div className="topsection">
        <h1 className="text-[#6B7280] text-sm font-bold">Step 2 of 2</h1>
        <h1 className="text-[#111827] text-[28px] font-bold">
          Create an Account
        </h1>
      </div>

      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="firstName" className="form__label">
            First Name
          </label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            className="form__input"
            onChange={handleChange}
          />
          <ErrorMessage
            component="p"
            name="firstName"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="lastName" className="form__label">
            Last Name
          </label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            className="form__input"
            onChange={handleChange}
          />
          <ErrorMessage
            component="p"
            name="lastName"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="birthday" className="form__label">
            Birthday
          </label>
          <div className="relative flex items-center">
            <DatePicker
              ref={datepickerRef}
              selected={formData.birthday}
              onChange={handleDateChange}
              dateFormat="MMMM d, yyyy"
              placeholderText="mm/dd/yyyy"
              maxDate={new Date()}
              className="form__input w-full pr-10"
              wrapperClassName="w-full"
            />
            <MdCalendarMonth
              className="absolute right-3 text-xl text-[#6B7280] cursor-pointer"
              onClick={handleIconClick}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label htmlFor="country" className="form__label">
            Country*
          </label>
          <select
            className="form__input"
            name="country"
            value={formData.country}
            onChange={handleChange}
          >
            <option value="" className="text-gray-400">
              Select Country
            </option>
            {countries.map(({ isoCode, name }) => (
              <option value={name} key={isoCode}>
                {name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="phone" className="form__label">
            Phone Number
          </label>
          <input
            id="phone"
            name="phone"
            type="text"
            onKeyPress={(e) => {
              const allowedChars = /[0-9.]/;
              if (!allowedChars.test(e.key)) {
                e.preventDefault();
              }
            }}
            className="form__input"
            onChange={handleChange}
          />
          <ErrorMessage
            component="p"
            name="phone"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

const SignUpForm = ({ onSubmit, onSwitchToSignIn, loading }) => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState(initialValues);

  const handleNext = async (values, setErrors) => {
    let fieldsToValidate = {};
    if (step === 0) {
      fieldsToValidate = {
        email: values.email,
        password: values.password,
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
    // Find country to get dialing code
    const countryObj = Country.getAllCountries().find(
      (c) => c.name === values.country,
    );
    // Remove the "+" from phonecode if it exists, or provide a default
    const dialingCode = countryObj
      ? countryObj.phonecode.replace("+", "")
      : "91";

    // Format birthday as YYYY-MM-DD
    const date = new Date(values.birthday);
    const formattedBirthday = `${date.getFullYear()}-${String(
      date.getMonth() + 1,
    ).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

    onSubmit({
      firstName: values.firstName,
      lastName: values.lastName,
      phone: values.phone,
      email: values.email,
      password: values.password,
      termsAccepted: true,
      country: values.country,
      birthday: formattedBirthday,
      dialingCode: dialingCode,
    });
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
              <Step1
                formData={values}
                setFormData={setFormData}
                onSwitchToSignIn={onSwitchToSignIn}
              />
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
                        type="button"
                        onClick={handlePrev}
                        className="rounded-[8px] text-sm font-normal text-gray-500 "
                      >
                        Previous
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
