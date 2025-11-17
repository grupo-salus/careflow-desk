'use client'

import React, { useState, useRef } from 'react'
import motivosAberturaData from '@/data/motivosAbertura.json'

interface MotivoAbertura {
  id: string
  titulo: string
  descricao: string
  textoInformativo: string
  categoria: string
  tempoEstimado: string
  projeto: boolean
}

interface AbrirChamadoModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (dados: {
    titulo: string
    descricao: string
    categoria: string
    motivoId: string
    anexos?: File[]
  }) => void
}

const motivosAbertura: MotivoAbertura[] = motivosAberturaData as MotivoAbertura[]

export default function AbrirChamadoModal({
  isOpen,
  onClose,
  onSubmit
}: AbrirChamadoModalProps) {
  const [etapa, setEtapa] = useState<1 | 2>(1)
  const [busca, setBusca] = useState<string>('')
  const [motivoSelecionado, setMotivoSelecionado] = useState<MotivoAbertura | null>(null)
  const [titulo, setTitulo] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [anexos, setAnexos] = useState<File[]>([])
  const [isAvisoExpanded, setIsAvisoExpanded] = useState<boolean>(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const motivosFiltrados = motivosAbertura.filter(motivo =>
    motivo.titulo.toLowerCase().includes(busca.toLowerCase()) ||
    motivo.descricao.toLowerCase().includes(busca.toLowerCase()) ||
    motivo.categoria.toLowerCase().includes(busca.toLowerCase())
  )

  const handleMotivoClick = (motivo: MotivoAbertura) => {
    setMotivoSelecionado(motivo)
    setIsAvisoExpanded(true) // Expandir aviso quando novo motivo for selecionado
    // Avançar para a etapa 2
    setEtapa(2)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      setAnexos([...anexos, ...filesArray])
    }
  }

  const handleRemoveFile = (index: number) => {
    setAnexos(anexos.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!motivoSelecionado || !titulo.trim() || !descricao.trim()) {
      return
    }

    onSubmit({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria: motivoSelecionado.categoria,
      motivoId: motivoSelecionado.id,
      anexos: anexos.length > 0 ? anexos : undefined
    })

    // Reset form
    setEtapa(1)
    setBusca('')
    setMotivoSelecionado(null)
    setTitulo('')
    setDescricao('')
    setAnexos([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClose = () => {
    setEtapa(1)
    setBusca('')
    setMotivoSelecionado(null)
    setTitulo('')
    setDescricao('')
    setAnexos([])
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onClose()
  }

  const handleVoltarEtapa1 = () => {
    setEtapa(1)
    setTitulo('')
    setDescricao('')
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 md:p-4">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-lg shadow-2xl w-full h-full md:h-[90vh] md:max-h-[90vh] max-w-6xl flex flex-col z-50 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-3 md:p-6 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center gap-4">
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">Abrir Novo Chamado</h2>
            {/* Indicador de Etapas */}
            <div className="flex items-center gap-2">
              <div className={`flex items-center gap-2 ${etapa >= 1 ? 'text-orange-500' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  etapa >= 1 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  1
                </div>
                <span className="text-xs md:text-sm font-medium hidden md:inline">Pesquisar</span>
              </div>
              <div className={`w-8 md:w-12 h-0.5 ${etapa >= 2 ? 'bg-orange-500' : 'bg-gray-300'}`} />
              <div className={`flex items-center gap-2 ${etapa >= 2 ? 'text-orange-500' : 'text-gray-400'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                  etapa >= 2 ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'
                }`}>
                  2
                </div>
                <span className="text-xs md:text-sm font-medium hidden md:inline">Abrir Chamado</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded transition-colors"
            title="Fechar"
          >
            <svg
              className="w-6 h-6 text-gray-600"
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
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col">
          {/* Etapa 1: Pesquisa e Seleção do Motivo */}
          {etapa === 1 && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Campo de Busca */}
              <div className="p-3 md:p-6 border-b border-gray-200">
                <div className="relative max-w-2xl mx-auto">
                  <svg
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
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
                  <input
                    type="text"
                    placeholder="Pesquisar motivo de abertura..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm md:text-base"
                  />
                </div>
              </div>

              {/* Grid de Motivos 4x4 */}
              <div className="flex-1 overflow-y-auto p-3 md:p-6">
                <div className="max-w-6xl mx-auto">
                  {motivosFiltrados.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                      {motivosFiltrados.map((motivo) => (
                        <button
                          key={motivo.id}
                          onClick={() => handleMotivoClick(motivo)}
                          className="text-left p-4 md:p-5 rounded-lg border-2 border-gray-200 hover:border-orange-300 hover:bg-orange-50 transition-all flex flex-col h-full"
                        >
                          <div className="flex-1 min-w-0">
                            {/* Alerta de Projeto */}
                            {motivo.projeto && (
                              <div className="mb-2 flex items-center gap-1.5 px-2 py-1 bg-orange-200 border border-orange-300 rounded text-xs font-medium text-orange-900">
                                <svg
                                  className="w-3 h-3 flex-shrink-0"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                  />
                                </svg>
                                <span>Projeto</span>
                              </div>
                            )}
                            <h3 className="font-semibold text-sm md:text-base text-gray-900 mb-2 line-clamp-2">{motivo.titulo}</h3>
                            <p className="text-xs md:text-sm text-gray-600 mb-3 line-clamp-3">{motivo.descricao}</p>
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="inline-block px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded">
                                {motivo.categoria}
                              </span>
                              <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
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
                                {motivo.tempoEstimado}h
                              </span>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-base md:text-lg">
                        Nenhum motivo encontrado com o termo "{busca}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer Etapa 1 */}
              <div className="border-t border-gray-200 p-3 md:p-6 flex items-center justify-end flex-shrink-0">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 md:px-6 py-2 text-sm md:text-base border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}

          {/* Etapa 2: Formulário de Abertura */}
          {etapa === 2 && motivoSelecionado && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Formulário */}
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto p-3 md:p-6">
                  <div className="max-w-4xl mx-auto w-full space-y-4 md:space-y-6">
                    {/* Título do Formulário - Nome do Motivo */}
                    <div className="flex items-center justify-between gap-3 pb-3 border-b border-gray-200">
                      <div className="flex items-center gap-2 flex-1 min-w-0">
                        <h2 className="text-base md:text-lg font-semibold text-gray-900 truncate">
                          {motivoSelecionado.titulo}
                        </h2>
                        <span className="hidden md:inline-block px-2 py-1 text-xs font-medium bg-orange-100 text-orange-700 rounded">
                          {motivoSelecionado.categoria}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={handleVoltarEtapa1}
                        className="p-1.5 hover:bg-gray-100 rounded transition-colors flex-shrink-0"
                        aria-label="Voltar para seleção de motivo"
                        title="Voltar"
                      >
                        <svg
                          className="w-4 h-4 text-gray-600"
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
                      </button>
                    </div>

                    {/* Texto Informativo - Acima do Formulário */}
                    <div 
                      className="bg-blue-50 border border-blue-200 rounded-lg p-3 md:p-4 cursor-pointer hover:bg-blue-100 transition-colors"
                      onClick={() => setIsAvisoExpanded(!isAvisoExpanded)}
                    >
                      <div className="flex items-start gap-2">
                        <svg
                          className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <h3 className="font-medium text-xs md:text-sm text-blue-900">
                              Informações necessárias
                            </h3>
                            <svg
                              className={`w-3 h-3 text-blue-600 transition-transform flex-shrink-0 ${isAvisoExpanded ? 'rotate-180' : ''}`}
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
                          </div>
                          {isAvisoExpanded && (
                            <p className="text-xs md:text-sm text-blue-800 whitespace-pre-line">
                              {motivoSelecionado.textoInformativo}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* Título */}
                    <div>
                      <label htmlFor="titulo" className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                        Título do Chamado <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="titulo"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        placeholder={motivoSelecionado ? motivoSelecionado.titulo : "Digite o título do chamado"}
                        required
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>

                    {/* Descrição */}
                    <div>
                      <label htmlFor="descricao" className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                        Descrição <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="descricao"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        placeholder="Descreva detalhadamente o problema ou solicitação..."
                        required
                        rows={6}
                        className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      />
                    </div>

                    {/* Anexos */}
                    <div>
                      <label className="block text-xs md:text-sm font-medium text-gray-700 mb-2">
                        Anexos (Opcional)
                      </label>
                      <div className="space-y-2 md:space-y-3">
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                          id="anexos"
                        />
                        <label
                          htmlFor="anexos"
                          className="inline-flex items-center gap-2 px-3 md:px-4 py-2 text-xs md:text-sm border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        >
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
                              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                            />
                          </svg>
                          <span className="text-sm text-gray-700">Adicionar arquivos</span>
                        </label>

                        {/* Lista de arquivos */}
                        {anexos.length > 0 && (
                          <div className="space-y-2">
                            {anexos.map((file, index) => (
                              <div
                                key={index}
                                className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                              >
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                  <svg
                                    className="w-5 h-5 text-gray-500 flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                    />
                                  </svg>
                                  <span className="text-sm text-gray-700 truncate">{file.name}</span>
                                  <span className="text-xs text-gray-500">
                                    ({(file.size / 1024).toFixed(1)} KB)
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveFile(index)}
                                  className="p-1 hover:bg-gray-200 rounded transition-colors ml-2"
                                >
                                  <svg
                                    className="w-4 h-4 text-gray-600"
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
                                </button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer com botões */}
                <div className="border-t border-gray-200 p-3 md:p-6 flex flex-col-reverse md:flex-row items-stretch md:items-center justify-end gap-2 md:gap-3 flex-shrink-0">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="px-4 md:px-6 py-2 text-sm md:text-base border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    onClick={handleVoltarEtapa1}
                    className="px-4 md:px-6 py-2 text-sm md:text-base border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={!titulo.trim() || !descricao.trim()}
                    className="px-4 md:px-6 py-2 text-sm md:text-base bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Criar Chamado
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

