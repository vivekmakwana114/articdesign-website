"use client";
import React, { useState, useEffect } from "react";
import { cartImpty, imageskin } from "../../assets";
import { Country } from "country-state-city";
import ShippingModal from "@/components/Modals/ShippingModal";
import Footer from "@/components/Footer";
import Sectionfive from "@/components/Home/Sectionfive";
import Bought from "@/components/Customers/Bought";
import Image from "next/image";
import toast from "react-hot-toast";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FormatCurrencyRate from "@/components/Currency/FormatCurrencyRate";
import api from "@/lib/api";
import SaveLoader from "@/components/SaveLoader";
import { loadRazorpayScript } from "@/lib/razorpay";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCart,
  incrementItem,
  decrementItem,
  removeItem,
  updateItem,
  clearCart,
} from "@/state/cart/cartSlice";
import { getAddresses } from "@/state/address/addressService";

const CheckOut = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.auth);
  const { cartItems, cartData, cartStatus } = useSelector(
    (state) => state.cart,
  );
  const currentUser = user;
  const pathname = usePathname();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const clearCartItems = () => {};
  const [countries, setCountries] = useState([]);
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

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleRemove = (id) => {
    dispatch(removeItem(id)).then(() => {
      dispatch(fetchCart());
      toast.success("Item removed");
    });
  };

  const handleQuantityChange = (id, value) => {
    const qty = parseInt(value, 10);
    if (!isNaN(qty) && qty > 0) {
      dispatch(updateItem({ id, data: { quantity: qty } })).then(() => {
        dispatch(fetchCart());
      });
    }
  };

  const handleIncrement = (id) => {
    dispatch(incrementItem(id)).then(() => {
      dispatch(fetchCart());
    });
  };

  const handleDecrement = (id) => {
    dispatch(decrementItem(id)).then(() => {
      dispatch(fetchCart());
    });
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
    if (currentUser?._id || currentUser?.id) {
      fetchShippingAddress();
    }
  }, [currentUser]);

  const fetchShippingAddress = async () => {
    try {
      const userId = currentUser?._id || currentUser?.id;
      if (!userId) return;
      const response = await getAddresses(userId);
      const addresses = response.data?.data || response.data || [];
      const defaultAddr = addresses.find((a) => a.isDefault) || addresses[0];
      if (defaultAddr) {
        setShippingAddress(defaultAddr);
        setFirstName(defaultAddr.firstName || "");
        setLastName(defaultAddr.lastName || "");
        setPhoneNumber(defaultAddr.phone || "");
        setEmail(defaultAddr.email || "");
        setStreetAddress(defaultAddr.streetAddress1 || "");
        setTownCity(defaultAddr.city || "");
        setCountry(defaultAddr.country || "");
        setApartment(defaultAddr.streetAddress2 || "");
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProceedFromModal = (address) => {
    if (address) {
      setShippingAddress(address);
      setFirstName(address.firstName || "");
      setLastName(address.lastName || "");
      setPhoneNumber(address.phone || "");
      setEmail(address.email || "");
      setStreetAddress(address.streetAddress1 || "");
      setTownCity(address.city || "");
      setCountry(address.country || "");
      setApartment(address.streetAddress2 || "");
      setModalIsOpen(false);
      toast.success("Address selected");
    }
  };

  const handleCheckOut = async () => {
    if (!currentUser) {
      toast.error("Please login to proceed with the checkout and payment.");
      router.push(`/auth?returnUrl=${encodeURIComponent(pathname)}`);
      return;
    }

    if (!firstName || !streetAddress || !townCity) {
      toast.error("Please provide a shipping address");
      openModal();
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      toast.error("Razorpay SDK failed to load. Are you online?");
      return;
    }

    setCheckingOut(true);
    try {
      const orderPayload = {
        orderType: "online",
        shippingAddress: shippingAddress?._id || shippingAddress?.id,
      };
      const response = await api.post(`/v1/order`, orderPayload);

      // Razorpay data (matching your backend createOrder response payload)
      const { razorpayOrderId, amount, currency, keyId } =
        response.data.data || response.data;

      const options = {
        key: keyId || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amount,
        currency: currency,
        name: "Artic Designs",
        description: "Payment for your Artic Designs Kit",
        order_id: razorpayOrderId,
        handler: async function (razorpayResponse) {
          try {
            await api.post("/v1/payment/verify", {
              razorpay_order_id: razorpayResponse.razorpay_order_id,
              razorpay_payment_id: razorpayResponse.razorpay_payment_id,
              razorpay_signature: razorpayResponse.razorpay_signature,
            });

            // Remove all cart items from the backend cart
            if (cartItems && cartItems.length > 0) {
              await Promise.all(
                cartItems.map((item) =>
                  dispatch(removeItem(item.id || item._id)),
                ),
              );
            }

            dispatch(clearCart());
            toast.success("Payment Successful!");
            router.push("/user?dashboard=orders");
          } catch (err) {
            toast.error("Payment verification failed");
          }
        },
        prefill: {
          name: `${firstName} ${lastName}`,
          email: email,
          contact: phoneNumber,
        },
        theme: {
          color: "#0071E3",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create order");
    } finally {
      setCheckingOut(false);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const subTotalPrice =
    cartData?.summary?.subTotal ||
    cartItems.reduce(
      (total, item) =>
        total + (item.total || item.totalPrice || item.subTotalPrice || 0),
      0,
    );
  return (
    <>
      <section className="md:pl-20 md:pr-10 ">
        {cartItems.length > 0 ? (
          <>
            <h1 className="md:text-[48px] text-[27.13px] text-[#1D1D1F] font-semibold md:p-10 py-16 text-center">
              Cart total is{" "}
              <FormatCurrencyRate
                num={cartData?.summary?.total || cartData?.totalPrice || 0}
              />
            </h1>
            <div className="md:grid md:grid-cols-3 md:p-10 gap-4 sm:border-t border-b border-[#DDDDDD] px-5">
              {cartItems?.map((item, i) => (
                <React.Fragment key={item.id || item._id || i}>
                  <div className="flex md:justify-end md:items-end justify-center items-center">
                    <Image
                      src={
                        item.image ||
                        item?.product?.images?.[0] ||
                        item?.thumbnailImage ||
                        imageskin
                      }
                      alt="image"
                      width={207.84}
                      height={196}
                      unoptimized={true}
                      className="w-[207.84px] h-[196px] object-cover"
                    />
                  </div>
                  <div
                    className={`relative md:col-span-2 md:flex md:justify-between ${
                      i === cartItems?.length - 1
                        ? ""
                        : "border-b border-[#DDDDDD]"
                    } md:w-full`}
                  >
                    <div>
                      <h1 className="flex items-cetner justify-center pb-8 text-[#1D1D1F] text-[24px] font-medium mt-2">
                        {item.name ||
                          item?.product?.productName ||
                          item?.productName}
                      </h1>
                      <h3 className="text-[#1D1D1F] text-[14px] font-normal">
                        {item.device ||
                          item.deviceName ||
                          item?.product?.device}
                      </h3>
                      <div className="flex justify-between items-start mt-4">
                        <div>
                          {item?.variantAreas?.length > 0 && (
                            <h5 className="text-[#86868B] text-[12px] font-medium ">
                              Options
                            </h5>
                          )}
                          <ul className="text-[#000000] text-[16px] font-normal my-2 space-y-2">
                            {item?.variantAreas?.map((option, idx) => (
                              <li
                                key={option.variantAreaId || option._id || idx}
                                className="text-[#1D1D1F] text-[12px] font-normal"
                              >
                                {option.name}{" "}
                                {option.additionalPrice
                                  ? `(₹${option.additionalPrice})`
                                  : ""}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        {/* Mobile Quantity Selector */}
                        <div className="md:hidden flex items-center border border-[#DDDDDD] rounded-[8px] p-1 gap-1 h-fit">
                          <button
                            onClick={() => handleDecrement(item.id || item._id)}
                            className="p-2 text-sm font-bold"
                          >
                            -
                          </button>
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(e) =>
                              handleQuantityChange(
                                item.id || item._id,
                                e.target.value,
                              )
                            }
                            min={1}
                            className="w-[28px] text-center focus:outline-none text-sm bg-transparent font-medium"
                          />
                          <button
                            onClick={() => handleIncrement(item.id || item._id)}
                            className="p-2 text-sm font-bold"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="hidden md:flex md:relative absolute right-5 bottom-20 quantity items-center gap-1 md:gap-2">
                      <button
                        onClick={() => handleDecrement(item.id || item._id)}
                        className="p-1 md:px-2 md:py-1 border rounded text-xs md:text-base"
                      >
                        -
                      </button>
                      <input
                        id={`quantity-input-${item.id || item._id}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) =>
                          handleQuantityChange(
                            item.id || item._id,
                            e.target.value,
                          )
                        }
                        min={1}
                        className="rounded-[8px] border focus:outline-none border-[#86868B] p-1 md:p-2 w-[40px] md:w-[60px] text-center text-xs md:text-base"
                      />
                      <button
                        onClick={() => handleIncrement(item.id || item._id)}
                        className="p-1 md:px-2 md:py-1 border rounded text-xs md:text-base"
                      >
                        +
                      </button>
                    </div>


                    <div className="flex justify-between items-center mt-4 md:block md:space-y-2 md:mt-2">
                      <h1 className="text-[#1D1D1F] text-[24px] font-bold">
                        <FormatCurrencyRate
                          num={
                            item.total ||
                            item?.totalPrice ||
                            item?.subTotalPrice
                          }
                        />
                      </h1>
                      <h3
                        onClick={() => handleRemove(item.id || item._id)}
                        className="cursor-pointer text-[#0071E3] text-[14px] font-normal"
                      >
                        Remove from cart
                      </h3>
                    </div>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <div className="md:flex md:flex-col items-end md:pr-10 py-10 w-full mt-5 border-t border-[#DDDDDD]">
              {/* Shipping Address Row */}
              <div className="flex md:flex-row flex-col justify-between md:w-[60%] w-full border-b border-[#DDDDDD] pb-6 px-5 md:px-0">
                <h3 className="text-[#1D1D1F] text-[20px] font-semibold mb-4 md:mb-0">
                  Shipping Address
                </h3>
                <div className="text-left md:text-right flex flex-col md:items-end items-start text-[#6B7280] text-[14px] font-normal space-y-1">
                  {shippingAddress ? (
                    <>
                      <p>Street Address: {streetAddress}</p>
                      <p>Suburb: {apartment}</p>
                      <p>City: {townCity}</p>
                      <p>Postal Code: {shippingAddress?.postalCode || ""}</p>
                      <button
                        className="text-[#0071E3] text-[12px] font-medium mt-2"
                        onClick={openModal}
                      >
                        Edit...
                      </button>
                    </>
                  ) : (
                    <>
                      <p>Ship from our hands to your home</p>
                      <button
                        className="text-[#0071E3] text-[14px] font-medium mt-2"
                        onClick={openModal}
                      >
                        Add Shipping Address
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Subtotal & Shipping Row */}
              <div className="flex flex-col md:w-[60%] w-full space-y-4 border-b border-[#DDDDDD] py-6 px-5 md:px-0">
                <div className="flex justify-between items-center w-full">
                  <span className="text-[#1D1D1F] text-[16px]">Subtotal</span>
                  <span className="text-[#1D1D1F] text-[16px]">
                    <FormatCurrencyRate num={subTotalPrice} />
                  </span>
                </div>
                <div className="flex justify-between items-center w-full">
                  <span className="text-[#1D1D1F] text-[16px]">Shipping</span>
                  <span className="text-[#1D1D1F] text-[16px] uppercase">
                    Free
                  </span>
                </div>
              </div>

              {/* Total Row & Coupon Row */}
              <div className="flex flex-col items-end md:w-[60%] w-full py-6 px-5 md:px-0">
                <div className="flex justify-between items-center w-full mb-2">
                  <span className="text-[#1D1D1F] text-[24px] font-medium">
                    Total
                  </span>
                  <span className="text-[#1D1D1F] text-[24px] font-semibold">
                    <FormatCurrencyRate
                      num={
                        cartData?.summary?.total || cartData?.totalPrice || 0
                      }
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center w-full mb-4">
                  <span className="text-[#1D1D1F] text-[16px]">Discount</span>
                  <span className="text-[#0071E3] text-[16px] font-semibold">
                    -{" "}
                    <FormatCurrencyRate
                      num={cartData?.summary?.discount || 0}
                    />
                  </span>
                </div>

                <div className="flex justify-between items-center w-full mb-4">
                  <span className="text-[#1D1D1F] text-[16px]">
                    Applied Coupon
                  </span>
                  <span className="text-[#0071E3] text-[16px] font-semibold bg-[#E8F1FF] px-3 py-1 rounded-md">
                    {cartData?.appliedCoupon?.couponCode || "N/A"}
                  </span>
                </div>
              </div>

              {/* Checkout Button */}
              <div className="flex justify-center md:justify-end w-full mt-6 mb-32 md:mb-10 px-5 md:px-0">
                <button
                  onClick={handleCheckOut}
                  className="bg-[#0071E3] text-white py-3 md:w-[369px] w-full rounded-[43px] font-medium text-[16px]"
                >
                  {checkingOut ? <SaveLoader /> : "Checkout"}
                </button>
              </div>
            </div>
          </>
        ) : (
          <>
            <h1 className="md:text-[32px] text-[20px] text-[#1D1D1F] font-semibold ">
              Cart is Empty
            </h1>
            <hr />
            <br />
            <div className="flex flex-col justify-center items-center mt-4 md:px-20 md:min-h-80">
              <Image
                src={cartImpty}
                alt="cartImpty"
                width={165}
                height={129}
                className="w-[165px] h-[129px]"
              />
              {!mounted ? null : !currentUser ? (
                <>
                  <p className="text-base font-normal md:p-0 p-5 text-center">
                    Sign in to see your cart items
                  </p>

                  <Link
                    href={`/auth?returnUrl=${encodeURIComponent(pathname)}`}
                    className="btn"
                  >
                    Sign in
                  </Link>
                </>
              ) : null}
              <Link
                href="/"
                className="text-sm pt-3 font-normal text-[#0071E3] border-b border-[#0071E3]"
              >
                Continue shopping
              </Link>
            </div>
          </>
        )}
        <ShippingModal
          isOpen={modalIsOpen}
          onClose={closeModal}
          onProceed={handleProceedFromModal}
        />
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
