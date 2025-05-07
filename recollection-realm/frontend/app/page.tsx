
// Full interactive dashboard code with upgraded navigation, live posts, enhanced weather widget, editable checklist, calendar notes, dark mode fix
'use client'
import {
  Calendar,
  CheckSquare,
  Search,
  User,
  Bell,
  Sun,
  Moon,
  Send,
  ThumbsUp,
  CloudRain,
  CloudSun
} from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false)
  const [newPost, setNewPost] = useState('')
  const [recentPosts, setRecentPosts] = useState([
    {
      title: "Movie Night Planning",
      content: "Don't forget to bring snacks for the movie night on Friday!",
      likes: 0,
      time: "2 hours ago"
    }
  ])
  const [checklistItems, setChecklistItems] = useState([
    "Breakfast with Dad",
    "Work on EE410",
    "Walk the dogs"
  ])
  const [checked, setChecked] = useState(Array(checklistItems.length).fill(false))
  const [calendarNotes, setCalendarNotes] = useState<{ [key: number]: { text: string; emoji: string } | undefined }>({})
  const [selectedDate, setSelectedDate] = useState<number | null>(null)
  const [noteInput, setNoteInput] = useState('')
  const [sticker, setSticker] = useState('')

  const currentDate = new Date()
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear()
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay()
  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - firstDayOfMonth + 1
    return day > 0 && day <= daysInMonth ? day : null
  })

  const handleNewPost = () => {
    if (!newPost.trim()) return
    setRecentPosts([{ title: "New Post", content: newPost, likes: 0, time: "Just now" }, ...recentPosts])
    setNewPost('')
  }

  const toggleLike = (index: number) => {
    const updated = [...recentPosts]
    if (updated[index].likes === 0) updated[index].likes++
    setRecentPosts(updated)
  }

  const toggleChecklist = (index: number) => {
    const updated = [...checked]
    updated[index] = !updated[index]
    setChecked(updated)
  }

  const addChecklistItem = () => {
    if (noteInput.trim()) {
      setChecklistItems([...checklistItems, noteInput])
      setChecked([...checked, false])
      setNoteInput('')
    }
  }

  const removeChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index))
    setChecked(checked.filter((_, i) => i !== index))
  }

  const handleDayClick = (day: number) => {
    setSelectedDate(day)
    setNoteInput('')
    setSticker('')
  }

  const saveNote = () => {
    if (selectedDate) {
      setCalendarNotes({ ...calendarNotes, [selectedDate]: { text: noteInput, emoji: sticker } })
      setSelectedDate(null)
    }
  }

  const weatherData = [
    { day: "Mon", icon: <CloudSun className="text-yellow-400 animate-[pulse_3s_infinite]" />, temp: "74°F" },
    { day: "Tue", icon: <CloudRain className="text-blue-500 animate-[drip_2s_infinite]" />, temp: "66°F" },
    { day: "Wed", icon: <CloudSun className="text-yellow-400 animate-[pulse_3s_infinite]" />, temp: "70°F" },
    { day: "Thu", icon: <CloudRain className="text-blue-500 animate-[drip_2s_infinite]" />, temp: "65°F" },
    { day: "Fri", icon: <CloudSun className="text-yellow-400 animate-[pulse_3s_infinite]" />, temp: "75°F" },
    { day: "Sat", icon: <CloudRain className="text-blue-500 animate-[drip_2s_infinite]" />, temp: "60°F" },
    { day: "Sun", icon: <CloudSun className="text-yellow-400 animate-[pulse_3s_infinite]" />, temp: "77°F" }
  ]

  return (
    <main className={`min-h-screen ${darkMode ? 'bg-[#1A1A1A] text-black' : 'bg-[#F7F7F7] text-black'}`}>
      {/* Header */}
      <div className="w-full bg-gradient-to-r from-[#8F41D3] to-[#3A6BC5] py-4 px-6 sticky top-0 z-50 rounded-b-xl">
        <div className="max-w-[1400px] mx-auto flex items-center justify-between gap-4">
          <h1 className="text-white font-inter italic text-2xl font-semibold whitespace-nowrap">RecollectionRealm</h1>
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 pl-4 pr-10 rounded-full focus:outline-none focus:ring-2 focus:ring-[#8F41D3]"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <button onClick={() => setDarkMode(!darkMode)} className="text-white">{darkMode ? <Sun /> : <Moon />}</button>
          <Bell className="text-white" />
          <div className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center border border-black">
            <User className="w-6 h-6 text-[#1D1B20]" />
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Tabs */}
        <div className="bg-gradient-to-r from-purple-300 to-blue-300 rounded-[15px] border border-black p-1">
          <div className="flex justify-between items-center divide-x divide-black">
            {["whats-new", "create-post", "collaboration", "friends", "feed", "account-settings"].map(tab => (
              <Link
                key={tab}
                href={`/${tab}`}
                className="px-4 py-1 text-[#3A6BC5] font-inter text-center flex-1 hover:underline capitalize"
              >
                {tab.replace('-', ' ')}
              </Link>
            ))}
          </div>
        </div>

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Weather Widget */}
          <div className="border border-black rounded-xl shadow overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 px-4 py-2">
              <h2 className="font-bold text-lg">7-Day Forecast</h2>
            </div>
            <div className="bg-white p-4">
              <div className="grid grid-cols-4 gap-4 text-center">
                {weatherData.map(({ day, icon, temp }, idx) => (
                  <div key={idx} className="flex flex-col items-center">
                    <div className="text-lg font-medium">{day}</div>
                    <div className="my-1">{icon}</div>
                    <div className="text-sm text-gray-700">{temp}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Checklist */}
          <div className="border border-black rounded-xl shadow overflow-hidden">
            <div className="bg-gradient-to-r from-purple-200 to-purple-400 px-4 py-2">
              <h2 className="font-bold flex items-center gap-2"><CheckSquare className="w-5 h-5" /> Checklist</h2>
            </div>
            <div className="bg-white p-4">
              <ul className="space-y-2">
                {checklistItems.map((item, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" checked={checked[i]} onChange={() => toggleChecklist(i)} />
                      <span>{item}</span>
                    </div>
                    <button onClick={() => removeChecklistItem(i)} className="text-red-500">✖</button>
                  </li>
                ))}
              </ul>
              <div className="mt-2 flex gap-2">
                <input
                  value={noteInput}
                  onChange={e => setNoteInput(e.target.value)}
                  placeholder="New task..."
                  className="flex-grow border border-black rounded px-2 py-1 text-sm"
                />
                <button onClick={addChecklistItem} className="bg-blue-500 text-white px-2 py-1 rounded">Add</button>
              </div>
            </div>
          </div>

          {/* Post Box */}
          <div className="border border-black rounded-xl shadow overflow-hidden">
            <div className="bg-gradient-to-r from-blue-200 to-blue-400 px-4 py-2">
              <h2 className="font-bold">Status Update</h2>
            </div>
            <div className="bg-white p-4">
              <div className="flex gap-2 mb-2">
                <input
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="What's on your mind?"
                  className="flex-grow px-2 py-1 border border-gray-400 rounded"
                />
                <button onClick={handleNewPost} className="text-sm bg-[#3A6BC5] text-white px-3 py-1 rounded flex items-center gap-1"><Send className="w-4 h-4" /> Post</button>
              </div>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {recentPosts.map((post, index) => (
                  <div key={index} className="bg-gray-100 p-2 rounded border border-gray-300">
                    <div className="font-semibold">{post.title}</div>
                    <p className="text-sm">{post.content}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                      <span>{post.time}</span>
                      <button onClick={() => toggleLike(index)} className="text-blue-600 hover:underline flex items-center gap-1">
                        <ThumbsUp className="w-3 h-3" /> {post.likes}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="border border-black rounded-xl shadow overflow-hidden">
          <div className="bg-gradient-to-r from-green-200 to-green-400 px-4 py-2">
            <h2 className="font-bold flex items-center gap-2"><Calendar className="w-5 h-5" /> Calendar</h2>
          </div>
          <div className="bg-white p-4">
            <div className="grid grid-cols-7 text-center font-semibold border-b">
              {weekdays.map(day => <div key={day} className="py-1">{day}</div>)}
            </div>
            <div className="grid grid-cols-7">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className="h-20 border p-1 relative cursor-pointer hover:bg-purple-100"
                  onClick={() => day && handleDayClick(day)}
                >
                  {day && (
                    <>
                      <div className="font-bold text-sm">{day}</div>
                      {day && calendarNotes[day] && (
                        <div className="text-xs mt-1">
                          {calendarNotes[day]?.emoji} {calendarNotes[day]?.text}
                        </div>
                      )}
                    </>
                  )}
                </div>
              ))}
            </div>
            {selectedDate && (
              <div className="mt-4 border-t pt-4">
                <h3 className="font-semibold mb-2">Note for Day {selectedDate}</h3>
                <div className="flex gap-2 mb-2">
                  <input
                    placeholder="Your note..."
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="flex-grow border border-black px-2 py-1 rounded"
                  />
                  <select value={sticker} onChange={(e) => setSticker(e.target.value)} className="border border-black rounded px-2">
                    <option value="">Sticker</option>
                    <option value="🎉">🎉</option>
                    <option value="📌">📌</option>
                    <option value="🛒">🛒</option>
                  </select>
                  <button onClick={saveNote} className="bg-green-500 text-white px-3 py-1 rounded">Save</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
