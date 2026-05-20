"use client"

import { useEffect, useState } from "react"

export default function Dashboard() {

  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")

  // FETCH TODOS
  const fetchTodos = async () => {

    const token = localStorage.getItem("token")

    if (!token) {
      return
    }

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
    }
  }

  // CREATE TODO
  const createTodo = async () => {

    const token = localStorage.getItem("token")

    if (!title) {
      alert("Enter Todo")
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

  useEffect(() => {
    fetchTodos()
  }, [])

  return (

  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-pink-100 to-purple-100 p-10">

    <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl p-8">

      {/* HEADER */}

      <h1 className="text-5xl font-bold text-center text-purple-600 mb-10">
         My Todo App 
      </h1>

      {/* INPUT SECTION */}

      <div className="flex gap-3 mb-8">

        <input
          className="flex-1 border-2 border-purple-200 rounded-2xl p-4 outline-none focus:border-pink-400 text-gray-700"

          placeholder="Enter your task..."

          value={title}

          onChange={(e)=>
            setTitle(e.target.value)
          }
        />

        <button
          className="bg-gradient-to-r from-pink-500 to-purple-500 hover:scale-105 transition text-white px-6 rounded-2xl shadow-lg"

          onClick={createTodo}
        >
          Add
        </button>

      </div>

      {/* TODOS */}

      <div className="flex flex-col gap-4">

        {
          todos?.map((todo)=>(

            <div
              key={todo.documentId}

              className="bg-gradient-to-r from-pink-50 to-purple-50 border border-purple-100 rounded-2xl p-5 shadow-md flex justify-between items-center hover:shadow-xl transition"
            >

              {/* LEFT */}

              <div>

                <p className="text-xl font-bold text-purple-700">
                  {todo.title}
                </p>

                <p
                  className={
                    todo.isCompleted
                    ? "text-green-500 font-semibold mt-1"
                    : "text-orange-500 font-semibold mt-1"
                  }
                >
                  {
                    todo.isCompleted
                    ? "✅ Completed"
                    : "⏳ Pending"
                  }
                </p>

              </div>

              {/* RIGHT */}

              <div className="flex gap-3">

                <button
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl shadow"

                  onClick={()=>
                    toggleTodo(todo)
                  }
                >
                  Toggle
                </button>

                <button
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl shadow"

                  onClick={()=>
                    deleteTodo(todo.documentId)
                  }
                >
                  Delete
                </button>

              </div>

            </div>

          ))
        }

      </div>

    </div>

  </div>
)
}