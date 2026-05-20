import Link from "next/link"

export default function Home() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white gap-5">

      <h1 className="text-5xl font-bold">
        Todo App 🚀
      </h1>

      <p className="text-gray-400">
        Authentication + Dashboard Project
      </p>

      <div className="flex gap-4">

        <Link href="/signup">
          <button className="bg-pink-500 px-5 py-2 rounded-lg">
            Signup
          </button>
        </Link>

        <Link href="/signin">
          <button className="bg-blue-500 px-5 py-2 rounded-lg">
            Login
          </button>
        </Link>

      </div>

    </div>
  )
}