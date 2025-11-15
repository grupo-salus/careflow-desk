'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import chamadosData from '@/data/chamados.json'

export default function Home() {
  const [filtroAtivo, setFiltroAtivo] = useState<string>('todos')
  const [chamados] = useState(chamadosData)

  const handleFilterChange = (filtro: string) => {
    setFiltroAtivo(filtro)
  }

  const handleCriarChamado = () => {
    // Não faz nada inicialmente
    console.log('Criar chamado clicado')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar
          onFilterChange={handleFilterChange}
          onCriarChamado={handleCriarChamado}
        />
        <MainContent chamados={chamados} filtroAtivo={filtroAtivo} />
      </div>
    </div>
  )
}

