// Full interactive dashboard code with upgraded navigation, live posts, enhanced weather widget, editable checklist, calendar notes, dark mode fix
'use client'
import {
  Calendar,
  CheckSquare,
  Send,
  ThumbsUp,
  CloudRain,
  CloudSun
} from 'lucide-react'
import React, { useState } from 'react'
import { Header } from "@/components/header"
import NavBar from "@/components/Navbar"

export default function Dashboard() {
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
  const [noteInput, setNoteInput] = useState('') // Used for both checklist and calendar note input
  const [sticker, setSticker] = useState('')
  const [checklistInput, setChecklistInput] = useState('') // Separate state for checklist input

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
    updated[index].likes = updated[index].likes === 0 ? 1 : 0 // Toggle like
    setRecentPosts(updated)
  }

  const toggleChecklist = (index: number) => {
    const updated = [...checked]
    updated[index] = !updated[index]
    setChecked(updated)
  }

  const addChecklistItem = () => {
    if (checklistInput.trim()) {
      setChecklistItems([...checklistItems, checklistInput])
      setChecked([...checked, false])
      setChecklistInput('')
    }
  }

  const removeChecklistItem = (index: number) => {
    setChecklistItems(checklistItems.filter((_, i) => i !== index))
    setChecked(checked.filter((_, i) => i !== index))
  }

  const handleDayClick = (day: number) => {
    setSelectedDate(day)
    setNoteInput(calendarNotes[day]?.text || '')
    setSticker(calendarNotes[day]?.emoji || '')
  }

  const saveNote = () => {
    if (selectedDate && (noteInput.trim() || sticker)) {
      setCalendarNotes({ ...calendarNotes, [selectedDate]: { text: noteInput, emoji: sticker } })
    } else if (selectedDate) { // If both are empty, clear the note
        const newNotes = {...calendarNotes};
        delete newNotes[selectedDate];
        setCalendarNotes(newNotes);
    }
    // Optionally clear inputs after save, or leave them for further editing
    // setSelectedDate(null); 
    // setNoteInput('');
    // setSticker('');
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
    <>
      <Header />
      {/* Main page background and text color updated for consistency */}
      <main className="min-h-screen bg-[#F7F7F7] text-black dark:bg-slate-900 dark:text-slate-100">
        <NavBar />

        <div className="p-6 space-y-6">
          {/* Top Row: Weather Widget, Checklist, Post Box */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Weather Widget */}
            <div className="border border-black rounded-xl shadow overflow-hidden dark:border-gray-600">
              {/* Header: Gradient for light, solid color for dark. Text color adapted. */}
              <div className="bg-gradient-to-r from-yellow-200 to-yellow-400 dark:bg-yellow-700 px-4 py-2">
                <h2 className="font-bold text-lg text-black dark:text-yellow-50">7-Day Forecast</h2>
              </div>
              {/* Content area: Consistent dark background */}
              <div className="bg-white p-4 dark:bg-gray-800">
                <div className="grid grid-cols-4 gap-4 text-center">
                  {weatherData.map(({ day, icon, temp }, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <div className="text-lg font-medium text-gray-800 dark:text-slate-200">{day}</div>
                      <div className="my-1">{icon}</div> {/* Icons have their own colors */}
                      <div className="text-sm text-gray-600 dark:text-slate-400">{temp}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Checklist */}
            <div className="border border-black rounded-xl shadow overflow-hidden dark:border-gray-600">
              <div className="bg-gradient-to-r from-purple-200 to-purple-400 dark:bg-purple-700 px-4 py-2">
                <h2 className="font-bold flex items-center gap-2 text-black dark:text-purple-50"><CheckSquare className="w-5 h-5" /> Checklist</h2>
              </div>
              <div className="bg-white p-4 dark:bg-gray-800">
                <ul className="space-y-2">
                  {checklistItems.map((item, i) => (
                    <li key={i} className="flex items-center justify-between text-gray-800 dark:text-slate-200">
                      <div className="flex items-center gap-2">
                        <input type="checkbox" checked={checked[i]} onChange={() => toggleChecklist(i)} 
                               className="form-checkbox text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <span className={checked[i] ? "line-through text-gray-500 dark:text-gray-400" : ""}>{item}</span>
                      </div>
                      <button onClick={() => removeChecklistItem(i)} className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500">✖</button>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex gap-2">
                  <input
                    value={checklistInput}
                    onChange={e => setChecklistInput(e.target.value)}
                    placeholder="New task..."
                    className="flex-grow border border-gray-300 rounded px-2 py-1 text-sm bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 focus:ring-purple-500 focus:border-purple-500"
                  />
                  <button 
                    onClick={addChecklistItem} 
                    className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-purple-600 dark:bg-purple-600 dark:hover:bg-purple-500 text-sm"
                  >Add</button>
                </div>
              </div>
            </div>

            {/* Post Box */}
            <div className="border border-black rounded-xl shadow overflow-hidden dark:border-gray-600">
              <div className="bg-gradient-to-r from-blue-200 to-blue-400 dark:bg-blue-700 px-4 py-2">
                <h2 className="font-bold text-black dark:text-blue-50">Status Update</h2>
              </div>
              <div className="bg-white p-4 dark:bg-gray-800">
                <div className="flex gap-2 mb-2">
                  <input
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    placeholder="What's on your mind?"
                    className="flex-grow px-2 py-1 border border-gray-300 rounded bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button 
                    onClick={handleNewPost} 
                    className="text-sm bg-[#3A6BC5] text-white px-3 py-1 rounded flex items-center gap-1 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-500"
                  ><Send className="w-4 h-4" /> Post</button>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {recentPosts.map((post, index) => (
                    <div key={index} className="bg-gray-100 p-2 rounded border border-gray-300 dark:bg-slate-700 dark:border-slate-600">
                      <div className="font-semibold text-gray-800 dark:text-slate-100">{post.title}</div>
                      <p className="text-sm text-gray-700 dark:text-slate-300">{post.content}</p>
                      <div className="flex justify-between items-center text-xs text-gray-500 dark:text-slate-400 mt-1">
                        <span>{post.time}</span>
                        <button onClick={() => toggleLike(index)} className={`flex items-center gap-1 hover:underline ${post.likes > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-500 dark:text-gray-400'}`}>
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
          <div className="border border-black rounded-xl shadow overflow-hidden dark:border-gray-600">
            <div className="bg-gradient-to-r from-green-200 to-green-400 dark:bg-green-700 px-4 py-2">
              <h2 className="font-bold flex items-center gap-2 text-black dark:text-green-50"><Calendar className="w-5 h-5" /> Calendar</h2>
            </div>
            <div className="bg-white p-4 dark:bg-gray-800">
              <div className="grid grid-cols-7 text-center font-semibold border-b border-gray-300 dark:border-gray-700">
                {weekdays.map(day => <div key={day} className="py-1 text-gray-700 dark:text-slate-300">{day}</div>)}
              </div>
              <div className="grid grid-cols-7">
                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`h-20 border border-gray-200 dark:border-gray-700 p-1 relative cursor-pointer hover:bg-purple-100 dark:hover:bg-purple-500/20 ${selectedDate === day ? 'bg-purple-200 dark:bg-purple-600/30' : 'bg-white dark:bg-gray-800'}`}
                    onClick={() => day && handleDayClick(day)}
                  >
                    {day && (
                      <>
                        <div className={`font-bold text-sm ${currentDate.getDate() === day && currentDate.getMonth() === new Date().getMonth() ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-slate-200'}`}>{day}</div>
                        {calendarNotes[day] && (
                          <div className="text-xs mt-1 text-gray-600 dark:text-slate-300">
                            {calendarNotes[day]?.emoji} {calendarNotes[day]?.text.substring(0, 10)}{calendarNotes[day]?.text.length > 10 ? '...' : ''}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
              {selectedDate && (
                <div className="mt-4 border-t border-gray-300 dark:border-gray-700 pt-4">
                  <h3 className="font-semibold mb-2 text-gray-800 dark:text-slate-100">Note for {currentMonth} {selectedDate}, {currentYear}</h3>
                  <div className="flex flex-col sm:flex-row gap-2 mb-2">
                    <input
                      placeholder="Your note..."
                      value={noteInput}
                      onChange={(e) => setNoteInput(e.target.value)}
                      className="flex-grow border border-gray-300 px-2 py-1 rounded bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 dark:placeholder-slate-400 focus:ring-green-500 focus:border-green-500"
                    />
                    <select value={sticker} onChange={(e) => setSticker(e.target.value)} className="border border-gray-300 rounded px-2 py-1 bg-white dark:bg-slate-700 dark:border-slate-600 dark:text-slate-100 focus:ring-green-500 focus:border-green-500">
                      <option value="">Sticker</option>
                      <option value="🎉">🎉 Party</option>
                      <option value="📌">📌 Reminder</option>
                      <option value="🛒">🛒 Shopping</option>
                      <option value="🎂">🎂 Birthday</option>
                      <option value="✈️">✈️ Travel</option>
                    </select>
                    <button 
                        onClick={saveNote} 
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 text-sm"
                    >Save</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  )
}