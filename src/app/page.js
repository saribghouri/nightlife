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
  const [showPassword, setShowPassword] = useState(false);
  console.log(token)
  const router = useRouter();


  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    <div className=" min-h-screen relative !w-[100%] max-h-full">
      <img className="absolute min-h-screen object-cover inset-0 w-full h-screen" src='/asset/images/loginBackgroundImage.png' alt="image" />
      {/* <ToastContainer /> */}
      <form className="flex flex-col inset-0 absolute w-full  justify-center items-center" onSubmit={handleSubmit}>
        <Image src={Logo} width={220} height={220} alt="logo" />
        <p className="text-[17.50px] text-white">Login to your Account </p>
        <input
          className="border w-[314.86px] h-[43.98px] outline-none py-2 px-4 rounded-full mt-4 text-[10px] bg-white text-black placeholder-gray-500"
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
         <div className="relative">
          <input
            className="border w-[314.86px] h-[43.98px] outline-none py-2 px-4 rounded-full mt-4 text-[10px] bg-white text-black placeholder-gray-500"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <div className="absolute right-5 top-7 cursor-pointer" onClick={handleTogglePasswordVisibility}>
            {showPassword ? (
              <svg aria-hidden="true" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            ) : (
              <svg aria-hidden="true" class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
            )}
          </div>
        </div>
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
