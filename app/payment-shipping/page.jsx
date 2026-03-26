"use client";
import Footer from "@/components/Footer";
import React from "react";

function PaymentShipping() {
  return (
    <>
      <section className="flex flex-col justify-center items-center mt-10 md:mt-20 text-[#1D1D1F]">
        <h1 className=" font-semibold md:text-[48px] text-[24px] py-10">
          Payments & Shipping
        </h1>
        
        <div className="md:w-[608px] w-[348px]">
          <h2 className="text-2xl font-semibold mb-4 text-[#1D1D1F]">Payment Information</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur. Vitae blandit sit risus dolor
            mauris leo nam sed. Mattis arcu vestibulum eu id enim quisque facilisi
            vitae. Eget leo proin rutrum ultrices aliquam cras. Vitae ante dui et
            porttitor tristique vestibulum. Fermentum neque donec diam tincidunt
            nulla pretium. Netus interdum sollicitudin et eget malesuada commodo.
          </p>
          <br />
          <p>
            In lectus venenatis interdum et vestibulum volutpat maecenas et. Amet
            hendrerit mattis sit diam enim. Faucibus quam non mauris habitasse
            venenatis commodo. Convallis volutpat phasellus quam scelerisque
            sagittis amet consequat diam elit.
          </p>
        </div>

        <div className="md:w-[608px] w-[348px] mt-10 mb-20">
          <h2 className="text-2xl font-semibold mb-4 text-[#1D1D1F]">Shipping Information</h2>
          <p>
            Magna in dictumst metus vel ultrices sapien vel nisi. Diam vulputate
            aliquet urna aliquet sodales diam elit. Et volutpat est tristique et
            lacus id eu nunc. Aliquet pellentesque nulla diam ipsum sit. Bibendum
            feugiat leo scelerisque mauris tellus lacus interdum magnis integer.
          </p>
          <br />
          <p>
            Morbi sagittis pulvinar tincidunt donec auctor enim in lorem. Quisque
            feugiat urna enim massa sapien facilisis eros. Felis ac tincidunt leo
            neque arcu lacus ultrices sapien. Vestibulum facilisis diam eu
            senectus scelerisque amet nisi donec quisque. Diam nisl risus congue
            habitasse.
          </p>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default PaymentShipping;
