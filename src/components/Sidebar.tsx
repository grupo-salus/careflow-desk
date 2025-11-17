'use client'

import { useState, useEffect } from 'react'

interface SidebarProps {
  isOpen?: boolean
  isCollapsed?: boolean
  onClose?: () => void
  onFilterChange?: (filter: string) => void
  onCriarChamado?: () => void
  onCriarChamadoCritico?: () => void
}

export default function Sidebar({ 
  isOpen = false,
  isCollapsed = false,
  onClose,
  onFilterChange, 
  onCriarChamado,
  onCriarChamadoCritico
}: SidebarProps) {
  const [filtroAtivo, setFiltroAtivo] = useState<string>('todos')

  useEffect(() => {
    // Só bloqueia scroll em mobile quando sidebar está aberto
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleFilterClick = (filtro: string) => {
    setFiltroAtivo(filtro)
    onFilterChange?.(filtro)
    // Fechar sidebar em mobile após selecionar filtro
    if (window.innerWidth < 1024) {
      onClose?.()
    }
  }

  return (
    <>
      {/* Sidebar */}
      <aside
        className={`
          fixed top-[73px] left-0 h-[calc(100vh-73px)]
          bg-white border-r border-gray-200 
          flex flex-col z-50
          transform transition-all duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          ${isCollapsed ? 'w-80 lg:w-20' : 'w-80'}
          lg:translate-x-0
          overflow-hidden
        `}
      >
        <div className={`flex-1 overflow-y-auto ${isCollapsed ? 'p-6 lg:p-2' : 'p-6'}`}>
        <div className={`flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} mb-6`}>
          <svg
            className={`${isCollapsed ? 'w-5 h-5 lg:w-6 lg:h-6' : 'w-5 h-5'} text-gray-600`}
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
          <h2 className={`text-lg font-semibold text-gray-900 ${isCollapsed ? 'block lg:hidden' : 'block'}`}>Filtros</h2>
        </div>

        {/* Botão Criar Chamado */}
        <button
          onClick={() => {
            onCriarChamado?.()
            if (window.innerWidth < 1024) {
              onClose?.()
            }
          }}
          className={`w-full mb-4 ${isCollapsed ? 'px-4 py-3 lg:px-2 lg:py-3' : 'px-4 py-3'} bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center ${isCollapsed ? 'justify-center gap-2 lg:justify-center' : 'justify-center gap-2'}`}
          title={isCollapsed ? "Criar Chamado" : undefined}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isCollapsed ? "w-5 h-5 lg:w-6 lg:h-6" : "w-5 h-5"}
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
          <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Criar Chamado</span>
        </button>

        {/* Filtros */}
        <div className="space-y-1">
          <button
            onClick={() => handleFilterClick('todos')}
            className={`w-full ${isCollapsed ? 'text-left px-4 lg:text-center lg:px-2' : 'text-left px-4'} py-2 text-sm transition-all duration-200 flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} relative border-b-2 ${
              filtroAtivo === 'todos'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
            title={isCollapsed ? "Todos os Chamados" : undefined}
          >
            <svg
              className={isCollapsed ? "w-4 h-4 lg:w-5 lg:h-5" : "w-4 h-4"}
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
            <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Todos os Chamados</span>
          </button>
          <button
            onClick={() => handleFilterClick('novo')}
            className={`w-full ${isCollapsed ? 'text-left px-4 lg:text-center lg:px-2' : 'text-left px-4'} py-2 text-sm transition-all duration-200 flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} relative border-b-2 ${
              filtroAtivo === 'novo'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
            title={isCollapsed ? "Novo" : undefined}
          >
            <svg
              className={isCollapsed ? "w-4 h-4 lg:w-5 lg:h-5" : "w-4 h-4"}
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
            <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Novo</span>
          </button>
          <button
            onClick={() => handleFilterClick('em_andamento')}
            className={`w-full ${isCollapsed ? 'text-left px-4 lg:text-center lg:px-2' : 'text-left px-4'} py-2 text-sm transition-all duration-200 flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} relative border-b-2 ${
              filtroAtivo === 'em_andamento'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
            title={isCollapsed ? "Em Andamento" : undefined}
          >
            <svg
              className={isCollapsed ? "w-4 h-4 lg:w-5 lg:h-5" : "w-4 h-4"}
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
            <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Em Andamento</span>
          </button>
          <button
            onClick={() => handleFilterClick('aguardando_retorno')}
            className={`w-full ${isCollapsed ? 'text-left px-4 lg:text-center lg:px-2' : 'text-left px-4'} py-2 text-sm transition-all duration-200 flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} relative border-b-2 ${
              filtroAtivo === 'aguardando_retorno'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
            title={isCollapsed ? "Aguardando Retorno do Franqueado" : undefined}
          >
            <svg
              className={isCollapsed ? "w-4 h-4 lg:w-5 lg:h-5" : "w-4 h-4"}
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
            <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Aguardando Retorno do Franqueado</span>
          </button>
          <button
            onClick={() => handleFilterClick('concluido')}
            className={`w-full ${isCollapsed ? 'text-left px-4 lg:text-center lg:px-2' : 'text-left px-4'} py-2 text-sm transition-all duration-200 flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} relative border-b-2 ${
              filtroAtivo === 'concluido'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
            title={isCollapsed ? "Concluído" : undefined}
          >
            <svg
              className={isCollapsed ? "w-4 h-4 lg:w-5 lg:h-5" : "w-4 h-4"}
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
            <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Concluído</span>
          </button>
          <button
            onClick={() => handleFilterClick('cancelado')}
            className={`w-full ${isCollapsed ? 'text-left px-4 lg:text-center lg:px-2' : 'text-left px-4'} py-2 text-sm transition-all duration-200 flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} relative border-b-2 ${
              filtroAtivo === 'cancelado'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
            title={isCollapsed ? "Cancelado" : undefined}
          >
            <svg
              className={isCollapsed ? "w-4 h-4 lg:w-5 lg:h-5" : "w-4 h-4"}
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
            <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Cancelado</span>
          </button>
          <button
            onClick={() => handleFilterClick('critico')}
            className={`w-full ${isCollapsed ? 'text-left px-4 lg:text-center lg:px-2' : 'text-left px-4'} py-2 text-sm transition-all duration-200 flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} relative border-b-2 ${
              filtroAtivo === 'critico'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
            title={isCollapsed ? "Crítico" : undefined}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={isCollapsed ? "w-4 h-4 lg:w-5 lg:h-5" : "w-4 h-4"}
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
            <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Crítico</span>
          </button>
          <button
            onClick={() => handleFilterClick('atrasado')}
            className={`w-full ${isCollapsed ? 'text-left px-4 lg:text-center lg:px-2' : 'text-left px-4'} py-2 text-sm transition-all duration-200 flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} relative border-b-2 ${
              filtroAtivo === 'atrasado'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
            title={isCollapsed ? "Atrasados" : undefined}
          >
            <svg
              className={isCollapsed ? "w-4 h-4 lg:w-5 lg:h-5" : "w-4 h-4"}
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
            <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Atrasados</span>
          </button>
          <button
            onClick={() => handleFilterClick('nao_lidas')}
            className={`w-full ${isCollapsed ? 'text-left px-4 lg:text-center lg:px-2' : 'text-left px-4'} py-2 text-sm transition-all duration-200 flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} relative border-b-2 ${
              filtroAtivo === 'nao_lidas'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
            title={isCollapsed ? "Mensagens Não Lidas" : undefined}
          >
            <svg
              className={isCollapsed ? "w-4 h-4 lg:w-5 lg:h-5" : "w-4 h-4"}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Mensagens Não Lidas</span>
          </button>
          <button
            onClick={() => handleFilterClick('projetos')}
            className={`w-full ${isCollapsed ? 'text-left px-4 lg:text-center lg:px-2' : 'text-left px-4'} py-2 text-sm transition-all duration-200 flex items-center ${isCollapsed ? 'gap-2 lg:justify-center' : 'gap-2'} relative border-b-2 ${
              filtroAtivo === 'projetos'
                ? 'text-orange-500 border-orange-500'
                : 'text-gray-700 hover:text-orange-500 border-transparent'
            }`}
            title={isCollapsed ? "Projetos" : undefined}
          >
            <svg
              className={isCollapsed ? "w-4 h-4 lg:w-5 lg:h-5" : "w-4 h-4"}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Projetos</span>
          </button>
        </div>
      </div>

      {/* Footer com Botão Criar Chamado Crítico */}
      <div className={`flex-shrink-0 ${isCollapsed ? 'p-6 lg:p-2' : 'p-6'} border-t border-gray-200 bg-white`}>
        <button
          onClick={() => {
            onCriarChamadoCritico?.()
            if (window.innerWidth < 1024) {
              onClose?.()
            }
          }}
          className={`w-full ${isCollapsed ? 'px-4 py-3 lg:px-2 lg:py-3' : 'px-4 py-3'} bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center ${isCollapsed ? 'justify-center gap-2 lg:justify-center' : 'justify-center gap-2'}`}
          title={isCollapsed ? "Criar Chamado Crítico" : undefined}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={isCollapsed ? "w-5 h-5 lg:w-6 lg:h-6" : "w-5 h-5"}
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
          <span className={isCollapsed ? 'block lg:hidden' : 'block'}>Crítico</span>
        </button>
      </div>
    </aside>
    </>
  )
}

