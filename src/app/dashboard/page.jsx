"use client"
import React, { useEffect, useState } from "react";
import EditIcon from '../../../public/asset/images/edit-icon.png'
import Vector from '../../../public/asset/images/vector.png'
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Layout from "@/components/Layout";

export default function Page() {

    const router = useRouter();
    const [campusData, setCampusData] = useState([]);
    const [campusCount, setCampusCount] = useState();
    const [barData, setBarData] = useState([]);
    const [barCount, setBarCount] = useState();
    const [clubData, setClubData] = useState([]);
    const [clubCount, setClubCount] = useState();
    const [detailsData, setDetailsData] = useState([]);
    const [detailsCount, setDetailsCount] = useState();
    const [userData, setUserData] = useState([]);
    const [userDataCount, setUserDataCount] = useState();
    console.log(clubCount, 'campusCount');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                console.log(token, 'token');
                const response = await axios.get("https://nightlife.blownclouds.com/api/admin/getCampus", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCampusData(response.data.data);
                console.log(response.data, "new dta");
                setCampusCount(response.data.data.length)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                console.log(token, 'token');
                const response = await axios.get("https://nightlife.blownclouds.com/api/admin/getBar", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setBarData(response.data.data);
                setBarCount(response.data.data.length)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                console.log(token, 'token');
                const response = await axios.get("https://nightlife.blownclouds.com/api/admin/getClub", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setClubData(response.data.data);
                setClubCount(response.data.data.length)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                console.log(token, 'token');
                const response = await axios.get("https://nightlife.blownclouds.com/api/user/getDetailsOfDeals", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setDetailsData(response.data.data);
                console.log(response.data.data, "detailsData");
                setDetailsCount(response.data.data.length)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                console.log(token, 'token');
                const response = await axios.get("https://nightlife.blownclouds.com/api/admin/getAllUser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data.data);
                console.log(response.data.data, "userDetails");
                setUserDataCount(response.data.data.length)
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleDetailsCardClick = (item) => {
        console.log(item, "itemDetails");
        const queryParams = {
            id: item._id,
        };

        let queryString = '';
        for (let key in queryParams) {
            if (queryString !== '') {
                queryString += '&';
            }
            queryString += key + '=' + encodeURIComponent(queryParams[key]);
        }

        router.push(`/update-deals?${queryString}`);
    };



    const handleClick = () => {
        router.push('/registered-user');
    };

    return (
        <>
            <Layout>
               <div className="h-[121vh] lg:h-full">
               <div className="pl-4 pt-10">
                    <h1 className="text-[31.44px] heading font-bold">Main Event Category</h1>
                    <div className="lineColor 2xl:w-[40%]  w-[90%] p-[2px]">

                    </div>
                </div>
                <div className="p-4 flex ">
                    {/* {
                                    data?.map((item, index) => {
                                        return ( */}
                    <div className="bg-pink-400  card-shadow  borderColor relative rounded-2xl mr-4 w-[208.53px] h-[114.49px] pt flex flex-col items-center ">
                        <div className="h-[43.26px] flex items-center justify-center w-full z-10 rounded-t-2xl text-center font-bold bg-black bg-opacity-80 pb-1">Campus</div>
                        <div className=" flex justify-center rounded-b-2xl z-10 items-center w-full h-full">
                            <div className="text-[26px] font-bold" >{campusCount ? campusCount + " Events" : ""}</div>
                        </div>
                        <div onClick={() => {
                            router.push('/campus');
                        }} className="absolute bottom-1 right-2 z-10 text-center rounded-full flex justify-center items-center iconBg text-white w-6 h-6 cursor-pointer ">
                            <Image src={Vector} width={7} height={7} alt="logo" /></div>
                        <img className="absolute rounded-2xl inset-0" src="/asset/images/cardBgImage.png" alt="" />
                    </div>

                    <div className="bg-pink-400   card-shadow borderColor relative rounded-2xl mr-4 w-[208.53px] h-[114.49px] pt flex flex-col items-center ">
                        <div className="h-[43.26px] flex items-center justify-center w-full z-10 rounded-t-2xl text-center font-bold  bg-black bg-opacity-80 pb-1">Bar</div>
                        <div className=" flex justify-center rounded-b-2xl z-10 items-center w-full h-full">
                            <div className="text-[26px] font-bold" >{barCount ? barCount + " Events" : ""}</div>
                        </div>
                        <div onClick={() => {
                            router.push('/bar');
                        }} className="absolute bottom-1 right-2 z-10 text-center rounded-full flex justify-center items-center iconBg text-white w-6 h-6 cursor-pointer ">
                            <Image src={Vector} width={7} height={7} alt="logo" /></div>
                        <img className="absolute rounded-2xl inset-0" src="/asset/images/cardBgImage.png" alt="" />
                    </div>

                    <div className="bg-pink-400  card-shadow borderColor relative rounded-2xl mr-4 w-[208.53px] h-[114.49px] pt flex flex-col items-center ">
                        <div className="h-[43.26px] flex items-center justify-center w-full z-10 rounded-t-2xl text-center font-bold bg-black bg-opacity-80 pb-1">Club</div>
                        <div className=" flex justify-center rounded-b-2xl z-10 items-center w-full h-full">
                            <div className="text-[26px] font-bold" >{clubCount ? clubCount + " Events" : ""} </div>
                        </div>
                        <div onClick={() => {
                            router.push('/club');
                        }} className="absolute bottom-1 right-2 z-10 text-center rounded-full flex justify-center items-center iconBg text-white w-6 h-6 cursor-pointer ">
                            <Image src={Vector} width={7} height={7} alt="logo" /></div>
                        <img className="absolute rounded-2xl inset-0" src="/asset/images/cardBgImage.png" alt="" />
                    </div>
                </div>
                <div className="pl-4 mt-6">
                    <h1 className="text-[31.44px] heading font-bold">Deals of the Week</h1>
                    <div className="lineColor 2xl:w-[40%] w-[90%] p-[2px]">

                    </div>
                </div>
                <div className="p-4 flex ">
                    {
                        detailsData?.map((item, index) => {
                            return (
                                <div onClick={() => handleDetailsCardClick(item)} key={index} className=" cursor-pointer card-shadow  borderColor relative rounded-2xl mr-4 w-[208.53px] h-[119px] pt flex flex-col items-center ">
                                    <div className="h-[43.26px] flex items-center justify-center w-full z-10 rounded-t-2xl text-center font-bold bg-black bg-opacity-80 pb-1">${item?.price} {item?.name}</div>
                                    <div className=" flex justify-center rounded-b-2xl z-10 items-center w-full h-full">
                                        {/* <div className="text-[26px] font-bold" >{item?.likeCount ? item?.likeCount + " Events" : ""}</div> */}
                                    </div>
                                    {/* <div className="absolute bottom-1 right-2 z-10 text-center rounded-full flex justify-center items-center iconBg text-white w-6 h-6 cursor-pointer ">
                                        <Image src={Vector} width={7} height={7} alt="logo" /></div> */}
                                    <img className="absolute h-full rounded-2xl inset-0" src={item?.picture} alt="" />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="pl-4 mt-4">
                    <div className="flex items-center justify-between w-[70%] 2xl:w-[30%]">
                        <h1 className="text-[31.44px] heading font-bold">Registered User</h1>
                        <p onClick={handleClick} className="cursor-pointer text-[15px] heading">See More</p>
                    </div>
                    <div className="lineColor 2xl:w-[40%] w-[90%] p-[2px]">
                    </div>
                </div>
                <div className="userBoxcolor pt-4 px-4 m-4 w-full max-w-[660.33px] h-[235.28px] rounded-t-2xl">

                    {
                        userData?.slice(0, 3).map((item, index) => {
                            return (
                                <div key={index} className="bg-black  bg-opacity-80 userBorder rounded-3xl mt-2 my-1 p-2 flex items-center justify-between">
                                    <div className="flex justify-center items-center w-[30%]">
                                        <div className="pl-1">{item?.fullName}</div>
                                    </div>
                                    <div className="border-r border-l w-[35%] text-center border-[#BE317F] px-4 ">{item?.email}</div>
                                    <div className="flex items-center justify-between w-[30%]">
                                        <div className="pr-1">{item?.phone}</div>
                                        {/* <div className="border flex justify-center items-center cursor-pointer rounded-full w-8 h-8"><Image src={EditIcon} width={15.84} height={15.84} alt="logo" /></div> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
               </div>
            </Layout>
        </>
    );
}