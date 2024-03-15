"use client"
import Layout from '@/components/Layout';
import React, { useEffect, useState } from 'react';
import walletIcon from "../../../public/asset/images/wallet.png";
import ArrowRight from "../../../public/asset/images/arrowRight.png";
import ReceiptIcon from "../../../public/asset/images/receipt.png";
import BookIcon from "../../../public/asset/images/book.png";
import Image from 'next/image';
import Cookies from 'js-cookie';
import axios from 'axios';
import { format } from 'date-fns';

const Page = () => {
    const [walletData, setWalletData] = useState([]);

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
                setWalletData([]); // Set empty array in case of error
            }
        };

        fetchData();
    }, []);



    return (
        <Layout>
            <div className="pl-4 pt-10">
                <h1 className="text-[31.44px] heading font-extrabold">Wallet</h1>
                <div className="lineColor 2xl:w-[40%] p-[2px]"></div>
            </div>
            <div className='p-4'>
                <div className='flex justify-between'>
                    <div className='w-[451.15px] h-[206.37px] md:mr-2 lg:mr-0 box-shadow flex rounded-3xl border border-[#BE317F]'>
                        <div className='flex items-center '>
                            <div className='w-[103.94px] h-[103.94px] ml-6  bg-[#BE317F] flex justify-center items-center rounded-full'>
                                <Image src={walletIcon} width={63.75} height={63.75} alt='icon' />
                            </div>
                            <div className='flex items-center pl-4 flex-col'>
                                <p className='text-[16.17px]'>Total Balance</p>
                                <p className='text-[43.38px]'>${walletData?.TotalBalance}</p>
                            </div>
                            <div className='flex justify-center items-center pt-6 pl-10'>
                                <Image src={ArrowRight} width={32.61} height={32.61} alt='icon' />
                            </div>
                        </div>
                    </div>

                    <div className='w-[451.15px] h-[206.37px] box-shadow flex rounded-3xl border border-[#BE317F]'>
                        <div className='flex items-center px-4 justify-around w-full '>
                            <div className='w-[151.97px] h-[51.53px] flex justify-center items-center box-shadow border border-[#BE317F] rounded-2xl'>
                                <div className='pr-2'><Image src={ReceiptIcon} width={24} height={24} alt='icon' /></div>
                                <div className='flex flex-col justify-center items-center pt-2'>
                                    <p className='text-[6.1px]'>Total Received</p>
                                    <p className='text-[25.43px]'>{walletData?.recievedTransactionCount}</p>
                                </div>
                            </div>
                            <div className='w-[151.97px] h-[51.53px] flex justify-center items-center box-shadow border border-[#BE317F] rounded-2xl'>
                                <div className='pr-2'><Image src={BookIcon} width={24} height={24} alt='icon' /></div>
                                <div className='flex flex-col justify-center items-center pt-2'>
                                    <p className='text-[6.1px]'>Payment Cancel</p>
                                    <p className='text-[25.43px]'>{walletData?.cancelledTransactionCount}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='min-w-[full] max-w-[860.85px] mx-4 my-10 min-h-[455.72px] max-h-full  tremsAndCondition rounded-tr-[53.11px] rounded-br-[94.71px] '>
                <div className="pt-6 px-10">
                    <h1 className="text-[31.44px] heading1 font-extrabold">Payment Received</h1>
                    <div className="lineColor 2xl:w-[40%] p-[2px]"></div>
                </div>
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
                        Array.isArray(walletData?.data) && walletData?.data.slice(0, 6).map((item, index) => {
                            return (
                                <div key={index} className="bg-black bg-opacity-80 userBorder rounded-3xl mt-2 my-1 p-2 flex items-center justify-between">
                                    <div className="flex justify-center border-r items-center w-[30%]">
                                        <div className="pl-1 ">{item?.userId?.fullName}</div>
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
            </div>
        </Layout>
    )
}

export default Page;
