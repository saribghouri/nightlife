"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Layout from "@/components/Layout";

export default function Page() {
    const router = useRouter();
    const [userData, setUserData] = useState([]);

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

    return (
        <>
            <Layout>
                <div className="pl-4 pt-10">
                    <div className="flex items-center justify-between w-[70%] 2xl:w-[30%]">
                        <h1 className="text-[31.44px] heading font-bold">Notification</h1>
                    </div>
                    <div className="lineColor 2xl:w-[40%] w-[90%] p-[2px]">
                    </div>
                </div>
                <div className="userTable relative pt-4 px-4 m-4 max-w-[780.33px] h-[571.59px] rounded-t-2xl">
                    <div className="flex w-full pt-10 items-center justify-center">
                        <div className="LeftlineColor p-[2px] w-full"></div>
                        <div className="text-[19.51px] px-2">Host</div>
                        <div className="RightlineColor p-[2px] w-full"></div>
                    </div>
                  <div className="h-[90%] overflow-scroll">
                  {
                        userData?.map((item, index) => {
                            return (
                                <div key={index} className="bg-black bg-opacity-80 userBorder rounded-3xl mt-2 my-1 p-2 flex items-center justify-between">
                                    <div className="flex justify-center items-center ">
                                        <div className="pl-1 ">{item?.message}</div>
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