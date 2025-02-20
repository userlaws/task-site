"use client"

import { useState } from "react"
import TaskList from "../components/TaskList"
import Login from "../components/Login"

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLogin = (success: boolean) => {
    setIsAuthenticated(success)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600 p-8">
      {isAuthenticated ? (
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white mb-8 text-center">Creative Task List</h1>
          <TaskList />
        </div>
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </main>
  )
}

