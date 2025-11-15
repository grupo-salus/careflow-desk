'use client'

import { useState, useEffect } from 'react'
import Select from '@/components/Select'
import Pagination from '@/components/Pagination'

interface Chamado {
  id: string
  titulo: string
  descricao: string
  prioridade: string
  status: string
  categoria: string
  dataAbertura: string
  dataAtualizacao: string
  franqueado: string
  responsavel: string
  tempoResolucao: string | null
  sla: string
}

interface MainContentProps {
  chamados: Chamado[]
  filtroAtivo: string
}

export default function MainContent({ chamados, filtroAtivo }: MainContentProps) {
  const [statusFiltro, setStatusFiltro] = useState<string>('todos')
  const [ordenacao, setOrdenacao] = useState<string>('data_recente')
  const [busca, setBusca] = useState<string>('')
  const [modoVisualizacao, setModoVisualizacao] = useState<'cards' | 'tabela'>('cards')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const itemsPerPage = 10

  // Sincronizar o filtro do Select com o filtro do sidebar
  useEffect(() => {
    if (filtroAtivo !== 'todos' && filtroAtivo !== 'critico' && filtroAtivo !== 'atrasado') {
      setStatusFiltro(filtroAtivo)
    } else if (filtroAtivo === 'todos') {
      setStatusFiltro('todos')
    } else if (filtroAtivo === 'critico' || filtroAtivo === 'atrasado') {
      setStatusFiltro(filtroAtivo)
    }
  }, [filtroAtivo])

  const filtrarChamados = () => {
    let resultado = chamados

    // Filtro por prioridade crítica (do sidebar ou do topo)
    if (filtroAtivo === 'critico' || statusFiltro === 'critico') {
      resultado = resultado.filter(c => c.prioridade === 'crítico')
    }
    // Filtro por atrasados (do sidebar ou do topo)
    else if (filtroAtivo === 'atrasado' || statusFiltro === 'atrasado') {
      resultado = resultado.filter(c => {
        const agora = new Date()
        const dataSla = new Date(c.sla)
        return agora > dataSla
      })
    }
    // Filtro por status (do sidebar ou do topo)
    else if (filtroAtivo !== 'todos') {
      resultado = resultado.filter(c => c.status === filtroAtivo)
    } else if (statusFiltro !== 'todos') {
      resultado = resultado.filter(c => c.status === statusFiltro)
    }

    // Busca por ID ou título
    if (busca.trim() !== '') {
      const termoBusca = busca.toLowerCase().trim()
      resultado = resultado.filter(c => 
        c.id.toLowerCase().includes(termoBusca) || 
        c.titulo.toLowerCase().includes(termoBusca)
      )
    }

    // Ordenação
    resultado = [...resultado].sort((a, b) => {
      switch (ordenacao) {
        case 'data_recente':
          return new Date(b.dataAtualizacao).getTime() - new Date(a.dataAtualizacao).getTime()
        case 'data_antiga':
          return new Date(a.dataAtualizacao).getTime() - new Date(b.dataAtualizacao).getTime()
        case 'prioridade':
          const prioridadeOrder = { 'crítico': 3, 'normal': 2, 'baixa': 1 }
          return (prioridadeOrder[b.prioridade as keyof typeof prioridadeOrder] || 0) - 
                 (prioridadeOrder[a.prioridade as keyof typeof prioridadeOrder] || 0)
        case 'titulo':
          return a.titulo.localeCompare(b.titulo)
        default:
          return 0
      }
    })

    return resultado
  }

  const chamadosFiltrados = filtrarChamados()
  
  // Paginação
  const totalPages = Math.ceil(chamadosFiltrados.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const chamadosPaginados = chamadosFiltrados.slice(startIndex, endIndex)

  // Resetar página quando filtros mudarem
  useEffect(() => {
    setCurrentPage(1)
  }, [statusFiltro, ordenacao, busca, filtroAtivo])

  const getPrioridadeLabel = (prioridade: string) => {
    switch (prioridade) {
      case 'crítico':
        return 'Crítico'
      case 'normal':
        return 'Normal'
      case 'baixa':
        return 'Baixa'
      default:
        return 'Média'
    }
  }

  const getPrioridadeColor = (prioridade: string) => {
    switch (prioridade) {
      case 'crítico':
        return 'text-red-600'
      case 'normal':
        return 'text-blue-600'
      case 'baixa':
        return 'text-gray-600'
      default:
        return 'text-gray-500'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'novo':
        return 'bg-blue-50 text-blue-700 border border-blue-200'
      case 'em_andamento':
        return 'bg-gray-50 text-gray-700 border border-gray-200'
      case 'aguardando_retorno':
        return 'bg-yellow-50 text-yellow-700 border border-yellow-200'
      case 'concluido':
        return 'bg-green-50 text-green-700 border border-green-200'
      case 'cancelado':
        return 'bg-gray-50 text-gray-700 border border-gray-200'
      default:
        return 'bg-gray-50 text-gray-700 border border-gray-200'
    }
  }

  const formatarData = (data: string) => {
    return new Date(data).toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const isSlaAtrasado = (sla: string) => {
    const agora = new Date()
    const dataSla = new Date(sla)
    return agora > dataSla
  }

  const calcularTempoSla = (sla: string) => {
    const agora = new Date()
    const dataSla = new Date(sla)
    const diff = dataSla.getTime() - agora.getTime()
    
    if (diff < 0) {
      const horasAtrasado = Math.abs(Math.floor(diff / (1000 * 60 * 60)))
      const minutosAtrasado = Math.abs(Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)))
      return { atrasado: true, texto: `${horasAtrasado}h ${minutosAtrasado}m atrasado` }
    }
    
    const horas = Math.floor(diff / (1000 * 60 * 60))
    const minutos = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))
    
    if (horas > 0) {
      return { atrasado: false, texto: `${horas}h ${minutos}m restantes` }
    }
    return { atrasado: minutos < 60, texto: `${minutos}m restantes` }
  }

  return (
    <main className="flex-1 p-6 bg-gray-50 min-h-[calc(100vh-73px)]">
      {/* Título com ícone - FORA do container branco */}
      <div className="mb-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center">
            <img
              src="https://api.iconify.design/mdi:headset.svg?color=%23ffffff"
              alt="Service Desk"
              className="w-6 h-6"
            />
          </div>
          <h1 className="text-2xl font-bold">
            <span className="text-gray-900">CareFlow</span>
            <span className="text-orange-500">Desk</span>
          </h1>
        </div>
      </div>

      {/* Container branco com todo o conteúdo */}
      <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col max-h-[calc(100vh-200px)]">
        <div className="flex-1 overflow-y-auto">
        <div className="mb-6 flex items-center gap-6">
          <p className="text-gray-600">
            {chamadosFiltrados.length} chamado{chamadosFiltrados.length !== 1 ? 's' : ''} encontrado{chamadosFiltrados.length !== 1 ? 's' : ''}
          </p>

          {/* Totalizadores inline */}
          <div className="flex items-center gap-4 text-sm flex-wrap">
            <span className="bg-gray-50 px-3 py-1.5 rounded text-gray-600">
              Total: <span className="font-semibold text-gray-900">{chamados.length}</span>
            </span>
            <span className="bg-gray-50 px-3 py-1.5 rounded text-gray-600">
              Novo: <span className="font-semibold text-gray-900">
                {chamados.filter(c => c.status === 'novo').length}
              </span>
            </span>
            <span className="bg-gray-50 px-3 py-1.5 rounded text-gray-600">
              Em Andamento: <span className="font-semibold text-gray-900">
                {chamados.filter(c => c.status === 'em_andamento').length}
              </span>
            </span>
            <span className="bg-gray-50 px-3 py-1.5 rounded text-gray-600">
              Aguardando Retorno: <span className="font-semibold text-gray-900">
                {chamados.filter(c => c.status === 'aguardando_retorno').length}
              </span>
            </span>
            <span className="bg-gray-50 px-3 py-1.5 rounded text-gray-600">
              Concluído: <span className="font-semibold text-gray-900">
                {chamados.filter(c => c.status === 'concluido').length}
              </span>
            </span>
            <span className="bg-gray-50 px-3 py-1.5 rounded text-gray-600">
              Cancelado: <span className="font-semibold text-gray-900">
                {chamados.filter(c => c.status === 'cancelado').length}
              </span>
            </span>
          </div>
        </div>

      {/* Filtros, Pesquisa e Ordenação */}
      <div className="mb-6 flex items-center gap-4">
        {/* Filtro por Status - Esquerda */}
        <div className="w-[280px]">
          <Select
            value={statusFiltro}
            onChange={setStatusFiltro}
            icon={
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
                  d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                />
              </svg>
            }
                  options={[
                    { value: 'todos', label: 'Todos' },
                    { value: 'novo', label: 'Novo' },
                    { value: 'em_andamento', label: 'Em Andamento' },
                    { value: 'aguardando_retorno', label: 'Aguardando Retorno do Franqueado' },
                    { value: 'concluido', label: 'Concluído' },
                    { value: 'cancelado', label: 'Cancelado' },
                    { value: 'critico', label: 'Crítico' },
                    { value: 'atrasado', label: 'Atrasados' },
                  ]}
          />
        </div>

        {/* Barra de Pesquisa - Centro */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Pesquisar por ID ou título..."
            className="w-full pl-10 pr-4 py-1.5 bg-white border border-gray-200 rounded focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 text-sm"
          />
        </div>

        {/* Ordenação e Visualização - Direita */}
        <div className="flex items-center gap-3">
          <div className="w-[200px]">
            <Select
              value={ordenacao}
              onChange={setOrdenacao}
              icon={
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
                    d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"
                  />
                </svg>
              }
              options={[
                { value: 'data_recente', label: 'Data (Mais Recente)' },
                { value: 'data_antiga', label: 'Data (Mais Antiga)' },
                { value: 'prioridade', label: 'Prioridade' },
                { value: 'titulo', label: 'Título (A-Z)' },
              ]}
            />
          </div>

          {/* Toggle Visualização */}
          <div className="flex items-center gap-1 bg-gray-100 rounded p-1">
            <button
              onClick={() => setModoVisualizacao('cards')}
              className={`p-1.5 rounded transition-colors ${
                modoVisualizacao === 'cards'
                         ? 'bg-white text-orange-500 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Visualização em Cards"
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
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </button>
            <button
              onClick={() => setModoVisualizacao('tabela')}
              className={`p-1.5 rounded transition-colors ${
                modoVisualizacao === 'tabela'
                         ? 'bg-white text-orange-500 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              title="Visualização em Tabela"
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
                  d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Visualização em Cards */}
      {modoVisualizacao === 'cards' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {chamadosPaginados.map((chamado) => {
            const slaAtrasado = isSlaAtrasado(chamado.sla)
            const tempoSla = calcularTempoSla(chamado.sla)
            
            return (
            <div
              key={chamado.id}
              className="rounded-lg p-4 cursor-pointer border border-gray-200 bg-white card-hover-gradient"
            >
            {/* Header com ID e Badges */}
            <div className="flex items-start justify-between mb-3">
              <span className="text-xs font-mono text-gray-500">{chamado.id}</span>
              <div className="flex items-center gap-2">
                {chamado.prioridade === 'crítico' && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                    Crítico
                  </span>
                )}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                    chamado.status
                  )}`}
                >
                  {chamado.status === 'aguardando_retorno' 
                    ? 'AGUARDANDO RETORNO DO FRANQUEADO'
                    : chamado.status === 'em_andamento'
                    ? 'EM ANDAMENTO'
                    : chamado.status.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Título */}
            <h3 className="text-base font-semibold text-gray-900 mb-2 line-clamp-2">
              {chamado.titulo}
            </h3>

            {/* Descrição */}
            <p className="text-sm text-gray-600 mb-4 line-clamp-1">
              {chamado.descricao}
            </p>

            {/* Datas e SLA */}
            <div className="mt-3 pt-3 border-t border-gray-100 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <span className="font-medium">Criado:</span>
                <span>{formatarData(chamado.dataAbertura)}</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <svg
                  className="w-3 h-3"
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
                <span className="font-medium">Última atualização:</span>
                <span>{formatarData(chamado.dataAtualizacao)}</span>
              </div>
              <div className={`flex items-center gap-2 text-xs font-medium ${
                slaAtrasado ? 'text-red-600' : tempoSla.atrasado ? 'text-orange-600' : 'text-gray-600'
              }`}>
                <svg
                  className="w-3 h-3"
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
                <span>SLA:</span>
                <span>{tempoSla.texto}</span>
                {slaAtrasado && (
                  <span className="ml-1 px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                    ATRASADO
                  </span>
                )}
              </div>
            </div>
          </div>
            )})}

          {chamadosFiltrados.length === 0 && (
            <div className="col-span-full bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">
                Nenhum chamado encontrado com o filtro selecionado.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Paginação - Cards */}
      {modoVisualizacao === 'cards' && chamadosFiltrados.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalItems={chamadosFiltrados.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

            {/* Visualização em Tabela */}
            {modoVisualizacao === 'tabela' && (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">ID</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Título</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Prioridade</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Status</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">SLA</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Criado</th>
                      <th className="text-left py-3 px-4 text-xs font-semibold text-gray-600 uppercase">Atualizado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {chamadosPaginados.map((chamado) => {
                const slaAtrasado = isSlaAtrasado(chamado.sla)
                const tempoSla = calcularTempoSla(chamado.sla)
                
                return (
                  <tr
                    key={chamado.id}
                    className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <td className="py-3 px-4 text-xs font-mono text-gray-500">{chamado.id}</td>
                    <td className="py-3 px-4">
                      <div className="max-w-xs">
                        <div className="text-sm font-medium text-gray-900 truncate">{chamado.titulo}</div>
                        <div className="text-xs text-gray-500 truncate mt-0.5">{chamado.descricao}</div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className={`text-xs font-medium ${getPrioridadeColor(chamado.prioridade)}`}>
                        {getPrioridadeLabel(chamado.prioridade)}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          chamado.status
                        )}`}
                      >
                        {chamado.status === 'aguardando_retorno' 
                          ? 'AGUARDANDO RETORNO DO FRANQUEADO'
                          : chamado.status === 'em_andamento'
                          ? 'EM ANDAMENTO'
                          : chamado.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <div className={`text-xs font-medium ${
                        slaAtrasado ? 'text-red-600' : tempoSla.atrasado ? 'text-orange-600' : 'text-gray-600'
                      }`}>
                        <div>{tempoSla.texto}</div>
                        {slaAtrasado && (
                          <span className="mt-1 inline-block px-1.5 py-0.5 bg-red-100 text-red-700 rounded text-xs font-semibold">
                            ATRASADO
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-xs text-gray-500">{formatarData(chamado.dataAbertura)}</td>
                    <td className="py-3 px-4 text-xs text-gray-500">{formatarData(chamado.dataAtualizacao)}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          {chamadosFiltrados.length === 0 && (
            <div className="bg-gray-50 rounded-lg border border-gray-200 p-12 text-center">
              <p className="text-gray-500 text-lg">
                Nenhum chamado encontrado com o filtro selecionado.
              </p>
            </div>
          )}
        </div>
      )}

      {/* Paginação - Tabela */}
      {modoVisualizacao === 'tabela' && chamadosFiltrados.length > 0 && (
        <div className="mt-6">
          <Pagination
            currentPage={currentPage}
            totalItems={chamadosFiltrados.length}
            itemsPerPage={itemsPerPage}
            onPageChange={setCurrentPage}
          />
        </div>
      )}
        </div>
      </div>
    </main>
  )
}

