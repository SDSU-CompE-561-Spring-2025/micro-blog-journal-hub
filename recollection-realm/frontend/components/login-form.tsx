"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Assuming you have a Label component

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";
const WHATS_NEW_PAGE_PATH = "/whats-new"; // Corrected path

export function LoginForm() {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState(""); // For registration
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (isLoginMode) {
      // --- LOGIN ---
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/token`, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formData.toString(),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Login failed. Please check your credentials.");
        }

        if (data.access_token) {
          localStorage.setItem("authToken", data.access_token);
          localStorage.setItem("username", data.username); // Optional: store username
          // Redirect to the "What's New" page
          router.push(WHATS_NEW_PAGE_PATH); // <<<< CORRECTED REDIRECT
        } else {
          throw new Error("Login failed: No token received.");
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    } else {
      // --- REGISTRATION ---
      if (!email) {
        setError("Email is required for registration.");
        setIsLoading(false);
        return;
      }
      try {
        const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || "Registration failed. Please try again.");
        }
        
        alert("Registration successful! Please log in.");
        setIsLoginMode(true);
        // Optionally clear form fields
        // setUsername(username); // Keep username if desired for login
        // setEmail("");
        // setPassword("");

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="bg-white shadow-xl rounded-lg p-8 space-y-6">
      <h3 className="text-2xl font-semibold text-center text-gray-800">
        {isLoginMode ? "Log In" : "Create Account"}
      </h3>
      {error && <p className="text-red-500 text-sm text-center bg-red-100 p-2 rounded">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="your_username"
            required
            className="mt-1"
          />
        </div>

        {!isLoginMode && (
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required={!isLoginMode}
              className="mt-1"
            />
          </div>
        )}

        <div>
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="mt-1"
          />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? "Processing..." : isLoginMode ? "Log In" : "Sign Up"}
        </Button>
      </form>
      <p className="text-sm text-center text-gray-600">
        {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          type="button"
          onClick={() => {
            setIsLoginMode(!isLoginMode);
            setError(null); // Clear errors when switching mode
          }}
          className="font-medium text-purple-600 hover:text-purple-500"
        >
          {isLoginMode ? "Sign up" : "Log in"}
        </button>
      </p>
    </div>
  );
}