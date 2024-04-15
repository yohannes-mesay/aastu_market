import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="black py-8 w-full p-20">
      <div className="container mx-auto px-10">
        <div className="flex flex-wrap -mx-20">
          <div className="flex w-full sm:w-1/2 md:w-1/4 px-30 mb-8 md:mb-0">
            <div className="flex flex-col">
              <h4 className="text-white text-2xl font-semibold mb-4">
                Contacts:
              </h4>
              <ul className="text-gray-500">
                <li className="mb-2">
                  <FaPhoneAlt /> : +251938935503
                </li>
                <li className="mb-2">
                  <IoIosMail /> : netsanettesfaye@gmail.com
                </li>
                <li className="mb-2">
                  <a href="/Services"></a>
                </li>
              </ul>
              <ul className="text-gray-500"></ul>
            </div>
          </div>
          <div className="flex w-full sm:w-1/2 md:w-1/4 px-20 mb-8 md:mb-0">
            <div className="flex flex-col">
              <h4 className="text-white text-2xl font-semibold mb-4">
                Company
              </h4>
              <ul className="text-gray-500">
                <li className="mb-2">
                  <a href="/AboutUs">H-G3: DevCrew</a>
                </li>
                <li className="mb-2">AASTU</li>
              </ul>
            </div>
          </div>

          <div className="flex w-full sm:w-1/2 md:w-1/4 px-20 mb-8 md:mb-0">
            <div className="flex flex-col">
              <h4 className="text-white text-2xl font-semibold mb-4">Shop</h4>
              <ul className="text-gray-500">
                <li className="mb-2">
                  <a href="/Products">Products</a>
                </li>
                <li className="mb-2">
                  <a href="/Services">Our Services</a>
                </li>
                <li className="mb-2">
                  <a href="/Events">Events</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex w-full sm:w-1/2 md:w-1/4 px-20 mb-8 md:mb-0">
            <div className="flex flex-col">
              <h4 className="text-white text-2xl font-semibold mb-4">
                follow us
              </h4>
              <div className="flex items-center">
                <a
                  href="https://www.facebook.com/profile.php?id=61558385463401"
                  className="text-white mr-4 text-4xl"
                >
                  <FaFacebook />
                </a>
                <a
                  href="https://www.instagram.com/eyup12.7?igsh=anQ4cnJoZHRtZzF1"
                  className="text-white mr-4 text-4xl"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.linkedin.com/in/eyoseyas-ephrem-01ab71299?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  className="text-white text-4xl"
                >
                  <FaLinkedin />
                </a>
              </div>
              <li></li>
              <ul className="text-gray-500">
                <li>@2024 H-G3:DevCrew</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
