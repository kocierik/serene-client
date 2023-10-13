import Sidebar from '@/components/Sidebar'
import SongItem from '@/components/SongItem'

export default function Home() {
  return (
    <main  className="flex min-h-screen	bg-base-300 flex-1  ">
      <Sidebar />
        <div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-4 mt-4">
              <SongItem />
            </div>
          </div>

    </main>
  )
}
