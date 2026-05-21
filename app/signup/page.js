"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function Signup() {

  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSignup = async () => {

    if (!username || !email || !password) {
      alert("Please fill all fields")
      return
    }

    setLoading(true)

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

        router.push("/signin")

      } else {

        alert(data.error.message)
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

    <div className="min-h-screen bg-gradient-to-br from-slate-100 via-pink-100 to-purple-100 flex items-center justify-center p-6">

      <div className="w-full max-w-7xl grid lg:grid-cols-2 bg-white rounded-[40px] shadow-2xl overflow-hidden">

        {/* LEFT SIDE */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-600 text-white p-20 relative overflow-hidden">

          {/* BLUR CIRCLES */}

          <div className="absolute top-[-100px] right-[-100px] w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>

          <div className="absolute bottom-[-120px] left-[-120px] w-96 h-96 bg-pink-300/20 rounded-full blur-3xl"></div>

          <div className="absolute inset-0 bg-black/10"></div>

          {/* CONTENT */}

          <div className="relative z-10 max-w-xl">

            {/* HEADING */}

            <h1 className="text-7xl font-black leading-[90px] tracking-tight">

              Join Us
              <br />

              Today ✨

            </h1>

            {/* DESCRIPTION */}

            <p className="mt-8 text-xl leading-10 text-purple-100">

              Create your account and organize your daily tasks
              with a beautiful, secure, and modern productivity dashboard.

            </p>

            {/* FEATURE CARDS */}

            <div className="mt-14 flex gap-5">

              {/* CARD 1 */}

              <div className="backdrop-blur-xl bg-white/15 border border-white/20 px-8 py-6 rounded-3xl shadow-2xl min-w-[180px] hover:scale-105 transition-all duration-300">

                <h2 className="text-4xl font-extrabold">
                  Secure
                </h2>

                <p className="text-sm mt-3 text-purple-100">
                  Authentication
                </p>

              </div>

              {/* CARD 2 */}

              <div className="backdrop-blur-xl bg-white/15 border border-white/20 px-8 py-6 rounded-3xl shadow-2xl min-w-[180px] hover:scale-105 transition-all duration-300">

                <h2 className="text-4xl font-extrabold">
                  Smart
                </h2>

                <p className="text-sm mt-3 text-purple-100">
                  Productivity
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
              Create Account
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Signup to start managing your tasks beautifully
            </p>

          </div>

          {/* FORM */}

          <div className="flex flex-col gap-6">

            {/* USERNAME */}

            <div>

              <label className="text-gray-700 font-semibold block mb-3">
                Username
              </label>

              <input
                type="text"

                placeholder="Enter username"

                value={username}

                onChange={(e) =>
                  setUsername(e.target.value)
                }

                className="w-full border border-gray-300 rounded-2xl p-5 text-black placeholder-gray-400 outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all"
              />

            </div>

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

                placeholder="Create password"

                value={password}

                onChange={(e) =>
                  setPassword(e.target.value)
                }

                className="w-full border border-gray-300 rounded-2xl p-5 text-black placeholder-gray-400 outline-none focus:ring-4 focus:ring-indigo-200 focus:border-indigo-400 transition-all"
              />

              <p className="text-sm text-gray-400 mt-2">
                Use a strong password for better security 🔒
              </p>

            </div>

            {/* BUTTON */}

            <button
              onClick={handleSignup}

              className="mt-3 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:scale-[1.02] hover:shadow-2xl transition-all duration-300 text-white p-5 rounded-2xl shadow-xl font-bold text-lg"
            >

              {
                loading
                  ? "Creating Account..."
                  : "🚀 Create Account"
              }

            </button>

          </div>

          {/* FOOTER */}

          <div className="mt-10 text-center">

            <p className="text-gray-500">
              Already have an account?
            </p>

            <button
              onClick={() =>
                router.push("/signin")
              }

              className="mt-3 text-purple-600 font-bold hover:text-pink-500 transition-all"
            >
              Login Here
            </button>

          </div>

        </div>

      </div>

    </div>
  )
}