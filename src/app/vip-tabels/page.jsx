"use client"
import React, { useEffect, useState } from "react";
import Left from '../../../public/asset/images/left.png'
import Right from '../../../public/asset/images/right.png'
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Layout from "@/components/Layout";
import { format } from 'date-fns';

export default function Page() {
    const router = useRouter();
    const [vipTable, setVipTable] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                console.log(token, 'token');
                const response = await axios.get("https://nightlife.blownclouds.com/api/admin/getVipTables", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setVipTable(response.data.data);
                console.log(response.data.data, "userDetails");
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const usersPerPage = 6;
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = vipTable.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handleAccept = async (id) => {
        try {
            const token = Cookies.get("apiToken");
            const url = `https://nightlife.blownclouds.com/api/admin/updateVipTableApproveStatus/APPROVED/${id}`;
            const response = await axios.patch(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Accept Success:", response.data);
        } catch (error) {
            console.error("Error accepting:", error);
        }
    };

    
    const handleReject = async (id) => {
        try {
            const token = Cookies.get("apiToken");
            const url = `https://nightlife.blownclouds.com/api/admin/updateVipTableApproveStatus/REJECTED/${id}`;
            const response = await axios.patch(url, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("Reject Success:", response.data);
        } catch (error) {
            console.error("Error rejecting:", error);
        }
    };

    return (
        <>
            <Layout>
                <div className="pl-4 pt-10">
                    <div className="flex items-center justify-between w-[70%] 2xl:w-[30%]">
                        <h1 className="text-[31.44px] heading font-bold">VIP TABELS</h1>
                    </div>
                    <div className="lineColor 2xl:w-[40%] w-[90%] p-[2px]"></div>
                </div>
                <div className="userTable relative pt-4 px-4 m-4 w-[850.33px] h-[571.59px]  rounded-t-2xl">
                    <div className="bg-black bg-opacity-80 h-[43.01px] userBorder rounded-3xl mt-2 my-1 p-2 flex items-center justify-between">
                        <div className="flex items-center justify-center px-4 w-[65%]">
                            <div className="pl-1 text-[#BE317F] text-[16.02px] font-bold">User</div>
                        </div>
                        <div className="flex items-center border-[#BE317F]  text-[#BE317F] w-[40%] px-10  text-[16.02px] font-bold ">Event Name</div>
                        <div className="flex  items-center px-4 w-full">
                            <div className="pr-1 pl-4 text-[#BE317F] text-[16.02px] font-bold">Date</div>
                        </div>
                    </div>
                    {
                        currentUsers?.slice(0, 6).map((item, index) => {
                            return (
                                <div key={index} className="bg-black bg-opacity-80 userBorder rounded-3xl mt-2 my-1 p-2 flex items-center ">
                                    <div className="flex justify-center items-center w-[65%] px-4">
                                        <div className="pl-1 text-[22px] font-bold">{item?.fullName}</div>
                                    </div>
                                    <div className="border-r border-l border-[#BE317F] w-[40%] px4 text-center px-4 ">
                                        <p className="text-[7.68px] font-bold">{item?.eventId?.concertName}</p>
                                        <p className="text-[16.86px] font-bold">{item?.eventId?.venue}</p>
                                    </div>
                                    <div className="flex items-center justify-between px-4 w-full">
                                        <div className="pr-1 flex items-center">
                                            {format(new Date(item?.eventId.createdAt), 'd-MM-yyyy')}
                                            <div className="flex pl-4 ">
                                                <button
                                                    onClick={() => handleAccept(item._id)}
                                                    className="outline-none text-black font-bold text-[10.46px] btn border-none w-[101.44px] h-[31.34px]"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => handleReject(item._id)}
                                                    className="outline-none ml-2 !bg-transparent border border-[#BE317F]  font-bold text-[10.46px] btn w-[101.44px] h-[31.34px]"
                                                >
                                                    Reject
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className="flex absolute bottom-4 w-full items-center justify-end pr-10 pt-12 pb-6">
                        <div className="flex">
                            <div
                                onClick={() => {
                                    if (currentPage > 1) {
                                        paginate(currentPage - 1);
                                    }
                                }}
                                className={`w-12 cursor-pointer bg-black bg-opacity-80 h-12 border mr-2 border-[#BE317F] rounded-full flex justify-center items-center ${currentPage === 1 ? 'text-[#BE317F] opacity-50 cursor-not-allowed' : 'text-[#BE317F] hover:text-white'}`}
                            >
                                <Image src={Left} width={14.5} height={14.5} alt="icon" />
                            </div>
                            <nav aria-label="Page navigation  example">
                                <ul className="inline-flex bg-black bg-opacity-80 -space-x-px  text-sm border px-4 py-2 border-[#BE317F] rounded-full">
                                    {Array.from({ length: Math.ceil(vipTable.length / usersPerPage) }, (_, i) => (
                                        <li className="cursor-pointer" key={i}>
                                            <div
                                                onClick={() => paginate(i + 1)}
                                                className={`flex items-center justify-center px-2 h-8 ${currentPage === i + 1 ? ' text-[#BE317F]' : ''}`}
                                            >
                                                {i + 1}
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div
                                onClick={() => {
                                    if (currentPage < Math.ceil(vipTable.length / usersPerPage)) {
                                        paginate(currentPage + 1);
                                    }
                                }}
                                className={`w-12 cursor-pointer bg-black bg-opacity-80 h-12 border ml-2 border-[#BE317F] rounded-full flex justify-center items-center ${currentPage === Math.ceil(vipTable.length / usersPerPage) ? 'text-[#BE317F] opacity-50 cursor-not-allowed' : 'text-[#BE317F] hover:text-white'}`}
                            >
                                <Image src={Right} width={14.5} height={14.5} alt="icon" />
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    );
}
