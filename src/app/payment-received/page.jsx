'use client'
import Layout from '@/components/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import Left from '../../../public/asset/images/left.png'
import Right from '../../../public/asset/images/right.png'
import Image from "next/image";

const Page = () => {
    const [walletData, setWalletData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 6;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                console.log(token, 'token');
                const response = await axios.get("https://nightlife.blownclouds.com/api/admin/getTransaction", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setWalletData(response.data);
                console.log(response.data, "userDetails");
            } catch (error) {
                console.error("Error fetching data:", error);
                setWalletData([]);
            }
        };

        fetchData();
    }, []);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = walletData?.data?.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Layout>
         
                <div className="pl-4 pt-10">
                <h1 className="text-[31.44px] heading font-extrabold">Payment Received</h1>
                <div className="lineColor 2xl:w-[40%] p-[2px]"></div>
            </div>
            <div className='min-w-[full] pt-6 relative max-w-[848.98px] mx-4 my-10 min-h-[697.91px] max-h-full  tremsAndCondition rounded-tr-[53.11px] rounded-br-[94.71px] '>
                
                <div className="px-4 m-4  rounded-t-2xl">
                    <div className="bg-black bg-opacity-80 h-[43.01px] userBorder rounded-3xl mt-2 my-1 p-2 flex items-center justify-between">
                        <div className="flex items-center justify-center w-[30%]">
                            <div className="pl-1 text-[#BE317F] text-[16.02px] font-bold">User</div>
                        </div>
                        <div className="flex items-center justify-center w-[30%]">
                            <div className="pl-1 text-[#BE317F] text-[16.02px] font-bold">Amount</div>
                        </div>
                        <div className="flex items-center justify-center w-[30%]">
                            <div className="pl-1 text-[#BE317F] text-[16.02px] font-bold">Status</div>
                        </div>
                        <div className="flex items-center justify-center w-[30%]">
                            <div className="pl-1 text-[#BE317F] text-[16.02px] font-bold">Date</div>
                        </div>
                    </div>

                    {
                        currentUsers && currentUsers.map((item, index) => {
                            return (
                                <div key={index} className="bg-black bg-opacity-80 userBorder rounded-3xl mt-2 my-1 p-2 flex items-center justify-between">
                                    <div className="flex justify-center border-r items-center w-[30%]">
                                        <div className="pl-1 ">
                                            {item?.userId?.fullName}
                                        </div>
                                    </div>
                                    <div className="flex justify-center border-r items-center w-[30%]">
                                        <div className="pl-1  ">{item?.ticketPrice}</div>
                                    </div>
                                    <div className="flex justify-center items-center w-[30%]">
                                        <div className="pl-1   ">{item?.transactionStatus}</div>
                                    </div>
                                    <div className="flex justify-center border-l items-center w-[30%]">
                                        <div className="pl-1 ">{format(new Date(item?.createdAt), 'd-MM-yyyy')}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
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
                        <nav aria-label="Page navigation example">
                            <ul className="inline-flex bg-black bg-opacity-80 -space-x-px  text-sm border px-4 py-2 border-[#BE317F] rounded-full">
                                {Array.from({ length: Math.ceil(walletData?.data?.length / usersPerPage) }, (_, i) => (
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
                                if (currentPage < Math.ceil(walletData?.data?.length / usersPerPage)) {
                                    paginate(currentPage + 1);
                                }
                            }}
                            className={`w-12 cursor-pointer bg-black bg-opacity-80 h-12 border ml-2 border-[#BE317F] rounded-full flex justify-center items-center ${currentPage === Math.ceil(walletData?.data?.length / usersPerPage) ? 'text-[#BE317F] opacity-50 cursor-not-allowed' : 'text-[#BE317F] hover:text-white'}`}
                        >
                            <Image src={Right} width={14.5} height={14.5} alt="icon" />
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Page;
