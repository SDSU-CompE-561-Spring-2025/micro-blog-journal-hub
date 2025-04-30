"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const endpoint = isLogin ? "login" : "register"

    try {
      const res = await fetch(`http://localhost:8000/${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      if (!res.ok) {
        throw new Error(`${isLogin ? "Login" : "Registration"} failed`)
      }

      const data = await res.json()
      if (isLogin) {
        console.log("Login success:", data)
        window.location.href = "/feed"
      } else {
        alert("Registration successful! You can now login.")
        setIsLogin(true)
      }
    } catch (err) {
      alert(`${isLogin ? "Login" : "Registration"} failed. Please try again.`)
      console.error(err)
    }
  }

  return (
    <Card className="bg-gray-200 rounded-lg">
      <CardContent className="pt-6">
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-gray-800">
              Username:
            </label>
            <Input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-800">
              Password:
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md"
              required
            />
          </div>
          <div className="pt-4 flex flex-col items-center space-y-4">
            <Button type="submit" className="w-32 bg-purple-600 hover:bg-purple-700 text-white rounded-full">
              {isLogin ? "Login" : "Register"}
            </Button>
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline text-sm"
            >
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
