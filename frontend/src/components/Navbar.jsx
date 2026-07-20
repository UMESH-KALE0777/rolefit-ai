import { Brain } from 'lucide-react'

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950 border-b border-gray-800">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">

                {/* Logo */}
                <div className="flex items-center gap-2">
                    <Brain className="text-blue-500" size={28} />
                    <span className="text-white font-bold text-xl">
                        RoleFit <span className="text-blue-500">AI</span>
                    </span>
                </div>

                {/* Links */}
                <div className="flex items-center gap-6">

          <a
            href="https://github.com/UMESH-KALE0777/rolefit-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white text-sm transition-colors"
          >
            GitHub
          </a>

          <a
            href="#analyze"
            className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg transition-colors"
          >
            Try Free
          </a>
        </div>

      </div >
    </nav >
  )
}