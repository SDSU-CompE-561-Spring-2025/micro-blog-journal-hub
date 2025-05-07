'use client'

import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import NavBar from "@/components/Navbar"
import { Calendar, CheckSquare, ChevronLeft, ChevronRight } from 'lucide-react'

export default function Dashboard() {
  const [username, setUsername] = useState<string | null>(null)
  const [checklist, setChecklist] = useState<{ text: string; checked: boolean }[]>([])
  const [newItem, setNewItem] = useState("")
  const [selectedDate, setSelectedDate] = useState<{ day: number, type: string } | null>(null)
  const [viewMonth, setViewMonth] = useState(new Date().getMonth())
  const [viewYear, setViewYear] = useState(new Date().getFullYear())
  const [descriptions, setDescriptions] = useState<{ [key: string]: string }>({})

  useEffect(() => {
    const storedUser = localStorage.getItem("username")
    setUsername(storedUser)
  }, [])

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const prevMonthDays = new Date(viewYear, viewMonth, 0).getDate()

  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDayOfMonth + 1
    if (day <= 0) return { day: prevMonthDays + day, type: 'prev' }
    if (day > daysInMonth) return { day: day - daysInMonth, type: 'next' }
    return { day, type: 'current' }
  })

  const currentDate = new Date()
  const isToday = (day: number, type: string) => {
    return (
      type === 'current' &&
      day === currentDate.getDate() &&
      viewMonth === currentDate.getMonth() &&
      viewYear === currentDate.getFullYear()
    )
  }

  const isSelected = (day: number, type: string) => {
    return selectedDate?.day === day && selectedDate?.type === type
  }

  const selectedKey = selectedDate ? `${viewYear}-${viewMonth}-${selectedDate.day}-${selectedDate.type}` : ""

  const hasNote = (day: number, type: string) => {
    const key = `${viewYear}-${viewMonth}-${day}-${type}`
    return !!descriptions[key]?.trim()
  }

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      <Header />
      <NavBar />

      <div className="p-6">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex justify-between items-center mb-6">
            <div className="bg-gradient-to-r from-[rgba(143,65,211,0.8)] to-[rgba(89,131,221,0.8)] px-6 py-2 rounded-[15px] border border-black shadow-md">
              <h1 className="text-white font-inter italic font-semibold">
                {username ? `Welcome back, ${username}!` : "Welcome to Recollection Realm!"}
              </h1>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Checklist */}
            <div className="bg-gradient-to-b from-[rgba(143,65,211,0.8)] to-[rgba(58,107,197,0.8)] rounded-[15px] border border-black shadow-md overflow-hidden">
              <div className="p-3">
                <h2 className="text-white font-inter flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" /> Daily Checklist
                </h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (newItem.trim() !== "") {
                      setChecklist([...checklist, { text: newItem.trim(), checked: false }])
                      setNewItem("")
                    }
                  }}
                  className="mt-2 flex gap-2"
                >
                  <input
                    type="text"
                    value={newItem}
                    onChange={(e) => setNewItem(e.target.value)}
                    placeholder="Add new task"
                    className="flex-1 px-2 py-1 rounded border border-black text-sm"
                  />
                  <button type="submit" className="px-3 py-1 bg-black text-white rounded text-sm">
                    Add
                  </button>
                </form>
              </div>
              <div className="bg-[#D9D9D9] p-3 h-[500px] overflow-y-auto border-t border-black">
                <ul className="space-y-2">
                  {checklist.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        className="rounded border-black"
                        checked={item.checked}
                        onChange={() => {
                          const newChecklist = [...checklist]
                          newChecklist[index].checked = !newChecklist[index].checked
                          setChecklist(newChecklist)
                        }}
                      />
                      <span className={`text-sm font-inter flex-1 ${item.checked ? 'line-through text-gray-500' : ''}`}>
                        {item.text}
                      </span>
                      <button
                        onClick={() => {
                          const newChecklist = checklist.filter((_, i) => i !== index)
                          setChecklist(newChecklist)
                        }}
                        className="text-red-600 text-sm"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Calendar */}
            <div className="md:col-span-2 bg-gradient-to-b from-[rgba(143,65,211,0.8)] to-[rgba(58,107,197,0.8)] rounded-[15px] border border-black overflow-hidden">
              <div className="p-3">
                <h2 className="text-white font-inter flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4" /> Calendar
                </h2>
                <div className="flex items-center justify-between text-white text-sm w-full">
                  <button onClick={() => {
                    if (viewMonth === 0) {
                      setViewMonth(11)
                      setViewYear(viewYear - 1)
                    } else {
                      setViewMonth(viewMonth - 1)
                    }
                  }} className="px-2"><ChevronLeft /></button>
                  <div className="flex-1 flex justify-center gap-2">
                    <span>{new Date(viewYear, viewMonth).toLocaleString("default", { month: "long" })}</span>
                    <span>{viewYear}</span>
                  </div>
                  <button onClick={() => {
                    if (viewMonth === 11) {
                      setViewMonth(0)
                      setViewYear(viewYear + 1)
                    } else {
                      setViewMonth(viewMonth + 1)
                    }
                  }} className="px-2"><ChevronRight /></button>
                </div>
              </div>
              <div className="bg-[#D9D9D9] border-t border-black">
                <div className="grid grid-cols-7 border-b border-black">
                  {weekdays.map((day, index) => (
                    <div key={index} className="text-center py-2 text-sm font-inter">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 h-[300px]">
                  {calendarDays.map(({ day, type }, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedDate({ day, type })}
                      className={`border-b border-r border-black p-2 cursor-pointer text-sm font-inter
                        ${type !== 'current' ? 'text-gray-400' : ''}
                        ${isToday(day, type) ? 'bg-[#7650E6] text-white' : ''}
                        ${isSelected(day, type) ? 'outline outline-2 outline-black' : ''}`}
                    >
                      {day}{hasNote(day, type) ? '*' : ''}
                    </div>
                  ))}
                </div>
                <div className="p-3">
                  <textarea
                    placeholder="Write a note for this date..."
                    value={selectedKey ? descriptions[selectedKey] || "" : ""}
                    onChange={(e) => {
                      if (selectedKey) {
                        setDescriptions({ ...descriptions, [selectedKey]: e.target.value })
                      }
                    }}
                    className="w-full h-24 p-2 border border-black rounded resize-none text-sm"
                  />
                </div>
              </div>
            </div>

            {/* Recent Posts */}
            <div className="bg-gradient-to-b from-[rgba(143,65,211,0.8)] to-[rgba(58,107,197,0.8)] rounded-[15px] border border-black overflow-hidden">
              <div className="p-3">
                <h2 className="text-white font-inter">Recent Posts</h2>
              </div>
              <div className="bg-[#D9D9D9] h-[500px] border-t border-black p-4">
                <div className="space-y-4">
                  <div className="bg-white p-3 rounded-md shadow border border-gray-300">
                    <h3 className="font-semibold mb-1">Movie Night Planning</h3>
                    <p className="text-sm text-gray-700">Don't forget to bring snacks for the movie night on Friday!</p>
                    <div className="text-xs text-gray-500 mt-2">Posted 2 hours ago</div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow border border-gray-300">
                    <h3 className="font-semibold mb-1">Project Update</h3>
                    <p className="text-sm text-gray-700">
                      The team has completed the first phase of the project ahead of schedule.
                    </p>
                    <div className="text-xs text-gray-500 mt-2">Posted yesterday</div>
                  </div>
                  <div className="bg-white p-3 rounded-md shadow border border-gray-300">
                    <h3 className="font-semibold mb-1">Weekend Plans</h3>
                    <p className="text-sm text-gray-700">
                      Anyone interested in hiking this weekend? Weather looks great!
                    </p>
                    <div className="text-xs text-gray-500 mt-2">Posted 2 days ago</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
