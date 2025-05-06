import { Calendar, CheckSquare, Search, User } from "lucide-react"

export default function Dashboard() {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  const currentDate = new Date()
  const currentMonth = currentDate.toLocaleString("default", { month: "long" })
  const currentYear = currentDate.getFullYear()

  // Generate calendar days for current month
  const daysInMonth = new Date(currentYear, currentDate.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = new Date(currentYear, currentDate.getMonth(), 1).getDay()

  const calendarDays = Array.from({ length: 35 }, (_, i) => {
    const day = i - firstDayOfMonth + 1
    return day > 0 && day <= daysInMonth ? day : null
  })

  const checklistItems = [
    "Breakfast with Dad",
    "Work on EE410",
    "Walk the dogs",
    "Brunch with John",
    "Car Insurance",
    "Groceries",
    "Take out the trash",
    "Wash car",
    "Lunch at Moe's",
    "Nap",
    "Meet up with Sam",
    "Target Run",
    "Starbucks Run",
    "Restock bathroom",
    "5 mile run",
    "Setup for Movie Night",
    "Dinner with Smith's",
    "Sunset at PB",
    "Popcorn and Smore's",
    "Bedtime routine",
    "Setup alarms",
    "Call Mom goodnight",
  ]

  return (
    <main className="min-h-screen bg-[#F7F7F7]">
      {/* Search Bar */}
      <div className="w-full bg-gradient-to-r from-[#8F41D3] to-[#3A6BC5] py-4 px-6 sticky top-0 z-50">
        <div className="max-w-[1400px] mx-auto flex items-center">
          <h1 className="text-white font-inter italic text-2xl font-semibold mr-6">RecollectionRealm</h1>
          <div className="relative flex-1 max-w-3xl">
            <input
              type="text"
              placeholder="Search..."
              className="w-full py-2 px-4 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-[#8F41D3] text-gray-600"
            />
            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="max-w-[1400px] mx-auto">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-6">
            <div className="bg-gradient-to-r from-[rgba(143,65,211,0.8)] to-[rgba(89,131,221,0.8)] px-6 py-2 rounded-[15px] border border-black shadow-md">
              <h1 className="text-white font-inter italic font-semibold">Welcome back, John!</h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#D9D9D9] rounded-full flex items-center justify-center border border-black">
                <User className="w-6 h-6 text-[#1D1B20]" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-gradient-to-r from-[rgba(143,65,211,0.5)] to-[rgba(58,107,197,0.5)] rounded-[15px] border border-black mb-6 p-1">
            <div className="flex justify-between items-center">
              <a href="#" className="px-4 py-1 text-[#3A6BC5] font-inter text-center flex-1">
                What&apos;s New
              </a>
              <div className="h-4 border-l border-black"></div>
              <a href="#" className="px-4 py-1 text-[#3A6BC5] font-inter text-center flex-1">
                Create
              </a>
              <div className="h-4 border-l border-black"></div>
              <a href="#" className="px-4 py-1 text-[#3A6BC5] font-inter text-center flex-1">
                Collaborate
              </a>
              <div className="h-4 border-l border-black"></div>
              <a href="#" className="px-4 py-1 text-[#3A6BC5] font-inter text-center flex-1">
                Friends
              </a>
              <div className="h-4 border-l border-black"></div>
              <a href="#" className="px-4 py-1 text-[#3A6BC5] font-inter text-center flex-1">
                Account Settings
              </a>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Checklist */}
            <div className="bg-gradient-to-b from-[rgba(143,65,211,0.8)] to-[rgba(58,107,197,0.8)] rounded-[15px] border border-black shadow-md overflow-hidden">
              <div className="p-3">
                <h2 className="text-white font-inter flex items-center gap-2">
                  <CheckSquare className="w-4 h-4" /> Daily Checklist
                </h2>
              </div>
              <div className="bg-[#D9D9D9] p-3 h-[500px] overflow-y-auto border-t border-black">
                <ul className="space-y-2">
                  {checklistItems.map((item, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <input type="checkbox" className="rounded border-black" />
                      <span className="text-sm font-inter">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Calendar */}
            <div className="md:col-span-2 bg-gradient-to-b from-[rgba(143,65,211,0.8)] to-[rgba(58,107,197,0.8)] rounded-[15px] border border-black overflow-hidden">
              <div className="p-3 flex justify-between items-center">
                <h2 className="text-white font-inter flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Calendar
                </h2>
                <div className="flex gap-2 text-white text-sm">
                  <span>{currentMonth}</span>
                  <span>{currentYear}</span>
                </div>
              </div>
              <div className="bg-[#D9D9D9] border-t border-black">
                {/* Calendar Header */}
                <div className="grid grid-cols-7 border-b border-black">
                  {weekdays.map((day, index) => (
                    <div key={index} className="text-center py-2 text-sm font-inter">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 h-[300px]">
                  {calendarDays.map((day, index) => (
                    <div
                      key={index}
                      className={`border-b border-r border-black p-2 ${
                        day === currentDate.getDate() ? "bg-[#7650E6] text-white" : ""
                      }`}
                    >
                      {day !== null && <span className="text-sm font-inter">{day}</span>}
                    </div>
                  ))}
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
