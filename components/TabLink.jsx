import Link from "next/link";
import Image from "next/image";

const TabLink = ({ category, activeTab, tabStyles, image, label, onClick, imageClass }) => (
  <Link
    href={`/devices?category=${category}`}
    className={`py-3 px-4 ${
      tabStyles.active
        ? "transition-all duration-1000"
        : "transition-all duration-700"
    }`}
    style={activeTab === category ? tabStyles.active : tabStyles.inactive}
    onClick={() => onClick(category)}
  >
    <div className="flex flex-col items-center justify-center">
      <div className="h-[60px] flex items-center justify-center mb-1">
        <Image src={image} alt={label || "tab link"} className={imageClass || "w-[68.35px] h-[40px]"} />
      </div>
      <h1 className="text-center">{label}</h1>
    </div>
  </Link>
);

export default TabLink;
