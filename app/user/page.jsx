"use client";
import React, { useEffect, useState, Suspense, useRef } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import { progressbar, skinselectlaptop7, profile2 } from "../../assets";
import "react-datepicker/dist/react-datepicker.css";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
import { FaCamera } from "react-icons/fa";
import dynamic from "next/dynamic";
import api from "@/lib/api";
import toast from "react-hot-toast";
import SaveLoader from "@/components/SaveLoader";
import FormatCurrencyRate from "@/components/Currency/FormatCurrencyRate";
import { useSelector, useDispatch } from "react-redux";
import {
  updateProfile,
  changeUserPassword,
  deactivateAccount,
  resetUserStatus,
  fetchCustomerOrders,
  createTicket,
} from "@/state/user/userSlice";

const AccoutsModal = dynamic(
  () => import("../../components/Modals/AccountsModal"),
  {
    ssr: false,
  },
);

// ============================================================
// USER CONTENT — Main component wrapping all dashboard tabs
// ============================================================
function UserContent() {
  // ── Helper: Returns a valid profile image URL or null ──
  const getProfileSrc = (src) => {
    if (!src || src === "null" || src === "") return null;
    if (typeof src === "object") return src.Location || src.profile || null;
    if (
      typeof src === "string" &&
      (src.startsWith("http") || src.startsWith("/"))
    )
      return src;
    return null;
  };

  const currentUser = useSelector((state) => state?.auth?.user);
  const {
    updateStatus,
    passwordStatus,
    deactivateStatus,
    updateMessage,
    passwordMessage,
    deactivateMessage,
    updateError,
    passwordError,
    deactivateError,
    ordersData,
    ordersStatus,
    ordersError,
    ticketStatus,
    ticketError,
    ticketMessage,
  } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const searchParams = useSearchParams();
  const dashboard = searchParams.get("dashboard");
  const router = useRouter();

  // ── Modal visibility state ──
  const [selectedOption, setSelectedOption] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalReportOpen, setModalReportOpen] = useState(false);

  const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false);
  const [proLoading, setProLoading] = useState(false);
  const [orderProblemMessage, setOrderProblemMessage] = useState("");

  // ── Personal Information form state ──
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [country, setCountry] = useState("");
  const [initialBirthday, setInitialBirthday] = useState("");
  const [birthday, setBirthday] = useState("");

  // ── Profile image state ──
  const [profile, setProfile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");
  const [image, setImage] = useState("");

  // ── Change password form state ──
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // ── Order tracking state ──
  const [currentOrder, setCurrentOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // ── Support ticket form state ──
  const [ticketSubject, setTicketSubject] = useState("");
  const [ticketDescription, setTicketDescription] = useState("");
  const pageSize = 3;
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  // ── Auth guard: redirect to home if not logged in ──
  useEffect(() => {
    if (!currentUser) {
      router.push("/");
    }
  }, [currentUser]);


  useEffect(() => {
    // Format the initial date to YYYY-MM-DD for the date input
    if (initialBirthday) {
      try {
        let formattedDate;
        // Handle DD-MM-YYYY format from API
        if (/^\d{2}-\d{2}-\d{4}$/.test(initialBirthday)) {
          const [dd, mm, yyyy] = initialBirthday.split("-");
          formattedDate = `${yyyy}-${mm}-${dd}`;
        } else {
          const parsed = new Date(initialBirthday);
          if (!isNaN(parsed)) {
            formattedDate = parsed.toISOString().split("T")[0];
          }
        }
        if (formattedDate) setBirthday(formattedDate);
      } catch (e) {
      }
    }
  }, [initialBirthday]);

  // ── Populate form fields from Redux auth state on login ──
  useEffect(() => {
    if (currentUser) {
      setFirstname(currentUser?.firstName || "");
      setLastname(currentUser?.lastName || "");
      setEmail(currentUser?.email || "");
      setPhonenumber(currentUser?.phone || "");
      setInitialBirthday(currentUser?.birthday || "");
      setImage(currentUser?.profile || "");
      setCountry(currentUser?.country || "");
    }
  }, [currentUser]);

  // ============================================================
  // HANDLERS
  // ============================================================

  // ── Orders: dispatches fetchCustomerOrders thunk ──
  const loadUserOrders = async () => {
    if (!currentUser) return;
    try {
      const customerId = currentUser?._id || currentUser?.id;
      await dispatch(fetchCustomerOrders({ customerId })).unwrap();
    } catch (err) {
      console.error(err);
    }
  };
  // ── Change Password handler ──
  const handleUpdatePassword = async () => {
    try {
      if (newPassword !== confirmPassword) {
        toast.error("New passwords do not match!");
        return;
      }
      await dispatch(
        changeUserPassword({
          id: currentUser?._id || currentUser?.id,
          passwordData: {
            currentPassword,
            newPassword,
            confirmNewPassword: confirmPassword,
          },
        }),
      ).unwrap();

      setModalPasswordIsOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      console.error(err);
    }
  };
  // ── Deactivate Account handler ──
  const handleAccountsDeactivate = async () => {
    try {
      await dispatch(
        deactivateAccount({
          id: currentUser?._id || currentUser?.id,
          reasonData: {
            reason: selectedOption === "Others" ? otherReason : selectedOption,
          },
        }),
      ).unwrap();

      setModalPasswordIsOpen(false);
      setOtherReason("");
      setSelectedOption("");
      await api.post(`/auth/signout`);
      router.push("/");
    } catch (err) {
      console.error(err);
    }
  };
  // ── Submit Order Problem / Support Ticket ──
  const handleSubmitProblem = async () => {
    if (!ticketSubject.trim() || !ticketDescription.trim()) {
      toast.error("Please fill in both subject and description.");
      return;
    }
    try {
      await dispatch(
        createTicket({
          subject: ticketSubject,
          description: ticketDescription,
        }),
      ).unwrap();
      setTicketSubject("");
      setTicketDescription("");
      closeReportModal();
    } catch (err) {
      console.error(err);
    }
  };
  // ── Update Profile / Personal Information ──
  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append("firstname", firstname);
      formData.append("lastname", lastname);
      formData.append("email", email);
      formData.append("phonenumber", phonenumber);
      formData.append("birthday", birthday);
      formData.append("country", country);
      if (profile) formData.append("profile", profile);

      await dispatch(
        updateProfile({
          id: currentUser?._id || currentUser?.id,
          formData: formData,
        }),
      ).unwrap();

      setModalPasswordIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  // ── Toast feedback: update / password / deactivate / ticket status changes ──
  useEffect(() => {
    if (updateStatus === "succeeded") {
      toast.success(updateMessage);
      dispatch(resetUserStatus());
    } else if (updateStatus === "failed") {
      toast.error(updateError);
      dispatch(resetUserStatus());
    }
  }, [updateStatus, updateMessage, updateError, dispatch]);

  useEffect(() => {
    if (passwordStatus === "succeeded") {
      toast.success(passwordMessage);
      dispatch(resetUserStatus());
    } else if (passwordStatus === "failed") {
      toast.error(passwordError);
      dispatch(resetUserStatus());
    }
  }, [passwordStatus, passwordMessage, passwordError, dispatch]);

  useEffect(() => {
    if (deactivateStatus === "succeeded") {
      toast.success(deactivateMessage);
      dispatch(resetUserStatus());
    } else if (deactivateStatus === "failed") {
      toast.error(deactivateError);
      dispatch(resetUserStatus());
    }
  }, [deactivateStatus, deactivateMessage, deactivateError, dispatch]);

  useEffect(() => {
    if (ticketStatus === "succeeded") {
      toast.success(ticketMessage || "Ticket submitted successfully!");
      dispatch(resetUserStatus());
    } else if (ticketStatus === "failed") {
      toast.error(ticketError || "Failed to submit ticket.");
      dispatch(resetUserStatus());
    }
  }, [ticketStatus, ticketMessage, ticketError, dispatch]);

  const [openSection, setOpenSection] = useState(dashboard);
  const [activeTab, setActiveTab] = useState(dashboard);

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

  const closeModal = () => {
    setModalIsOpen(false);
  };
  const closeReportModal = () => {
    setModalReportOpen(false);
  };

  // ── Sync active tab with the ?dashboard= URL param ──
  useEffect(() => {
    setActiveTab(dashboard || "personalinformation");
    setOpenSection(dashboard || "personalinformation");
  }, [dashboard]);

  // ── Fetch orders when orders tab is active (desktop and direct URL) ──
  useEffect(() => {
    if ((activeTab === "orders" || dashboard === "orders") && currentUser) {
      loadUserOrders();
    }
  }, [activeTab, currentUser, dashboard]);

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
      ordersData?.reduce((acc, order) => acc + order.cartItems.length, 0) /
        pageSize,
    );
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    const totalPages = Math.ceil(
      ordersData?.reduce((acc, order) => acc + order.cartItems.length, 0) /
        pageSize,
    );
    setCurrentPage(totalPages);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(file);
      const render = new FileReader();
      render.onload = () => {
        setImage(render.result);
      };
      render.readAsDataURL(file);
    }
  };

  // ── Profile image: trigger file picker ──
  const handleCameraClick = () => {
    fileInputRef.current.click();
  };

  // ============================================================
  // TAB CONTENT RENDERER
  // Returns the JSX for the currently active dashboard tab.
  // Tabs: personalinformation | orders | trackorder
  // ============================================================
  const renderTabContent = () => {
    // ── TAB: Personal Information ──
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
                {updateStatus === "loading" ? <SaveLoader /> : "Update"}
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

      // ── TAB: Orders ──
      // Fetches and displays the user's customer orders.
      // Data is pulled from Redux state (ordersData) via fetchCustomerOrders thunk.
    } else if (activeTab === "orders") {
      return (
        <div className="col-span-2 md:ml-5">
          <p className=" text-[28px] font-bold text-[#111827]">Orders</p>
          <p className=" text-sm font-normal text-[#86868B]">
            View and manage your orders with ArticDesign
          </p>
          {ordersStatus === "loading" ? (
            <div className="flex justify-center items-center py-10">
              <SaveLoader />
            </div>
          ) : ordersData?.length > 0 ? (
            <>
              <div className="md:pl-2 md:pr-2">
                <div className="flex flex-col gap-6 p-5 md:pt-10 md:pb-10">
                  {ordersData?.map((order, i) => (
                    <React.Fragment key={order._id || i}>
                      {/* Order header */}
                      <div className="flex justify-between items-center border-b pb-2">
                        <div>
                          <span className="text-[#86868B] text-xs font-normal">
                            Order ID:{" "}
                          </span>
                          <span className="text-[#1D1D1F] text-xs font-semibold uppercase">
                            {order.orderId}
                          </span>
                        </div>
                        <div className="flex gap-4">
                          <span
                            className={`text-xs font-normal px-2 py-1 rounded-full ${order?.deliveryStatus === "placed" ? "bg-blue-100 text-blue-600" : order.deliveryStatus === "returned" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-600"}`}
                          >
                            {order.deliveryStatus}
                          </span>
                          <span className="text-xs text-[#86868B]">
                            {new Date(order.date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      {/* Products in each order */}
                      {order.items?.products?.map((product, j) => (
                        <div
                          key={j}
                          className="md:grid md:grid-cols-4 gap-4 items-center border-b pb-4"
                        >
                          <div className="flex flex-row items-center gap-5 col-span-2">
                            <div>
                              {product?.image ? (
                                <Image
                                  src={product.image}
                                  alt="image"
                                  width={94}
                                  height={91}
                                  className="w-[94px] h-[91px] object-cover rounded"
                                />
                              ) : (
                                <div className="w-[94px] h-[91px] bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                                  No image
                                </div>
                              )}
                            </div>
                            <div>
                              <h1 className="text-[#1D1D1F] text-[14px] font-medium">
                                {product?.name}
                              </h1>
                              <ul className="my-2 space-y-1">
                                <h5 className="text-[#86868B] text-[11px] font-normal">
                                  Variant Areas
                                </h5>
                                {product?.variantAreas?.map((area, k) => (
                                  <li
                                    key={k}
                                    className="text-[#1D1D1F] text-[11px] font-normal"
                                  >
                                    {area.name}{" "}
                                    {area.additionalPrice
                                      ? `(+₹${area.additionalPrice})`
                                      : ""}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="flex flex-col items-center">
                            <p className="flex flex-col justify-center gap-1 rounded-[8px] border border-[#86868B] bg-[#EFEFEF] w-[105px] px-2">
                              <span className="text-[#86868B] text-sm font-normal">
                                Quantity
                              </span>
                              <span>{product.quantity}</span>
                            </p>
                          </div>
                          <div className="flex flex-col items-end">
                            <h1 className="text-[#1D1D1F] text-[16px] font-bold">
                              <FormatCurrencyRate num={product?.price} />
                            </h1>
                            <h3
                              onClick={() => {
                                setCurrentOrder({
                                  ...product,
                                  orderId: order.orderId,
                                  orderDate: order.date,
                                  deliveryStatus: order.deliveryStatus,
                                });
                                handleTabClick("trackorder");
                              }}
                              className="py-2 cursor-pointer text-[#0071E3] text-[14px] font-normal text-end"
                            >
                              Track Order
                            </h3>
                          </div>
                        </div>
                      ))}
                      {/* Order total */}
                      <div className="flex justify-between items-center text-sm pt-1 pb-3">
                        <span className="text-[#86868B]">Order Total</span>
                        <span className="font-bold text-[#1D1D1F]">
                          <FormatCurrencyRate num={order.amount} />
                        </span>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <section className="py-10">
              <p className="text-2xl font-semibold">No Orders made yet</p>
            </section>
          )}
        </div>
      );

      // ── TAB: Track Order ──
      // Shows a timeline-style progress view for a selected order.
      // currentOrder is set when the user clicks "Track Order" in the Orders tab.
    } else if (activeTab === "trackorder") {
      // If no order selected (e.g. direct URL), redirect back to orders
      if (!currentOrder || !currentOrder.name) {
        return (
          <div className="col-span-2 md:ml-5 flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-lg text-[#86868B]">
              No order selected to track.
            </p>
            <button
              onClick={() => handleTabClick("orders")}
              className="bg-[#0071E3] text-white text-sm px-6 py-2 rounded-md"
            >
              Go to Orders
            </button>
          </div>
        );
      }

      // Map deliveryStatus to predefined statuses for timeline
      const deliveryStatusMap = {
        placed: ["Pending"],
        processing: ["Pending", "Waiting to be Shipped"],
        shipped: ["Pending", "Waiting to be Shipped", "Shipped"],
        "out-for-delivery": [
          "Pending",
          "Waiting to be Shipped",
          "Shipped",
          "Out for Delivery",
        ],
        delivered: [
          "Pending",
          "Waiting to be Shipped",
          "Shipped",
          "Out for Delivery",
          "Delivered",
        ],
        returned: ["Pending"],
      };
      const completedStatuses =
        deliveryStatusMap[currentOrder?.deliveryStatus] || [
          currentOrder?.deliveryStatus,
        ] ||
        [];

      return (
        <div className="flex flex-col">
          <p className="text-[28px] font-bold text-[#111827]">Order Tracker</p>
          <p className="text-sm font-normal text-[#86868B]">
            Track your order status
          </p>

          <div className="flex flex-row ml-32 py-5">
            <div className="flex flex-row space-x-2">
              <div className="flex justify-start items-end pl-11">
                {currentOrder?.image ? (
                  <Image
                    src={currentOrder.image}
                    alt="image"
                    width={73}
                    height={68}
                    className="w-[73px] h-[68px] object-cover rounded"
                  />
                ) : (
                  <div className="w-[73px] h-[68px] bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
              </div>

              <div className="w-[331px] flex flex-col justify-center items-start mt-5">
                <p className="text-[#1D1D1F] font-semibold text-sm">
                  {currentOrder?.name}
                </p>
                <p className="text-[#86868B] font-normal text-xs capitalize">
                  Status: {currentOrder?.deliveryStatus}
                </p>
              </div>
            </div>
            <div className="w-[331px] flex flex-col justify-end items-center">
              <p className="text-[#1D1D1F] font-semibold text-sm">
                Order Number
              </p>
              <p className="text-[#86868B] font-normal text-xs uppercase">
                {currentOrder?.orderId}
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-start items-start mb-10">
            <div className="relative wrap overflow-hidden h-full ml-[-222px]">
              <div
                className="absolute h-[98%] mt-[1.7rem]"
                style={{ right: 400 }}
              >
                <Image
                  src={progressbar}
                  alt="Timeline Line"
                  className="h-[85%]"
                />
              </div>
              {predefinedStatuses.map((status, index) => {
                const isStatusCompleted = completedStatuses.includes(status);
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
                        {currentOrder?.orderDate
                          ? new Date(
                              currentOrder.orderDate,
                            ).toLocaleDateString()
                          : "—"}
                      </h3>
                      {status === "Delivered" && isStatusCompleted && (
                        <div className="leading-snug tracking-wide rounded-md bg-[#E0FBFD] w-[400px] p-3 space-y-3">
                          <h1 className="font-semibold text-base text-[#1D1D1F] flex justify-start items-center">
                            <span className="text-[#1F8C94] text-xl">
                              <AiOutlineInfoCircle />
                            </span>
                            <p className="pl-2">
                              Have a problem with your package?
                            </p>
                          </h1>
                          <div className="pl-6 space-y-4">
                            <p className="text-sm font-normal">
                              Oh no! If there&apos;s an issue with your package,{" "}
                              <br />
                              send a report so we can help you fix it!
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

  if (!currentUser) {
    return null;
  }

  return (
    <section className="md:p-20">
      {/* ============================================================
          DESKTOP VIEW — md: grid layout (3 columns)
          Col 1: Profile card + sidebar nav tabs
          Col 2&3: Active tab content via renderTabContent()
          ============================================================ */}
      <div className=" md:grid md:grid-cols-3 gap-4 hidden z-30">
        <div className="flex justify-center z-50">
          <div className="md:flex md:flex-col  md:items-end">
            <div className="space-y-4 my-5 md:flex md:flex-col  md:items-center">
              <div className="relative inline-block">
                {getProfileSrc(image) ? (
                  <Image
                    src={getProfileSrc(image)}
                    alt="profileimage"
                    width={117}
                    height={117}
                    className="w-[117px] h-[117px] rounded-full object-cover"
                  />
                ) : (
                  <div className="w-[117px] h-[117px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <CgProfile size={50} />
                  </div>
                )}

                <div
                  className="absolute bottom-0 left-0 bg-blue-500 rounded-full p-2 cursor-pointer shadow-md hover:bg-blue-600 transition"
                  onClick={handleCameraClick}
                >
                  <FaCamera className="text-white text-sm" />
                </div>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </div>
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
                    activeTab === "orders" || activeTab === "trackorder"
                      ? " font-semibold  text-[#0071E3]"
                      : "text-[#86868B]  font-normal"
                  }`}
                  onClick={() => handleTabClick("orders")}
                >
                  Orders
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2">{renderTabContent()}</div>
      </div>

      {/* ============================================================
          MOBILE VIEW \u2014 shown below md breakpoint
          Tabs are rendered by checking the ?dashboard= URL param directly.
          Sections: Personal Information | Orders | Track Order
          ============================================================ */}
      <div className="md:hidden h-screen block max-w-md mx-auto p-5">
        <div className="space-y-2">
          {/* Personal Information Section */}
          <div className="bg-white rounded-lg z-40 ">
            {dashboard === "personalinformation" && (
              <div className="col-span-2 space-y-5">
                <div className="flex flex-col items-center mb-6">
                  <div className="relative inline-block">
                    {getProfileSrc(image) ? (
                      <Image
                        src={getProfileSrc(image)}
                        alt="profileimage"
                        width={117}
                        height={117}
                        className="w-[117px] h-[117px] rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-[117px] h-[117px] rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                        <CgProfile size={50} />
                      </div>
                    )}
                    <div
                      className="absolute bottom-0 left-0 bg-blue-500 rounded-full p-2 cursor-pointer shadow-md hover:bg-blue-600 transition"
                      onClick={handleCameraClick}
                    >
                      <FaCamera className="text-white text-sm" />
                    </div>
                  </div>
                  <p className="mt-3 font-medium text-[#111827] text-sm">
                    {firstname} {lastname}
                  </p>
                  <p className="font-medium text-[#86868B] text-sm">{email}</p>
                </div>
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
                  {updateStatus === "loading" ? <SaveLoader /> : "Update"}
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
                  View and manage your orders with ArticDesign
                </p>
                {ordersStatus === "loading" ? (
                  <div className="flex justify-center items-center py-10">
                    <SaveLoader />
                  </div>
                ) : ordersData?.length > 0 ? (
                  <div className="flex flex-col gap-6 pt-4">
                    {ordersData?.map((order, i) => (
                      <React.Fragment key={order._id || i}>
                        {/* Order header */}
                        <div className="flex justify-between items-center border-b pb-2">
                          <div>
                            <span className="text-[#86868B] text-xs">
                              Order ID:{" "}
                            </span>
                            <span className="text-[#1D1D1F] text-xs font-semibold uppercase">
                              {order.orderId}
                            </span>
                          </div>
                          <div className="flex gap-2 items-center">
                            <span
                              className={`text-xs px-2 py-1 rounded-full ${order.deliveryStatus === "placed" ? "bg-blue-100 text-blue-600" : order.deliveryStatus === "returned" ? "bg-red-100 text-red-500" : "bg-green-100 text-green-600"}`}
                            >
                              {order.deliveryStatus}
                            </span>
                            <span className="text-xs text-[#86868B]">
                              {new Date(order.date).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        {/* Products */}
                        {order.items?.products?.map((product, j) => (
                          <div
                            key={j}
                            className="flex flex-col gap-3 pb-4 border-b"
                          >
                            <div className="flex gap-3 items-start">
                              {product?.image ? (
                                <Image
                                  src={product.image}
                                  alt="image"
                                  width={80}
                                  height={80}
                                  className="w-[80px] h-[80px] object-cover rounded"
                                />
                              ) : (
                                <div className="w-[80px] h-[80px] bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                                  No image
                                </div>
                              )}
                              <div className="flex-1">
                                <h1 className="text-[#1D1D1F] text-[16px] font-medium">
                                  {product?.name}
                                </h1>
                                <h5 className="text-[#86868B] text-[12px] font-medium py-1">
                                  Variant Areas
                                </h5>
                                <ul>
                                  {product?.variantAreas?.map((area, k) => (
                                    <li
                                      key={k}
                                      className="text-[#1D1D1F] text-[11px]"
                                    >
                                      {area.name}{" "}
                                      {area.additionalPrice
                                        ? `(+₹${area.additionalPrice})`
                                        : ""}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            <div className="flex justify-between items-center">
                              <p className="flex flex-col justify-center gap-1 rounded-[8px] border border-[#86868B] bg-[#EFEFEF] w-[105px] px-2">
                                <span className="text-[#86868B] text-sm font-normal">
                                  Quantity
                                </span>
                                <span>{product.quantity}</span>
                              </p>
                              <div className="space-y-1 text-right">
                                <h1 className="text-[#1D1D1F] text-[20px] font-bold">
                                  <FormatCurrencyRate num={product?.price} />
                                </h1>
                                <h3
                                  className="cursor-pointer text-[#0071E3] text-[14px] font-normal"
                                  onClick={() => {
                                    setCurrentOrder({
                                      ...product,
                                      orderId: order.orderId,
                                      orderDate: order.date,
                                      deliveryStatus: order.deliveryStatus,
                                    });
                                    handleTabClick("trackorder");
                                  }}
                                >
                                  Track Order
                                </h3>
                              </div>
                            </div>
                          </div>
                        ))}
                        {/* Order total */}
                        <div className="flex justify-between text-sm pb-2">
                          <span className="text-[#86868B]">Order Total</span>
                          <span className="font-bold">
                            <FormatCurrencyRate num={order.amount} />
                          </span>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <p className="text-xl font-semibold pt-4">
                    No Orders made yet
                  </p>
                )}
              </div>
            )}
          </div>

          {/* ── Mobile: Track Order Tab ── */}
          <div className="bg-white rounded-lg">
            {dashboard === "trackorder" && (
              <div>
                <p className="pl-4 text-[28px] font-bold text-[#111827]">
                  Order Tracker
                </p>
                <p className="pl-4 text-sm font-normal text-[#86868B]">
                  View and manage messages with ArticDesign
                </p>

                {/* No order selected: show redirect */}
                {!currentOrder || !currentOrder.name ? (
                  <div className="flex flex-col items-center justify-center py-16 gap-4">
                    <p className="text-[#86868B] text-sm">
                      No order selected to track.
                    </p>
                    <button
                      onClick={() => handleTabClick("orders")}
                      className="bg-[#0071E3] text-white text-sm px-6 py-2 rounded-md"
                    >
                      Go to Orders
                    </button>
                  </div>
                ) : (
                  (() => {
                    const deliveryStatusMap = {
                      placed: ["Pending"],
                      processing: ["Pending", "Waiting to be Shipped"],
                      shipped: ["Pending", "Waiting to be Shipped", "Shipped"],
                      "out-for-delivery": [
                        "Pending",
                        "Waiting to be Shipped",
                        "Shipped",
                        "Out for Delivery",
                      ],
                      delivered: [
                        "Pending",
                        "Waiting to be Shipped",
                        "Shipped",
                        "Out for Delivery",
                        "Delivered",
                      ],
                      returned: ["Pending"],
                    };
                    const completedStatuses =
                      deliveryStatusMap[currentOrder?.deliveryStatus] || [];
                    return (
                      <>
                        {/* Product info header */}
                        <div className="flex flex-row gap-3 items-center p-4">
                          {currentOrder?.image ? (
                            <Image
                              src={currentOrder.image}
                              alt="image"
                              width={73}
                              height={68}
                              className="w-[73px] h-[68px] object-cover rounded"
                            />
                          ) : (
                            <div className="w-[73px] h-[68px] bg-gray-100 rounded flex items-center justify-center text-gray-400 text-xs">
                              No image
                            </div>
                          )}
                          <div className="flex-1">
                            <p className="text-[#1D1D1F] font-medium text-sm">
                              {currentOrder?.name}
                            </p>
                            <p className="text-[#86868B] font-normal text-[11px] capitalize">
                              Status: {currentOrder?.deliveryStatus}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-[#1D1D1F] font-medium text-sm">
                              Order
                            </p>
                            <p className="text-[#86868B] font-normal text-xs uppercase">
                              {currentOrder?.orderId}
                            </p>
                          </div>
                        </div>
                        {/* Timeline */}
                        <div className="flex flex-col mb-10 px-4">
                          <div className="relative">
                            {predefinedStatuses.map((status, index) => {
                              const isStatusCompleted =
                                completedStatuses.includes(status);
                              const isPrevStatusCompleted =
                                index > 0
                                  ? completedStatuses.includes(
                                      predefinedStatuses[index - 1],
                                    )
                                  : false;

                              return (
                                <div
                                  key={index}
                                  className="flex gap-5 w-full relative z-10"
                                >
                                  {/* Left side: Dot and split line segments for perfect connectivity */}
                                  <div className="flex flex-col items-center flex-shrink-0 w-[16px] relative min-h-[100px]">
                                    {/* Top Line Segment (connects from previous row bottom to this dot top) */}
                                    {index > 0 && (
                                      <div
                                        className={`absolute top-0 h-[6px] w-[2.5px] z-10 ${
                                          isPrevStatusCompleted
                                            ? "bg-[#0071E3]"
                                            : "bg-[#D9D9D9]"
                                        }`}
                                      ></div>
                                    )}

                                    {/* Dot (aligned to top of text title) */}
                                    <div
                                      className={`w-[16px] h-[16px] rounded-full shadow-md z-20 mt-1.5 ${
                                        isStatusCompleted
                                          ? "bg-[#0071E3]"
                                          : "bg-[#D9D9D9]"
                                      }`}
                                    ></div>

                                    {/* Bottom Line Segment (connects from this dot top to next row top) */}
                                    {index < predefinedStatuses.length - 1 && (
                                      <div
                                        className={`absolute top-[6px] bottom-0 w-[2.5px] z-10 ${
                                          isStatusCompleted
                                            ? "bg-[#0071E3]"
                                            : "bg-[#D9D9D9]"
                                        }`}
                                      ></div>
                                    )}
                                  </div>

                                  {/* Right side: Content container */}
                                  <div className="flex-1 pb-10">
                                    <div className="mt-0">
                                      <h3
                                        className={`font-semibold text-sm ${isStatusCompleted ? "text-[#0071E3]" : "text-[#1D1D1F]"}`}
                                      >
                                        {status}
                                      </h3>
                                      <h3 className="mb-2 font-normal text-xs text-[#86868B]">
                                        Updated on{" "}
                                        {currentOrder?.orderDate
                                          ? new Date(
                                              currentOrder.orderDate,
                                            ).toLocaleDateString()
                                          : "—"}
                                      </h3>

                                      {status === "Delivered" &&
                                        isStatusCompleted && (
                                          <div className="rounded-xl bg-[#F5F5F7] border border-[#D2D2D7] w-full p-4 space-y-4 mt-3 shadow-sm">
                                            <div className="text-[#1D1D1F] flex gap-3 items-center">
                                              <AiOutlineInfoCircle className="text-[#0071E3] text-lg" />
                                              <span className="text-sm font-semibold">
                                                Have a problem with your
                                                package?
                                              </span>
                                            </div>
                                            <p className="text-xs font-normal leading-relaxed text-[#424245]">
                                              Oh no! If there&apos;s an issue
                                              with your package, send a report
                                              so we can help you fix it!
                                            </p>
                                            <button
                                              onClick={() => {
                                                setTicketSubject(
                                                  `Problem with order #${currentOrder.orderId}`,
                                                );
                                                openReportModal();
                                              }}
                                              className="w-full text-center text-white bg-[#0071E3] text-xs font-semibold rounded-lg px-4 py-2.5 hover:bg-[#0077ED] transition-all shadow-sm active:scale-[0.98]"
                                            >
                                              Submit a report
                                            </button>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    );
                  })()
                )}
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
              disabled={!selectedOption || deactivateStatus === "loading"}
            >
              {deactivateStatus === "loading" ? (
                <SaveLoader />
              ) : (
                "  Deactivate Account"
              )}
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

            <button
              type="submit"
              onClick={handleUpdatePassword}
              disabled={passwordStatus === "loading"}
              className=" border bg-[#0071E3]  rounded-[6px] w-full  p-3 text-white font-medium text-xs text-center"
            >
              {passwordStatus === "loading" ? (
                <SaveLoader />
              ) : (
                "Change password"
              )}
            </button>
          </div>
        </div>
      </AccoutsModal>
      <AccoutsModal isOpen={modalReportOpen} onClose={closeReportModal}>
        <div className="md:m-12 p-2 space-y-6 max-w-full overflow-hidden">
          <div className="relative">
            <div className="flex flex-col justify-center items-center mb-6">
              <h3 className="text-[#1D1D1F] text-[24px] md:text-[28px] font-semibold text-center mb-2">
                Submit a Ticket
              </h3>
              <p className="text-[#86868B] text-center text-sm font-normal max-w-[300px]">
                Describe your issue and our team will get back to you shortly.
              </p>
            </div>

            {/* Subject */}
            <div className="mb-4">
              <label
                htmlFor="ticketSubject"
                className="block text-sm font-semibold text-[#1D1D1F] mb-2 pl-1"
              >
                Subject
              </label>
              <input
                id="ticketSubject"
                type="text"
                placeholder="e.g. Issue with my order"
                value={ticketSubject}
                onChange={(e) => setTicketSubject(e.target.value)}
                className="w-full p-3 border border-[#D2D2D7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all placeholder:text-[#86868B] bg-[#F5F5F7]"
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label
                htmlFor="ticketDescription"
                className="block text-sm font-semibold text-[#1D1D1F] mb-2 pl-1"
              >
                Description
              </label>
              <textarea
                id="ticketDescription"
                placeholder="Describe the problem in detail..."
                value={ticketDescription}
                onChange={(e) => setTicketDescription(e.target.value)}
                className="w-full h-[140px] p-3 border border-[#D2D2D7] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0071E3] focus:border-transparent transition-all placeholder:text-[#86868B] bg-[#F5F5F7] resize-none"
              />
            </div>
          </div>

          <button
            onClick={handleSubmitProblem}
            type="submit"
            disabled={ticketStatus === "loading"}
            className="w-full bg-[#0071E3] rounded-xl p-4 text-white font-semibold text-sm hover:bg-[#0077ED] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
          >
            {ticketStatus === "loading" ? (
              <SaveLoader color="#ffffff" size={20} />
            ) : (
              "Submit Ticket"
            )}
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
