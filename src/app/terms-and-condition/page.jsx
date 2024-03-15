'use client'
import Layout from '@/components/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [termData, setTermData] = useState([]);
    const [updatedTerms, setUpdatedTerms] = useState(""); // State for the updated terms
    const [isUpdating, setIsUpdating] = useState(false); // State to track if updating terms

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = Cookies.get("apiToken");
                const response = await axios.get(
                    "https://nightlife.blownclouds.com/api/admin/getTermsAndCondition",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response?.data?.data) {
                    let dataArray = response.data.data;
                    if (!Array.isArray(dataArray)) {
                        dataArray = [dataArray];
                    }
                    setTermData(dataArray);
                    setUpdatedTerms(dataArray[0]?.termsAndCondition || ""); // Initialize updatedTerms with the first terms and condition
                    console.log("Terms and conditions fetched:", dataArray);
                } else {
                    console.error("Data is not an array:", response?.data?.data);
                }
            } catch (error) {
                console.error("Error fetching terms and conditions:", error);
            }
        };

        fetchData();
    }, []);

    const handleTermsAction = async () => {
        if (isUpdating) {
            // Update terms
            try {
                const token = Cookies.get("apiToken");
                const response = await axios.patch(
                    "https://nightlife.blownclouds.com/api/admin/createTermsAndCondition",
                    {
                        termsAndCondition: updatedTerms,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (response?.data?.data) {
                    console.log("Terms and conditions updated:", response.data.data);
                    // Update the terms in the UI
                    setTermData([response.data.data]);
                    setIsUpdating(false); // Switch back to display mode
                } else {
                    console.error("Failed to update terms and conditions:", response?.data?.data);
                }
            } catch (error) {
                console.error("Error updating terms and conditions:", error);
            }
        } else {
            // Enable update mode
            setIsUpdating(true);
        }
    };

    return (
        <Layout>
            <div className="pl-4 pt-10">
                <h1 className="text-[31.44px] heading font-extrabold">Terms and Condition</h1>
                <div className="lineColor 2xl:w-[40%] p-[2px]"></div>
            </div>
            <div className='min-w-[full] max-w-[860.85px] mx-4 my-10 h-[646.5px]  tremsAndCondition rounded-tr-[53.11px] rounded-br-[94.71px] '>
                <textarea
                    className='min-w-[full] rounded-tr-[53.11px]  tremsAndCondition w-full outline-none overflow-y-scroll max-h-full min-h-[359.93px] text-[22px] p-6'
                    value={isUpdating ? updatedTerms : termData[0]?.termsAndCondition || ""}
                    onChange={(e) => setUpdatedTerms(e.target.value)}
                    readOnly={!isUpdating} // ReadOnly set based on isUpdating state
                />
                <button
                    onClick={handleTermsAction}
                    className="outline-none m-6 text-black font-bold text-[10.46px] btn border-none px-2 h-[31.34px]"
                    type="button"
                >
                    {isUpdating ? "Update Terms and Condition" : "Edit Terms and Condition"}
                </button>
            </div>
        </Layout>
    );
};

export default Page;

