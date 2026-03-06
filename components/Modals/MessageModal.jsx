import React, { useState, useEffect } from "react";
import Image from "next/image";
import { closeIcon } from "../../assets";

const MessageModal = ({ isOpen, onClose, children }) => {
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

  // Handle scrolling lock/unlock when the modal is open/closed
  useEffect(() => {
    if (isOpen) {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "hidden";
      }
    } else {
      if (typeof document !== "undefined") {
        document.body.style.overflow = "auto";
      }
    }
  }, [isOpen]);

  const getWidth = () => {
    if (windowWidth >= 768) {
      return "82%"; // Set width for desktop
    } else {
      return "90%"; // Set width for mobile
    }
  };

  const modalContentStyle = {
    width: getWidth(),
    height: "80vh", // Set height to 80% of the viewport height
    overflowY: "auto", // Enable vertical scrolling if content overflows
  };

  const scrollbarStyle = {
    scrollbarWidth: "thin",
    scrollbarColor: "transparent transparent",
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? "visible" : "invisible"
      }`}
    >
      <style>{`
        /* CSS for hiding the scrollbar */
        ::-webkit-scrollbar {
          width: 6px; /* Set the width of the scrollbar */
        }
        ::-webkit-scrollbar-thumb {
          background: transparent; /* Hide the thumb */
        }
      `}</style>

      <div
        className="absolute inset-0 bg-[#e4e4e4] opacity-75 cursor-pointer"
        onClick={onClose}
        style={scrollbarStyle}
      ></div>
      <div className="bg-white p-4 rounded-md shadow-lg z-10 space-y-4 h-full relative">
        <button
          className="mt-4 p-2 bg-[#CCE5FF] absolute right-10 top-[-6px] rounded-full md:w-[35px] w-[30px] md:h-[35px] h-[30px] flex text-center justify-center items-center"
          onClick={onClose}
        >
          <Image
            src={closeIcon}
            alt="Close"
            className="md:w-[12px] w-[10px] md:h-[12px] h-[10px]"
          />
        </button>

        <div
          style={modalContentStyle}
          className="my-10 md:mx-16 mx-3 justify-center items-center"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default MessageModal;
