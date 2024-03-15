'use client'
import React, { useEffect, useState } from "react";
import AddMoreEvents from '../../../public/asset/images/addMoreEvents.png'
import Fire from '../../../public/asset/images/fire.png'
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Cookies from "js-cookie";
import Layout from "@/components/Layout";

export default function Page() {
    const router = useRouter();
    const [campusData, setCampusData] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                const response = await axios.get("https://nightlife.blownclouds.com/api/admin/getClub", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCampusData(response.data.data);
                console.log(response.data.data, 'data');
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handleCardClick = (item) => {
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
        router.push(`/update-club-details?${queryString}`);
    };


    return (
        <>
            <Layout>
                <div className="pl-4 pt-10">
                    <h1 className="text-[31.44px] heading font-bold">Club</h1>
                    <div className="lineColor 2xl:w-[40%]  p-[2px]">
                    </div>
                </div>
                <div className="flex">
                    <div className="pl-4 h-full max-h-[680px] overflow-y-auto flex items-start flex-wrap w-[54%] xl:w-[67%] ">
                        {
                            campusData?.map((item, index) => {
                                console.log(item, 'item');
                                return (
                                    <div key={index} className=" borderColor  card-shadow relative rounded-2xl my-4 mr-4 w-[289.17px] h-[135.63px] pt flex flex-col items-center ">
                                        <div className="h-[47.92px] border-b-2 border-[#BE317F] p-4 flex items-center justify-center w-full z-10 rounded-t-2xl text-center  bg-black bg-opacity-80 pb-1">
                                            <div className="">
                                                <p className="text-[9.66px] font-bold">{item?.concertName}</p>
                                                <p className="text-[20.96px] mb-1 font-bold">{item?.venue}</p>
                                            </div>

                                        </div>
                                        <div className=" flex justify-center rounded-b-2xl z-10 items-center w-full h-full">
                                        </div>
                                        <div className="absolute rounded-br-2xl bg-black bg-opacity-80  flex-col bottom-0 right-0 z-20 text-center border-t-2 border-l-2 border-[#BE317F] rounded-tl-3xl w-[43.92px] flex justify-center items-center  text-white  h-[44.79px]  ">
                                            <Image src={Fire} width={17} height={22} alt="logo" />
                                            <p className="text-[7.9px]">{item?.atmoshphere}</p></div>
                                        <img className="absolute h-full w-full rounded-2xl inset-0" src={item?.picture} alt="" />
                                        <div className="bg-black flex z-10 rounded-b-2xl justify-center items-center w-full bg-opacity-80">
                                            <p className="text-[8.78px] p-2">{item?.address}</p>
                                        </div>
                                        <button
                                            className="absolute inset-0 w-full h-full cursor-pointer z-30"
                                            onClick={() => handleCardClick(item)}
                                        ></button>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="w-[30%]">
                        <div className="campusBorder mt-4 flex justify-center items-center w-[290px] rounded-3xl h-[467.65px]">
                            <Image onClick={() => {
                                router.push('/add-club-details')
                            }} className="cursor-pointer" width={80} height={79} src={AddMoreEvents} alt="image" />
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}