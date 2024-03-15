"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import CloseIcon from "../../../public/asset/images/CloseIcon.png";
import Cookies from "js-cookie";
import axios from "axios";
import Image from "next/image";

export default function Page() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = Cookies.get("apiToken");
        const response = await axios.get(
          "https://nightlife.blownclouds.com/api/admin/getAdminInfo",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const adminData = response?.data?.getAdminInfo;
        setFullName(adminData?.fullName || "");
        setEmail(adminData?.email || "");
        setPhone(adminData?.phone || "");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleUpdateAdminInfo = async (e) => {
    e.preventDefault();
    console.log("q");
    try {
      const token = Cookies.get("apiToken");
      const response = await axios.patch(
        "https://nightlife.blownclouds.com/api/admin/updateAdminInfo",
        {
          fullName,
          email,
          phone,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const UpdatePassword = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("apiToken");
      const response = await axios.patch(
        "https://nightlife.blownclouds.com/api/admin/changePass",
        {
          oldPassword: password, // Assuming the current password is entered in the password field
          newPassword: confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setOpenModal(false)
      console.log("Password updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating Password:", error);
    }
  };

  return (
    <div className="relative">
      <Layout>
        <div className="pl-4 mt-6">
          <h1 className="text-[31.44px] heading font-extrabold">PROFILE</h1>
          <div className="lineColor 2xl:w-[40%] p-[2px]"></div>
        </div>
        <div className="w-[894.64px] h-[553.78px] flex justify-between pl-10 pt-20 profileBg  rounded-t-[40px] mx-4 mt-16">
          <div className="w-[50%]">
            <form onSubmit={handleUpdateAdminInfo}>
              <div className="flex flex-col">
                <div className="relative  flex flex-col">
                  <label className="px-6" htmlFor="fullName">
                    Full Name
                  </label>
                  <input
                    className="outline-none mt-2 w-full h-[52.88px] text-[12px] border-none px-8 rounded-full bg-black bg-opacity-80 text-[#BE317F] placeholder:text-[#BE317F]"
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Full Name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </div>
                <div className="relative mt-4 flex flex-col">
                  <label className="px-6" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="outline-none mt-2 w-full h-[52.88px] text-[12px] border-none px-8 rounded-full bg-black bg-opacity-80 text-[#BE317F] placeholder:text-[#BE317F]"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="relative mt-4 flex flex-col">
                  <label className="px-6" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="outline-none mt-2 w-full h-[52.88px] text-[12px] border-none px-8 rounded-full bg-black bg-opacity-80 text-[#BE317F] placeholder:text-[#BE317F]"
                    type="tel"
                    name="phone"
                    id="phone"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
              </div>

              <div className="pt-8 pl-2 w-full flex justify-between items-center">
                <button
                  className="outline-none text-black font-bold text-[10.46px] btn border-none w-[101.44px] h-[31.34px]"
                  type="submit"
                >
                  Update
                </button>
                <div
                  onClick={() => setOpen(true)}
                  className="outline-none text-black font-bold text-[10.46px] flex justify-center items-center cursor-pointer btn border-none w-[131.44px] px-4 h-[31.34px]"
                >
                  <p>Change Password</p>
                </div>
              </div>
            </form>
          </div>
          {open && (
            <div className="w-[50%] px-10  relative">
              <div
                onClick={() => setOpen(false)}
                className="absolute top-0 right-10 cursor-pointer z-10"
              >
                <Image src={CloseIcon} width={40} height={40} alt="close" />
              </div>
              <form >
                <div className="flex flex-col">
                  <div className="relative  flex flex-col">
                    <label className="px-6" htmlFor="password">
                      Old Password
                    </label>
                    <input
                      className="outline-none mt-2 w-full h-[52.88px] text-[12px] border-none px-8 rounded-full bg-black bg-opacity-80 text-[#BE317F] placeholder:text-[#BE317F]"
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="relative mt-4 flex flex-col">
                    <label className="px-6" htmlFor="confirmPassword">
                      New Password
                    </label>
                    <input
                      className="outline-none mt-2 w-full h-[52.88px] text-[12px] border-none px-8 rounded-full bg-black bg-opacity-80 text-[#BE317F] placeholder:text-[#BE317F]"
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
                <div className="pt-8 pl-2 w-full flex justify-between items-center">
                  <button
                    onClick={() => setOpen(false)}
                    className="outline-none text-black font-bold text-[10.46px] btn border-none w-[101.44px] h-[31.34px]"
                  >
                    Discard
                  </button>
                  <div
                    className="outline-none flex justify-center items-center cursor-pointer text-black font-bold text-[10.46px] btn border-none w-[131.44px] px-4 h-[31.34px]"
                    onClick={() => { setOpenModal(true) }}
                  >
                    <p>Update Password</p>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>

      </Layout>
      {openModal ? (
        <div className="h-full z-10 w-full absolute inset-0 bg-black bg-opacity-80  flex items-center justify-center">
          <div className="p-4 sm:p-10 bg-gray-50 rounded-md  w-[300px] md:w-[500px] text-center overflow-y-auto">
            <span className="mb-4 inline-flex justify-center items-center w-[62px] h-[62px] rounded-full border-4  bg-[#BE317F] ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="black"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>



            </span>

            <h3 className="mb-2 text-2xl font-bold text-gray-800">
              Password Change
            </h3>
            <p className="text-gray-500">
              Are you sure you want to proceed?
            </p>

            <div className="mt-6 flex justify-center gap-x-4">
              <div
                onClick={UpdatePassword}
                className="py-2.5 px-4 inline-flex cursor-pointer justify-center items-center gap-2 rounded-md border font-medium bg-white border-[#BE317F] text-[#BE317F] shadow-sm align-middle hover:bg-gray-50 transition-all text-sm"
              >
                Yes
              </div>
              <button onClick={() => { setOpenModal(false) }} className="py-2.5 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-[#BE317F] text-white transition-all text-sm">
                No
              </button>
            </div>
          </div>
        </div>
      ) : <></>

      }
    </div>
  );
}
