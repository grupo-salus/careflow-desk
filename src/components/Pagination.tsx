'use client'

import { useState, useEffect } from 'react'

interface PaginationProps {
  currentPage: number
  totalItems: number
  itemsPerPage: number
  onPageChange: (page: number) => void
}

export default function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange
}: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getPageNumbers = () => {
    const pages: (number | string)[] = []
    const maxVisible = isMobile ? 3 : 5

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      if (isMobile) {
        // Mobile: mostrar apenas página atual e adjacentes
        if (currentPage === 1) {
          pages.push(1, 2, totalPages > 2 ? 3 : 2)
        } else if (currentPage === totalPages) {
          pages.push(totalPages > 2 ? totalPages - 2 : 1, totalPages - 1, totalPages)
        } else {
          pages.push(currentPage - 1, currentPage, currentPage + 1)
        }
      } else {
        // Desktop: mostrar mais páginas
        if (currentPage <= 3) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i)
          }
        } else if (currentPage >= totalPages - 2) {
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i)
          }
        } else {
          for (let i = currentPage - 2; i <= currentPage + 2; i++) {
            pages.push(i)
          }
        }
      }
    }

    return pages
  }

  const pageNumbers = getPageNumbers()

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-0 mt-4 md:mt-6">
      <p className="text-xs md:text-sm text-gray-600 text-center md:text-left">
        Mostrando {startItem} a {endItem} de {totalItems} chamado{totalItems !== 1 ? 's' : ''}
      </p>
      <nav className="flex items-center justify-center gap-1 md:gap-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-2 md:px-3 py-1.5 rounded border border-gray-200 text-xs md:text-sm font-medium transition-colors ${
            currentPage === 1
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-label="Página anterior"
        >
          <div className="flex items-center gap-1">
            <span className="hidden md:inline">Anterior</span>
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
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
        </button>

        {pageNumbers.map((page, index) => {
          if (typeof page === 'string') {
            return (
              <span key={index} className="px-1 md:px-2 text-gray-400 text-xs md:text-sm">
                ...
              </span>
            )
          }

          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-2 md:px-3 py-1.5 rounded border text-xs md:text-sm font-medium transition-colors ${
                currentPage === page
                  ? 'bg-orange-50 border-orange-200 text-orange-600'
                  : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
              }`}
            >
              {page}
            </button>
          )
        })}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-2 md:px-3 py-1.5 rounded border border-gray-200 text-xs md:text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? 'bg-gray-50 text-gray-400 cursor-not-allowed'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
          aria-label="Próxima página"
        >
          <div className="flex items-center gap-1">
            <span className="hidden md:inline">Próximo</span>
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
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        </button>
      </nav>
    </div>
  )
}

