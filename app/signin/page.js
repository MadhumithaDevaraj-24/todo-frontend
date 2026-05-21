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

      if (data.jwt) {

        localStorage.setItem(
          "token",
          data.jwt
        )

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        )

        router.push("/dashboard")

      } else {

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

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-100 to-pink-100 flex items-center justify-center p-6">

      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-600 text-white p-16 relative overflow-hidden">

          <div className="absolute top-0 left-0 w-full h-full bg-black/10"></div>

          <div className="relative z-10">

            <h1 className="text-6xl font-extrabold leading-tight">
              Welcome
              <br />
              Back 👋
            </h1>

            <p className="mt-6 text-lg text-purple-100 leading-8">
              Manage your tasks, organize your workflow,
              and boost your productivity with your
              modern Todo Dashboard.
            </p>

            <div className="mt-10 flex gap-4">

              <div className="bg-white/20 backdrop-blur-md px-5 py-4 rounded-2xl">
                <h2 className="text-3xl font-bold">
                  100%
                </h2>

                <p className="text-sm mt-1">
                  Productivity
                </p>
              </div>

              <div className="bg-white/20 backdrop-blur-md px-5 py-4 rounded-2xl">
                <h2 className="text-3xl font-bold">
                  24/7
                </h2>

                <p className="text-sm mt-1">
                  Access
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="p-8 md:p-14 flex flex-col justify-center">

          {/* TOP */}

          <div className="mb-10">

            <h2 className="text-5xl font-extrabold text-gray-800">
              Login
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Sign in to continue to your dashboard
            </p>

          </div>

          {/* FORM */}

          <div className="flex flex-col gap-6">

            {/* EMAIL */}

            <div>

              <label className="text-gray-700 font-semibold block mb-3">
                Email Address
              </label>

              <input
                type="email"

                placeholder="Enter your email"

                value={email}

                onChange={(e) =>
                  setEmail(e.target.value)
                }

                className="w-full border border-gray-300 rounded-2xl p-5 text-black placeholder-gray-400 outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
              />

            </div>

            {/* PASSWORD */}

            <div>

              <label className="text-gray-700 font-semibold block mb-3">
                Password
              </label>

              <input
                type="password"

                placeholder="Enter your password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                className="w-full border border-gray-300 rounded-2xl p-5 text-black placeholder-gray-400 outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all"
              />

            </div>

            {/* LOGIN BUTTON */}

            <button
              onClick={handleLogin}

              className="mt-3 bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 text-white p-5 rounded-2xl shadow-xl font-bold text-lg"
            >

              {
                loading
                  ? "Signing In..."
                  : "🚀 Login to Dashboard"
              }

            </button>

          </div>

          {/* FOOTER */}

          <div className="mt-10 text-center">

            <p className="text-gray-500">
              Don’t have an account?
            </p>

            <button
              onClick={() =>
                router.push("/signup")
              }

              className="mt-3 text-purple-600 font-bold hover:text-pink-500 transition-all"
            >
              Create New Account
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}