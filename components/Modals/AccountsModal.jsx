import React, { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";

const AccountsModal = ({
  isOpen,
  onClose,
  children,
  title,
  subTitle,
  titleSize = "33.18px",
}) => {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth);

      const handleResize = () => {
        setWindowWidth(window.innerWidth);
      };

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }
  }, [isOpen]);

  return (
    <div
      className={`z-50 fixed inset-0 flex items-center justify-center py-32 modal-content ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-[#e4e4e4c7] opacity-75 cursor-pointer"
        onClick={onClose}
      ></div>
      <div
        className="bg-white rounded-xl shadow-lg z-10 md:w-[600px] md:h-[500px] w-[90%] relative border border-primary mt-16"
        style={{ maxHeight: "90vh", overflowY: "auto" }}
      >
        <div className=" flex flex-row justify-between items-center p-2">
          <div>
            <p
              className={`md:text-[${titleSize}] text-[18px] font-semibold text-[#2E2E2E]`}
            >
              {title}
            </p>
            <p className="md:text-sm text-base font-normal text-[#2E2E2E] md:w-full w-[255.08px]">
              {subTitle}
            </p>
          </div>
          <div>
            <button
              className="flex text-center justify-center 
            items-center bg-[#cce5ff] rounded-full"
              onClick={onClose}
            >
              <IoCloseOutline className="text-2xl text-[#ffffff]" />
            </button>
          </div>
        </div>
        <hr />
        <div>{children}</div>
      </div>
    </div>
  );
};

export default AccountsModal;
