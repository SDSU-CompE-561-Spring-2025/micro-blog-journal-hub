import Image from "next/image"

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white">
      <div className="relative w-full h-screen overflow-y-auto">
        {/* Search Bar */}
        <div className="w-full h-16 bg-gradient-to-r from-[#8F41D3] to-[#121C29] sticky top-0 z-10 flex items-center px-6">
          <span className="font-inter italic font-semibold text-lg text-white">RecollectionRealm</span>
          <div className="ml-12 w-1/3 h-10 bg-white rounded-[15px] flex items-center px-4">
            <span className="font-inter font-normal text-sm text-black opacity-50">Search...</span>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Welcome Section */}
          <div className="w-full md:w-[400px] h-10 mb-6 bg-gradient-to-r from-[rgba(143,65,211,0.8)] via-[rgba(143,65,211,0.8)] to-[rgba(58,107,197,0.8)] rounded-[15px] flex items-center px-4">
            <span className="font-inter font-normal text-base text-white">Welcome Wilson to What&apos;s New,</span>
          </div>

          {/* Interests Section */}
          <div className="w-full bg-gradient-to-r from-[rgba(143,65,211,0.8)] to-[rgba(58,107,197,0.8)] rounded-[15px] p-6 mb-10">
            <span className="block font-inter font-normal text-base text-white mb-4">What are your interests?</span>

            <div className="flex flex-wrap gap-3">
              {/* Interest Tags - Row 1 */}
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x Sports</span>
              </div>
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x News</span>
              </div>
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x College Resources</span>
              </div>
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x Diet Plans</span>
              </div>

              {/* Interest Tags - Row 2 */}
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x The Grammys</span>
              </div>
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x Conspiracies</span>
              </div>
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x Cinema</span>
              </div>
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x Astrology</span>
              </div>

              {/* Interest Tags - Row 3 */}
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x Playstation</span>
              </div>
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x History Channel</span>
              </div>
              <div className="bg-[rgba(168,13,13,0.51)] rounded-sm px-2 py-1">
                <span className="font-inter font-normal text-sm text-white">x History Channel</span>
              </div>
            </div>
          </div>

          {/* Explore Posts Section */}
          <div className="w-full md:w-[400px] h-10 mb-6 bg-gradient-to-r from-[rgba(143,65,211,0.8)] to-[rgba(58,107,197,0.8)] rounded-[15px] flex items-center px-4">
            <span className="font-inter font-normal text-base text-white">Explore posts from around the world!</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* First Post */}
            <div className="w-full bg-[rgba(0,121,40,0.49)] rounded-[15px] p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-3/5 bg-white rounded-[15px] p-4">
                  <span className="block font-inter font-normal text-base text-[#68AC43] mb-2">Rhilo Sotto:</span>
                  <p className="font-inter font-normal text-sm text-[#68AC43]">
                    I explored the jungles of Costa Rica and finally got to complete one of my Bucket List Explorations.
                    Next stop... The Bahamas! -Rhilo, over and out 3/16/25 at 5:03pm
                  </p>
                </div>
                <div className="w-full md:w-2/5">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Costa Rica jungle"
                    width={300}
                    height={200}
                    className="object-cover rounded-lg w-full h-auto"
                  />
                  <span className="block font-inter font-normal text-sm text-[#408DC4] mt-2 text-right">
                    Click to see more...
                  </span>
                </div>
              </div>
            </div>

            {/* Second Post */}
            <div className="w-full bg-[rgba(18,159,184,0.4)] rounded-[15px] p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-3/5 bg-white rounded-[15px] p-4">
                  <p className="font-inter font-normal text-sm text-black">
                    John Guerrero: It&apos;s been too long since I&apos;ve enjoyed a nice clear weekend getaway. We
                    tried out this new app to book our dream vacation spot and let me tell you, it was worth every
                    penny!
                  </p>
                </div>
                <div className="w-full md:w-2/5">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Weekend getaway"
                    width={300}
                    height={200}
                    className="object-cover rounded-lg w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Additional Posts for Full Screen */}
            <div className="w-full bg-[rgba(211,65,143,0.4)] rounded-[15px] p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-3/5 bg-white rounded-[15px] p-4">
                  <span className="block font-inter font-normal text-base text-[#D3418F] mb-2">Maria Chen:</span>
                  <p className="font-inter font-normal text-sm text-[#D3418F]">
                    Just finished my first marathon! Six months of training paid off. The feeling of crossing that
                    finish line was indescribable. Already planning my next one for the fall!
                  </p>
                </div>
                <div className="w-full md:w-2/5">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Marathon finish"
                    width={300}
                    height={200}
                    className="object-cover rounded-lg w-full h-auto"
                  />
                  <span className="block font-inter font-normal text-sm text-[#408DC4] mt-2 text-right">
                    Click to see more...
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full bg-[rgba(211,143,65,0.4)] rounded-[15px] p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full md:w-3/5 bg-white rounded-[15px] p-4">
                  <span className="block font-inter font-normal text-base text-[#D38F41] mb-2">Alex Rodriguez:</span>
                  <p className="font-inter font-normal text-sm text-[#D38F41]">
                    My cooking journey continues! Today I mastered the perfect soufflé after three failed attempts. The
                    secret is all in the egg whites and patience. Check out the result!
                  </p>
                </div>
                <div className="w-full md:w-2/5">
                  <Image
                    src="/placeholder.svg?height=200&width=300"
                    alt="Soufflé"
                    width={300}
                    height={200}
                    className="object-cover rounded-lg w-full h-auto"
                  />
                  <span className="block font-inter font-normal text-sm text-[#408DC4] mt-2 text-right">
                    Click to see more...
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

