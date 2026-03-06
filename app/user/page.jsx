"use client";
import React, { useEffect, useState, Suspense } from "react";
import { AiOutlineInfoCircle, AiOutlineSend } from "react-icons/ai";

import {
  deleteIcon,
  mailprofile,
  mark_email_read,
  mark_email_unread,
  profile2,
  progressbar,
  skinselectlaptop7,
} from "../../assets";
import "react-datepicker/dist/react-datepicker.css";
import MessageModal from "../../components/Modals/MessageModal";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import api from "@/lib/api";
import toast from "react-hot-toast";
import SaveLoader from "@/components/SaveLoader";
import FormatCurrencyRate from "@/components/Currency/FormatCurrencyRate";

const AccoutsModal = dynamic(
  () => import("../../components/Modals/AccountsModal"),
  {
    ssr: false,
  },
);

const maildata = [
  {
    image: mailprofile,
    title: "Message title goes in here",
    body: "Message body goes in here",
    date: "today",
  },
  {
    image: mailprofile,
    title: "Message title goes in here",
    body: "Message body goes in here",
    date: "today",
  },
  {
    image: mailprofile,
    title: "Message title goes in here",
    body: "Message body goes in here",
    date: "today",
  },
];

function UserContent() {
  const [orders, setOrders] = useState([]);
  const currentUser = null; // Removed Redux state access
  const searchParams = useSearchParams(); // Use useSearchParams to get query params
  const dashboard = searchParams.get("dashboard");
  const router = useRouter();
  const [selectedOption, setSelectedOption] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalReportOpen, setModalReportOpen] = useState(false);
  const [modalInboxOpen, setModalInboxOpen] = useState(false);
  const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false);
  const [proLoading, setProLoading] = useState(false);
  const [orderProblemMessage, setOrderProblemMessage] = useState("");
  const [deactivating, setDeactivating] = useState(false);
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [country, setCountry] = useState("");
  const [initialBirthday, setInitialBirthday] = useState("");
  const [birthday, setBirthday] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentOrder, setCurrentOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  /* useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]); */

  useEffect(() => {
    // Format the initial date to YYYY-MM-DD if it's provided
    if (initialBirthday) {
      const formattedDate = new Date(initialBirthday)
        .toISOString()
        .split("T")[0];
      setBirthday(formattedDate);
    }
  }, [initialBirthday]);

  useEffect(() => {
    loadUser();
    loadUserOrders();
  }, []);

  const loadUser = async () => {
    try {
      const res = await api.get(`/auth/profile`);
      const data = res.data;
      setFirstname(data.firstname);
      setLastname(data.lastname);
      setEmail(data.email);
      setPhonenumber(data.phonenumber);
      setInitialBirthday(data.birthday);
      setImage(data.profilePicture);
      setCountry(data.country);
    } catch (err) {
      console.log(err);
    }
  };
  const loadUserOrders = async () => {
    try {
      const res = await api.get(`/orders/user-orders`);
      setOrders(res.data.orders);
    } catch (err) {
      console.log(err);
    }
  };
  const handleUpdatePassword = async () => {
    try {
      setUpdatingPassword(true);
      const res = await api.post(`/user/passwordreset`, {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword,
      });
      setModalPasswordIsOpen(false);
      setUpdatingPassword(false);
      setCurrentPassword("");
      toast.success("Success");
    } catch (err) {
      console.log(err);
      setUpdatingPassword(false);
    }
  };
  const handleAccountsDeactivate = async () => {
    try {
      setDeactivating(true);
      const res = await api.put(`/user/deactivateaccounts`, {
        deactivateReason:
          selectedOption === "Others" ? otherReason : selectedOption,
      });
      setModalPasswordIsOpen(false);
      setDeactivating(false);
      setOtherReason("");
      setSelectedOption("");
      await api.post(`/auth/signout`);
      router.push("/");
      toast.success("Success");
    } catch (err) {
      console.log(err);
      setDeactivating(false);
    }
  };
  const handleSubmitProblem = async () => {
    try {
      setProLoading(true);
      const res = await api.patch(
        `/orders/order-problem?slug=${currentOrder?.slug}&orderId=${currentOrder.orderId}`,
        {
          orderProblemMessage,
        },
      );
      toast.success(res.data.message);
      setOrderProblemMessage("");
      setModalReportOpen(false);
      setProLoading(false);
    } catch (err) {
      console.log(err);
      setProLoading(false);
    }
  };
  const handleUpdate = async () => {
    try {
      setLoading(true);
      const res = await api.put(`/user/update`, {
        firstname,
        lastname,
        email,
        phonenumber,
        birthday,
        country,
      });
      setModalPasswordIsOpen(false);
      setLoading(false);
      toast.success(res.data.message);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const [openSection, setOpenSection] = useState(dashboard);
  const [activeTab, setActiveTab] = useState(dashboard);
  const [messageStates, setMessageStates] = useState(maildata.map(() => false));
  // console.log("info", openSection);
  const toggleCheckbox = (index) => {
    const updatedStates = [...messageStates];
    updatedStates[index] = !updatedStates[index];
    setMessageStates(updatedStates);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    router.push(`/user?dashboard=${tab}`);
  };

  const handleOptionChange = (e) => {
    const value = e.target.value;
    setSelectedOption(value);

    // If "Others" is selected, clear the otherReason field
    if (value !== "Others") {
      setOtherReason("");
    }
  };

  const openInboxModal = () => {
    setModalInboxOpen(true);
  };
  const openReportModal = () => {
    setModalReportOpen(true);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const openPassModal = () => {
    setModalPasswordIsOpen(true);
  };

  const closePassModal = () => {
    setModalPasswordIsOpen(false);
  };
  const closeInboxModal = () => {
    setModalInboxOpen(false);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeReportModal = () => {
    setModalReportOpen(false);
  };

  useEffect(() => {
    // Update the active tab based on the category parameter in the URL
    setActiveTab(dashboard || "personalinformation");
    setOpenSection(dashboard || "personalinformation");
  }, [dashboard]);

  const predefinedStatuses = [
    "Delivered", // 4
    "Out for Delivery", // 3
    "Shipped", // 2
    "Waiting to be Shipped", // 1
    "Pending", // 5
  ];

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(
      orders?.reduce((acc, order) => acc + order.cartItems.length, 0) /
        pageSize,
    );
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    const totalPages = Math.ceil(
      orders?.reduce((acc, order) => acc + order.cartItems.length, 0) /
        pageSize,
    );
    setCurrentPage(totalPages);
  };

  const renderTabContent = () => {
    if (activeTab === "personalinformation") {
      return (
        <div className="col-span-2 ">
          <p className=" text-[28px] font-bold text-[#111827]">
            Personal Details
          </p>
          <p className=" text-sm font-normal text-[#86868B]">
            Personal information about you
          </p>
          <div className="md:my-10 space-y-5">
            <div className="flex flex-row gap-5">
              <div className="flex flex-col space-y-4">
                <label htmlFor="first-name" className="form__label">
                  First name
                </label>
                <input
                  id="first-name"
                  type="text"
                  value={firstname}
                  className="form__input w-[250px]"
                  onChange={(e) => setFirstname(e.target.value)}
                />
                {/*  border border-[#D1D5DB] rounded-[6px] md:w-[213.5px] w-[300px] h-[40px] p-3 */}
              </div>
              <div className="flex flex-col space-y-4">
                <label htmlFor="last-name" className="form__label">
                  Last name
                </label>
                <input
                  id="last-name"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="form__input w-[250px]"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2 relative">
              <label htmlFor="dirthday" className="form__label">
                Birthday
              </label>
              <input
                id="dirthday"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                className="form__input w-[520px] cursor-pointer"
              />
            </div>
            <div className="my-5">
              <p className=" text-[28px] font-normal text-[#000000] py-3">
                My Credentials
              </p>
              <div className="flex flex-col gap-3">
                <label htmlFor="email" className="form__label">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form__input w-[520px]"
                />

                <h3
                  className="font-normal cursor-pointer"
                  onClick={openPassModal}
                >
                  <span className=" text-[#0071E3] text-base underline underline-offset-2">
                    Change Password
                  </span>
                </h3>
              </div>
            </div>
            <div className="">
              <button
                onClick={handleUpdate}
                className=" border bg-[#0071E3] rounded-[6px] md:w-[188px] w-[300px] p-3 text-white font-medium text-base text-center"
              >
                {loading ? <SaveLoader /> : "Update"}
              </button>
            </div>
          </div>

          <h3 className="font-normal" onClick={openModal}>
            <span className=" text-[#E31B00] text-base underline underline-offset-2 cursor-pointer">
              Deactivate account
            </span>
          </h3>
        </div>
      );
    } else if (activeTab === "orders") {
      return (
        <div className="col-span-2 md:ml-5">
          <p className=" text-[28px] font-bold text-[#111827]">Orders</p>
          <p className=" text-sm font-normal text-[#86868B]">
            View and manage messages with ArticDesign
          </p>
          .
          {orders?.length > 0 ? (
            <>
              <dev className="md:pl-2 md:pr-2">
                <div className="md:grid md:grid-cols-4 p-5 gap-4  md:pt-10 md:pb-10">
                  {orders?.map((order, i) => {
                    const paginatedCartItems = order.cartItems.slice(
                      startIndex,
                      endIndex,
                    );
                    let qty = order.cartItems.reduce(
                      (acc, order) => acc + (order?.quantity || 0),
                      0,
                    );
                    let totalSum = order.cartItems.reduce(
                      (acc, order) =>
                        acc +
                        (order?.product?.totalPrice * order.quantity || 0),
                      0,
                    );

                    return (
                      <React.Fragment key={i}>
                        {paginatedCartItems.map((cartItem, i) => (
                          <>
                            <div
                              key={i}
                              className="flex flex-row items-center gap-5 col-span-2"
                            >
                              <div>
                                <Image
                                  src={cartItem?.thumbnailImage}
                                  alt="image"
                                  width={94.38}
                                  height={91.08}
                                  className="w-[94.38px] h-[91.08px]"
                                />
                              </div>
                              <div>
                                <h1 className="text-[#1D1D1F] text-[14px] font-medium">
                                  {cartItem?.productName}
                                </h1>
                                <h3 className="text-[#1D1D1F] text-[14px] font-normal">
                                  {cartItem?.deviceName}
                                </h3>

                                <ul className=" my-2 space-y-2">
                                  <h5 className="text-[#86868B] text-[11px] font-normal ">
                                    Options
                                  </h5>
                                  {cartItem?.options?.map((option, i) => (
                                    <li
                                      key={i}
                                      className="text-[#1D1D1F] text-[11px] font-normal"
                                    >
                                      {option.name}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className=" flex flex-col items-center ">
                              <p className="flex flex-col justify-center gap-1 rounded-[8px] border border-[#86868B] bg-[#EFEFEF] w-[105px]  px-2">
                                <span className="text-[#86868B] text-sm font-normal with-placeholder">
                                  Quantity
                                </span>
                                <span>{cartItem.quantity}</span>
                              </p>
                            </div>
                            <div className="flex flex-col items-end">
                              <h1 className="text-[#1D1D1F] text-[16px] font-bold">
                                <FormatCurrencyRate
                                  num={cartItem?.totalPrice}
                                />
                              </h1>
                              <h3
                                // onClick={() => handleTabClick("trackorder")}
                                onClick={() => {
                                  setCurrentOrder(cartItem);
                                  handleTabClick("trackorder");
                                }}
                                className="py-5 cursor-pointer md:relative md:right-0 absolute right-10 bottom-3 text-[#0071E3] text-[14px] font-normal text-end"
                              >
                                Track Order
                              </h3>
                            </div>
                          </>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </div>
                <hr />
                {/* Pagination Controls */}
                <div className="flex justify-center mt-4 gap-3 items-center">
                  <button
                    className="px-4 py-2 bg-[#052e73] text-xs text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={handleFirstPage}
                    disabled={currentPage === 1}
                  >
                    First
                  </button>
                  <button
                    className="px-4 py-2 bg-[#052e73] text-xs text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                  <span className="px-4 text-[12px]">
                    Page {currentPage} of{" "}
                    {Math.ceil(
                      orders?.reduce(
                        (acc, order) => acc + order.cartItems.length,
                        0,
                      ) / pageSize,
                    )}
                  </span>
                  <button
                    className="px-4 py-2 bg-[#052e73] text-xs text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={handleNextPage}
                    disabled={
                      currentPage ===
                      Math.ceil(
                        orders?.reduce(
                          (acc, order) => acc + order.cartItems.length,
                          0,
                        ) / pageSize,
                      )
                    }
                  >
                    Next
                  </button>
                  <button
                    className="px-4 py-2 bg-[#052e73] text-xs text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
                    onClick={handleLastPage}
                    disabled={
                      currentPage ===
                      Math.ceil(
                        orders?.reduce(
                          (acc, order) => acc + order.cartItems.length,
                          0,
                        ) / pageSize,
                      )
                    }
                  >
                    Last
                  </button>
                </div>
              </dev>
            </>
          ) : (
            <section className="">
              <p className="text-2xl font-semibold">No Orders made yet</p>
            </section>
          )}
        </div>
      );
    } else if (activeTab === "trackorder") {
      return (
        <div className="flex flex-col">
          <p className="text-[28px] font-bold text-[#111827]">Order Tracker</p>
          <p className="text-sm font-normal text-[#86868B]">
            View and manage messages with ArticDesign
          </p>

          <div className="flex flex-row ml-32 py-5">
            <div className="flex flex-row space-x-2">
              <div className="flex justify-start items-end pl-11">
                <Image
                  src={currentOrder?.thumbnailImage}
                  alt="image"
                  width={73}
                  height={68.84}
                  className="w-[73px] h-[68.84px]"
                />
                {/* <Image
                  src={cartItem?.thumbnailImage}
                  alt="image"
                  width={73}
                  height={68.84}
                  className="w-[73px] h-[68.84px]"
                /> */}
              </div>

              <div className="w-[331px] flex flex-col justify-center items-start mt-5">
                <p className="text-[#1D1D1F] font-semibold text-sm">
                  {currentOrder?.deviceName}
                </p>
                <p className=" text-[#86868B] font-normal text-sx">
                  {currentOrder?.productName}
                </p>
              </div>
            </div>
            <div className="w-[331px] flex flex-col justify-end items-center">
              <p className="text-[#1D1D1F] font-semibold text-sm">
                Order Number
              </p>
              <p className=" text-[#86868B] font-normal text-sx uppercase">
                # {currentOrder?.orderId}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start mb-10  ">
            <div className="relative wrap overflow-hidden h-full ml-[-222px]">
              <div
                className="absolute h-[98%] mt-[1.7rem] "
                style={{ right: 400 }}
              >
                <Image
                  src={progressbar}
                  alt="Timeline Line"
                  className="h-[85%]"
                />
              </div>
              {/* <pre>{JSON.stringify(currentOrder, null, 2)}</pre> */}
              {predefinedStatuses.map((status, index) => {
                // Check if the status is present in the order's orderStatus
                const isStatusCompleted =
                  currentOrder?.orderStatus?.includes(status);
                return (
                  <div
                    key={index}
                    className="flex justify-between w-full left-timeline mb-8"
                  >
                    <div className={`order-${index + 1} w-[394px]`}></div>
                    <div
                      className={`z-0 flex items-center mt-[21px] order-${
                        index + 1
                      } shadow-xl w-[16px] h-[16px] rounded-full ${
                        isStatusCompleted ? "bg-[#0071E3]" : "bg-[#D9D9D9]"
                      }`}
                    ></div>
                    <div className={`order-${index + 1} w-[394px] px-6 py-4`}>
                      <h3
                        className={`font-semibold text-base ${
                          isStatusCompleted
                            ? "text-[#0071E3]"
                            : "text-[#1D1D1F]"
                        }`}
                      >
                        {status}
                      </h3>
                      <h3 className="mb-3 font-normal text-sm text-[#86868B]">
                        Updated on{" "}
                        {new Date(currentOrder.orderDate).toLocaleDateString()}
                      </h3>
                      {status === "Delivered" && isStatusCompleted && (
                        <div className="leading-snug tracking-wide rounded-md bg-[#E0FBFD] w-[394px] p-3 space-y-3">
                          <h1 className="font-semibold text-base text-[#1D1D1F] flex justify-start items-center">
                            <span className="text-[#1F8C94] text-xl">
                              <AiOutlineInfoCircle />
                            </span>
                            <p className="pl-3">
                              Have a problem with your package?
                            </p>
                          </h1>
                          <div className="ml-7 space-y-4">
                            <p className="text-sm font-normal">
                              Oh no! If there's an issue with your package, send
                              a report so we can help you fix it!
                            </p>
                            <button
                              onClick={() => openReportModal()}
                              className="text-[#0071E3] text-xs font-semibold rounded-md border border-[#0071E3] p-2"
                            >
                              Submit a report
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <section className="md:p-20">
      <div className=" md:grid md:grid-cols-3 gap-4 hidden z-30">
        <div className="flex justify-center z-50">
          <div className="md:flex md:flex-col  md:items-end">
            <div className="space-y-4 my-5 md:flex md:flex-col  md:items-center">
              <Image
                src={image.Location}
                alt="profileimage"
                width={177}
                height={177}
                className="w-[117px] h-[117px] rounded-full"
              />
              <p className=" font-medium text-[#111827] text-sm">
                {firstname} {lastname}
              </p>
              <p className=" font-medium text-[#86868B] text-sm">{email}</p>
              <div className="md:flex md:flex-col md:gap-5 my-5 ">
                <p
                  className={` cursor-pointer  ${
                    activeTab === "personalinformation"
                      ? " font-semibold  text-[#0071E3]"
                      : "text-[#86868B]  font-normal"
                  }`}
                  onClick={() => handleTabClick("personalinformation")}
                >
                  Personal Information
                </p>
                <p
                  className={`cursor-pointer ${
                    activeTab === "orders"
                      ? " font-semibold  text-[#0071E3]"
                      : "text-[#86868B]  font-normal"
                  }`}
                  onClick={() => handleTabClick("orders")}
                >
                  Orders
                </p>
                {/* <p
                  className={`cursor-pointer ${
                    activeTab === "inbox"
                      ? " font-semibold  text-[#0071E3]"
                      : "text-[#86868B]  font-normal"
                  }`}
                  onClick={() => handleTabClick("inbox")}
                >
                  Inbox
                </p> */}
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">{renderTabContent()}</div>
      </div>

      {/* Mobile view md:hidden block */}
      <div className="md:hidden h-screen block max-w-md mx-auto p-5">
        <div className="space-y-2">
          {/* Personal Information Section */}
          <div className="bg-white rounded-lg z-40 ">
            {dashboard === "personalinformation" && (
              <div className="col-span-2 space-y-5">
                <div>
                  <p className=" text-[28px] font-bold text-[#111827]">
                    Personal Details
                  </p>
                  <p className=" text-sm font-normal text-[#86868B]">
                    Personal information about you
                  </p>
                </div>
                <div className="form-group ">
                  <label htmlFor="firstname" className="form__label">
                    First name
                  </label>
                  <input
                    id="firstname"
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="form__input"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastname" className="form__label">
                    Last name
                  </label>
                  <input
                    id="lastname"
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="form__input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="dirthday" className="form__label">
                    Birthday
                  </label>
                  <input
                    id="dirthday"
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    className="form__input  cursor-pointer"
                  />
                </div>
                <div className="form-group">
                  <p className=" text-[28px] font-normal text-[#000000] py-3">
                    My Credentials
                  </p>
                  <br />
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="form__label">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form__input"
                    />

                    <h3 className="font-normal" onClick={openPassModal}>
                      <span className=" text-[#0071E3] text-base underline underline-offset-2">
                        Change Password
                      </span>
                    </h3>
                  </div>
                </div>
                <button
                  onClick={handleUpdate}
                  type="submit"
                  className=" border bg-[#0071E3] rounded-[6px] w-[183px] p-3 text-white font-medium text-base text-center"
                >
                  {loading ? <SaveLoader /> : "Update"}
                </button>

                <h3 className="font-normal " onClick={openModal}>
                  <span className=" text-[#E31B00] text-base underline underline-offset-2 cursor-pointer">
                    Deactivate account
                  </span>
                </h3>
              </div>
            )}
          </div>

          {/* Orders Section */}
          <div className=" rounded-lg ">
            {dashboard === "orders" && (
              <div className="p-4">
                <p className=" text-[28px] font-bold text-[#111827]">Orders</p>
                <p className=" text-sm font-normal text-[#86868B]">
                  View and manage messages with ArticDesign
                </p>
                {orders?.length > 0 ? (
                  <>
                    <section className="md:pl-2 md:pr-2">
                      <div className="md:grid md:grid-cols-3 p-5 gap-4  md:pt-10 md:pb-10">
                        {orders?.map((order, i) => {
                          const paginatedCartItems = order.cartItems.slice(
                            startIndex,
                            endIndex,
                          );
                          let qty = order.cartItems.reduce(
                            (acc, order) => acc + (order?.quantity || 0),
                            0,
                          );
                          let totalSum = order.cartItems.reduce(
                            (acc, order) =>
                              acc +
                              (order?.product?.totalPrice * order.quantity ||
                                0),
                            0,
                          );
                          return (
                            <>
                              {paginatedCartItems.map((cartItem, i) => (
                                <>
                                  <div
                                    className=" md:flex md:justify-end md:items-end "
                                    key={i}
                                  >
                                    <Image
                                      src={cartItem?.thumbnailImage}
                                      alt="image"
                                      width={207.84}
                                      height={200.58}
                                      className="w-[207.84px] h-[200.58px]"
                                    />
                                  </div>
                                  <div className=" relative md:col-span-2 md:flex md:justify-between  md:w-full">
                                    <div>
                                      <h1 className="text-[#1D1D1F] text-[20px] font-medium">
                                        {cartItem?.productName}
                                      </h1>
                                      <h3 className="text-[#1D1D1F] text-[14px] font-normal">
                                        {cartItem?.deviceName}
                                      </h3>
                                      <h5 className="text-[#86868B] text-[14px] font-medium py-4">
                                        Options
                                      </h5>
                                      <ul className="text-[#000000] text-[16px] font-normal">
                                        {cartItem?.options?.map((option, i) => (
                                          <li
                                            key={i}
                                            className="text-[#1D1D1F] text-[11px] font-normal"
                                          >
                                            {option.name}
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                    <div className="md:relative md:right-0 md:bottom-0 absolute right-5 bottom-20 quantity">
                                      <p className="flex flex-col justify-center gap-1 rounded-[8px] border border-[#86868B] bg-[#EFEFEF] w-[105px]  px-2">
                                        <span className="text-[#86868B] text-sm font-normal with-placeholder">
                                          Quantity
                                        </span>
                                        <span>{cartItem.quantity}</span>
                                      </p>
                                    </div>

                                    <div className=" space-y-2">
                                      <h1 className="text-[#1D1D1F] text-[24px] font-bold">
                                        <FormatCurrencyRate
                                          num={cartItem?.totalPrice}
                                        />
                                      </h1>
                                      <h3
                                        className=" cursor-pointer md:relative md:right-0 absolute right-5 bottom-3 text-[#0071E3] text-[14px] font-normal text-end"
                                        onClick={() => {
                                          setCurrentOrder(cartItem);
                                          handleTabClick("trackorder");
                                        }}
                                      >
                                        Track Order
                                      </h3>
                                    </div>
                                  </div>
                                </>
                              ))}
                            </>
                          );
                        })}
                      </div>
                    </section>
                    {/* Pagination Controls */}
                    <div className="flex justify-center mt-4 gap-2 items-center">
                      <button
                        className="px-4 py-2 bg-[#052e73] text-xs text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
                        onClick={handleFirstPage}
                        disabled={currentPage === 1}
                      >
                        First
                      </button>
                      <button
                        className="px-4 py-2 bg-[#052e73] text-xs text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
                        onClick={handlePrevPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </button>
                      {/* <span className="px-4 text-[8px] flex">
                    page {currentPage} of{" "}
                    {Math.ceil(
                      orders?.reduce(
                        (acc, order) => acc + order.cartItems.length,
                        0
                      ) / pageSize
                    )}
                  </span> */}
                      <button
                        className="px-4 py-2 bg-[#052e73] text-xs text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
                        onClick={handleNextPage}
                        disabled={
                          currentPage ===
                          Math.ceil(
                            orders?.reduce(
                              (acc, order) => acc + order.cartItems.length,
                              0,
                            ) / pageSize,
                          )
                        }
                      >
                        Next
                      </button>
                      <button
                        className="px-4 py-2 bg-[#052e73] text-xs text-white rounded disabled:bg-gray-300 disabled:text-gray-500"
                        onClick={handleLastPage}
                        disabled={
                          currentPage ===
                          Math.ceil(
                            orders?.reduce(
                              (acc, order) => acc + order.cartItems.length,
                              0,
                            ) / pageSize,
                          )
                        }
                      >
                        Last
                      </button>
                    </div>
                  </>
                ) : (
                  ""
                )}
              </div>
            )}
          </div>

          {/* Inbox Section */}
          <div className="bg-white rounded-lg">
            {dashboard === "trackorder" && (
              <div>
                <p className="pl-8 text-[28px] font-bold text-[#111827]">
                  Order Tracker
                </p>
                <p className=" pl-8  text-sm font-normal text-[#86868B]">
                  View and manage messages with ArticDesign
                </p>
                <div className="grid grid-cols-2 gap-4 my-5">
                  <div className="col-span-2">
                    <div className=" flex flex-row ">
                      <div className=" flex flex-col space-x-5">
                        <div className="flex pl-5">
                          <Image
                            src={currentOrder?.thumbnailImage}
                            alt="image"
                            width={73}
                            height={68.84}
                            className="w-[73px] h-[68.84px]"
                          />
                        </div>

                        <div className="w-[155px] flex flex-col justify-center items-start mt-2">
                          <p className="text-[#1D1D1F] font-medium text-sm">
                            {currentOrder?.productName}
                          </p>
                          <p className=" text-[#86868B] font-normal text-[11px]">
                            {currentOrder?.deviceName}
                          </p>
                        </div>
                      </div>
                      <div className="w-[231px] flex flex-col justify-end items-center">
                        <p className="text-[#1D1D1F] font-medium text-sm">
                          Order Number
                        </p>
                        <p className=" text-[#86868B] font-normal text-sx">
                          #{currentOrder?.orderId}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col justify-center items-center mb-10 overflow-x-auto">
                  <div className="relative  overflow-hidden h-full ml-[-1px]">
                    <div
                      className="absolute h-full mt-[1.7rem]"
                      style={{ right: 400 }}
                    >
                      <Image
                        src={progressbar}
                        alt="Timeline Line"
                        className="h-[85%]"
                      />
                    </div>

                    {predefinedStatuses.map((status, index) => {
                      // Check if the status is present in the order's orderStatus
                      const isStatusCompleted =
                        currentOrder?.orderStatus?.includes(status);

                      return (
                        <div
                          key={index}
                          className="flex justify-between w-full left-timeline mb-8"
                        >
                          <div className={`order-${index + 1} w-[103px]`}></div>
                          <div
                            className={`z-0 flex items-center mt-[21px] order-${
                              index + 1
                            } shadow-xl w-[16px] h-[16px] rounded-full ${
                              isStatusCompleted
                                ? "bg-[#0071E3]"
                                : "bg-[#D9D9D9]"
                            }`}
                          ></div>
                          <div
                            className={`order-${index + 1} w-[394px] px-2 py-4`}
                          >
                            <h3
                              className={`font-semibold text-base ${
                                isStatusCompleted
                                  ? "text-[#0071E3]"
                                  : "text-[#1D1D1F]"
                              }`}
                            >
                              {status}
                            </h3>
                            <h3 className="mb-3 font-normal text-sm text-[#86868B]">
                              Updated on{" "}
                              {new Date(
                                currentOrder.updatedAt,
                              ).toLocaleDateString()}
                            </h3>
                            {status === "Delivered" && isStatusCompleted && (
                              <div className="rounded-md bg-[#E0FBFD] w-full p-3 space-y-5">
                                <h1 className="  text-[#1D1D1F] flex  gap-2 items-center">
                                  <span className="text-[#1F8C94] text-base">
                                    <AiOutlineInfoCircle className="text-base" />
                                  </span>
                                  <p className=" text-sm semibold">
                                    Have a problem with your package?
                                  </p>
                                </h1>
                                <p className="text-xs font-normal leading-5">
                                  Oh no! If there's an issue with your package,
                                  <br /> send a report so we can help you fix
                                  it!
                                </p>
                                <div className=" space-y-4">
                                  <button
                                    onClick={() => openReportModal()}
                                    className="text-[#0071E3] text-xs font-semibold rounded-md border border-[#0071E3] p-2"
                                  >
                                    Submit a report
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                    {/* Add more content here... */}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <AccoutsModal isOpen={modalIsOpen} onClose={closeModal}>
        <div className="md:m-10 space-y-5 flex flex-col justify-center items-center">
          <div>
            <h3 className="text-[#1D1D1F] text-[28px] font-medium text-center">
              Deactivate Account
            </h3>
            <p className="text-[#86868B] md:text-sm text-xs font-normal text-center md:w-[401px] w-[301px]">
              We're sorry that you want to close your ArtDesign account. If you
              deactivate your account, you won't be able to see or use any of
              your information anymore.
            </p>
            <div className="max-w-md mx-auto mt-4">
              <label
                htmlFor="reason"
                className="block text-sm font-medium mb-2"
              >
                Share your reason for deactivating your account
              </label>
              <select
                id="reason"
                name="reason"
                value={selectedOption}
                onChange={handleOptionChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              >
                <option value="">Select the reason</option>
                <option value="Security concerns">Security concerns</option>
                <option value="Personal reasons">Personal reasons</option>
                <option value="Service issue">Service issue</option>
                <option value="Unsatisfied with a product">
                  Unsatisfied with a product
                </option>
                <option value="No useful contents">No useful contents</option>
                <option value="Not interested in articDesign anymore">
                  Not interested in articDesign anymore
                </option>
                <option value="Billing issue">Billing issue</option>
                <option value="Others">Others</option>
              </select>

              {selectedOption === "Others" && (
                <div className="mt-4">
                  <label
                    htmlFor="otherReason"
                    className="block text-base font-medium mb-2"
                  >
                    Others (Optional):
                  </label>
                  <textarea
                    id="otherReason"
                    name="otherReason"
                    placeholder="Enter the your reason "
                    value={otherReason}
                    onChange={(e) => setOtherReason(e.target.value)}
                    className="w-full h-[116px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}
            </div>
          </div>
          <div className="md:w-[400px] w-[290px]">
            <button
              onClick={handleAccountsDeactivate}
              type="submit"
              className="disabled:bg-gray-300 rounded-[6px] w-full p-3 text-white font-medium text-xs text-center bg-red-500"
              disabled={!selectedOption}
            >
              {deactivating ? <SaveLoader /> : "  Deactivate Account"}
            </button>
          </div>
        </div>
      </AccoutsModal>
      <AccoutsModal isOpen={modalPasswordIsOpen} onClose={closePassModal}>
        <div className="">
          <div className=" flex flex-col gap-3 ">
            <div>
              <h3 className="text-[#1D1D1F] md:text-[28px] text-[16px] font-medium text-center ">
                Change password
              </h3>
              <p className="text-[#86868B] md:text-sm text-xs font-normal text-center pt-3 md:w-[382px] w-72">
                Choose a strong password and remember to use a new one for every
                account you have.
              </p>
              <p className="text-[#86868B] text-sm font-normal text-center pt-8">
                You may be signed out of your account on some devices.
              </p>
            </div>
            <div className="flex flex-col">
              <label htmlFor="o_password" className="form__label">
                Old password
              </label>
              <input
                id="o_password"
                type="password"
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Old Password"
                className="form__input"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="c_password" className="form__label">
                Confirm password
              </label>
              <input
                id="c_password"
                type="password"
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="form__input"
              />
              <p className="text-[#86868B]   md:text-sm text-xs font-normal md:w-[382px] w-[290px]">
                Use a least 8 characters. Don’t use something too obvious like
                your pet’s name.
              </p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="new_password" className="form__label">
                New password
              </label>
              <input
                id="new_password"
                type="text"
                placeholder="New Password"
                className="form__input"
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              onClick={handleUpdatePassword}
              className=" border bg-[#0071E3]  rounded-[6px] w-full  p-3 text-white font-medium text-xs text-center"
            >
              {updatingPassword ? <SaveLoader /> : "Change password"}
            </button>
          </div>
        </div>
      </AccoutsModal>
      <AccoutsModal isOpen={modalReportOpen} onClose={closeReportModal}>
        <div className="md:m-12 space-y-5">
          <div className="md:w-[400px] relative">
            <div className="flex flex-col justify-center items-center">
              <h3 className="text-[#1D1D1F] text-[28px] font-medium text-center">
                Submit Report
              </h3>
              <p className="text-[#86868B] text-center text-sm font-normal w-[303px] pl-5">
                Oh no! If there's an issue with your package, Send a report so
                we're here to help you fix it!
              </p>
            </div>
            <br />
            <label
              htmlFor="report"
              className="block text-base font-medium mb-2"
            >
              Explain the problem
            </label>
            <textarea
              id="report"
              name="orderProblemMessage"
              placeholder="Explain the problem "
              value={orderProblemMessage}
              onChange={(e) => setOrderProblemMessage(e.target.value)}
              className="md:w-full w-[300px] h-[116px] p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <button
            onClick={handleSubmitProblem}
            type="submit"
            className="my-5 border bg-[#0071E3]  rounded-[6px] md:w-full w-[308px]   p-3 text-white font-medium text-xs text-center"
          >
            {proLoading ? <SaveLoader /> : "Submit report"}
          </button>
        </div>
      </AccoutsModal>
    </section>
  );
}

function User() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserContent />
    </Suspense>
  );
}

export default User;
