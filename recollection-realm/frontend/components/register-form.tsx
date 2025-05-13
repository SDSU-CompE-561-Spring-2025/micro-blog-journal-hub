"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"

export function RegisterForm() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [usernameError, setUsernameError] = useState("")
  const [emailError, setEmailError] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [confirmError, setConfirmError] = useState("")
  const [submitError, setSubmitError] = useState("")
  const [submitSuccess, setSubmitSuccess] = useState("")

  const validateUsername = (username: string) => {
    const isValidLength = username.length >= 4
    const noSpecialChars = /^[a-zA-Z][a-zA-Z0-9_]*$/.test(username)
    const doesNotStartWithNumber = /^[^0-9]/.test(username)
    return isValidLength && noSpecialChars && doesNotStartWithNumber
  }

  const validateEmail = (email: string) => {
    return /^[a-zA-Z0-9]/.test(email)
  }

  const validatePassword = (password: string) => {
    const isValidLength = password.length >= 5
    const hasAlpha = /[a-zA-Z]/.test(password)
    const hasNumber = /[0-9]/.test(password)
    return isValidLength && hasAlpha && hasNumber
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Reset all error messages
    setUsernameError("")
    setEmailError("")
    setPasswordError("")
    setConfirmError("")
    setSubmitError("")
    setSubmitSuccess("")

    let valid = true

    if (!validateUsername(username)) {
      setUsernameError("Username must be at least 4 characters, start with a letter, and contain no special characters.")
      valid = false
    }

    if (!validateEmail(email)) {
      setEmailError("Email cannot start with special characters.")
      valid = false
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be at least 5 characters and contain at least one letter and number.")
      valid = false
    }

    if (password !== confirmPassword) {
      setConfirmError("Passwords do not match.")
      valid = false
    }

    if (!valid) return

    try {
      const res = await fetch("http://localhost:8000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: username, email, password }),
      })

      if (res.status === 409) {
        setUsernameError("Username already taken. Please choose another.")
        return
      }

      if (!res.ok) {
        throw new Error("Registration failed")
      }

      setSubmitSuccess("Registration successful!")
      setTimeout(() => {
        window.location.href = "/"
      }, 2000)
    } catch (err) {
      console.error(err)
      setSubmitError("Registration failed. Please try again.")
    }
  }

  return (
    <Card className="bg-gray-200 rounded-lg">
      <CardContent className="pt-6">
        <h2 className="text-3xl font-bold text-center mb-6">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="username" className="block text-gray-800">Username:</label>
            <Input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
            {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-800">Email:</label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-800">Password:</label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm-password" className="block text-gray-800">Confirm Password:</label>
            <Input id="confirm-password" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
            {confirmError && <p className="text-red-500 text-sm">{confirmError}</p>}
          </div>
          {submitError && <p className="text-red-500 text-sm text-center">{submitError}</p>}
          {submitSuccess && <p className="text-green-600 text-sm text-center">{submitSuccess}</p>}
          <div className="pt-4 flex flex-col items-center space-y-4">
            <Button type="submit" className="w-32 bg-purple-600 hover:bg-purple-700 text-white rounded-full">Create</Button>
            <a href="/login" className="text-blue-600 hover:underline text-sm">Already have an account? Login</a>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
