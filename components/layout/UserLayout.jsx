"use client";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";

const UserLayout = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUser = null; // Removed Redux state access
  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    if (currentUser) {
      router.push("/");
    }
  }, [currentUser]);

  return (
    <section>
      {/* <Navbar /> */}
      <main className="content">
        <Outlet />
      </main>
    </section>
  );
};

export default UserLayout;
