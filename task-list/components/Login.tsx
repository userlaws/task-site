"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface LoginProps {
  onLogin: (success: boolean) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === "usernamehere" && password === "passwordhere") {
      onLogin(true)
    } else {
      setError("Invalid username or password")
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-400 to-indigo-600">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}

