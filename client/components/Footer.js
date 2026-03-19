import Link from 'next/link'
import { Compass } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-midnight-800/50 border-t border-midnight-700/50 text-midnight-200 py-16 relative">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 mb-12">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-3 mb-5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold-deep rounded-xl flex items-center justify-center transition-transform group-hover:scale-110">
                <Compass className="w-5 h-5 text-midnight-900" />
              </div>
              <span className="text-xl font-display font-bold text-white">
                Tripo<span className="text-gold">-AI</span>
              </span>
            </Link>
            <p className="text-midnight-400 text-sm max-w-md leading-relaxed">
              AI-powered travel intelligence that creates hyper-personalized itineraries for your perfect journey. Plan smarter, travel better.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-midnight-300 mb-5">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-midnight-400 hover:text-gold transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-midnight-400 hover:text-gold transition-colors text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-midnight-700/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-midnight-500 text-sm">
            © {currentYear} Tripo-AI. All rights reserved.
          </p>
          <div className="flex gap-6">
            {['Twitter', 'Facebook', 'Instagram'].map((social) => (
              <a
                key={social}
                href={`https://${social.toLowerCase()}.com`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-midnight-500 hover:text-gold transition-colors text-sm"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
