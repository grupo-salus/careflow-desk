import { useState, useEffect } from 'react'

interface HeaderProps {
  isSidebarOpen: boolean
  onToggleSidebar: () => void
}

export default function Header({ isSidebarOpen, onToggleSidebar }: HeaderProps) {
  const [isSystemMenuOpen, setIsSystemMenuOpen] = useState(false)

  useEffect(() => {
    if (isSystemMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isSystemMenuOpen])

  return (
    <>
      <header className="bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 md:px-6 py-4">
          {/* Logo and Sidebar Toggle */}
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={onToggleSidebar}
              className="p-2 hover:bg-gray-100 rounded transition-colors"
              aria-label={isSidebarOpen ? "Fechar sidebar" : "Abrir sidebar"}
            >
              {isSidebarOpen ? (
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
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
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
              )}
            </button>
            <img
              src={`${import.meta.env.BASE_URL}careflow-logo.png`}
              alt="CareFlow Logo"
              className="h-8"
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
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
              <span><span className="text-gray-900">CareFlow</span><span className="text-orange-500">Nexus</span></span>
            </a>
          </nav>

          {/* Desktop User Info */}
          <div className="hidden lg:flex items-center gap-3">
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

          {/* Mobile System Menu Toggle */}
          <button
            onClick={() => setIsSystemMenuOpen(!isSystemMenuOpen)}
            className="p-2 hover:bg-gray-100 rounded transition-colors lg:hidden"
            aria-label={isSystemMenuOpen ? "Fechar menu" : "Abrir menu"}
          >
            {isSystemMenuOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
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
            )}
          </button>
        </div>
      </header>

      {/* Mobile System Menu Modal */}
      <div className="fixed inset-0 z-50 lg:hidden pointer-events-none">
        <div
          className={`fixed right-0 top-[73px] h-[calc(100vh-73px)] w-80 bg-white shadow-xl flex flex-col transform transition-transform duration-300 ease-in-out pointer-events-auto ${
            isSystemMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
            {/* User Info no topo */}
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center text-white font-semibold">
                  A
                </div>
                <div className="flex flex-col flex-1">
                  <span className="text-sm font-medium text-gray-900">
                    Administrador do Sistema
                  </span>
                  <span className="text-xs text-gray-500">ADMIN</span>
                </div>
              </div>
            </div>

            {/* Navigation Links - Módulos */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-2">
              <a
                href="#"
                onClick={() => setIsSystemMenuOpen(false)}
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
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
                onClick={() => setIsSystemMenuOpen(false)}
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
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
                onClick={() => setIsSystemMenuOpen(false)}
                className="flex items-center gap-3 p-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center">
                  <img
                    src="https://api.iconify.design/mdi:headset.svg?color=%23ffffff"
                    alt="Service Desk"
                    className="w-4 h-4"
                  />
                </div>
                <span><span className="text-gray-900">CareFlow</span><span className="text-orange-500">Nexus</span></span>
              </a>
            </nav>

            {/* Botão de Logout no final */}
            <div className="p-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setIsSystemMenuOpen(false)
                  // Aqui você pode adicionar a lógica de logout
                }}
                className="w-full flex items-center justify-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
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
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                  <polyline points="16 17 21 12 16 7"></polyline>
                  <line x1="21" y1="12" x2="9" y2="12"></line>
                </svg>
                Sair
              </button>
            </div>
          </div>
      </div>
    </>
  )
}

