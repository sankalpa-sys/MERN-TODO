import Image from "next/image";
import React, { useEffect } from "react";
import {  signIn } from "next-auth/react"


function Login() {
  
    const handleSubmit = (e) => {
        e.preventDefault()
    }  
    
  return (
    <main>
      <div className="h-32 w-32 relative my-16 ml-32">
        <Image
          src={"/logo.png"}
          layout="fill"
          className="rounded-full object-cover "
        />
      </div>

      <div className="max-w-6xl mx-auto flex items-center justify-around py-2">
        <section className="w-1/2">
            <h1 className="text-3xl font-bold">Login</h1>
            <button onClick={() => signIn()} className="my-6 font-bold border border-gray-300 hover:bg-gray-100 transition-all duration-200 w-3/4 py-2 rounded-md">Continue with Google</button>


            <form onSubmit={handleSubmit} className="w-full space-y-3">
                <div className="flex flex-col border w-3/4 hover:cursor-auto  rounded-md py-1 px-2 space-y-1 border-gray-300 focus:shadow-lg">
                <label className="text-xs tracking-wide cursor-text" htmlFor="email">Email</label>
                <input className="outline-none  h-8 font-bold placeholder:font-normal text-sm" name="email" id="email" type="email" placeholder="Enter your email..." />
                </div>
                <div className="flex flex-col border w-3/4 rounded-md py-1 px-2 space-y-1 border-gray-300 focus:shadow-lg">
                <label className="text-xs tracking-wide cursor-text" htmlFor="email">Password</label>
                <input className="outline-none h-8 font-bold placeholder:font-normal text-sm" name="password" id="password" type="password" placeholder="Enter your password..." />
                </div>
                <button type="submit" className="bg-red-600 text-white text-lg font-semibold rounded-md w-3/4 h-10">Log in</button>
            </form>
            <p className="text-gray-500 text-xs my-4 underline">Fogot your password?</p>
            <p className="text-xs text-gray-500 w-3/4">By continuing with Google, or Email, you agree to <span className="underline cursor-pointer">Terms of Service</span> and <span className="underline cursor-pointer">Privacy Policy</span> of SN TODO</p>
            <p className="text-xs my-4 text-gray-500">Don’t have an account? <span className="cursor-pointer underline">Sign up</span></p>
        </section>

        <div className="h-60 w-[400px] relative">
            <Image layout="fill" src="https://d3ptyyxy2at9ui.cloudfront.net/assets/images/837999fd172057bfeba2887ff8c22a91.png" className="object-cover"/>
        </div>
      </div>
    </main>
  );
}

export default Login;
