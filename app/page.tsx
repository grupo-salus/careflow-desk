import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <MainContent />
      </div>
    </div>
  )
}

