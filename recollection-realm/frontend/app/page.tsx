import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'


import { LoginForm } from "@/components/login-form"



export default async function Page() {
  const cookieStore = await cookies()
  const supabase = createClient(cookieStore)

  const { data: todos } = await supabase.from('todos').select()

  return (
    <ul>
      {todos?.map((todo) => (
        <li>{todo}</li>
      ))}
    </ul>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-500 to-indigo-700 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 rounded-lg p-8 mb-8 text-center">
          <h1 className="text-xl font-medium">Welcome to</h1>
          <h2 className="text-3xl font-bold">RecollectionRealm</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
