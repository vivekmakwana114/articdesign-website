import { Suspense } from "react";
import Navbar from "@/components/Header/Navbar";
// import Footer from "@/components/Footer";
import "../styles/globals.css";
import "../styles/slider.css";
import "../styles/saveLoader.css";
import StateProvider from "@/state/state-provider";
import { Toaster } from "react-hot-toast";

// Define metadata for the page
export const metadata = {
  title: "Artic Designs",
  description: "Artic Designs",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
      </head>
      <body className="antialiased">
        <StateProvider>
          <Suspense fallback={null}>
            <Navbar />
          </Suspense>
          <main className="pt-[64px]">{children}</main>

          {/* <Footer /> */}
        </StateProvider>
        <Toaster position="top-center" reverseOrder={false} />
      </body>
    </html>
  );
}
