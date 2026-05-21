
"use client"

import { useEffect, useState } from "react"

export default function Dashboard() {

  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")
  const [loading, setLoading] = useState(false)
  const [currentDate, setCurrentDate] = useState("")

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

      console.log("FETCH TODOS:", data)

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

      const response = await fetch(
        "http://localhost:1337/api/todos",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },

          body: JSON.stringify({
            data: {
              title: title,
              isCompleted: false
            }
          })
        }
      )

      const data = await response.json()

      console.log("CREATE TODO:", data)

      fetchTodos()

      setTitle("")

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

      {/* MAIN CONTAINER */}

      <div className="max-w-5xl mx-auto">

        {/* TOP HEADER */}

        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border border-pink-100">

          <div className="flex flex-col md:flex-row justify-between items-center gap-5">

            <div>

              <h1 className="text-5xl font-extrabold text-purple-700 mb-2">
                🌸 My Todo Dashboard
              </h1>

              <p className="text-gray-500 text-lg">
                Organize your daily tasks beautifully and stay productive.
              </p>

              <p className="text-pink-500 mt-3 font-semibold">
                📅 {currentDate}
              </p>

            </div>

            {/* PROFILE CARD */}

            <div className="bg-gradient-to-r from-pink-500 to-purple-500 text-white p-5 rounded-2xl shadow-lg text-center w-60">

              <h2 className="text-2xl font-bold">
                Welcome Back 👋
              </h2>

              <p className="mt-2 text-sm opacity-90">
                Stay focused and complete your goals today.
              </p>

            </div>

          </div>

        </div>

        {/* STATS SECTION */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

          <div className="bg-white p-6 rounded-3xl shadow-lg border-l-8 border-pink-400">

            <h2 className="text-gray-500 text-lg font-semibold">
              Total Tasks
            </h2>

            <p className="text-4xl font-extrabold text-purple-600 mt-3">
              {todos.length}
            </p>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg border-l-8 border-green-400">

            <h2 className="text-gray-500 text-lg font-semibold">
              Completed
            </h2>

            <p className="text-4xl font-extrabold text-green-500 mt-3">
              {completedTodos}
            </p>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow-lg border-l-8 border-orange-400">

            <h2 className="text-gray-500 text-lg font-semibold">
              Pending
            </h2>

            <p className="text-4xl font-extrabold text-orange-500 mt-3">
              {pendingTodos}
            </p>

          </div>

        </div>

        {/* INPUT SECTION */}

        <div className="bg-white rounded-3xl shadow-xl p-6 mb-8">

          <h2 className="text-2xl font-bold text-purple-700 mb-5">
            ✨ Add New Task
          </h2>

          <div className="flex flex-col md:flex-row gap-4">

            <input
              className="w-full border-2 border-purple-200 rounded-2xl p-4 outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-200 transition-all bg-white text-black placeholder-gray-500"

              placeholder="Enter your task here..."

              value={title}

              onChange={(e) =>
                setTitle(e.target.value)
              }
            />

            <button
              className="bg-gradient-to-r from-pink-500 to-purple-600 hover:scale-105 transition-all duration-300 text-white px-8 py-4 rounded-2xl shadow-lg font-bold text-lg"

              onClick={createTodo}
            >
              ➕ Add Task
            </button>

          </div>

        </div>

        {/* TASK LIST */}

        <div className="bg-white rounded-3xl shadow-2xl p-8">

          <div className="flex items-center justify-between mb-6">

            <h2 className="text-3xl font-bold text-purple-700">
              📋 Your Tasks
            </h2>

            <p className="text-gray-500 font-medium">
              Manage all your daily activities efficiently.
            </p>

          </div>

          {/* LOADING */}

          {
            loading && (
              <div className="text-center py-10 text-purple-600 text-xl font-semibold">
                Loading Tasks...
              </div>
            )
          }

          {/* EMPTY STATE */}

          {
            !loading && todos.length === 0 && (
              <div className="text-center py-16">

                <div className="text-7xl mb-4">
                  📝
                </div>

                <h2 className="text-3xl font-bold text-purple-600 mb-3">
                  No Tasks Added Yet
                </h2>

                <p className="text-gray-500 text-lg">
                  Start by adding your first task above.
                </p>

              </div>
            )
          }

          {/* TODOS */}

          <div className="flex flex-col gap-5">

            {
              todos?.map((todo) => (

                <div
                  key={todo.documentId}

                  className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 border border-purple-100 rounded-3xl p-6 shadow-md flex flex-col md:flex-row justify-between items-center gap-5 hover:shadow-2xl transition-all duration-300"
                >

                  {/* LEFT */}

                  <div className="flex-1">

                    <h3 className="text-2xl font-bold text-purple-700 mb-2">
                      {todo.title}
                    </h3>

                    <p
                      className={
                        todo.isCompleted
                          ? "text-green-500 font-bold text-lg"
                          : "text-orange-500 font-bold text-lg"
                      }
                    >
                      {
                        todo.isCompleted
                          ? "✅ Task Completed Successfully"
                          : "⏳ Task Pending"
                      }
                    </p>

                  </div>

                  {/* RIGHT BUTTONS */}

                  <div className="flex flex-wrap gap-3">

                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-2xl shadow-lg font-semibold transition-all duration-300 hover:scale-105"

                      onClick={() =>
                        toggleTodo(todo)
                      }
                    >
                      🔄 Toggle
                    </button>

                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-2xl shadow-lg font-semibold transition-all duration-300 hover:scale-105"

                      onClick={() =>
                        deleteTodo(todo.documentId)
                      }
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
