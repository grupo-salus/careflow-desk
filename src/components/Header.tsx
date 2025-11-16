import careflowLogo from '../careflow-logo.png'

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo and Sidebar Toggle */}
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded transition-colors">
            <svg
              className="w-5 h-5 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
          <img
            src={careflowLogo}
            alt="CareFlow Logo"
            className="h-8"
          />
        </div>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <a
            href="#"
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect width="20" height="14" x="2" y="7" rx="2" ry="2"></rect>
              <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
            </svg>
            Portfólio
          </a>
          <a
            href="#"
            className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-5 h-5"
            >
              <rect width="16" height="20" x="4" y="2" rx="2"></rect>
              <line x1="8" x2="16" y1="6" y2="6"></line>
              <line x1="16" x2="16" y1="14" y2="18"></line>
              <path d="M16 10h.01"></path>
              <path d="M12 10h.01"></path>
              <path d="M8 10h.01"></path>
              <path d="M12 14h.01"></path>
              <path d="M8 14h.01"></path>
              <path d="M12 18h.01"></path>
              <path d="M8 18h.01"></path>
            </svg>
            Calculadora
          </a>
          <a
            href="/"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-orange-50 font-medium transition-all duration-200"
          >
            <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
              <img
                src="https://api.iconify.design/mdi:headset.svg?color=%23ffffff"
                alt="Service Desk"
                className="w-4 h-4"
              />
            </div>
            <span><span className="text-gray-900">CareFlow</span><span className="text-orange-500">Desk</span></span>
          </a>
        </nav>

        {/* User Info */}
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 hover:bg-gray-50 rounded-lg px-2 py-1 transition-colors">
            <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
              A
            </div>
            <div className="flex flex-col text-left">
              <span className="text-sm font-medium text-gray-900">
                Administrador do Sistema
              </span>
              <span className="text-xs text-gray-500">ADMIN</span>
            </div>
            <svg
              className="w-4 h-4 text-gray-400 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

