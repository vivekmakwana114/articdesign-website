import React, { useEffect, useRef, useState } from "react";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { Field, ErrorMessage } from "formik";
import { Country } from "country-state-city";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MdCalendarMonth } from "react-icons/md";

const Step2 = ({ formData, setFormData }) => {
  const datepickerRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
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
    <div className="space-y-5 md:min-w-96">
      <div className="flex flex-col space-y-4">
        <div className="flex flex-col space-y-2">
          <label htmlFor="firstname" className="form__label">
            First Name
          </label>
          <input
            id="firstname"
            name="firstname"
            type="text"
            className="form__input"
            // value={formData.firstname}
            onChange={handleChange}
          />
          <ErrorMessage
            component="p"
            name="firstname"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="lastname" className="form__label">
            Last Name
          </label>
          <input
            id="lastname"
            name="lastname"
            type="text"
            className="form__input"
            // value={formData.lastname}
            onChange={handleChange}
          />
          <ErrorMessage
            component="p"
            name="lastname"
            className="text-red-500 text-sm"
          />
        </div>

        <div className="flex flex-col relative">
          <label htmlFor="birthday" className="form__label">
            Birthday
          </label>
          <DatePicker
            ref={datepickerRef}
            selected={formData.birthday}
            onChange={handleDateChange}
            dateFormat="MMMM d, yyyy"
            placeholderText="mm/dd.yyyy"
            maxDate={new Date()}
            className="form__input"
          />
          <MdCalendarMonth
            className="absolute right-2 top-10 text-xl text-[#6B7280] cursor-pointer"
            onClick={handleIconClick}
          />
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
          <label htmlFor="phonenumber" className="form__label">
            Phone Number
          </label>
          <input
            id="phonenumber"
            name="phonenumber"
            type="text"
            onKeyPress={(e) => {
              const allowedChars = /[0-9.]/;
              if (!allowedChars.test(e.key)) {
                e.preventDefault();
              }
            }}
            className="form__input"
            // value={formData.phonenumber}
            onChange={handleChange}
          />
          <ErrorMessage
            component="p"
            name="phonenumber"
            className="text-red-500 text-sm"
          />
        </div>
      </div>
    </div>
  );
};

export default Step2;
