'use client'
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import axios from "axios";
import Cookies from "js-cookie";
import InputIcon from '../../../public/asset/images/inputIcon.png';
import Dollar from '../../../public/asset/images/dollar.png';
import Address from '../../../public/asset/images/address.png';
import QrCode from '../../../public/asset/images/qr-code.png';
import Ticket from '../../../public/asset/images/ticket.png';
import TicketPlus from '../../../public/asset/images/ticket-plus.png';
import Map from "@/components/Map";

export default function Page() {
    const router = useRouter();
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
        venue: "",
        time: "",
        tickets: [], 
        latitude: 0,
        longitude: 0,
    });
    const [formErrors, setFormErrors] = useState({
        concertName: "",
        createdAt: "",
        address: "",
        entryPrice: "",
        noOfVipTables: "",
        atmoshphere: "",
        typeOfTickets: "",
        dressCode: "",
        music: "",
        venue: "",
        time: "",
    });

    const handleEndLocationSelect = (location) => {
        setFormData({ ...formData, latitude: location.lat, longitude: location.lng });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Perform validation before submitting
        if (validateForm()) {
            try {
                const token = Cookies.get("apiToken");

                const response = await axios.post(
                    "https://nightlife.blownclouds.com/api/admin/registerEvent",
                    {
                        concertName: formData.concertName,
                        createdAt: formData.createdAt,
                        address: formData.address,
                        picture: formData.picture,
                        dressCode: formData.dressCode,
                        noOfVipTables: formData.noOfVipTables,
                        tickets: [
                            {
                                typeOfTickets: formData.typeOfTickets,
                                price: formData.entryPrice,
                            }
                        ],
                        atmoshphere: formData.atmoshphere,
                        music: formData.music,
                        category: "BAR",
                        venue: formData.venue,
                        time: formData.time,
                        location: {
                            type: "Point",
                            coordinates: [formData.longitude, formData.latitude]
                        }
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                router.push("/bar");
            } catch (error) {
                console.error("Error registering event:", error.response?.data || error.message);
            }
        } else {
            console.log("Form has errors, please fix them before submitting.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setFormErrors({ ...formErrors, [name]: "" });
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const token = Cookies.get("apiToken");

            const response = await axios.post(
                "https://nightlife.blownclouds.com/api/cloudinary/UploadDocumentToCloudinaryAndGetPublicUrl",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            console.log("Image upload response:", response.data);

            if (response.data.image_url && response.data.image_url.length > 0) {
                console.log("Image URL:", response.data.image_url[0]);

                setFormData((prevFormData) => ({
                    ...prevFormData,
                    picture: response.data.image_url[0],
                }));
            } else {
                console.error("Image URL not found in the response");
            }
        } catch (error) {
            console.error("Error uploading image:", error.response?.data || error.message);
        }
    };


    const validateForm = () => {
        const errors = {};
        let isValid = true;

        if (!formData.concertName || !formData.concertName.trim()) {
            errors.concertName = "Concert Name is required";
            isValid = false;
        }

        if (!formData.createdAt || !formData.createdAt.trim()) {
            errors.createdAt = "Created At is required";
            isValid = false;
        }

        if (!formData.address || !formData.address.trim()) {
            errors.address = "Address is required";
            isValid = false;
        }

        if (!formData.entryPrice || !formData.entryPrice.trim()) {
            errors.entryPrice = "Entry Price is required";
            isValid = false;
        }

        if (!formData.noOfVipTables || !formData.noOfVipTables.trim()) {
            errors.noOfVipTables = "Number of VIP Tables is required";
            isValid = false;
        }

        if (!formData.atmoshphere || !formData.atmoshphere.trim()) {
            errors.atmoshphere = "Atmosphere is required";
            isValid = false;
        }

        if (!formData.typeOfTickets || !formData.typeOfTickets.trim()) {
            errors.typeOfTickets = "Type of Tickets is required";
            isValid = false;
        }

        if (!formData.dressCode || !formData.dressCode.trim()) {
            errors.dressCode = "Dress Code is required";
            isValid = false;
        }

        if (!formData.music || !formData.music.trim()) {
            errors.music = "Music is required";
            isValid = false;
        }

        if (!formData.venue || !formData.venue.trim()) {
            errors.venue = "Venue is required";
            isValid = false;
        }

        if (!formData.time || !formData.time.trim()) {
            errors.time = "Time is required";
            isValid = false;
        }

        setFormErrors(errors);
        return isValid;
    };

    return (
        <>
            <Layout>
                <div className="pl-4 pt-10">
                    <h1 className="text-[31.44px] heading font-bold">Add Bar Details</h1>
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
                                    {formErrors.concertName && <p className="text-red-500">{formErrors.concertName}</p>}
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
                                    {formErrors.entryPrice && <p className="text-red-500">{formErrors.entryPrice}</p>}
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
                                {formErrors.address && <p className="text-red-500">{formErrors.address}</p>}
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
                                    {formErrors.time && <p className="text-red-500">{formErrors.time}</p>}
                                </div>
                                <div className="relative ml-4">
                                    <input
                                        className="outline-none w-[307.09px] h-[56.52px] text-[12px] border-none px-8 rounded-full bg-white text-black placeholder:text-black"
                                        type="time"
                                        name="createdAt"
                                        value={formData.createdAt}
                                        onChange={handleChange}
                                        placeholder="Created At"
                                    />
                                    {formErrors.createdAt && <p className="text-red-500">{formErrors.createdAt}</p>}
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
                                    {formErrors.noOfVipTables && <p className="text-red-500">{formErrors.noOfVipTables}</p>}
                                    <Image
                                        className="absolute left-3 top-[22px]"
                                        src={TicketPlus}
                                        width={14.45}
                                        height={14.45}
                                        alt="icon"
                                    />
                                </div>
                                <div>
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
                                    {formErrors.atmoshphere && <p className="text-red-500 pl-4">{formErrors.atmoshphere}</p>}
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
                                    {formErrors.typeOfTickets && <p className="text-red-500">{formErrors.typeOfTickets}</p>}
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
                                    {formErrors.dressCode && <p className="text-red-500">{formErrors.dressCode}</p>}
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
                                    {formErrors.music && <p className="text-red-500">{formErrors.music}</p>}
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
                                <div className="relative ml-4">
                                    <input
                                        className="block outline-none  py-2 px-2 w-[307.09px] h-[56.52px] text-sm text-black rounded-full placeholder:text-black placeholder:pl-4  cursor-pointer bg-white"
                                        type="text"
                                        name="venue"
                                        value={formData.venue}
                                        onChange={handleChange}
                                        placeholder="venue"
                                    />
                                    {formErrors.venue && <p className="text-red-500">{formErrors.venue}</p>}
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
