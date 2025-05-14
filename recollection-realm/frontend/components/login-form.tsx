"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const res = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.detail || "Login failed")
        return
      }

      // Save token and redirect
      localStorage.setItem("token", data.access_token)
      window.location.href = "/"
    } catch (err) {
      setError("Login failed. Please try again.")
      console.error(err)
    }
  }

  return (
    <Card className="bg-gray-200 rounded-lg">
      <CardContent className="pt-6">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-800">Email:</label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-800">Password:</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-600 text-center">{error}</p>}
          <div className="pt-4 flex flex-col items-center space-y-4">
            <Button
              type="submit"
              className="w-32 bg-purple-600 hover:bg-purple-700 text-white rounded-full"
            >
              Login
            </Button>
            <a href="/register" className="text-blue-600 hover:underline text-sm">
              Don't have an account? Register
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
