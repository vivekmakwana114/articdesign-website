"use client";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import FormatCurrencyRate from "../Currency/FormatCurrencyRate";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "@/state/cart/cartSlice";
import GenerateUniqueId from "../GenerateUniqueId";
import toast from "react-hot-toast";

const DetailsSection = ({ product, loading }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const currentUser = user;
  const orderId = GenerateUniqueId();
  const router = useRouter();
  const pathname = usePathname();
  const parsePrice = (priceStr) => {
    if (typeof priceStr === "number") return priceStr;
    if (!priceStr) return 0;
    const num = Number(priceStr.toString().replace(/[^0-9.]/g, ""));
    return isNaN(num) ? 0 : num;
  };

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const base = parsePrice(product?.basePrice || product?.productPrice);
    const additional = selectedOptions.reduce((sum, optionName) => {
      const area = product?.areasOfSkin?.find((a) => a.name === optionName);
      return sum + parsePrice(area?.additionalPrice);
    }, 0);
    setTotalPrice(base + additional);
  }, [selectedOptions, product]);

  const handleOptionChange = (event) => {
    const value = event.target.value;
    if (selectedOptions.includes(value)) {
      setSelectedOptions(selectedOptions.filter((item) => item !== value));
    } else {
      setSelectedOptions([...selectedOptions, value]);
    }
  };

  const handleAddToCart = () => {
    // ID extraction: filter out empty strings and get the last part
    const pathParts = pathname.split("/").filter(Boolean);
    const slugOrId = pathParts[pathParts.length - 1];

    const variantAreaIds = selectedOptions
      .map((optionName) => {
        const area = product?.areasOfSkin?.find((a) => a.name === optionName);
        if (!area) return null;
        return area?.variantAreaId || area?._id || area?.id || area?.name;
      })
      .filter(Boolean);

    const cartData = {
      productId: product?.productId || product?._id || product?.id || slugOrId,
      productName: product?.productName,
      quantity: 1,
      variantAreaIds: variantAreaIds,
      variantAreas: selectedOptions.map((optionName) => product?.areasOfSkin?.find((a) => a.name === optionName)),
      price: totalPrice,
      image:
        (product?.images?.length > 0
          ? product.images[0]
          : product?.thumbnailImage) || "",
    };

    dispatch(addItemToCart(cartData))
      .unwrap()
      .then(() => {
        toast.success("Added to cart successfully");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to add to cart");
      });
  };

  const handleCheckoutClick = (e) => {
    e.preventDefault();

    const pathParts = pathname.split("/").filter(Boolean);
    const slugOrId = pathParts[pathParts.length - 1];

    const variantAreaIds = selectedOptions
      .map((optionName) => {
        const area = product?.areasOfSkin?.find((a) => a.name === optionName);
        if (!area) return null;
        return area?.variantAreaId || area?._id || area?.id || area?.name;
      })
      .filter(Boolean);

    const cartData = {
      productId: product?.productId || product?._id || product?.id || slugOrId,
      productName: product?.productName,
      quantity: 1,
      variantAreaIds: variantAreaIds,
      variantAreas: selectedOptions.map((optionName) => product?.areasOfSkin?.find((a) => a.name === optionName)),
      price: totalPrice,
      totalPrice: totalPrice,
      image:
        (product?.images?.length > 0
          ? product.images[0]
          : product?.thumbnailImage) || "",
    };

    dispatch(addItemToCart(cartData))
      .unwrap()
      .then(() => {
        router.push("/checkout");
      })
      .catch((err) => {
        toast.error(err.message || "Failed to add to cart");
      });
  };

  const handleClickBack = () => {
    router.back();
  };

  return (
    <section className="bg-white">
      <div className="md:grid md:grid-cols-2 flex flex-col gap-6 md:gap-12 p-6">
        {/* Left Section */}
        <div>
          {loading ? (
            <div className="space-y-4 animate-pulse">
              <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              <div className="md:h-[411px] h-[226.2px] w-[299.4px] md:w-[534px] bg-gray-200 rounded-md"></div>
              <div className="flex justify-center gap-2 mt-4">
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
                <div className="h-2 w-2 rounded-full bg-gray-300"></div>
              </div>
            </div>
          ) : (
            <>
              <div>
                <span className=" text-[#0071E3] flex flex-col md:justify-start md:items-start justify-center items-start">
                  <p
                    onClick={handleClickBack}
                    className="flex gap-2 justify-center items-center cursor-pointer "
                  >
                    <HiOutlineArrowNarrowLeft className="text-2xl justify-center items-center" />
                    <span className="text-sm font-normal pr-28 w-full">
                      Back to Design Gallery
                    </span>
                  </p>
                </span>
                <div className="flex flex-col justify-center md:items-end items-center mt-5 ">
                  <div className="md:flex md:justify-start md:flex-col md:items-start flex justify-center flex-col items-center gap-2 text-sm font-normal  md:ml-[-10.75rem]">
                    <div className="md:h-[411px] h-[226.2px] md:px-4 md:w-[534px] w-[299.4px]">
                      <Carousel
                        showArrows={true}
                        showThumbs={false}
                        showIndicators={false}
                        showStatus={false}
                        renderArrowPrev={(clickHandler, hasPrev) => (
                          <div
                            className={`${
                              hasPrev ? "absolute" : "hidden"
                            } top-0 bottom-0 left-0 flex justify-center items-center p-2 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                            onClick={clickHandler}
                          >
                            <BsArrowLeftShort className="w-[35px] h-[35px] text-[#0071E3] rounded-full border border-[#0071E3]" />
                          </div>
                        )}
                        renderArrowNext={(clickHandler, hasNext) => (
                          <div
                            className={`${
                              hasNext ? "absolute" : "hidden"
                            } top-0 bottom-0 right-[-8px] flex justify-center items-center p-2 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                            onClick={clickHandler}
                          >
                            <BsArrowRightShort className="w-[35px] h-[35px] text-[#0071E3] rounded-full border border-[#0071E3]" />
                          </div>
                        )}
                      >
                        {(product?.images?.length > 0 && product.images[0]
                          ? product.images
                          : product?.thumbnailImage
                            ? [product.thumbnailImage]
                            : []
                        ).map((img, index) => (
                          <div key={index}>
                            <p className="text-[20px] text-black font-semibold py-1">
                              {product?.productName}
                            </p>
                            <Image
                              src={img}
                              alt={product?.productName || "skin option"}
                              width={300}
                              height={500}
                              unoptimized={
                                typeof img === "string" &&
                                img.startsWith("http")
                              }
                              className="md:w-[500px] md:h-[400px] w-[299.4px] h-[226.2px] bg-cover"
                            />
                          </div>
                        ))}
                      </Carousel>
                    </div>

                    <div className="md:my-3 my-10 flex flex-col justify-center items-center w-full gap-4"></div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        {/* Right Section */}
        <div>
          {loading ? (
            <div className="md:px-10 px-5 flex md:justify-start md:items-start flex-col animate-pulse">
              <div className="h-8 w-1/2 bg-gray-200 rounded-md mb-6"></div>
              <div className="border-b border-t py-6 w-full mb-6">
                <div className="h-6 w-1/4 bg-gray-200 rounded-md"></div>
              </div>
              <div className="h-6 w-1/3 bg-gray-200 rounded-md mb-6"></div>

              <div className="space-y-4 w-full">
                {[1, 2, 3].map((_, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center border-b pb-3"
                  >
                    <div className="flex flex-col gap-2 w-3/4">
                      <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
                      <div className="h-3 w-3/4 bg-gray-100 rounded"></div>
                    </div>
                    <div className="h-[18px] w-[18px] bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col my-3 gap-3 border-t py-6 w-full">
                <div className="h-[40px] md:w-[369px] bg-gray-200 rounded-[43px]"></div>
                <div className="h-[40px] md:w-[369px] bg-gray-200 rounded-[43px]"></div>
              </div>
            </div>
          ) : (
            <>
              <div className="md:px-10 px-5  flex md:justify-start  md:items-start  flex-col">
                <p className="md:text-[36px] text-[26px] font-normal text-[#1D1D1F]">
                  Configure your Kit
                </p>
                <div className=" ">
                  <div className=" border-b border-t py-3 w-full">
                    <p className="text-[#0071E3] text-2xl font-semibold">
                      <FormatCurrencyRate num={totalPrice} />
                    </p>
                  </div>
                  <p className="text-2xl font-normal w-full py-3 border-b">
                    Select Area for Skin
                  </p>

                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                    {product?.areasOfSkin?.length > 0 ? (
                      product.areasOfSkin.map((area, index) => (
                        <div
                          key={index}
                          className="flex flex-row justify-between items-center border-b pb-3"
                        >
                          <p className="text-sm font-normal w-full py-3 flex flex-col">
                            <span className="text-[#000000] text-base font-normal">
                              {area.name} -{" "}
                              <span className="text-[#0071E3]">
                                {area.additionalPrice}
                              </span>
                            </span>
                            <span className="text-[#86868B] w-[234px]">
                              Add {area.name} to your device kit
                            </span>
                          </p>
                          <input
                            type="checkbox"
                            className="form-checkbox text-indigo-600 w-[18px] h-[18px]"
                            value={area.name}
                            checked={selectedOptions.includes(area.name)}
                            onChange={handleOptionChange}
                          />
                        </div>
                      ))
                    ) : (
                      <p className="py-4 text-gray-500 italic">
                        No additional areas available for this skin.
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col my-3 gap-3 border-t py-2">
                    <button
                      onClick={handleCheckoutClick}
                      className="bg-[#0071E3] mt-8  md:w-[369px] p-2 rounded-[43px] text-white text-center"
                    >
                      Checkout
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className="bg-[#fff] md:w-[369px] p-2 rounded-[43px] text-[#0071E3] border border-[#0071E3]"
                    >
                      Add to cart
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;
