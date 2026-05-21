"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Dashboard() {

  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentDate, setCurrentDate] = useState("")

  const router = useRouter()

  // DATE

  useEffect(() => {

    const today = new Date()

    const formattedDate = today.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    })

    setCurrentDate(formattedDate)

  }, [])

  // FETCH TODOS

  const fetchTodos = async () => {

    const token = localStorage.getItem("token")

    if (!token) {
      router.push("/signin")
      return
    }

    setLoading(true)

    try {

      const response = await fetch(
        "http://localhost:1337/api/todos?populate=*",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const data = await response.json()

      setTodos(data.data || [])

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  // CREATE TODO

  const createTodo = async () => {

    const token = localStorage.getItem("token")

    if (!title) {
      alert("Please enter a task")
      return
    }

    try {

      await fetch(
        "http://localhost:1337/api/todos",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            data: {
              title,
              isCompleted: false
            }
          })
        }
      )

      setTitle("")
      fetchTodos()

    } catch (error) {

      console.log(error)
    }
  }

  // DELETE TODO

  const deleteTodo = async (documentId) => {

    const token = localStorage.getItem("token")

    try {

      await fetch(
        `http://localhost:1337/api/todos/${documentId}`,
        {
          method: "DELETE",

          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      fetchTodos()

    } catch (error) {

      console.log(error)
    }
  }

  // TOGGLE TODO

  const toggleTodo = async (todo) => {

    const token = localStorage.getItem("token")

    try {

      await fetch(
        `http://localhost:1337/api/todos/${todo.documentId}`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            data: {
              isCompleted: !todo.isCompleted
            }
          })
        }
      )

      fetchTodos()

    } catch (error) {

      console.log(error)
    }
  }

  // LOGOUT

  const logout = () => {

    localStorage.removeItem("token")
    localStorage.removeItem("user")

    router.push("/signin")
  }

  // COUNTS

  const completedTodos = todos.filter(
    (todo) => todo.isCompleted
  ).length

  const pendingTodos = todos.filter(
    (todo) => !todo.isCompleted
  ).length

  useEffect(() => {
    fetchTodos()
  }, [])

  return (

    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 p-6 md:p-10">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[35px] shadow-2xl p-8 mb-8">

          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">

            {/* LEFT */}

            <div>

              <h1 className="text-5xl font-black text-purple-700 leading-tight">
                ✨ Todo Dashboard
              </h1>

              <p className="text-gray-600 mt-3 text-lg">
                Stay productive and organize your daily goals beautifully.
              </p>

              <p className="text-pink-500 mt-4 font-semibold">
                📅 {currentDate}
              </p>

            </div>

            {/* RIGHT */}

            <div className="flex flex-col items-center gap-4">

              <div className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 text-white p-6 rounded-3xl shadow-xl w-[260px]">

                <h2 className="text-2xl font-bold">
                  Welcome Back 👋
                </h2>

                <p className="mt-2 text-sm opacity-90">
                  Complete your tasks and achieve your goals today.
                </p>

              </div>

              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition-all hover:scale-105"
              >
                🚪 Logout
              </button>

            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid md:grid-cols-3 gap-6 mb-8">

          <div className="bg-gradient-to-r from-pink-500 to-pink-400 text-white p-7 rounded-3xl shadow-xl hover:scale-105 transition-all">

            <h2 className="text-lg font-semibold opacity-90">
              Total Tasks
            </h2>

            <p className="text-5xl font-black mt-4">
              {todos.length}
            </p>

          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-400 text-white p-7 rounded-3xl shadow-xl hover:scale-105 transition-all">

            <h2 className="text-lg font-semibold opacity-90">
              Completed
            </h2>

            <p className="text-5xl font-black mt-4">
              {completedTodos}
            </p>

          </div>

          <div className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white p-7 rounded-3xl shadow-xl hover:scale-105 transition-all">

            <h2 className="text-lg font-semibold opacity-90">
              Pending
            </h2>

            <p className="text-5xl font-black mt-4">
              {pendingTodos}
            </p>

          </div>

        </div>

        {/* ADD TASK */}

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[35px] shadow-2xl p-8 mb-8">

          <h2 className="text-3xl font-bold text-purple-700 mb-6">
            ➕ Add New Task
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              className="flex-1 border-2 border-purple-200 rounded-2xl p-5 bg-white text-black placeholder-gray-500 outline-none focus:ring-4 focus:ring-pink-200 focus:border-pink-400 transition-all"

              placeholder="Enter your new task..."

              value={title}

              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <button
              onClick={createTodo}

              className="bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-600 hover:scale-105 transition-all duration-300 text-white px-8 py-5 rounded-2xl shadow-xl font-bold text-lg"
            >
              🚀 Add Task
            </button>

          </div>

        </div>

        {/* TASK LIST */}

        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-[35px] shadow-2xl p-8">

          <div className="flex justify-between items-center mb-8">

            <h2 className="text-4xl font-black text-purple-700">
              📋 Your Tasks
            </h2>

            <p className="text-gray-500 font-medium">
              {todos.length} Tasks Available
            </p>

          </div>

          {/* LOADING */}

          {
            loading && (
              <div className="text-center py-12 text-2xl font-bold text-purple-600">
                Loading Tasks...
              </div>
            )
          }

          {/* EMPTY */}

          {
            !loading && todos.length === 0 && (

              <div className="text-center py-20">

                <div className="text-8xl mb-6">
                  🌸
                </div>

                <h2 className="text-4xl font-black text-purple-700">
                  No Tasks Yet
                </h2>

                <p className="text-gray-500 text-lg mt-4">
                  Add your first task and start your productive journey.
                </p>

              </div>
            )
          }

          {/* TODOS */}

          <div className="flex flex-col gap-6">

            {
              todos?.map((todo) => (

                <div
                  key={todo.documentId}

                  className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border border-purple-100 rounded-[30px] p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-[1.01] flex flex-col lg:flex-row justify-between items-center gap-5"
                >

                  {/* LEFT */}

                  <div className="flex-1">

                    <h3 className="text-2xl font-bold text-purple-700">
                      {todo.title}
                    </h3>

                    <p
                      className={
                        todo.isCompleted
                          ? "text-green-500 font-bold mt-3"
                          : "text-orange-500 font-bold mt-3"
                      }
                    >
                      {
                        todo.isCompleted
                          ? "✅ Completed Successfully"
                          : "⏳ Pending Task"
                      }
                    </p>

                  </div>

                  {/* BUTTONS */}

                  <div className="flex flex-wrap gap-3">

                    <button
                      onClick={() =>
                        toggleTodo(todo)
                      }

                      className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition-all hover:scale-105"
                    >
                      🔄 Toggle
                    </button>

                    <button
                      onClick={() =>
                        deleteTodo(todo.documentId)
                      }

                      className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-2xl shadow-lg font-semibold transition-all hover:scale-105"
                    >
                      🗑 Delete
                    </button>

                  </div>

                </div>

              ))
            }

          </div>

        </div>

      </div>

    </div>
  )
}