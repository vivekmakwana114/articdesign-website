import Footer from "@/components/Footer";
import { sliderone, slidertwo, sliderthree } from "../../assets";
import SectionTestimonail from "@/components/Home/SectionTestimonail";
import Sectionfive from "@/components/Home/Sectionfive";
import Sectionone from "@/components/Home/Sectionone";
import Sectionthree from "@/components/Home/Sectionthree";
import Sectiontwo from "@/components/Home/Sectiontwo";
import Banner from "@/components/Banner/Banner";
import { HomeBannerData } from "@/components/Banner/BannerData";
import Slider from "@/components/Slider";
import Bought from "@/components/Customers/Bought";

export default function Home() {
  const images = [
    {
      image: sliderone,
      caption: "Skins",
      subcaption: "iPhone 14",
      description:
        "Elevate Your iPhone's Aura: Dress it in a Skin That Radiates Style!",
      subdescription: "iPhone 14, 14 Plus, 14 Pro, or 14 Pro Max!",
    },
    {
      image: slidertwo,
      caption: "Majestic",
      subcaption: "iPhone 14",
      description: "Gorgeous mountains covered in mist.",
      subdescription: "iPhone 14, 14 Plus, 14 Pro, or 14 Pro Max!",
    },
    {
      image: sliderthree,
      caption: "Greenery",
      subcaption: "iPhone 14",
      description: "A serene forest with lush green vegetation.",
      subdescription: "A serene forest with lush green vegetation.",
    },
  ];

  return (
    <>
      <Slider images={images} />
      {/* Top row: first two banners */}
      <div className="bg-[#F5F5F7] md:pt-32 pt-10">
        <div className="flex flex-col-reverse md:flex-row justify-center gap-10 rounded-md px-10">
          {HomeBannerData.slice(0, 2).map((item, index) => (
            <Banner key={index} {...item} />
          ))}
        </div>
      </div>

      {/* Second row: third banner full width */}
      <div className="bg-[#F5F5F7] md:p-10 flex justify-center">
        {HomeBannerData[2] && <Banner {...HomeBannerData[2]} />}
      </div>
      {/* <Sectionone /> */}
      <Sectiontwo />
      <Sectionthree />
      <SectionTestimonail />
      <Sectionfive />
      <Footer />
    </>
  );
}
