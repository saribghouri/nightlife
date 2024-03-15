"use client"
import React, { useEffect, useState } from "react";
// import EditIcon from '../../../public/asset/images/edit-icon.png'
import Left from '../../../public/asset/images/left.png'
import Right from '../../../public/asset/images/right.png'
import Image from "next/image";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import Layout from "@/components/Layout";

export default function Page() {
    const router = useRouter();
    const [userData, setUserData] = useState([]);
    const [userDataCount, setUserDataCount] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                console.log(token, 'token');
                const response = await axios.get("https://nightlife.blownclouds.com/api/admin/getSupport", {
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
    const usersPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = userData.slice(indexOfFirstUser, indexOfLastUser);
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
            <Layout>
                <div className="pl-4 pt-10">
                    <div className="flex items-center justify-between w-[70%] 2xl:w-[30%]">
                        <h1 className="text-[31.44px] heading font-bold">Support Queries</h1>
                    </div>
                    <div className="lineColor 2xl:w-[40%] w-[90%] p-[2px]">
                    </div>
                </div>
                <div className="userTable relative pt-4 px-4 m-4 max-w-[780.33px] h-[571.59px]  rounded-t-2xl">
                    <div className="bg-black bg-opacity-80 h-[43.01px] userBorder rounded-3xl mt-2 my-1 p-2 flex items-center justify-between">
                        <div className="flex items-center justify-center w-[30%]">
                            <div className="pl-1 text-[#BE317F] text-[16.02px] font-bold">User</div>
                        </div>
                        <div className="flex items-center border-[#BE317F] px-6 text-[#BE317F] text-[16.02px] font-bold ">Email</div>
                        <div className="flex  items-center  w-[30%]">
                            <div className="pr-1 pl-4 text-[#BE317F] text-[16.02px] font-bold">Phone</div>
                        </div>
                    </div>
                    {
                        currentUsers?.slice(0, 6).map((item, index) => {
                            return (
                                <div key={index} className="bg-black bg-opacity-80 userBorder rounded-3xl mt-2 my-1 p-2 flex items-center justify-between">
                                    <div className="flex justify-center items-center w-[30%]">
                                        <div className="pl-1 ">{item?.fullName}</div>
                                    </div>
                                    <div className="border-r border-l border-[#BE317F] w-[35%] text-center px-6 ">{item?.email}</div>
                                    <div className="flex items-center justify-between w-[30%]">
                                        <div className="pr-1">{item?.reasonForContacting}</div>
                                        {/* <div className="border flex justify-center items-center cursor-pointer rounded-full w-8 h-8"><Image src={EditIcon} width={15.84} height={15.84} alt="logo" /></div> */}
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
                                    {Array.from({ length: Math.ceil(userData.length / usersPerPage) }, (_, i) => (
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
                                    if (currentPage < Math.ceil(userData.length / usersPerPage)) {
                                        paginate(currentPage + 1);
                                    }
                                }}
                                className={`w-12 cursor-pointer bg-black bg-opacity-80 h-12 border ml-2 border-[#BE317F] rounded-full flex justify-center items-center ${currentPage === Math.ceil(userData.length / usersPerPage) ? 'text-[#BE317F] opacity-50 cursor-not-allowed' : 'text-[#BE317F] hover:text-white'}`}
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