"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signin(){

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")

  const router = useRouter()

  const handleLogin = async () => {

    const response = await fetch(
      "http://localhost:1337/api/auth/local",
      {
        method:"POST",

        headers:{
          "Content-Type":"application/json"
        },

        body: JSON.stringify({
          identifier: email,
          password
        })
      }
    )

    const data = await response.json()

    console.log(data)

    if(data.jwt){

      localStorage.setItem(
        "token",
        data.jwt
      )

      localStorage.setItem(
        "user",
        JSON.stringify(data.user)
      )

      alert("Login Successful")

      router.push("/dashboard")
    }

    else{
      alert("Invalid Credentials")
    }
  }

  return(

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 flex justify-center items-center">

      <div className="bg-white p-10 rounded-3xl shadow-2xl w-[400px]">

        {/* HEADING */}

        <h1 className="text-4xl font-bold text-center text-purple-600 mb-8">
           Login 
        </h1>

        {/* INPUTS */}

        <div className="flex flex-col gap-5">

          <input
            className="border-2 border-purple-200 rounded-2xl p-4 outline-none focus:border-pink-400"

            placeholder="Email"

            onChange={(e)=>
              setEmail(e.target.value)
            }
          />

          <input
            className="border-2 border-purple-200 rounded-2xl p-4 outline-none focus:border-pink-400"

            type="password"

            placeholder="Password"

            onChange={(e)=>
              setPassword(e.target.value)
            }
          />

          {/* BUTTON */}

          <button
            className="bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition text-white p-4 rounded-2xl shadow-lg font-bold"

            onClick={handleLogin}
          >
            Login
          </button>

        </div>

      </div>

    </div>
  )
}