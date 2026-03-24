import React, { useState, useEffect } from "react";
import Image from "next/image";
import { closeIcon } from "../../assets";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAddresses,
  addNewAddress,
  editAddress,
  deleteUserAddress,
} from "@/state/address/addressSlice";
import SaveLoader from "../SaveLoader";
import toast from "react-hot-toast";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import { Country } from "country-state-city";
import * as Yup from "yup";

const addressValidationSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
  phone: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  country: Yup.string().required("Country is required"),
  postalCode: Yup.string().required("Postal code is required"),
  city: Yup.string().required("Town/City is required"),
  streetAddress1: Yup.string().required("Street address is required"),
});

const ShippingModal = ({ isOpen, onClose, onProceed }) => {
  const dispatch = useDispatch();
  const { user: currentUser } = useSelector((state) => state.auth);
  const { addresses, status: addressStatus } = useSelector(
    (state) => state.address,
  );

  const [windowWidth, setWindowWidth] = useState(0);
  const [loadingAddress, setLoadingAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Address form state
  const [countries, setCountries] = useState([]);
  const [addressData, setAddressData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    country: "India",
    postalCode: "",
    city: "",
    streetAddress1: "",
    streetAddress2: "",
    isDefault: true,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);
      const handleResize = () => setWindowWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (currentUser?._id || currentUser?.id) {
        dispatch(fetchAddresses(currentUser._id || currentUser.id));
      }
    } else {
      document.body.style.overflow = "auto";
      // Reset local states when modal closes to prevent "lingering" UI
      setShowAddressForm(false);
      setIsEditing(false);
      setErrors({});
    }
  }, [isOpen, currentUser, dispatch]);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = await Country.getAllCountries();
        const allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        setCountries(allCountries);
        if (!isEditing && !addressData.country && allCountries.length > 0) {
          setAddressData((prev) => ({
            ...prev,
            country: allCountries[0].name,
          }));
        }
      } catch (error) {
        setCountries([]);
      }
    };
    getCountries();
  }, [isEditing]);

  useEffect(() => {
    if (addresses.length > 0 && !selectedAddress) {
      const defaultAddress =
        addresses.find((addr) => addr.isDefault) || addresses[0];
      setSelectedAddress(defaultAddress);
    }
  }, [addresses, selectedAddress]);

  const handleAddAddress = async () => {
    setErrors({});
    try {
      await addressValidationSchema.validate(addressData, {
        abortEarly: false,
      });
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
      return;
    }

    setLoadingAddress(true);
    try {
      if (isEditing) {
        await dispatch(
          editAddress({
            addressId: editingAddressId,
            addressData,
          }),
        ).unwrap();
        toast.success("Address updated successfully");
      } else {
        await dispatch(
          addNewAddress({
            userId: currentUser._id || currentUser.id,
            addressData,
          }),
        ).unwrap();
        toast.success("Address added successfully");
      }
      setShowAddressForm(false);
      setIsEditing(false);
      setEditingAddressId(null);
      dispatch(fetchAddresses(currentUser._id || currentUser.id));
    } catch (err) {
      toast.error(
        err.message || `Failed to ${isEditing ? "update" : "add"} address`,
      );
    } finally {
      setLoadingAddress(false);
    }
  };

  const handleEditClick = (e, addr) => {
    e.stopPropagation();
    setAddressData({
      firstName: addr.firstName,
      lastName: addr.lastName,
      phone: addr.phone,
      email: addr.email,
      country: addr.country || "India",
      postalCode: addr.postalCode || "",
      city: addr.city,
      streetAddress1: addr.streetAddress1,
      streetAddress2: addr.streetAddress2 || "",
      isDefault: addr.isDefault,
    });
    setEditingAddressId(addr._id);
    setIsEditing(true);
    setShowAddressForm(true);
  };

  const handleDeleteClick = async (e, addressId) => {
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this address?")) {
      try {
        await dispatch(deleteUserAddress(addressId)).unwrap();
        toast.success("Address deleted");
        if (selectedAddress?._id === addressId) {
          setSelectedAddress(null);
        }
      } catch (err) {
        toast.error(err.message || "Failed to delete address");
      }
    }
  };

  const handleAddNewClick = () => {
    setAddressData({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      country: "India",
      postalCode: "",
      city: "",
      streetAddress1: "",
      streetAddress2: "",
      isDefault: true,
    });
    setIsEditing(false);
    setEditingAddressId(null);
    setErrors({});
    setShowAddressForm(true);
  };

  const getWidth = () => (windowWidth >= 768 ? "600px" : "90%");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[100] p-4 md:p-6">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
        onClick={onClose}
      ></div>
      <div
        className="bg-white rounded-2xl shadow-2xl relative max-h-full overflow-y-auto w-full max-w-[650px]"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <button
          className="absolute right-6 top-8 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          onClick={onClose}
        >
          <Image src={closeIcon} alt="Close" width={20} height={20} />
        </button>

        <div className="p-8 md:p-12">
          <div className="text-center mb-8">
            <h2 className="text-[32px] md:text-[48px] font-semibold text-[#1D1D1F] leading-tight mb-2">
              Shipping Address
            </h2>
            <p className="text-[#86868B] text-sm md:text-base font-medium max-w-[500px] mx-auto">
              Effortlessly elevate your style with our easy-to-apply skins—peel,
              stick, and transform with simplicity and precision.
            </p>
          </div>

          {!showAddressForm && addresses.length > 0 ? (
            <div className="space-y-6">
              <div className="grid gap-4">
                {addresses.map((addr) => (
                  <div
                    key={addr._id}
                    onClick={() => setSelectedAddress(addr)}
                    className={`p-5 border-2 rounded-xl cursor-pointer transition-all ${
                      selectedAddress?._id === addr._id
                        ? "border-[#0071E3] bg-[#F5F5F7]"
                        : "border-[#D2D2D7] hover:border-[#86868B]"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex-1">
                        <p className="font-semibold text-[#1D1D1F]">
                          {addr.firstName} {addr.lastName}
                        </p>
                        <p className="text-sm text-[#424245] mt-1">
                          {addr.streetAddress1}, {addr.city}
                        </p>
                        <p className="text-sm text-[#86868B]">{addr.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => handleEditClick(e, addr)}
                          className="p-2 text-[#86868B] hover:text-[#0071E3] transition-colors"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button
                          onClick={(e) => handleDeleteClick(e, addr._id)}
                          className="p-2 text-[#86868B] hover:text-[#FF3B30] transition-colors"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                      {selectedAddress?._id === addr._id && (
                        <div className="w-6 h-6 bg-[#0071E3] rounded-full flex items-center justify-center">
                          <svg
                            width="14"
                            height="10"
                            viewBox="0 0 14 10"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 5L5 9L13 1"
                              stroke="white"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddNewClick}
                className="text-[#0071E3] font-medium hover:underline block mx-auto py-2"
              >
                + Add New Address
              </button>
              <button
                onClick={() => onProceed(selectedAddress)}
                disabled={!selectedAddress}
                className={`w-full py-4 rounded-xl text-white font-medium text-lg transition-all ${
                  selectedAddress
                    ? "bg-[#0071E3] hover:bg-[#0077ED]"
                    : "bg-[#D2D2D7] cursor-not-allowed"
                }`}
              >
               Save Address Changes
              </button>
            </div>
          ) : (
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1D1D1F]">
                    First name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your first name"
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:border-[#0071E3] ${errors.firstName ? "border-red-500" : "border-[#D2D2D7]"}`}
                    value={addressData.firstName}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        firstName: e.target.value,
                      })
                    }
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.firstName}
                  </p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1D1D1F]">
                    Last name*
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your last name"
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:border-[#0071E3] ${errors.lastName ? "border-red-500" : "border-[#D2D2D7]"}`}
                    value={addressData.lastName}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        lastName: e.target.value,
                      })
                    }
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1D1D1F]">
                  Phone number*
                </label>
                <input
                  type="text"
                  placeholder="+88 0123-456789"
                  className={`w-full p-4 border rounded-xl focus:outline-none focus:border-[#0071E3] ${errors.phone ? "border-red-500" : "border-[#D2D2D7]"}`}
                  value={addressData.phone}
                  onChange={(e) =>
                    setAddressData({ ...addressData, phone: e.target.value })
                  }
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1D1D1F]">
                  Email address*
                </label>
                <input
                  type="email"
                  placeholder="Placeholder"
                  className={`w-full p-4 border rounded-xl focus:outline-none focus:border-[#0071E3] ${errors.email ? "border-red-500" : "border-[#D2D2D7]"}`}
                  value={addressData.email}
                  onChange={(e) =>
                    setAddressData({ ...addressData, email: e.target.value })
                  }
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1D1D1F]">
                  Street Address*
                </label>
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="House number and Street name"
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:border-[#0071E3] ${errors.streetAddress1 ? "border-red-500" : "border-[#D2D2D7]"}`}
                    value={addressData.streetAddress1}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        streetAddress1: e.target.value,
                      })
                    }
                  />
                  {errors.streetAddress1 && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.streetAddress1}
                    </p>
                  )}
                  <input
                    type="text"
                    placeholder="Apartment, suite, unit etc. (Optional)"
                    className="w-full p-4 border border-[#D2D2D7] rounded-xl focus:outline-none focus:border-[#0071E3]"
                    value={addressData.streetAddress2}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        streetAddress2: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1D1D1F]">
                    Town/City *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:border-[#0071E3] ${errors.city ? "border-red-500" : "border-[#D2D2D7]"}`}
                    value={addressData.city}
                    onChange={(e) =>
                      setAddressData({ ...addressData, city: e.target.value })
                    }
                  />
                  {errors.city && (
                    <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-[#1D1D1F]">
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    placeholder="000000"
                    className={`w-full p-4 border rounded-xl focus:outline-none focus:border-[#0071E3] ${errors.postalCode ? "border-red-500" : "border-[#D2D2D7]"}`}
                    value={addressData.postalCode}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        postalCode: e.target.value,
                      })
                    }
                  />
                  {errors.postalCode && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.postalCode}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1D1D1F]">
                  Country*
                </label>
                <select
                  className={`w-full p-4 border rounded-xl focus:outline-none focus:border-[#0071E3] bg-white appearance-none ${errors.country ? "border-red-500" : "border-[#D2D2D7]"}`}
                  value={addressData.country}
                  onChange={(e) =>
                    setAddressData({ ...addressData, country: e.target.value })
                  }
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
                {errors.country && (
                  <p className="text-red-500 text-xs mt-1">{errors.country}</p>
                )}
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-[#1D1D1F]">
                  Order notes (Optional)
                </label>
                <textarea
                  placeholder="Notes about your order, e.g special notes for delivery"
                  className="w-full p-4 border border-[#D2D2D7] rounded-xl focus:outline-none focus:border-[#0071E3] min-h-[120px] resize-none"
                  value={addressData.orderNotes || ""}
                  onChange={(e) =>
                    setAddressData({
                      ...addressData,
                      orderNotes: e.target.value,
                    })
                  }
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <div className="relative flex items-center">
                  <input
                    type="checkbox"
                    id="saveAddress"
                    className="w-5 h-5 appearance-none border-2 border-[#D2D2D7] rounded checked:bg-[#0071E3] checked:border-[#0071E3] cursor-pointer transition-all focus:outline-none"
                    checked={addressData.isDefault}
                    onChange={(e) =>
                      setAddressData({
                        ...addressData,
                        isDefault: e.target.checked,
                      })
                    }
                  />
                  {addressData.isDefault && (
                    <svg
                      className="absolute w-3 h-3 text-white pointer-events-none left-1"
                      viewBox="0 0 14 10"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 5L5 9L13 1"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </div>
                <label
                  htmlFor="saveAddress"
                  className="text-[14px] text-[#1D1D1F] cursor-pointer"
                >
                  Save shipping address for next purchase
                </label>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 p-4 border-2 border-[#D2D2D7] rounded-xl font-medium text-[#1D1D1F] hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAddress}
                  disabled={loadingAddress}
                  className="flex-1 p-4 bg-[#0071E3] text-white rounded-xl font-medium hover:bg-[#0077ED] transition-all flex items-center justify-center"
                >
                  {loadingAddress ? (
                    <SaveLoader />
                  ) : isEditing ? (
                    "Update Address"
                  ) : (
                    "Add Address"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShippingModal;
