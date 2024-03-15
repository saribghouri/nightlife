'use client'
import Layout from '@/components/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [privacyPolicy, setPrivacyPolicy] = useState([]);
    const [updatedPolicy, setUpdatedPolicy] = useState("");
    const [isUpdating, setIsUpdating] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                const response = await axios.get(
                    "https://nightlife.blownclouds.com/api/admin/getPrivacyPolicy",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (Array.isArray(response?.data?.data)) {
                    setPrivacyPolicy(response.data.data);
                    setUpdatedPolicy(response.data.data[0]?.policy || ""); // Initialize updatedPolicy with the first privacy policy
                    console.log(response.data.data, "setPrivacyPolicy");
                } else {
                    setPrivacyPolicy([response.data.data]);
                    setUpdatedPolicy(response.data.data?.policy || ""); // Initialize updatedPolicy with the privacy policy
                    console.log([response.data.data], "setPrivacyPolicy");
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    const handlePrivacyAction = async () => {
        if (isUpdating) {
            try {
                const token = Cookies.get("apiToken");
                const response = await axios.patch(
                    "https://nightlife.blownclouds.com/api/admin/createPrivacyPolicy",
                    {
                        policy: updatedPolicy,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (Array.isArray(response?.data?.data)) {
                    setPrivacyPolicy(response.data.data);
                    console.log(response.data.data, "setPrivacyPolicy");
                } else {
                    setPrivacyPolicy([response.data.data]);
                    console.log([response.data.data], "setPrivacyPolicy");
                }
                setIsUpdating(false);
            } catch (error) {
                console.error("Error updating privacy policy:", error);
            }
        } else {
            setIsUpdating(true);
        }
    };

    return (
        <Layout>
            <div className="pl-4 pt-10">
                <h1 className="text-[31.44px] heading font-extrabold">Privacy Policy</h1>
                <div className="lineColor 2xl:w-[40%] p-[2px]"></div>
            </div>
            <div className='min-w-[full]  max-w-[860.85px] mx-4 my-10 min-h-[646.5px] max-h-full  tremsAndCondition rounded-tr-[53.11px] rounded-br-[94.71px] '>
                <textarea
                    className='min-w-[full]  rounded-tr-[53.11px] tremsAndCondition w-full outline-none overflow-y-scroll max-h-full min-h-[359.93px] text-[22px] p-6'
                    value={isUpdating ? updatedPolicy : privacyPolicy[0]?.policy || ""}
                    onChange={(e) => setUpdatedPolicy(e.target.value)}
                    readOnly={!isUpdating}
                />
                <button
                    onClick={handlePrivacyAction}
                    className="outline-none m-6 text-black font-bold text-[10.46px] btn border-none px-2 h-[31.34px]"
                    type="button"
                >
                    {isUpdating ? "Update Privacy Policy" : "Edit Privacy Policy"}
                </button>
            </div>
        </Layout>
    );
};

export default Page;
