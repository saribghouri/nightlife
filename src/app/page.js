'use client'
import Image from "next/image";
import { useRouter } from 'next/navigation';
import Logo from '../../public/asset/images/logo.png'
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";


function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const token = Cookies.get("apiToken");
  console.log(token)
  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors({ ...errors, email: '' });
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors({ ...errors, password: '' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (email.trim() === '') {
      newErrors.email = 'Email is required';
    }
    if (password.trim() === '') {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await axios.post('https://nightlife.blownclouds.com/api/auth/login', {
          email,
          password
        });
        console.log('Login Successful:', response.data.data.token);
        Cookies.set("apiToken", response.data.data.token);
        router.push('/dashboard');
      } catch (error) {
        console.error('Login Error:', error?.response?.data?.data);
        // toast.error(error?.response?.data?.data);
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div className="backGroundImage min-h-screen max-h-full">
      {/* <ToastContainer /> */}
      <form className="flex flex-col justify-center items-center" onSubmit={handleSubmit}>
        <Image src={Logo} width={'358.99px'} height={'353.81px'} alt="logo" />
        <p className="text-[17.50px] text-white">Login to your Account </p>
        <input
          className="border w-[314.86px] h-[43.98px] outline-none py-2 px-4 rounded-full mt-4 text-[10px] bg-white text-black placeholder-gray-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        <input
          className="border w-[314.86px] h-[43.98px] outline-none py-2 px-4 rounded-full mt-4 text-[10px] bg-white text-black placeholder-gray-500"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
        <button
          type="submit"
          className="bg-[#DA569E] outline-none w-[314.86px] h-[43.98px] rounded-full mt-4 text-[15.83px] py-2 px-2 text-white hover:bg-[#a74179]"
        >
          Sign in
        </button>
        <div className="flex pt-10 pb-4">
          <p className="text-[13px] text-white">Don’t have an account? </p>
          <span className="text-[13px] pl-1 cursor-pointer text-[#DA569E]"> Sign Up</span>
        </div>
      </form>
    </div>
  );
}

export default LoginForm;
