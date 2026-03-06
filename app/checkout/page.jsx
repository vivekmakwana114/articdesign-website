"use client";
import React, { useState, useEffect } from "react";
import { cartImpty } from "../../assets";
import { Country } from "country-state-city";
import ShippingModal from "@/components/Modals/ShippingModal";
import Footer from "@/components/Footer";
import Sectionfive from "@/components/Home/Sectionfive";
import Bought from "@/components/Customers/Bought";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import FormatCurrencyRate from "@/components/Currency/FormatCurrencyRate";
import {
  shippingAddressFailure,
  shippingAddressStart,
  shippingAddressSuccess,
} from "@/redux/orders/shippingAddressSlice";
import { getRequest, patchRequest, postRequest } from "@/api/fetchWrapper";
import SaveLoader from "@/components/SaveLoader";

const CheckOut = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { topproducts } = useSelector((state) => state.topproducts);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const { cartState, removeItemFromCart, updateItemInCart, clearCartItems } =
    useCart();
  const pathname = usePathname();
  const [countries, setCountries] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [streetAddress, setStreetAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [townCity, setTownCity] = useState("");
  const [country, setCountry] = useState("");
  const [orderNotes, setOrderNotes] = useState("");
  const [shippingAddress, setShippingAddress] = useState("");

  const handleRemove = (productId) => {
    removeItemFromCart(productId);
    toast.success("Success");
  };

  const handleQuantityChange = (productId, value) => {
    const quantity = parseInt(value, 10);
    // Only update if the value is a number and greater than 0
    if (!isNaN(quantity) && quantity > 0) {
      updateItemInCart({ productId, quantity });
    }
    setQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: quantity,
    }));
  };

  useEffect(() => {
    const getCountries = async () => {
      try {
        const result = await Country.getAllCountries();
        let allCountries = [];
        allCountries = result?.map(({ isoCode, name }) => ({
          isoCode,
          name,
        }));
        const [{ isoCode: firstCountry } = {}] = allCountries;
        setCountries(allCountries);
        setCountry(firstCountry);
      } catch (error) {
        setCountries([]);
      }
    };

    getCountries();
  }, [shippingAddress]);

  useEffect(() => {
    fetchShippingAddress();
  }, [dispatch]);

  const fetchShippingAddress = async () => {
    dispatch(shippingAddressStart());
    try {
      const response = await getRequest(`/orders/shipping/address`);
      const shippingAddress = await response.json();
      setShippingAddress(shippingAddress);
      setFirstName(shippingAddress.firstName);
      setLastName(shippingAddress.lastName);
      setPhoneNumber(shippingAddress.phoneNumber);
      setEmail(shippingAddress.email);
      setStreetAddress(shippingAddress.streetAddress);
      setTownCity(shippingAddress.townCity);
      setOrderNotes(shippingAddress.orderNotes);
      setCountry(shippingAddress.country);
      setApartment(shippingAddress.apartment);
      dispatch(shippingAddressSuccess(shippingAddress));
    } catch (err) {
      dispatch(shippingAddressFailure(err.message));
    }
  };

  const handleUpdate = async () => {
    dispatch(shippingAddressStart());
    setLoading(true);
    try {
      const response = await patchRequest(`/orders/create/shipping-address`, {
        address: {
          country,
          firstName,
          lastName,
          phoneNumber,
          email,
          streetAddress,
          townCity,
          orderNotes,
          apartment,
        },
      });
      const shippingAddress = await response.json();
      dispatch(shippingAddressSuccess(shippingAddress));
      setModalIsOpen(false);
      toast.success("Success");
      setLoading(false);
      fetchShippingAddress();
    } catch (err) {
      dispatch(shippingAddressFailure());
      setLoading(false);
    }
  };

  const handleCheckOut = async () => {
    setCheckingOut(true);
    try {
      const response = await postRequest(`/orders`, {
        address: {
          country,
          firstName,
          lastName,
          phoneNumber,
          email,
          streetAddress,
          townCity,
          orderNotes,
          apartment,
        },
        cartItems: cartState?.cartItems,
      });
      const data = await response.json();
      if (!response.ok) {
        toast.error(data.message);
        setCheckingOut(false);

        return;
      }
      toast.success("Success");
      clearCartItems();
      setCheckingOut(false);
    } catch (err) {
      setCheckingOut(false);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const subTotalPrice = cartState?.cartItems.reduce(
    (total, sale) => total + sale.subTotalPrice,
    0
  );
  return (
    <>
      <section className="md:pl-20 md:pr-10 ">
        {cartState?.cartItems.length > 0 ? (
          <>
            <h1 className="md:text-[48px] text-[27.13px] text-[#1D1D1F] font-semibold md:p-10 py-16 text-center">
              Cart total is <FormatCurrencyRate num={cartState?.totalPrice} />
            </h1>
            <div className="md:grid md:grid-cols-3 md:p-10 gap-4 sm:border-t border-b border-[#DDDDDD] px-5">
              {cartState?.cartItems?.map((item, i) => (
                <>
                  <div
                    className="flex md:justify-end md:items-end justify-center items-center"
                    key={i}
                  >
                    <Image
                      src={item?.thumbnailImage}
                      alt="image"
                      width={207.84}
                      height={196}
                      className="w-[207.84px] h-[196px]"
                    />
                  </div>
                  <div
                    className={`relative md:col-span-2 md:flex md:justify-between ${
                      i === cartState?.cartItems?.length - 1
                        ? ""
                        : "border-b border-[#DDDDDD]"
                    } md:w-full`}
                  >
                    <div>
                      <h1 className="text-[#1D1D1F] text-[24px] font-medium">
                        {item?.productName}
                      </h1>
                      <h3 className="text-[#1D1D1F] text-[14px] font-normal">
                        {item?.deviceName}
                      </h3>
                      <ul className="text-[#000000] text-[16px] font-normal my-2 space-y-2">
                        <h5 className="text-[#86868B] text-[12px] font-medium ">
                          Options
                        </h5>
                        {item?.options?.map((option, i) => (
                          <li
                            key={i}
                            className="text-[#1D1D1F] text-[12px] font-normal"
                          >
                            {option.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:relative md:right-0 md:bottom-0 absolute right-5 bottom-20 quantity">
                      <input
                        id={`quantity-input-${item.productId}`}
                        type="number"
                        value={
                          quantity[item.productId] !== undefined
                            ? quantity[item.productId]
                            : item.quantity
                        }
                        onChange={(e) =>
                          handleQuantityChange(item.productId, e.target.value)
                        }
                        min={1}
                        onKeyPress={(e) => {
                          const allowedChars = /[0-9.]/;
                          if (!allowedChars.test(e.key)) {
                            e.preventDefault();
                          }
                        }}
                        className="rounded-[8px] border focus:outline-none border-[#86868B] p-4 md:w-[105px] h-[52px] w-[105px] pt-8"
                      />

                      <label
                        for="quantity-input"
                        className="absolute top-1 right-8  text-[#86868B] text-sm font-normal with-placeholder "
                      >
                        Quantity
                      </label>
                    </div>

                    <div className="space-y-2">
                      <h1 className="text-[#1D1D1F] text-[24px] font-bold">
                        <FormatCurrencyRate num={item?.totalPrice} />
                      </h1>
                      <h3
                        onClick={() => handleRemove(item.productId)}
                        className=" cursor-pointer md:relative md:right-0 absolute right-5 bottom-3 text-[#0071E3] text-[14px] font-normal text-end"
                      >
                        Remove
                      </h3>
                    </div>
                  </div>
                </>
              ))}
            </div>
            <div className=" md:border-b md:border-[#DDDDDD]">
              <div className="md:ml-1">
                <div className="grid grid-cols-3 gap-4 my-5 ">
                  <div className="md:block hidden"></div>
                  <div className="col-span-2 md:ml-0 ml-5 ">
                    <h3 className="text-[#1D1D1F] text-[20px] font-medium">
                      Shipping Address{" "}
                    </h3>
                    <div className="md:flex md:justify-between">
                      {shippingAddress ? (
                        <>
                          <div className="text-[#6B7280] text-base font-normal space-y-5">
                            <>
                              <ul>
                                <li>
                                  <span className=" font-semibold">
                                    Street Address:
                                  </span>{" "}
                                  {streetAddress}
                                </li>
                                <li>
                                  <span className=" font-semibold">
                                    Suburb:{" "}
                                  </span>
                                  {apartment}
                                </li>
                                <li>
                                  <span className=" font-semibold">City: </span>
                                  {townCity}
                                </li>
                              </ul>
                              <button
                                className="text-[#0071E3] text-base font-normal"
                                onClick={openModal}
                              >
                                Edit...
                              </button>
                            </>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="text-[#1D1D1F] text-base font-normal">
                            <>
                              <h3 className="text-[#1D1D1F] text-base font-normal">
                                Ship from our hands to your home by adding your
                                shipping address
                              </h3>
                              <button
                                className="text-[#0071E3] text-base font-normal md:py-5"
                                onClick={openModal}
                              >
                                Add Shipping Address
                              </button>
                            </>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
                <hr />
                <div className="md:grid md:grid-cols-3 gap-4 my-5 md:ml-0 ">
                  <div className="md:block hidden"></div>
                  <div className="col-span-2 space-y-4">
                    <div className="md:flex justify-between md:space-x-0 flex space-x-32 md:m-0 m-5">
                      <h3 className="text-[#1D1D1F] text-base font-normal">
                        Subtotal
                      </h3>
                      <h3 className="text-[#1D1D1F] text-base font-normal">
                        <FormatCurrencyRate num={subTotalPrice} />
                      </h3>
                    </div>
                    <div className="md:flex justify-between md:space-x-0 flex space-x-32 md:m-0 m-5 ">
                      <h3 className="text-[#1D1D1F] text-base font-normal">
                        Shipping{" "}
                      </h3>
                      <h3 className="text-[#1D1D1F] text-base font-normal uppercase ">
                        Free
                      </h3>
                    </div>

                    <div className="md:flex justify-between md:space-x-0 flex space-x-32  md:m-0 m-5 md:border-t md:pt-5">
                      <h1 className="text-[#000000] text-[20px] font-normal">
                        Total
                      </h1>
                      <h1 className="text-[#000000] text-[20px] font-normal">
                        <FormatCurrencyRate num={cartState?.totalPrice} />
                      </h1>
                    </div>
                    {/* <div className="md:flex justify-between md:space-x-0 flex space-x-32  md:m-0 m-5">
                      <h1 className="text-base font-normal"></h1>
                      <h1 className="text-[#000000]  text-base font-normal">
                        Discount Code:{" "}
                        <span className="text-[#0071E3]"> 854613</span>
                      </h1>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
            <div className="md:flex md:justify-between flex justify-center items-center mt-5 mb-32">
              <h1 className="text-[#000000] text-[20px] font-normal md:pt-5"></h1>
              <button
                onClick={handleCheckOut}
                className="bg-[#0071E3]  md:w-[369px] w-[319px] rounded-[43px] text-base font-normal text-white p-3"
              >
                {checkingOut ? <SaveLoader /> : " Checkout "}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="md:text-[32px] text-[20px] text-[#1D1D1F] font-semibold ">
              Cart is Empty
            </h1>
            <hr />
            <br />
            <div className="flex flex-col justify-center items-center  md:px-20 md:min-h-80">
              <Image
                src={cartImpty}
                alt="cartImpty"
                width={165}
                height={129}
                className="w-[165px] h-[129px]"
              />
              {!currentUser ? (
                <>
                  <p className="text-base font-normal md:p-0 p-5 text-center">
                    Sign in to see if you saved some items in cart
                  </p>

                  <Link
                    href={`/signin?returnUrl=${encodeURIComponent(pathname)}`}
                    className="btn"
                  >
                    Sign in
                  </Link>
                </>
              ) : (
                ""
              )}
              <Link
                href="/"
                className="text-sm pt-3 font-normal text-[#0071E3] border-b border-[#0071E3]"
              >
                Continue shopping
              </Link>
            </div>
          </>
        )}
        <ShippingModal isOpen={modalIsOpen} onClose={closeModal}>
          <div className=" space-y-5">
            <div className="flex flex-col justify-center items-center md:gap-11 gap-2">
              <h2 className="md:text-[48px] text-2xl font-semibold mb-2 text-[#1D1D1F] text-center pt-10">
                Shipping Address
              </h2>
              <p className="text-[#86868B] md:text-base text-xs font-medium text-center md:w-[543px] w-[243px]">
                Effortlessly elevate your style with our easy-to-apply
                skins—peel, stick, and transform with simplicity and precision.
              </p>
            </div>

            <div className="md:grid md:grid-cols-2 md:gap-8 md:space-y-0  space-y-5 my-5">
              <div className="flex flex-col">
                <label htmlFor="firstName" className="form__label">
                  First name <span className="text-red-500">*</span>
                </label>
                <input
                  id="firstName"
                  value={firstName}
                  placeholder="Enter your first name"
                  className="form__input"
                  required
                  onChange={(event) => setFirstName(event.target.value)}
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="form__label">
                  Last name <span className="text-red-500">*</span>
                </label>
                <input
                  id="lastName"
                  value={lastName}
                  placeholder="Enter your last name "
                  className="form__input"
                  required
                  onChange={(event) => setLastName(event.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label htmlFor="phoneNumber" className="form__label">
                Phone number <span className="text-red-500">*</span>
              </label>
              <input
                id="phoneNumber"
                value={phoneNumber}
                placeholder="+1  201-555-0123"
                className="form__input"
                required
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="form__label">
                Email Address <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                placeholder="Email Address"
                value={email}
                className="form__input"
                required
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label htmlFor="streetaddress" className="form__label">
                Street Address <span className="text-red-500">*</span>
              </label>

              <input
                id="streetaddress"
                placeholder="House number and Street name"
                value={streetAddress}
                className="form__input"
                required
                onChange={(event) => setStreetAddress(event.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="streetaddress" className="form__label">
                Apartment (Optional)
              </label>
              <input
                id="streetaddress"
                placeholder="Apartment, suite, unit etc. (Optional)"
                className="form__input"
                value={apartment}
                onChange={(event) => setApartment(event.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="form__label">
                Town/City <span className="text-red-500">*</span>
              </label>
              <input
                id="city"
                placeholder="Town/City"
                value={townCity}
                onChange={(event) => setTownCity(event.target.value)}
                className="form__input"
              />
            </div>
            <div>
              <label htmlFor="country" className="form__label">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                id="country"
                className="form__input"
                name="country"
                placeholder="Select Country"
                value={country}
                required
                onChange={(event) => setCountry(event.target.value)}
              >
                <option>Select Country</option>
                {countries.map(({ isoCode, name }) => (
                  <option value={name} key={isoCode}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="message" className="form__label">
                Order notes (Optional)
              </label>
              <textarea
                id="message"
                rows="6"
                className="form__input"
                value={orderNotes}
                onChange={(event) => setOrderNotes(event.target.value)}
                placeholder="Notes about your order, e.g special notes for delivery"
              />
            </div>
          </div>
          <div className="mt-3">
            <div className="items-center">
              <input
                id="default-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600  border-gray-300 rounded "
              />
              <label
                for="default-checkbox"
                className="ml-2 text-sm font-normal text-[#000000]"
              >
                Save shipping address for next purchase
              </label>
            </div>
            <button
              onClick={handleUpdate}
              className="  btn rounded-[6px] w-[295px]"
            >
              {loading ? <SaveLoader /> : "Add shipping address"}
            </button>
          </div>
        </ShippingModal>
      </section>
      <Bought
      // topproducts={topproducts}
      />
      <Sectionfive />
      <Footer />
    </>
  );
};

export default CheckOut;
