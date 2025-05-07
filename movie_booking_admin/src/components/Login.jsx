import React, { useContext, useState } from 'react';
import { Url } from './Url';
import { AuthStore } from '../store/AuthProvider';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [toast,setToast]=useState("");
  const{userData,setUserData}=useContext(AuthStore)
  const navigate=useNavigate()

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault()

     fetch(`${Url}/user/login`,{
        method:"POST",
        body:JSON.stringify(formData),
        headers:{
            "Content-Type":"application/json"
        }
     }).then((res)=>{
        if(!res.ok){
            throw new Error("invalid crediantial")
        }
        return res.json();
     }).then((res)=>{

        localStorage.setItem("userInfo",JSON.stringify(res));
        setUserData(res);
        setToast("Login Success");
        setTimeout(()=>{
            setToast("")
            navigate("/")
            window.location.reload()

        },1000)
     }).catch((res)=>{
        setToast("Invalid credential")
        setTimeout(()=>{
            setToast("")
           

        },1500)
     })
    
  };
console.log(userData)
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
{toast && (
  <div className="fixed top-5 right-5 bg-gray-800 text-white px-4 py-2 rounded shadow-md">
    {toast}
  </div>
)}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md focus:outline-none focus:ring focus:border-blue-300"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};


