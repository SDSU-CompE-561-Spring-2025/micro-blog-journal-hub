"use client"
import { useState } from "react"

export function LoginForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("") // for registration
  const [isRegister, setIsRegister] = useState(false)
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const endpoint = isRegister ? "/register" : "/login"
    const payload = isRegister
      ? { username, password, email }
      : { username, password }

    try {
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.detail || "Something went wrong")
      setMessage(data.message)
    } catch (err: any) {
      setMessage(err.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-2 text-center">
        {isRegister ? "Create an Account" : "Log In"}
      </h2>

      <input
        className="w-full p-2 border rounded"
        type="text"
        placeholder="Username"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />

      {isRegister && (
        <input
          className="w-full p-2 border rounded"
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      )}

      <input
        className="w-full p-2 border rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        {isRegister ? "Sign Up" : "Log In"}
      </button>

      <button
        type="button"
        className="text-sm text-blue-500 underline mt-2 w-full text-center"
        onClick={() => {
          setIsRegister(!isRegister);
          setMessage("");
        }}
      >
        {isRegister ? "Already have an account? Log in" : "No account? Register"}
      </button>

      {message && (
        <p className="text-center mt-2 text-sm text-red-600">{message}</p>
      )}
    </form>
  )
}
