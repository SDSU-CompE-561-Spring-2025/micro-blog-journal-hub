import { SignupForm } from "@/components/signup-form"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-600 via-purple-500 to-indigo-700 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-gray-200 rounded-lg p-8 mb-8 text-center">
          <h1 className="text-xl font-medium">Join us at</h1>
          <h2 className="text-3xl font-bold">RecollectionRealm</h2>
        </div>
        <SignupForm />
      </div>
    </div>
  )
}
