"use client"
import React, { useState, useRef, useEffect } from "react";
import Left from '../../../public/asset/images/left.png'
import Right from '../../../public/asset/images/right.png'
import Fire from '../../../public/asset/images/fire.png'
import Image from "next/image";
import Layout from "@/components/Layout";
import Cookies from "js-cookie";
import axios from "axios";

export default function Page() {
    const [campusData, setCampusData] = useState([]);
    const campusScrollRef = useRef(null);
    const barScrollRef = useRef(null);
    const clubScrollRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                console.log(token, 'token');
                const response = await axios.get("https://nightlife.blownclouds.com/api/admin/getBooking", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCampusData(response.data.data);
                console.log(response.data.data, "new");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    function scrollLeft(ref) {
        const scrollContainer = ref.current;
        const cardWidth = scrollContainer.offsetWidth / 3;
        if (scrollContainer) {
            scrollContainer.scrollBy({
                left: -cardWidth * 3, 
                behavior: 'smooth'
            });
        }
    }

    function scrollRight(ref) {
        const scrollContainer = ref.current;
        const cardWidth = scrollContainer.offsetWidth / 3;
        if (scrollContainer) {
            scrollContainer.scrollBy({
                left: cardWidth * 3, 
                behavior: 'smooth'
            });
        }
    }

    return (
        <>
            <Layout>
                <div className="pl-4 pt-10">
                    <div className="flex items-start justify-between">
                        <h1 className="text-[31.44px] heading font-bold">Campus</h1>
                        <div className="flex items-center  pr-6">
                            <div className="border cursor-pointer rounded-full backGround border-[#BE317F] w-[28.77px] h-[28.77px] flex items-center justify-center" onClick={() => scrollLeft(campusScrollRef)}>
                                <Image src={Left} width={15} height={15} alt="icon" />
                            </div>
                            <div className="border cursor-pointer ml-2 rounded-full backGround border-[#BE317F] w-[28.77px] h-[28.77px] flex items-center justify-center" onClick={() => scrollRight(campusScrollRef)}>
                                <Image src={Right} width={15} height={15} alt="icon" />
                            </div>
                        </div>
                    </div>
                    <div className="lineColor 2xl:w-[40%]  p-[2px]">
                    </div>
                </div>

                {/* Campus Cards */}
                <div className="flex h-full">
                    <div ref={campusScrollRef} className="pl-4 h-full flex  scroll">
                        {
                            Array.isArray(campusData.campus) && campusData.campus.map((item, index) => {
                                return (
                                    <div key={index} className="borderColor  card-shadow relative rounded-2xl my-4 mr-4 min-w-[289.17px] h-[135.63px]  flex flex-col items-center ">
                                        <div className="h-[47.92px] border-b-2 border-[#BE317F] p-4 flex items-center justify-center w-full z-10 rounded-t-2xl text-center  bg-black bg-opacity-80 pb-1">
                                            <div className="">
                                                <p className="text-[9.66px] font-bold">{item?.concertName}</p>
                                                <p className="text-[20.96px] mb-1 font-bold">{item?.venue}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-center rounded-b-2xl z-10 items-center w-full h-full">
                                            <div className="text-[26px] font-bold">{item?.events}</div>
                                        </div>
                                        <div className="absolute rounded-br-2xl bg-black bg-opacity-80  flex-col bottom-0 right-0 z-20 text-center border-t-2 border-l-2 border-[#BE317F] rounded-tl-3xl w-[43.92px] flex justify-center items-center  text-white  h-[44.79px] cursor-pointer ">
                                            <Image src={Fire} width={17} height={22} alt="logo" />
                                            <p className="text-[7.9px]">{item?.likeCount}</p>
                                        </div>
                                        <img className="absolute h-full w-full rounded-2xl inset-0" src="/asset/images/campusCard.png" alt="" />
                                        <div className="bg-black flex z-10 rounded-b-2xl justify-center items-center w-full bg-opacity-80">
                                            <p className="text-[8.78px] p-2">{item?.address}</p>
                                        </div>
                                        <div className="bg-[#BE317F] flex justify-center items-center text-[12px] font-medium w-[70.67px] h-[31.54px] rounded-b-2xl left-2 top-[132px] p-2 z-20 absolute">
                                            <p>Total {item?.totalTickets}</p>
                                        </div>
                                        <div className="bg-[#BE317F] flex justify-center items-center text-[7.57px] font-medium w-[60.32px] h-[27.45px] rounded-b-2xl right-20 top-[132px] p-2 z-20 absolute">
                                            Booked {item?.bookedTicket}
                                        </div>
                                        <div className="bg-[#BE317F] flex justify-center items-center text-[7.57px] font-medium w-[60.32px] h-[27.45px] rounded-b-2xl right-2 top-[132px] p-2 z-20 absolute">
                                            Available {item?.AvailbleTicket}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                {/* Bar Section */}
                <div className="pl-4 mt-12">
                    <div className="flex items-start  justify-between">
                        <h1 className="text-[31.44px] heading font-bold">Bar</h1>
                        <div className="flex items-center pr-6">
                            <div className="border cursor-pointer rounded-full backGround border-[#BE317F] w-[28.77px] h-[28.77px] flex items-center justify-center" onClick={() => scrollLeft(barScrollRef)}>
                                <Image src={Left} width={15} height={15} alt="icon" />
                            </div>
                            <div className="border cursor-pointer ml-2 rounded-full backGround border-[#BE317F] w-[28.77px] h-[28.77px] flex items-center justify-center" onClick={() => scrollRight(barScrollRef)}>
                                <Image src={Right} width={15} height={15} alt="icon" />
                            </div>
                        </div>
                    </div>
                    <div className="lineColor 2xl:w-[40%]  p-[2px]">
                    </div>
                </div>

                {/* Bar Cards */}
                <div className="flex">
                    <div ref={barScrollRef} className="pl-4 flex  scroll">
                        {
                            Array.isArray(campusData.bar) && campusData.bar.map((item, index) => {
                                return (
                                    <div key={index} className="borderColor  card-shadow relative rounded-2xl my-4 mr-4 min-w-[289.17px] h-[135.63px] pt flex flex-col items-center ">
                                        <div className="h-[47.92px] border-b-2 border-[#BE317F] p-4 flex items-center justify-center w-full z-10 rounded-t-2xl text-center  bg-black bg-opacity-80 pb-1">
                                            <div className="">
                                                <p className="text-[9.66px] font-bold">{item?.concertName}</p>
                                                <p className="text-[20.96px] mb-1 font-bold">{item?.venue}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-center rounded-b-2xl z-10 items-center w-full h-full">
                                            <div className="text-[26px] font-bold">{item?.events}</div>
                                        </div>
                                        <div className="absolute rounded-br-2xl bg-black bg-opacity-80  flex-col bottom-0 right-0 z-20 text-center border-t-2 border-l-2 border-[#BE317F] rounded-tl-3xl w-[43.92px] flex justify-center items-center  text-white  h-[44.79px] cursor-pointer ">
                                            <Image src={Fire} width={17} height={22} alt="logo" />
                                            <p className="text-[7.9px]">{item?.likeCount}</p>
                                        </div>
                                        <img className="absolute h-full w-full rounded-2xl inset-0" src="/asset/images/campusCard.png" alt="" />
                                        <div className="bg-black flex z-10 rounded-b-2xl justify-center items-center w-full bg-opacity-80">
                                            <p className="text-[8.78px] p-2">{item?.address}</p>
                                        </div>
                                        <div className="bg-[#BE317F] flex justify-center items-center text-[12px] font-medium w-[70.67px] h-[31.54px] rounded-b-2xl left-2 top-[132px] p-2 z-20 absolute">
                                            <p>Total {item?.totalTickets}</p>
                                        </div>
                                        <div className="bg-[#BE317F] flex justify-center items-center text-[7.57px] font-medium w-[60.32px] h-[27.45px] rounded-b-2xl right-20 top-[132px] p-2 z-20 absolute">
                                            Booked {item?.bookedTicket}
                                        </div>
                                        <div className="bg-[#BE317F] flex justify-center items-center text-[7.57px] font-medium w-[60.32px] h-[27.45px] rounded-b-2xl right-2 top-[132px] p-2 z-20 absolute">
                                            Available {item?.AvailbleTicket}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>

                {/* Club Section */}
                <div className="pl-4 mt-12 pb-6">
                    <div className="flex items-start  justify-between">
                        <h1 className="text-[31.44px] heading font-bold">Club</h1>
                        <div className="flex items-center  pr-6">
                            <div className="border cursor-pointer rounded-full backGround border-[#BE317F] w-[28.77px] h-[28.77px] flex items-center justify-center" onClick={() => scrollLeft(clubScrollRef)}>
                                <Image src={Left} width={15} height={15} alt="icon" />
                            </div>
                            <div className="border cursor-pointer ml-2 rounded-full backGround border-[#BE317F] w-[28.77px] h-[28.77px] flex items-center justify-center" onClick={() => scrollRight(clubScrollRef)}>
                                <Image src={Right} width={15} height={15} alt="icon" />
                            </div>
                        </div>
                    </div>
                    <div className="lineColor 2xl:w-[40%]  p-[2px]">
                    </div>
                </div>

                {/* Club Cards */}
                <div className="flex pb-10">
                    <div ref={clubScrollRef} className="pl-4 flex scroll">
                        {
                             Array.isArray(campusData.club) && campusData.club.map((item, index) => {
                                return (
                                    <div key={index} className="borderColor  card-shadow relative rounded-2xl my-4 mr-4 min-w-[289.17px] h-[135.63px] pt flex flex-col items-center ">
                                        <div className="h-[47.92px] border-b-2 border-[#BE317F] p-4 flex items-center justify-center w-full z-10 rounded-t-2xl text-center  bg-black bg-opacity-80 pb-1">
                                            <div className="">
                                                <p className="text-[9.66px] font-bold">{item?.concertName}</p>
                                                <p className="text-[20.96px] mb-1 font-bold">{item?.venue}</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-center rounded-b-2xl z-10 items-center w-full h-full">
                                            <div className="text-[26px] font-bold">{item?.events}</div>
                                        </div>
                                        <div className="absolute rounded-br-2xl bg-black bg-opacity-80  flex-col bottom-0 right-0 z-20 text-center border-t-2 border-l-2 border-[#BE317F] rounded-tl-3xl w-[43.92px] flex justify-center items-center  text-white  h-[44.79px] cursor-pointer ">
                                            <Image src={Fire} width={17} height={22} alt="logo" />
                                            <p className="text-[7.9px]">{item?.likeCount}</p>
                                        </div>
                                        <img className="absolute h-full w-full rounded-2xl inset-0" src="/asset/images/campusCard.png" alt="" />
                                        <div className="bg-black flex z-10 rounded-b-2xl justify-center items-center w-full bg-opacity-80">
                                            <p className="text-[8.78px] p-2">{item?.address}</p>
                                        </div>
                                        <div className="bg-[#BE317F] flex justify-center items-center text-[12px] font-medium w-[70.67px] h-[31.54px] rounded-b-2xl left-2 top-[132px] p-2 z-20 absolute">
                                            <p>Total {item?.totalTickets}</p>
                                        </div>
                                        <div className="bg-[#BE317F] flex justify-center items-center text-[7.57px] font-medium w-[60.32px] h-[27.45px] rounded-b-2xl right-20 top-[132px] p-2 z-20 absolute">
                                            Booked {item?.bookedTicket}
                                        </div>
                                        <div className="bg-[#BE317F] flex justify-center items-center text-[7.57px] font-medium w-[60.32px] h-[27.45px] rounded-b-2xl right-2 top-[132px] p-2 z-20 absolute">
                                            Available {item?.AvailbleTicket}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </Layout>
        </>
    );
}

