'use client'

import { Header } from "@/components/header"
import NavBar from "@/components/Navbar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
    BookOpen,
    Users,
    MessageCircle,
    Calendar,
    Mail,
    Github,
    Twitter,
    Heart
} from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

// Sample statistics
const stats = [
    { label: 'Active Users', value: '10K+' },
    { label: 'Posts Created', value: '50K+' },
    { label: 'Countries', value: '25+' },
    { label: 'Communities', value: '100+' }
]

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
        question: 'What makes RecollectionRealm different?',
        answer: 'RecollectionRealm combines personal journaling with social sharing, giving you complete control over what stays private and what you share with the world.'
    },
    {
        question: 'Is my data secure?',
        answer: 'Yes! We use industry-standard encryption and security measures to protect your personal data and private journals.'
    },
    {
        question: 'Can I import my existing journal?',
        answer: 'Absolutely! RecollectionRealm supports importing from various formats including text files, Word documents, and other popular journaling apps.'
    }
]

// Sample testimonials
const testimonials = [
    {
        text: "RecollectionRealm has transformed how I document my life's journey.",
        author: "Sarah M.",
        role: "Travel Blogger"
    },
    {
        text: "The perfect blend of private journaling and social sharing.",
        author: "James K.",
        role: "Writer"
    }
]

export default function AboutPreview() {
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
                    <Button className="bg-white text-purple-600 hover:bg-gray-100">
                        Start Your Journey
                    </Button>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <div key={index} className="text-center">
                                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                            </div>
                        ))}
                    </div>
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

            {/* Testimonials Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <Card key={index} className="bg-white dark:bg-gray-700">
                                <CardContent className="p-6">
                                    <p className="text-lg mb-4">{testimonial.text}</p>
                                    <div className="flex items-center">
                                        <div>
                                            <p className="font-semibold">{testimonial.author}</p>
                                            <p className="text-gray-600 dark:text-gray-300">{testimonial.role}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16">
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

            {/* Contact Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-800">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-8">Get in Touch</h2>
                    <div className="flex justify-center space-x-6">
                        <Button variant="outline" className="flex items-center">
                            <Mail className="mr-2 h-4 w-4" />
                            Contact Us
                        </Button>
                        <Button variant="outline" className="flex items-center">
                            <Github className="mr-2 h-4 w-4" />
                            GitHub
                        </Button>
                        <Button variant="outline" className="flex items-center">
                            <Twitter className="mr-2 h-4 w-4" />
                            Twitter
                        </Button>
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