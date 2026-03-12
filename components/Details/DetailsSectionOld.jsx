"use cleint";
import React, { useEffect, useState } from "react";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BsArrowLeftShort, BsArrowRightShort } from "react-icons/bs";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import FormatCurrencyRate from "../Currency/FormatCurrencyRate";
// Removed Cart Context import
import GenerateUniqueId from "../GenerateUniqueId";
import toast from "react-hot-toast";

const getImageData = (product) => [
  {
    name: "Top skin",
    color: "Silver",
    image: product?.topSkinImage,
    slug: "topskin",
    price: 100,
  },
  {
    name: "Palm rest skin",
    color: "Silver",
    image: product?.palmRestSkinImage,
    slug: "palmrest",
    price: 200,
  },
  {
    name: "Trackpad and palm rest",
    color: "Silver",
    image: product?.trackpadAndPalmRestImage,
    slug: "trackpad",
    price: 150,
  },
  {
    name: "Bottom Skin",
    color: "Silver",
    image: product?.bottomSkinImage,
    slug: "bottomskin",
    price: 120,
  },
  {
    name: "With Logo Cutout",
    color: "Silver",
    image: product?.withLogoCutoutImage,
    slug: "logocutout",
    price: 50,
  },
];

const colordata = [
  {
    name: "Silver",
    slug: "silver",
  },
  {
    name: "Gold",
    slug: "gold",
  },
  { name: "Grey", name: "Grey" },
];

function DetailsSection({ product, loading }) {
  const orderId = GenerateUniqueId();
  const currentUser = null; // Removed Redux state access
  const addItemToCart = (item) => {}; // Mocking addItemToCart
  const router = useRouter();
  const imagedata = getImageData(product);
  const pathname = usePathname();
  const [selectedOptions, setSelectedOptions] = useState([imagedata[0].slug]);
  const [selectedImages, setSelectedImages] = useState([imagedata[0]]);
  const [totalPrice, setTotalPrice] = useState(product?.productPrice);
  const [subTotalPrice, setSubTotalPrice] = useState(0);
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    const optionsData = getImageData(product);
    const defaultSelectedImages = optionsData.filter((item) =>
      selectedOptions.includes(item.slug),
    );
    setSelectedImages(defaultSelectedImages);

    // Calculate the subtotal (price of selected options)
    const additionalPrice = defaultSelectedImages.reduce(
      (sum, item) => sum + item.price,
      0,
    );
    setSubTotalPrice(additionalPrice);

    // Calculate the total price
    setTotalPrice(product?.productPrice + additionalPrice);
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
    const selectedItems = getImageData(product).filter((item) =>
      selectedOptions.includes(item.slug),
    );
    const cartItem = {
      productId: product?._id,
      productName: product?.productName,
      deviceName: product?.device?.deviceName,
      thumbnailImage: product?.thumbnailImage,
      basePrice: product?.productPrice,
      options: selectedItems, 
      totalPrice: totalPrice, 
      subTotalPrice: subTotalPrice, 
      orderId,
      color: selectedColor,
    };
    addItemToCart(cartItem); 
    toast.success("Success");
  };
  const handleClickBack = () => {
    router.back();
  };
  return (
    <section className="bg-[#FFFFFF]">
      <div className="md:grid md:grid-cols-2 flex md:flex-row md:justify-around justify-center flex-col md:px-20">
        <div>
          <span className=" text-[#0071E3] flex flex-col md:justify-start md:items-start justify-center items-center">
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
                <p>
                  {selectedOptions.map((item, i) => (
                    <span key={i}>{item.name}</span>
                  ))}
                </p>
                <Carousel
                  showArrows={true}
                  showThumbs={false}
                  showIndicators={false}
                  selectedItem={selectedImages.length - 1}
                  renderArrowPrev={(clickHandler, hasPrev) => {
                    return (
                      <div
                        className={`${
                          hasPrev ? "absolute" : "hidden"
                        } top-0 bottom-0 left-0 flex justify-center items-center p-2 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                        onClick={clickHandler}
                      >
                        <BsArrowLeftShort className="w-[35px] h-[35px] text-[#0071E3] rounded-full border border-[#0071E3]" />
                      </div>
                    );
                  }}
                  renderArrowNext={(clickHandler, hasNext) => {
                    return (
                      <div
                        className={`${
                          hasNext ? "absolute" : "hidden"
                        } top-0 bottom-0 right-[-8px] flex justify-center items-center p-2 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                        onClick={clickHandler}
                      >
                        <BsArrowRightShort className="w-[35px] h-[35px] text-[#0071E3] rounded-full border border-[#0071E3]" />
                      </div>
                    );
                  }}
                >
                  {selectedImages.map((item, index) => (
                    <div key={index}>
                      <p className="text-[20px] text-black font-semibold py-1">
                        {item.name}
                      </p>
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={300}
                        height={500}
                        className="md:w-[534px] md:h-[411px] w-[299.4px] h-[226.2px]"
                      />
                    </div>
                  ))}
                </Carousel>
              </div>
              <div className="md:my-3 my-5 flex flex-col justify-center items-center w-full">
                <label
                  htmlFor="color"
                  className="text-black text-[16px] font-normal"
                >
                  Device color {selectedColor}
                </label>
                <br />
                <select
                  id="color"
                  name="color"
                  value={selectedColor}
                  className="form__input w-40 cursor-pointer"
                  onChange={(e) => setSelectedColor(e.target.value)}
                >
                  {colordata.map((color) => (
                    <option key={color.slug} value={color.name}>
                      {color.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
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
              Select Area for Skin{" "}
            </p>

            <div className="flex flex-row justify-between items-center ">
              <p className="text-sm font-normal w-full py-3 flex flex-col">
                <span className="text-[#000000] text-base font-normal ">
                  With Logo Cutout
                </span>
                <span className="text-[#86868B] w-[234px]">
                  Your skin will include a cutout for the logo
                </span>
              </p>
              <input
                type="checkbox"
                className="form-checkbox text-indigo-600 w-[16px] h-[16px] bg-[#1f1b1c] "
                value="logocutout"
                checked={selectedOptions.includes("logocutout")}
                onChange={handleOptionChange}
              />
            </div>
            {loading
              ? ""
              : product?.device?.category.slug !== "phones" && (
                  <>
                    <div className="flex flex-row   justify-between items-center ">
                      <p className="text-sm font-normal w-full py-3 flex flex-col">
                        <span className="text-[#000000] text-base font-normal ">
                          Top Skin
                        </span>
                        <span className="text-[#86868B] w-[234px]">
                          Covers the entire top surface of your Macbook Air 13”
                        </span>
                      </p>
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 w-[16px] h-[16px]"
                        value="topskin"
                        checked={selectedOptions.includes("topskin")}
                        onChange={handleOptionChange}
                      />
                    </div>

                    <div className="flex flex-row justify-between items-center ">
                      <p className="text-sm font-normal w-full py-3 flex flex-col">
                        <span className="text-[#000000] text-base font-normal ">
                          Palmrest Skin -{" "}
                          <span className="text-[#0071E3]">INR 200</span>
                        </span>
                        <span className="text-[#86868B] w-[234px]">
                          Covers the palmrest area of your laptop, Leaving the
                          keyboard and trackpad fully accessible
                        </span>
                      </p>
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 w-[16px] h-[16px]"
                        value="palmrest"
                        checked={selectedOptions.includes("palmrest")}
                        onChange={handleOptionChange}
                      />
                    </div>

                    <div className="flex flex-row  justify-between items-center ">
                      <p className="text-sm font-normal w-full py-3 flex flex-col">
                        <span className="text-[#000000] text-base font-normal ">
                          Trackpad Skin{" "}
                          <span className="text-[#0071E3]">INR 200</span>
                        </span>
                        <span className="text-[#86868B] w-[234px]">
                          Covers the trackpad of your laptop Does not interfere
                          with touch senstivity in any way
                        </span>
                      </p>
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 w-[16px] h-[16px]"
                        value="trackpad"
                        checked={selectedOptions.includes("trackpad")}
                        onChange={handleOptionChange}
                      />
                    </div>

                    <div className="flex flex-row  justify-between items-center">
                      <p className="text-sm font-normal w-full py-3 flex flex-col">
                        <span className="text-[#000000] text-base font-normal ">
                          Bottom Skin -{" "}
                          <span className="text-[#0071E3]">INR 200</span>
                        </span>
                        <span className="text-[#86868B] w-[234px]">
                          Covers the bottom surface of your Macbook Air 13”
                        </span>
                      </p>
                      <input
                        type="checkbox"
                        className="form-checkbox text-indigo-600 w-[16px] h-[16px]"
                        value="bottomskin"
                        checked={selectedOptions.includes("bottomskin")}
                        onChange={handleOptionChange}
                      />
                    </div>
                  </>
                )}

            <div className="flex flex-col my-3 gap-3 border-t py-2">
              {currentUser ? (
                <>
                  <Link
                    href="/checkout"
                    className="bg-[#0071E3] mt-8  md:w-[369px] p-2 rounded-[43px] text-white text-center"
                  >
                    Checkout{" "}
                  </Link>

                  <button
                    onClick={handleAddToCart}
                    className="bg-[#fff] md:w-[369px] p-2 rounded-[43px] text-[#0071E3] border border-[#0071E3]"
                  >
                    Add to cart{" "}
                  </button>
                </>
              ) : (
                <Link
                  href={`/auth?returnUrl=${encodeURIComponent(pathname)}`}
                  className="bg-[#0071E3] mt-8  md:w-[369px] p-2 rounded-[43px] text-white text-center"
                >
                  Sign in{" "}
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DetailsSection;
