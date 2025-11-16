'use client'

import { useState } from 'react'

interface SidebarProps {
  onFilterChange?: (filter: string) => void
  onCriarChamado?: () => void
  onCriarChamadoCritico?: () => void
}

export default function Sidebar({ 
  onFilterChange, 
  onCriarChamado,
  onCriarChamadoCritico
}: SidebarProps) {
  const [filtroAtivo, setFiltroAtivo] = useState<string>('todos')

  const handleFilterClick = (filtro: string) => {
    setFiltroAtivo(filtro)
    onFilterChange?.(filtro)
  }

  return (
    <aside className="w-80 bg-white border-r border-gray-200 min-h-[calc(100vh-73px)] flex flex-col">
      <div className="p-6 flex-1">
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

        {/* Botão Criar Chamado */}
        <button
          onClick={onCriarChamado}
          className="w-full mb-4 px-4 py-3 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
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
          >
            <path d="M5 12h14"></path>
            <path d="M12 5v14"></path>
          </svg>
          Criar Chamado
        </button>

        {/* Filtros */}
        <div className="space-y-1">
          <button
            onClick={() => handleFilterClick('todos')}
            className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2 relative border-b-2 ${
              filtroAtivo === 'todos'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>Todos os Chamados</span>
          </button>
          <button
            onClick={() => handleFilterClick('novo')}
            className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2 relative border-b-2 ${
              filtroAtivo === 'novo'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <span>Novo</span>
          </button>
          <button
            onClick={() => handleFilterClick('em_andamento')}
            className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2 relative border-b-2 ${
              filtroAtivo === 'em_andamento'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Em Andamento</span>
          </button>
          <button
            onClick={() => handleFilterClick('aguardando_retorno')}
            className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2 relative border-b-2 ${
              filtroAtivo === 'aguardando_retorno'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              />
            </svg>
            <span>Aguardando Retorno do Franqueado</span>
          </button>
          <button
            onClick={() => handleFilterClick('concluido')}
            className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2 relative border-b-2 ${
              filtroAtivo === 'concluido'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <span>Concluído</span>
          </button>
          <button
            onClick={() => handleFilterClick('cancelado')}
            className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2 relative border-b-2 ${
              filtroAtivo === 'cancelado'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
          >
            <svg
              className="w-4 h-4"
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
            <span>Cancelado</span>
          </button>
          <button
            onClick={() => handleFilterClick('critico')}
            className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2 relative border-b-2 ${
              filtroAtivo === 'critico'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            <span>Crítico</span>
          </button>
          <button
            onClick={() => handleFilterClick('atrasado')}
            className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center gap-2 relative border-b-2 ${
              filtroAtivo === 'atrasado'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Atrasados</span>
          </button>
        </div>
      </div>

      {/* Footer com Botão Criar Chamado Crítico */}
      <div className="p-6 border-t border-gray-200">
        <button
          onClick={onCriarChamadoCritico}
          className="w-full px-4 py-3 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
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
          >
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
            <line x1="12" y1="9" x2="12" y2="13"></line>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          Crítico
        </button>
      </div>
    </aside>
  )
}

