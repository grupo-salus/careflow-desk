'use client'

export default function Sidebar() {
  return (
    <aside className="w-80 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)]">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-6">
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
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          <h2 className="text-lg font-semibold text-gray-900">Filtros</h2>
        </div>
        {/* Estrutura do sidebar - conteúdo vazio conforme solicitado */}
      </div>
    </aside>
  )
}

