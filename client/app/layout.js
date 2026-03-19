import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ToastContainer from '@/components/ToastContainer'

export const metadata = {
  title: 'Tripo-AI — AI-Powered Travel Intelligence',
  description: 'Next-generation AI travel planner that crafts hyper-personalized itineraries. Plan smarter, travel better.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <ToastContainer />
      </body>
    </html>
  )
}
