import dynamic from "next/dynamic";
import { Suspense } from "react";
import Navbar from "@/components/Header/Navbar";
// import Footer from "@/components/Footer";
import "../styles/globals.css";
import "../styles/slider.css";
import "../styles/saveLoader.css";
import { Toaster } from "react-hot-toast";
import { CartProvider } from "@/context/CartContext";

// Define metadata for the page
export const metadata = {
  title: "Artic Designs",
  description: "Artic Designs",
};

// Dynamically import the ReduxProvider to avoid SSR issues
const ReduxProvider = dynamic(() => import("@/redux/redux-provider"), {
  ssr: false,
});

// Dynamically import the CartProvider to avoid SSR issues

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="antialiased">
        <ReduxProvider>
          <CartProvider>
            <Suspense fallback={null}>
              <Navbar />
            </Suspense>
            <main>{children}</main>

            {/* <Footer /> */}
          </CartProvider>
        </ReduxProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
