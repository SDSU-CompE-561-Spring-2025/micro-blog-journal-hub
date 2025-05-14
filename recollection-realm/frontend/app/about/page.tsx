'use client'

import { Header } from "@/components/header"
import NavBar from "@/components/Navbar"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  BookOpen,
  Users,
  MessageCircle,
  Calendar,
  Heart
} from "lucide-react"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

// Function to check if user is logged in
const isUserLoggedIn = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')
    return !!(token && user)
  }
  return false
}

// Sample features
const features = [
  {
    icon: BookOpen,
    title: 'Personal Journals',
    description: 'Create private journals to document your thoughts, experiences, and memories.'
  },
  {
    icon: Users,
    title: 'Community Sharing',
    description: 'Share your stories with a supportive community of like-minded individuals.'
  },
  {
    icon: MessageCircle,
    title: 'Collaborative Writing',
    description: 'Work together with friends on shared journals and stories.'
  },
  {
    icon: Calendar,
    title: 'Memory Timeline',
    description: 'Organize your posts chronologically and revisit memories easily.'
  }
]

// Sample FAQs
const faqs = [
  {
    question: 'What is RecollectionRealm?',
    answer: 'RecollectionRealm is a web application that combines personal journaling with social sharing. You can keep private journals or share your thoughts with others - you decide what stays private and what gets shared.'
  },
  {
    question: 'How do I get started?',
    answer: 'Simply create an account, and you can start writing journal entries or sharing posts with the community. You can also explore other users\' public posts for inspiration.'
  },
  {
    question: 'Is my data secure?',
    answer: 'Yes! We take security seriously and ensure that private entries remain private. We use modern web security practices to protect your data.'
  }
]

export default function AboutPage() {
  const router = useRouter()

  const handleStartJourney = () => {
    if (isUserLoggedIn()) {
      router.push('/') // Go to home page if logged in
    } else {
      router.push('/login') // Go to login page if not logged in
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <NavBar />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-purple-600 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">Welcome to RecollectionRealm</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Your personal space to write, reflect, and share life's most meaningful moments
          </p>
          <Button
            className="bg-white text-purple-600 hover:bg-gray-100"
            onClick={handleStartJourney}
          >
            Start Your Journey
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <div className="mb-4 inline-flex p-3 rounded-full bg-purple-100 dark:bg-purple-900">
                    {<feature.icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center text-gray-600 dark:text-gray-300">
        <p>Made with <Heart className="inline h-4 w-4 text-red-500" /> by the RecollectionRealm Team</p>
      </footer>
    </div>
  )
}