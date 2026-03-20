"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { imageskin } from "../../assets";

function Banner({
  image,
  title,
  description,
  buttonText,
  onButtonClick,
  link,
  styles = {},
}) {
  return (
    <div
      className={
        styles.banner || "flex flex-col md:flex-row items-center gap-6  "
      }
    >
      <div
        className={
          styles.imageWrapper ||
          styles.image ||
          "w-full h-full items-end md:w-1/2 flex justify-center "
        }
      >
        <Image
          src={image || imageskin}
          alt={typeof title === "string" ? title : "banner image"}
          width={400}
          height={500}
          className={
            styles.imageClass ||
            "md:h-[530px] md:w-[757.77px] w-[407px] md:rounded-[16px]"
          }
        />
      </div>

      {/* Text Content */}

      <div
        className={
          styles.textWrapper ||
          "space-y-3 md:flex  md:flex-col md:justify-center md:items-center "
        }
      >
        <h1
          className={
            styles.title ||
            "md:text-[36px] text-[24px] font-bold text-[#000000] text-center md:w-[511px] w-[347px]"
          }
        >
          {title}
        </h1>
        <p
          className={
            styles.description ||
            "text-[#86868B]  md:text-base text-[10px] font-medium text-center md:w-[543px] w-[369px]"
          }
        >
          {description}
        </p>

        {buttonText &&
          (link ? (
            <Link
              href={link}
              className={
                styles.button ||
                "flex justify-center md:m-3 items-center rounded-[26px] bg-[#0071E3] px-4 py-2 text-white text-center"
              }
            >
              {buttonText}
            </Link>
          ) : (
            <button
              onClick={onButtonClick}
              className={
                styles.button ||
                "flex justify-center md:m-3 items-center rounded-[26px] bg-[#0071E3] px-4 py-2 text-white text-center"
              }
            >
              {buttonText}
            </button>
          ))}
      </div>
    </div>
  );
}

export default Banner;
