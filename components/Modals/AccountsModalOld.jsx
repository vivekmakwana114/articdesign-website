import Image from "next/image";
import React, { useState, useEffect } from "react";
import { closeIcon } from "../../assets";

const AccountsModal = ({ isOpen, onClose, children }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  // Ensure window-related code runs only on the client side
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
      if (typeof document !== "undefined") {
        document.body.style.overflow = "hidden"; // Disable scrolling when modal is open
      }
    } else {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "auto"; // Restore scrolling when modal is closed
      }
    }
  }, [isOpen]);

  const getWidth = () => {
    if (windowWidth >= 768) {
      return "80%"; // Set width for desktop
    } else {
      return "90%"; // Set width for mobile
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <div
        className="absolute inset-0 bg-[#e4e4e4] opacity-75 cursor-pointer"
        onClick={onClose}
      ></div>
      <div className="bg-white md:p-4 p-6 rounded-md shadow-lg space-y-4 h-auto relative">
        <button
          className="mt-4 p-2 bg-[#CCE5FF] absolute md:right-10 right-[1rem] top-[-6px] rounded-full md:w-[35px] md:h-[35px] w-[30px] h-[30px] flex text-center justify-center items-center"
          onClick={onClose}
        >
          <Image
            src={closeIcon}
            alt="Close"
            className="md:w-[16px] md:h-[16px] w-[12px] h-[12px]"
          />
        </button>

        <div
          style={{ width: getWidth() }}
          className="flex flex-col md:my-52 md:mx-16 mx-3 justify-center items-center h-auto"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccountsModal;
