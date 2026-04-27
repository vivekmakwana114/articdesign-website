export const menus = [
  {
    name: "MackBooks",
    link: "laptop",
    params: true,
  },
  {
    name: "iPad",
    link: "ipad",
    params: true,
  },
  {
    name: "iPhone",
    link: "iphone",
    params: true,
  },
  // {
  //   name: "Accessories",
  //   link: "/",
  //   params: false,
  // },
  {
    name: "Company",
    link: "#",
    params: false,
    submenus: [
      { name: "Why Us?", link: "/whyus" },
      { name: "Returns", link: "/returns" },
      { name: "Gift Card", link: "/giftcard" },
      { name: "Care", link: "/care" },
    ],
  },
];
