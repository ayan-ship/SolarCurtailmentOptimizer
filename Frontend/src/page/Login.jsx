import { KeySquare } from 'lucide-react'
import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { getBackendURL } from '../utils/apiConfig'

const Login = () => {

  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const formSubmitted = async (e)=>{
    e.preventDefault();
    const backendURL = getBackendURL();
    const response =  await fetch(`${backendURL}/auth/login` ,{
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if(response.ok){
      navigate('/dashboard')
    }else{
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0B1120] flex items-center justify-center font-sans p-4 relative overflow-hidden text-white">

      {/* Subtle background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#10B981]/5 blur-[120px] rounded-full pointer-events-none"></div>

      {/* Login Form */}
      <form onSubmit={(e) => formSubmitted(e)} className="w-full max-w-md bg-[#111827] border border-gray-800/80 rounded-2xl shadow-2xl p-8 relative z-10 flex flex-col">

        {/* Header Area */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 bg-[#064E3B]/30 border border-[#10B981]/30 rounded-xl flex items-center justify-center mb-5">
            <KeySquare size={28} className="text-[#34D399]" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">Welcome Back</h2>
          <p className="text-gray-400 text-sm mt-2">Sign in to your Dashboard</p>
        </div>

        {/* Email Input */}
        <div className="flex flex-col mb-5">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Username
          </label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="text"
            placeholder="your@email.com"
            className="w-full bg-[#0B1120] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399]/50 transition-all"
            required
          />
        </div>

        {/* Password Input */}
        <div className="flex flex-col mb-8">
          <label className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
            Password
          </label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            className="w-full bg-[#0B1120] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#34D399] focus:ring-1 focus:ring-[#34D399]/50 transition-all"
            required
          />
        </div>

        {/* Sign In Button */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#064E3B]/40 border border-[#10B981]/50 text-[#34D399] font-medium rounded-lg hover:bg-[#064E3B]/60 transition-colors duration-200"
        >
          Sign In
        </button>

      </form>
    </div>
  )
}

export default Login