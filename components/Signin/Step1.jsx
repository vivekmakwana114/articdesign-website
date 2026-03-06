import React, { useState } from "react";
import { Field, ErrorMessage, useField } from "formik";

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
            // value={formData.identifier}
            onChange={handleChange} // Handle change here
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

export default Step1;
