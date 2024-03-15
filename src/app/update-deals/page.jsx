"use client"
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import axios from "axios";
import Cookies from "js-cookie";
import InputIcon from '../../../public/asset/images/inputIcon.png';
import Dollar from '../../../public/asset/images/dollar.png';
import Address from '../../../public/asset/images/address.png';
import QrCode from '../../../public/asset/images/qr-code.png';
import Ticket from '../../../public/asset/images/ticket.png';
import TicketPlus from '../../../public/asset/images/ticket-plus.png';

export default function Page() {
    // const router = useRouter();
    // const searchParams = useSearchParams();
    // const id = searchParams.get("id");
    const router = useRouter();
    const { id } = router.query;
    console.log(id, 'id');


    const [formData, setFormData] = useState({
        type: "",
        name: "",
        price: "",
        startDate: "",
        endDate: "",
        picture: "",
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                if (!id) {
                    console.error("id is null or undefined");
                    return;
                }

                const response = await axios.get(
                    `https://nightlife.blownclouds.com/api/user/getDetailsOfDeals`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const dealData = response.data.data;
                const matchedCampus = dealData.find((campus) => campus._id === id);
                console.log(matchedCampus, 'matchedCampus=====================');

                // Set form data with matched campus data
                if (matchedCampus) {
                    setFormData({
                        type: matchedCampus.type,
                        name: matchedCampus.name,
                        price: matchedCampus.price,
                        startDate: formatDate(matchedCampus.startDate),
                        endDate: formatDate(matchedCampus.endDate),
                        picture: matchedCampus.picture,
                    });
                }
            } catch (error) {
                console.error("Error fetching deal data:", error);
            }
        };

        fetchData();
    }, [id]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = date.toISOString().split("T")[0];
        return formattedDate;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get("apiToken");
            await axios.patch(
                `https://nightlife.blownclouds.com/api/admin/updateDeal/${id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            router.push("/dashboard");
        } catch (error) {
            console.error("Error updating campus data:", error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setFormData({ ...formData, picture: reader.result });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <Layout>
                <div className="pl-4 pt-10">
                    <h1 className="text-[31.44px] heading font-bold">
                        Update Club Details
                    </h1>
                    <div className="lineColor 2xl:w-[40%]  p-[2px]"></div>
                </div>
                <form onSubmit={handleSubmit} className="p-4 pt-10">
                    <div className="flex w-[100%]">
                        <div className="">
                            <div className="flex ">
                                <div className="relative mr-4">
                                    <input
                                        className="outline-none w-[307.09px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                        type="text"
                                        name="type"
                                        value={formData.type}
                                        onChange={handleChange}
                                        placeholder="Type"
                                    />
                                    <Image
                                        className="absolute left-3 top-[22px]"
                                        src={InputIcon}
                                        width={14.45}
                                        height={14.45}
                                        alt="icon"
                                    />
                                </div>
                                <div className="relative ml-4 ">
                                    <input
                                        className="outline-none w-[307.09px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Name"
                                    />
                                    <Image
                                        className="absolute left-3 top-[22px]"
                                        src={InputIcon}
                                        width={14.45}
                                        height={14.45}
                                        alt="icon"
                                    />
                                </div>
                            </div>
                            <div className="relative mt-4">
                                <input
                                    className="outline-none w-[647.31px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                    type="text"
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    placeholder="Price"
                                />
                                <Image
                                    className="absolute left-3 top-[22px]"
                                    src={Dollar}
                                    width={14.45}
                                    height={14.45}
                                    alt="icon"
                                />
                            </div>
                            <div className="relative mt-4">
                                <input
                                    className="outline-none w-[647.31px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                    type="date"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleChange}
                                    placeholder="Start Date"
                                />
                            </div>
                            <div className="relative mt-4">
                                <input
                                    className="outline-none w-[647.31px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                    type="date"
                                    name="endDate"
                                    value={formData.endDate}
                                    onChange={handleChange}
                                    placeholder="End Date"
                                />
                            </div>
                            <div className="relative mt-4">
                                <input
                                    className="outline-none w-[647.31px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                    type="file"
                                    name="picture"
                                    onChange={handleImageUpload}
                                    placeholder="Picture URL"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="pt-8 pl-2">
                        <button
                            type="submit"
                            className="outline-none text-black font-bold text-[10.46px] btn border-none w-[101.44px] h-[31.34px]"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </Layout>
        </>
    );
}

