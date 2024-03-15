"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Layout from "@/components/Layout";
import axios from "axios";
import Cookies from "js-cookie";
import InputIcon from '../../../public/asset/images/inputIcon.png';
import Dollar from '../../../public/asset/images/dollar.png';
import Address from '../../../public/asset/images/address.png';
import Clock from '../../../public/asset/images/clock.png';
import QrCode from '../../../public/asset/images/qr-code.png';
import ImageUpload from '../../../public/asset/images/imageUpload.png';
import Ticket from '../../../public/asset/images/ticket.png';
import TicketPlus from '../../../public/asset/images/ticket-plus.png';
import Map from "@/components/Map";

export default function Page() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const campusId = searchParams.get("id");

    const [formData, setFormData] = useState({
        concertName: "",
        createdAt: "",
        address: "",
        picture: "",
        dressCode: "",
        noOfVipTables: "",
        typeOfTickets: "",
        entryPrice: "",
        atmoshphere: "",
        music: "",
        category: "",
        venue: "",
        time: "",
        tickets: [],
        latitude: 0,
        longitude: 0,
    });
    const [endLocation, setEndLocation] = useState(null);

    const handleEndLocationSelect = (location) => {
        setEndLocation(location);
        console.log(location, 'location');
    };

    useEffect(() => {
        if (campusId) {
            const fetchData = async () => {
                try {
                    const token = Cookies.get("apiToken");
                    const response = await axios.get(
                        `https://nightlife.blownclouds.com/api/user/getBar`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    const campuses = response.data.data;
                    const matchedCampus = campuses.find((campus) => campus._id === campusId);
                    if (matchedCampus) {
                        setFormData({
                            concertName: matchedCampus.concertName,
                            createdAt: matchedCampus.createdAt,
                            address: matchedCampus.address,
                            picture: matchedCampus.picture,
                            dressCode: matchedCampus.dressCode,
                            noOfVipTables: matchedCampus.noOfVipTables,
                            typeOfTickets: matchedCampus.tickets[0].typeOfTickets,
                            entryPrice: matchedCampus.tickets[0].price,
                            atmoshphere: matchedCampus.atmoshphere,
                            music: matchedCampus.music,
                            category: matchedCampus.category,
                            venue: matchedCampus.venue,
                            time: matchedCampus.time,
                            tickets: matchedCampus.tickets,
                            location: {
                                type: "Point",
                                coordinates: [formData.longitude, formData.latitude]
                            }
                        });
                    }
                } catch (error) {
                    console.error("Error fetching campus data:", error);
                }
            };
            fetchData();
        }
    }, [campusId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = Cookies.get("apiToken");
            await axios.patch(
                `https://nightlife.blownclouds.com/api/admin/updateEvent/${campusId}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            router.push("/bar");
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
    const formatTime = (time) => {
        const date = new Date(time);
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <>
            <Layout>
                <div className="pl-4 pt-10">
                    <h1 className="text-[31.44px] heading font-bold">
                        Update Bar Details
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
                                        name="concertName"
                                        value={formData.concertName}
                                        onChange={handleChange}
                                        placeholder="Concert Name"
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
                                        name="entryPrice"
                                        value={formData.entryPrice}
                                        onChange={handleChange}
                                        placeholder="Entry Price"
                                    />
                                    <Image
                                        className="absolute left-3 top-[22px]"
                                        src={Dollar}
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
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Address"
                                />
                                <Image
                                    className="absolute left-3 top-[22px]"
                                    src={Address}
                                    width={14.45}
                                    height={14.45}
                                    alt="icon"
                                />
                            </div>
                            <div className="flex mt-4">
                                <div className="relative mr-4">
                                    <input
                                        className="outline-none w-[307.09px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                        type="date"
                                        name="time"
                                        value={formData.time}
                                        onChange={handleChange}
                                        placeholder="Time"
                                    />
                                </div>
                                <div className="relative ml-4">
                                    <input
                                        className="outline-none w-[307.09px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                        type="time"
                                        name="createdAt"
                                        value={formatTime(formData.createdAt)}
                                        onChange={handleChange}
                                        placeholder="Created At"
                                    />
                                    {/* <Image className="absolute left-3 top-[22px]" src={Clock} width={14.45} height={14.45} alt="icon" /> */}
                                </div>
                            </div>
                            <div className="flex mt-4">
                                <div className="relative mr-4">
                                    <input
                                        className="outline-none w-[307.09px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                        type="text"
                                        name="noOfVipTables"
                                        value={formData.noOfVipTables}
                                        onChange={handleChange}
                                        placeholder="No. of Vip Tables"
                                    />
                                    <Image
                                        className="absolute left-3 top-[22px]"
                                        src={TicketPlus}
                                        width={14.45}
                                        height={14.45}
                                        alt="icon"
                                    />
                                </div>
                                <div className="relative flex items-center  ml-4">
                                    <div className="w-[51.37px] px-4 h-[56.52px] flex flex-col justify-center items-center rounded-2xl text-black bg-white">
                                        <p className="text-[8.1px]">Social</p>
                                        <p className="text-[8.1px]">&</p>
                                        <p className="text-[8.1px]">Chill</p>
                                    </div>
                                    <input
                                        className="custom-range outline-none w-[199.28px] h-[4.86px] text-[12px] border-none bg-white text-black placeholder:text-black"
                                        min="1"
                                        max="10"
                                        type="range"
                                        name="atmoshphere"
                                        value={formData.atmoshphere}
                                        onChange={handleChange}
                                    />
                                    <div className="w-[51.37px] px-4 h-[56.52px] flex flex-col justify-center items-center rounded-2xl text-[#DC4A9B] bg-white">
                                        <p className="text-[8.1px]">Active</p>
                                        <p className="text-[8.1px]">&</p>
                                        <p className="text-[8.1px]">Loud</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex mt-4">
                                <div className="relative mr-4">
                                    <input
                                        className="outline-none w-[307.09px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                        type="text"
                                        name="typeOfTickets"
                                        value={formData.typeOfTickets}
                                        onChange={handleChange}
                                        placeholder="Type of Tickets"
                                    />
                                    <Image
                                        className="absolute left-3 top-[22px]"
                                        src={Ticket}
                                        width={14.45}
                                        height={14.45}
                                        alt="icon"
                                    />
                                </div>
                                <div className="relative ml-4">
                                    <input
                                        className="outline-none w-[307.09px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                        type="text"
                                        name="dressCode"
                                        value={formData.dressCode}
                                        onChange={handleChange}
                                        placeholder="Dress Code"
                                    />
                                    <Image
                                        className="absolute left-3 top-[22px]"
                                        src={QrCode}
                                        width={14.45}
                                        height={14.45}
                                        alt="icon"
                                    />
                                </div>
                            </div>
                            <div className="flex mt-4">
                                <div className="relative mr-4">
                                    <input
                                        className="block outline-none py-2 px-2 w-[307.09px] h-[56.52px] text-sm text-black rounded-full placeholder:text-black placeholder:pl-4  cursor-pointer bg-white"
                                        type="text"
                                        name="music"
                                        value={formData.music}
                                        onChange={handleChange}
                                        placeholder="Music"
                                    />
                                </div>
                                <div className="relative ml-4">
                                    <input
                                        className="block py-2 px-2 w-[307.09px] h-[56.52px] text-sm text-gray-900 rounded-full cursor-pointer bg-gray-50"
                                        type="file"
                                        name="picture"
                                        onChange={handleImageUpload}
                                        placeholder="Picture"
                                    />
                                </div>
                            </div>
                            <div className="flex mt-4">
                                <div className="relative mr-4">
                                    <input
                                        className="block outline-none py-2 px-2 w-[307.09px] h-[56.52px] text-sm text-black rounded-full placeholder:text-black placeholder:pl-4  cursor-pointer bg-white"
                                        type="text"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        placeholder="category"
                                    />
                                </div>
                                <div className="relative ml-4">
                                    <input
                                        className="block outline-none  py-2 px-2 w-[307.09px] h-[56.52px] text-sm text-black rounded-full placeholder:text-black placeholder:pl-4  cursor-pointer bg-white"
                                        type="text"
                                        name="venue"
                                        value={formData.venue}
                                        onChange={handleChange}
                                        placeholder="venue"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="w-[50%] hidden xl:block px-4">
                            <Map startLocation={{ lat: 40.7128, lng: -74.006 }} onEndLocationSelect={handleEndLocationSelect} />
                        </div>
                    </div>
                    <div className="flex xl:hidden flex-row-reverse">
                        <div className="w-[70%]  pt-4  px-4">
                            <Map startLocation={{ lat: 40.7128, lng: -74.006 }} onEndLocationSelect={handleEndLocationSelect} />
                        </div>
                        <div className="pt-8 pl-2 w-[30%]">
                            <button
                                type="submit"
                                className="outline-none text-black font-bold text-[10.46px] btn border-none w-[101.44px] h-[31.34px]"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                    <div className="pt-8 hidden xl:block pl-2">
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