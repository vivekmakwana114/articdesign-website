"use client";
import React, { useRef, useState, useEffect } from "react";
import {
  AiOutlineMenu,
  AiOutlineLogout,
  AiOutlineSearch,
  AiOutlineCloseCircle,
  AiOutlineMinus,
  AiOutlinePlus,
} from "react-icons/ai";
import { BiShoppingBag, BiSolidUpArrow } from "react-icons/bi";
import { FiPackage } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineClose } from "react-icons/md";
import NavLinks from "./NavLinks";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import Loader from "../Loader";
import api from "@/lib/api";
import { menus } from "./Mymenus";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/state/auth/authSlice";
import FormatCurrencyRate from "../Currency/FormatCurrencyRate";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartState = { cartItems: [] };
  const currentUser = useSelector((state) => state.auth.user);
  const [open, setOpen] = useState(false);
  const [showsearch, setShowsearch] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [heading, setHeading] = useState("");
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    if (showProfileMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showProfileMenu]);

  useEffect(() => {
    handleSearchQuery();
  }, [searchText]);

  const closeMobileMenu = () => {
    setShowProfileMenu(false);
    setOpen(false);
  };

  const handleSignOut = () => {
    dispatch(logout());
    toast.success("Logged out");
    router.push("/");
  };

  const handleSearchQuery = async () => {
    if (!searchText.trim()) {
      setSearchData([]);
      return;
    }
    try {
      setSearchLoading(true);
      const res = await api.get(`/v1/product?search=${searchText}`);
      // Based on typical backend response structure where data is wrapped in a data property
      setSearchData(res.data?.data || res.data);
      setSearchLoading(false);
    } catch (error) {
      console.error("Search Error:", error);
      setSearchLoading(false);
    }
  };
  return (
    <nav className="md:bg-[#1D1D1F] bg-[#FFFFFF] fixed top-0 left-0 right-0 w-full text-white font-inter md:px-14 md:h-[64px] md:z-[100] z-[100]">
      <div className="flex items-center font-medium justify-between  h-[64px]">
        <div className="md:bg-[#1D1D1F] bg-[#1D1D1F]  z-50 p-5 md:w-auto w-[100%] flex justify-between md:border-none border-b">
          <p className=" font-extrabold md:text-[#ffffff] text-[#ffffff] ">
            <Link href="/">ArticWood</Link>
          </p>
          <div
            className="text-xl font-normal md:hidden flex justify-center items-center "
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <>
                <span className=" text-[#ffffff] cursor-pointer">
                  <MdOutlineClose />
                </span>
                {/* text-[#0071E3]  */}
                <span className="md:hidden font-normal text-sm text-[#ffffff] cursor-pointer">
                  Close
                </span>
              </>
            ) : (
              <span className="text-[#ffffff] cursor-pointer">
                <AiOutlineMenu />
              </span>
            )}{" "}
          </div>
        </div>
        {showsearch ? (
          <div className="relative md:w-[700px] w-full">
            <div className="md:flex hidden items-center bg-[#1D1D1F] p-2 rounded-sm w-full">
              <input
                type="text"
                className="flex-grow h-9 px-2 text-white bg-[#303030c7] border rounded-sm"
                placeholder="Search..."
                value={searchText}
                onChange={(e) => {
                  setSearchText(e.target.value);
                }}
              />

              <button
                className="p-2 text-white absolute right-3 text-lg"
                onClick={() => setShowsearch(false)}
              >
                <AiOutlineCloseCircle />
              </button>
            </div>
            {searchText ? (
              <div className="bg-white rounded-sm absolute top-12 left-0 w-full transition-all duration-700 shadow-md z-[60] overflow-hidden">
                {searchLoading ? (
                  <div className="px-3 py-5">
                    <Loader />
                  </div>
                ) : Array.isArray(searchData) && searchData.length > 0 ? (
                  <div className="px-2 py-2 max-h-[400px] overflow-y-auto">
                    {searchData.map((item) => (
                      <React.Fragment key={item._id}>
                        <Link
                          href={`/details/${item.slug || item._id}`}
                          onClick={() => {
                            setSearchText("");
                          }}
                          className="flex items-center gap-4 py-2 px-2 hover:bg-gray-100 transition-colors border-b border-gray-100 last:border-none rounded-sm"
                        >
                          <div className="w-12 h-12 flex-shrink-0 relative overflow-hidden rounded-md border border-gray-200">
                            <Image
                              src={
                                item.images?.[0] ||
                                item.thumbnailImage ||
                                "/placeholder.png"
                              }
                              alt={item.name || item.productName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-[#1D1D1F] text-sm font-semibold truncate max-w-[500px]">
                              {item.name || item.productName}
                            </span>
                            <span className="text-[#0071E3] text-xs font-medium mt-1">
                              <FormatCurrencyRate
                                num={item.basePrice || item.price}
                              />
                            </span>
                          </div>
                        </Link>
                      </React.Fragment>
                    ))}
                  </div>
                ) : (
                  <div className="px-4 py-8 text-center text-[#1D1D1F] text-sm font-medium">
                    No products found for &quot;{searchText}&quot;
                  </div>
                )}
              </div>
            ) : (
              ""
            )}
          </div>
        ) : (
          <ul className="md:flex hidden  items-center gap-2">
            <NavLinks />
          </ul>
        )}
        <div className="md:flex md:gap-4 hidden md:text-2xl">
          {showsearch ? (
            ""
          ) : (
            <AiOutlineSearch
              className="hover:cursor-pointer"
              onClick={() => setShowsearch(true)}
            />
          )}
          <div className="relative" ref={dropdownRef}>
            {mounted &&
              (() => {
                const profileSrc =
                  currentUser?.profile &&
                  currentUser.profile !== "null" &&
                  currentUser.profile !== ""
                    ? currentUser.profile.Location || currentUser.profile
                    : null;
                return profileSrc ? (
                  <div
                    className="w-8 h-8 rounded-full overflow-hidden hover:cursor-pointer border border-gray-500"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  >
                    <Image
                      src={profileSrc}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ) : (
                  <CgProfile
                    className="hover:cursor-pointer"
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                  />
                );
              })()}
            {showProfileMenu && (
              <>
                <BiSolidUpArrow className="absolute left-0 top-5 text-white" />
                {currentUser ? (
                  <ul className="p-2 absolute right-[-75px] w-[176px] mt-3 bg-[#ffffff] rounded-sm shadow-md z-10 flex flex-col">
                    <li>
                      <Link
                        href="/user?dashboard=personalinformation"
                        className="py-4 px-3 inline-block"
                        onClick={closeMobileMenu} // Close the mobile menu when the link is clicked
                      >
                        <span className="flex justify-center items-center gap-2 text-base font-normal text-[#1D1D1F]">
                          <CgProfile /> My Account
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/user?dashboard=orders"
                        className="py-4 px-3 inline-block"
                        onClick={closeMobileMenu} // Close the mobile menu when the link is clicked
                      >
                        <span className="flex justify-center items-center gap-2 text-base font-normal text-[#1D1D1F]">
                          <FiPackage /> Orders
                        </span>
                      </Link>
                    </li>
                    {/* <li>
                      <Link
                        href="/user?dashboard=inbox"
                        className="py-4 px-3 inline-block"
                        onClick={closeMobileMenu} // Close the mobile menu when the link is clicked
                      >
                        <span className="flex justify-center items-center gap-2 text-base font-normal text-[#1D1D1F]">
                          <AiOutlineMail /> Inbox
                        </span>
                      </Link>
                    </li> */}
                    <hr />

                    <li
                      onClick={handleSignOut}
                      className="text-[#C95050] text-base font-normal text-center py-2 cursor-pointer"
                    >
                      LOGOUT
                    </li>
                  </ul>
                ) : (
                  <ul className="absolute right-[-55px] mt-3 bg-[#ffffff] rounded-sm shadow-md z-10 flex">
                    <li>
                      <Link
                        href="/auth"
                        className="block py-2 px-4 hover:bg-gray-600 md:text-sm text-base text-[#0071E3] hover:text-white"
                        onClick={closeMobileMenu}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/auth?view=signup"
                        className="block py-2 px-4 hover:bg-gray-600 md:text-sm text-base text-[#0071E3] hover:text-white"
                        onClick={closeMobileMenu}
                      >
                        Signup
                      </Link>
                    </li>
                  </ul>
                )}
              </>
            )}
          </div>
          <Link href="/checkout" className=" relative">
            <BiShoppingBag className="hover:cursor-pointer" />
            {cartState?.cartItems.length > 0 ? (
              <p className="flex items-center justify-center h-5 w-5 rounded-full bg-red-500 absolute -top-1 -right-4">
                <span className="text-white text-xs font-medium">
                  {cartState?.cartItems.length}
                </span>
              </p>
            ) : (
              ""
            )}
          </Link>
        </div>

        {/* Mobile nav */}
        <ul
          className={`
        md:hidden bg-[#ffffff] fixed h-full w-full top-0 overflow-y-auto bottom-0 py-20 pl-4 z-30
        duration-500 ${open ? "left-0" : "left-[-100%]"}
        `}
        >
          {mounted &&
            (currentUser ? (
              <>
                <li className="text-base text-[#86868B] font-normal pl-4">
                  MY ACCOUNT
                </li>
                <li>
                  <Link
                    href="/user?dashboard=personalinformation"
                    className="py-4 px-3 inline-block"
                    onClick={closeMobileMenu} // Close the mobile menu when the link is clicked
                  >
                    <span className="flex justify-center items-center gap-2 text-base font-normal text-[#1D1D1F]">
                      <CgProfile /> Personal Information
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/user?dashboard=orders"
                    className="py-4 px-3 inline-block"
                    onClick={closeMobileMenu} // Close the mobile menu when the link is clicked
                  >
                    <span className="flex justify-center items-center gap-2 text-base font-normal text-[#1D1D1F]">
                      <FiPackage /> Orders
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="/checkout"
                    className="py-4 px-3 inline-block"
                    onClick={closeMobileMenu} // Close the mobile menu when the link is clicked
                  >
                    <span className="flex justify-center items-center gap-2 text-base font-normal text-[#1D1D1F]">
                      <BiShoppingBag /> Cart (2)
                    </span>
                  </Link>
                </li>
                <hr />
              </>
            ) : (
              <>
                <li className="py-4 px-3 justify-center items-center gap-2 text-[20px] font-normal text-[#1D1D1F]">
                  Welcome to ArticDesign
                </li>
                <li className=" space-x-2 m-3">
                  <Link href="/auth?view=signup" onClick={closeMobileMenu}>
                    <button className="bg-[#0071E3] rounded-[4px] w-[108px] p-3 text-white font-medium text-[13px] ">
                      Register
                    </button>
                  </Link>
                  <Link href="/auth" onClick={closeMobileMenu}>
                    <button className="bg-[#0071E3] rounded-[4px] opacity-50 w-[108px] p-3 text-white font-medium text-[13px] ">
                      Sign in
                    </button>
                  </Link>
                </li>
              </>
            ))}
          <li className="text-base text-[#86868B] font-normal pl-4 py-5">
            OUR CATEGORIES
          </li>

          {menus.map((menu, i) => (
            <li key={i} className="flex flex-col">
              <div className="flex justify-between items-center pr-10">
                <Link
                  href={
                    menu.params ? `/devices?category=${menu.link}` : menu.link
                  }
                  className="py-4 px-3 inline-block"
                  onClick={
                    menu.submenus ? (e) => e.preventDefault() : closeMobileMenu
                  }
                >
                  <span className="flex justify-center items-center gap-2 text-base font-normal text-[#1D1D1F]">
                    {menu.name}
                  </span>
                </Link>
                {menu.submenus && (
                  <span
                    className="cursor-pointer text-[#1D1D1F]"
                    onClick={() =>
                      setHeading(heading === menu.name ? "" : menu.name)
                    }
                  >
                    {heading === menu.name ? (
                      <AiOutlineMinus />
                    ) : (
                      <AiOutlinePlus />
                    )}
                  </span>
                )}
              </div>
              {menu.submenus && heading === menu.name && (
                <ul className="pl-6 bg-gray-50">
                  {menu.submenus.map((sub, j) => (
                    <li key={j}>
                      <Link
                        href={sub.link}
                        className="py-2 px-3 block text-sm text-[#1D1D1F]"
                        onClick={closeMobileMenu}
                      >
                        {sub.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}

          {currentUser && (
            <li className="flex items-center mt-5">
              <p onClick={handleSignOut} className="px-3 inline-block">
                <span className="flex justify-start items-center gap-2 text-base font-semibold cursor-pointer text-[#C01F1F]">
                  <AiOutlineLogout className="text-base font-bold" /> LOGOUT
                </span>
              </p>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
