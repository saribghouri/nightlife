'use client'
'use client'
import React, { useEffect, useRef, useState } from "react";
import WalletIcon from '../../public/asset/images/walletIcon.png'
import Bell from '../../public/asset/images/bell.png'
import Sliders from '../../public/asset/images/sliders.png'
import Login from '../../public/asset/images/login.png'
import Fire from '../../public/asset/images/fire.png'
import VipTable from '../../public/asset/images/vipTable.png'
import Shield from '../../public/asset/images/shield.png'
import TermsIcon from '../../public/asset/images/termsIcon.png'
import Privacy from '../../public/asset/images/privacy.png'
import Support from '../../public/asset/images/support.png'
import Notification from '../../public/asset/images/notification.png'
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";

const Layout = ({ children }) => {
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [userData, setUserData] = useState([]);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                console.log(token, 'token');
                const response = await axios.get("https://nightlife.blownclouds.com/api/admin/getNotification", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data.data);
                console.log(response.data.data, "userDetails");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleNotificationClick = (event) => {
        event.stopPropagation(); 
        setNotificationOpen(!notificationOpen);
    };

    const handleLogout = () => {
        Cookies.remove("apiToken");
        router.push("/");
    };

    return (
        <div className="flex layOutBackGround ">
            {/* Sidebar */}
            <div className={`fixed inset-y-0 left-0 w-64 layOutBackGround text-white z-50 transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="p-4 ">
                    <div className="flex items-center justify-between ">
                        <Image src="/asset/images/logo.png" width={160} height={160} alt="Logo" />
                        <button
                            className="lg:hidden focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            {sidebarOpen ? (
                                <Image src={Sliders} width={24} height={24} alt="Sliders Icon" />
                            ) : (
                                <Image src={Sliders} width={24} height={24} alt="Sliders Icon" />
                            )}
                        </button>
                    </div>
                    <nav >
                        <ul>
                            <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/dashboard")}
                                >
                                    <Image
                                        src="/asset/images/dashboard.png"
                                        width={24}
                                        height={24}
                                        alt="Dashboard Icon"
                                    />
                                    <span className="ml-2">Dashboard</span>
                                </button>
                            </li>
                            {/* <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/verified-host")}
                                >
                                    <Image
                                        src="/asset/images/podcast.png"
                                        width={24}
                                        height={24}
                                        alt="Verified Host Icon"
                                    />
                                    <span className="ml-2">Verified Host</span>
                                </button>
                            </li> */}
                            <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/registered-user")}
                                >
                                    <Image
                                        src="/asset/images/userRound.png"
                                        width={24}
                                        height={24}
                                        alt="Registered User Icon"
                                    />
                                    <span className="ml-2">Registered User</span>
                                </button>
                            </li>
                            <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/booking")}
                                >
                                    <Image
                                        src="/asset/images/ticketCheck.png"
                                        width={24}
                                        height={24}
                                        alt="Booking Icon"
                                    />
                                    <span className="ml-2">Booking</span>
                                </button>
                            </li>
                            <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/wallet")}
                                >
                                    <Image
                                        src={WalletIcon}
                                        width={24}
                                        height={24}
                                        alt="Booking Icon"
                                    />
                                    <span className="ml-2">Wallet</span>
                                </button>
                            </li>
                            <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/vip-tabels")}
                                >
                                    <Image
                                        src={VipTable}
                                        width={24}
                                        height={24}
                                        alt="Booking Icon"
                                    />
                                    <span className="ml-2">Vip Tabel</span>
                                </button>
                            </li>
                            <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/payment-received")}
                                >
                                    <Image
                                        src={Shield}
                                        width={24}
                                        height={24}
                                        alt="Booking Icon"
                                    />
                                    <span className="ml-2">Payment Received</span>
                                </button>
                            </li>
                            <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/terms-and-condition")}
                                >
                                    <Image
                                        src={TermsIcon}
                                        width={24}
                                        height={24}
                                        alt="Booking Icon"
                                    />
                                    <span className="ml-2">Terms & Conditions</span>
                                </button>
                            </li>
                            <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/privacy-policy")}
                                >
                                    <Image
                                        src={Privacy}
                                        width={24}
                                        height={24}
                                        alt="Booking Icon"
                                    />
                                    <span className="ml-2">Privacy Policy</span>
                                </button>
                            </li>
                            <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/get-support-queries")}
                                >
                                    <Image
                                        src={Support}
                                        width={24}
                                        height={24}
                                        alt="Booking Icon"
                                    />
                                    <span className="ml-2">Support</span>
                                </button>
                            </li>
                            <li className="mb-[16px]">
                                <button
                                    className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                    onClick={() => router.push("/notification")}
                                >
                                    <Image
                                        src={Notification}
                                        width={24}
                                        height={24}
                                        alt="Booking Icon"
                                    />
                                    <span className="ml-2">Notification</span>
                                </button>
                            </li>
                        </ul>
                    </nav>
                    <div className="mt-8 cursor-pointer " >

                        <Image onClick={handleLogout} src={Login} width={24} height={24} alt="Login Icon" />
                    </div>
                </div>
            </div>

            {/* Sidebar Icon */}
            {!sidebarOpen && (
                <div className="fixed inset-y-0 left-0 w-14 layOutBackGround text-white z-50 flex  justify-center">
                    <div className=" pt-4">
                        <button
                            className="focus:outline-none"
                            onClick={toggleSidebar}
                        >
                            <Image src={Sliders} width={24} height={24} alt="Sliders Icon" />
                        </button>
                        <nav>
                            <ul>
                                <li className="mb-[16px] pt-4">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/dashboard")}
                                    >
                                        <Image src={Fire} width={24} height={24} alt="logo" />
                                    </button>
                                </li>
                                <li className="mb-[16px] ">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/dashboard")}
                                    >
                                        <Image
                                            src="/asset/images/dashboard.png"
                                            width={24}
                                            height={24}
                                            alt="Dashboard Icon"
                                        />
                                    </button>
                                </li>
                                {/* <li className="mb-[16px]">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/verified-host")}
                                    >
                                        <Image
                                            src="/asset/images/podcast.png"
                                            width={24}
                                            height={24}
                                            alt="Verified Host Icon"
                                        />
                                    </button>
                                </li> */}
                                <li className="mb-[16px]">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/registered-user")}
                                    >
                                        <Image
                                            src="/asset/images/userRound.png"
                                            width={24}
                                            height={24}
                                            alt="Registered User Icon"
                                        />
                                    </button>
                                </li>
                                <li className="mb-[16px]">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/booking")}
                                    >
                                        <Image
                                            src="/asset/images/ticketCheck.png"
                                            width={24}
                                            height={24}
                                            alt="Booking Icon"
                                        />
                                    </button>
                                </li>
                                <li className="mb-[16px]">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/wallet")}
                                    >
                                        <Image
                                            src={WalletIcon}
                                            width={24}
                                            height={24}
                                            alt="Booking Icon"
                                        />
                                    </button>
                                </li>
                                <li className="mb-[16px]">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/vip-tabels")}
                                    >
                                        <Image
                                            src={VipTable}
                                            width={24}
                                            height={24}
                                            alt="Booking Icon"
                                        />
                                    </button>
                                </li>
                                <li className="mb-[16px]">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/payment-received")}
                                    >
                                        <Image
                                            src={Shield}
                                            width={24}
                                            height={24}
                                            alt="Booking Icon"
                                        />
                                    </button>
                                </li>
                                <li className="mb-[16px]">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/terms-and-condition")}
                                    >
                                        <Image
                                            src={TermsIcon}
                                            width={24}
                                            height={24}
                                            alt="Booking Icon"
                                        />
                                    </button>
                                </li>
                                <li className="mb-[16px]">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/privacy-policy")}
                                    >
                                        <Image
                                            src={Privacy}
                                            width={24}
                                            height={24}
                                            alt="Booking Icon"
                                        />
                                    </button>
                                </li>
                                <li className="mb-[16px]">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/get-support-queries")}
                                    >
                                        <Image
                                            src={Support}
                                            width={24}
                                            height={24}
                                            alt="Booking Icon"
                                        />
                                    </button>
                                </li>
                                <li className="mb-[16px]">
                                    <button
                                        className="flex items-center text-white hover:text-gray-300 focus:outline-none"
                                        onClick={() => router.push("/notification")}
                                    >
                                        <Image
                                            src={Notification}
                                            width={24}
                                            height={24}
                                            alt="Booking Icon"
                                        />
                                    </button>
                                </li>
                            </ul>
                        </nav>
                        <div className="mt-8  cursor-pointer " >
                            <Image onClick={handleLogout} src={Login} width={24} height={24} alt="Login Icon" />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <div className={`flex-1 ${sidebarOpen ? '!ml-64' : 'ml-6'} transition-all duration-300 ease-in-out layOutBAckGround`}>
                {/* Top Header */}
                <div className="layOutBackGround left-0 fixed w-full z-30 p-4 flex justify-end items-center">
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search"
                                className="px-4 py-2 rounded-full bg-gray-700 text-white focus:outline-none"
                            />
                            <span className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                <Image
                                    src="/asset/images/search.png"
                                    width={20}
                                    height={20}
                                    alt="Search Icon"
                                />
                            </span>
                        </div>
                        <div onClick={() => {
                            router.push('/profile')
                        }} className="userBorder cursor-pointer mx-2 rounded-full flex justify-center items-center h-[3.5rem] w-[3.5rem]">
                            <img className=" rounded-full w-12 h-12" src={"/asset/images/userImage.png"} alt="uase-image" />
                        </div>
                        <div onClick={handleNotificationClick}  className="pl-2 z-60">
                            <Image className="cursor-pointer " src={Bell} width={24} height={24} alt="icon" />

                            {notificationOpen && (
                                <div  className="w-[423.24px] overflow-y-scroll  text-white bg-black bg-opacity-80 absolute right-4 top-10 rounded-3xl notificationShadow h-[240.08px] notificationBorder">
                                    <div className="test-[18px]  pt-8 px-12 text-white">Host</div>
                                    {
                                        userData?.map((item, index) => {
                                            return (
                                                <div key={index}  className="bg-black bg-opacity-80  userBorder rounded-3xl my-4 mx-6  p-2 flex items-center justify-between">
                                                    <div className="flex justify-center items-center ">
                                                        <div className="pl-1 ">{item?.message}</div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }

                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Main Content Area */}
                <div className={`p-8 mt-10 bg-black text-white lg:p-10 ${!sidebarOpen ? 'ml-6' : ''}  overflow-y-auto`}>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Layout;

