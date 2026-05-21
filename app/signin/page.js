"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signin() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleLogin = async () => {

    if (!email || !password) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

    try {

      const response = await fetch(
        "http://localhost:1337/api/auth/local",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            identifier: email,
            password
          })
        }
      )

      const data = await response.json()

      console.log(data)

      if (data.jwt) {

        localStorage.setItem(
          "token",
          data.jwt
        )

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        )

        alert("🎉 Login Successful")

        router.push("/dashboard")
      }

      else {

        alert("Invalid Credentials")
      }

    } catch (error) {

      console.log(error)

      alert("Something went wrong")
    }

    finally {

      setLoading(false)
    }
  }

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 flex justify-center items-center p-6">

      {/* MAIN CARD */}

      <div className="backdrop-blur-lg bg-white/80 border border-white/40 p-10 rounded-[35px] shadow-2xl w-full max-w-md">

        {/* TOP SECTION */}

        <div className="text-center mb-8">

          <div className="text-6xl mb-4">
            💜
          </div>

          <h1 className="text-5xl font-extrabold text-purple-700">
            Welcome Back
          </h1>

          <p className="text-gray-500 mt-3 text-lg">
            Login to continue managing your tasks ✨
          </p>

        </div>

        {/* INPUTS */}

        <div className="flex flex-col gap-5">

          {/* EMAIL */}

          <div>

            <label className="text-purple-700 font-semibold mb-2 block">
              Email Address
            </label>

            <input
              className="w-full border-2 border-purple-200 rounded-2xl p-4 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition-all bg-white text-black placeholder-gray-500"

              placeholder="Enter your email"

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

              placeholder="Enter your password"

              value={password}

              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          {/* BUTTON */}

          <button
            className="mt-3 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:scale-105 hover:shadow-2xl transition-all duration-300 text-white p-4 rounded-2xl shadow-lg font-bold text-lg"

            onClick={handleLogin}
          >

            {
              loading
                ? "Logging In..."
                : "🚀 Login"
            }

          </button>

        </div>

        {/* FOOTER */}

        <div className="text-center mt-8">

          <p className="text-gray-500">
            Don’t have an account?
          </p>

          <button
            className="text-purple-600 font-bold mt-2 hover:text-pink-500 transition"

            onClick={() =>
              router.push("/signup")
            }
          >
            Create Account
          </button>

        </div>

      </div>

    </div>
  )
}