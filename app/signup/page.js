"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signup() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const handleSignup = async () => {

    try {

      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            username,
            email,
            password
          })
        }
      )

      const data = await response.json()

      console.log(data)

      if (data.jwt) {

        alert("🎉 Signup Successful")

        setUsername("")
        setEmail("")
        setPassword("")

      } else {

        alert(data.error.message)
      }

    } catch (error) {

      console.log(error)

      alert("Something went wrong")
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 flex justify-center items-center p-6">

      {/* MAIN CARD */}

      <div className="backdrop-blur-lg bg-white/80 border border-white/40 p-10 rounded-[35px] shadow-2xl w-full max-w-md">

        {/* TOP SECTION */}

        <div className="text-center mb-8">

          <div className="text-6xl mb-4">
            🌸
          </div>

          <h1 className="text-5xl font-extrabold text-purple-700">
            Signup
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Create your beautiful todo account ✨
          </p>

        </div>

        {/* FORM */}

        <div className="flex flex-col gap-5">

          {/* USERNAME */}

          <div>

            <label className="text-purple-700 font-semibold mb-2 block">
              Username
            </label>

            <input
              className="w-full border-2 border-purple-200 rounded-2xl p-4 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition-all bg-white text-black placeholder-gray-500"

              placeholder="Enter username"

              value={username}

              onChange={(e) =>
                setUsername(e.target.value)
              }
            />

          </div>

          {/* EMAIL */}

          <div>

            <label className="text-purple-700 font-semibold mb-2 block">
              Email Address
            </label>

            <input
              className="w-full border-2 border-purple-200 rounded-2xl p-4 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition-all bg-white text-black placeholder-gray-500"

              placeholder="Enter email"

              value={email}

              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          {/* PASSWORD */}

          <div>

            <label className="text-purple-700 font-semibold mb-2 block">
              Password
            </label>

            <input
              className="w-full border-2 border-purple-200 rounded-2xl p-4 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition-all bg-white text-black placeholder-gray-500"

              type="password"

              placeholder="Enter password"

              value={password}

              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <p className="text-sm text-gray-400 mt-2">
              Password should be secure 🔒
            </p>

          </div>

          {/* BUTTON */}

          <button
            className="mt-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:scale-105 hover:shadow-2xl transition-all duration-300 text-white p-4 rounded-2xl shadow-lg font-bold text-lg"

            onClick={handleSignup}
          >
            🚀 Create Account
          </button>

        </div>

        {/* FOOTER */}

        <div className="text-center mt-8">

          <p className="text-gray-500">
            Already have an account?
          </p>

          <button
            className="text-purple-600 font-bold mt-2 hover:text-pink-500 transition"

            onClick={() =>
              router.push("/signin")
            }
          >
            Login Here
          </button>
        </div>

      </div>

    </div>
  )
}