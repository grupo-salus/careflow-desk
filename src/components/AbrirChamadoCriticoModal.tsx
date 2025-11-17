'use client'

import React, { useState, useRef } from 'react'

interface AbrirChamadoCriticoModalProps {
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

export default function AbrirChamadoCriticoModal({
  isOpen,
  onClose,
  onSubmit
}: AbrirChamadoCriticoModalProps) {
  const [titulo, setTitulo] = useState<string>('')
  const [descricao, setDescricao] = useState<string>('')
  const [anexos, setAnexos] = useState<File[]>([])
  const [aceitouTermos, setAceitouTermos] = useState<boolean>(false)
  const [isAvisoExpanded, setIsAvisoExpanded] = useState<boolean>(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

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
    if (!titulo.trim() || !descricao.trim() || !aceitouTermos) {
      return
    }

    onSubmit({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      categoria: 'Crítico',
      motivoId: 'critico',
      anexos: anexos.length > 0 ? anexos : undefined
    })

    // Reset form
    setTitulo('')
    setDescricao('')
    setAnexos([])
    setAceitouTermos(false)
    setIsAvisoExpanded(true)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleClose = () => {
    setTitulo('')
    setDescricao('')
    setAnexos([])
    setAceitouTermos(false)
    setIsAvisoExpanded(true)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    onClose()
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
            <h2 className="text-lg md:text-2xl font-bold text-gray-900">Abrir Chamado Crítico</h2>
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
          {/* Formulário */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto p-3 md:p-6">
              <div className="max-w-4xl mx-auto w-full space-y-4 md:space-y-6">
                {/* Título do Formulário */}
                <div className="flex items-center gap-2 pb-3 border-b border-gray-200">
                  <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center flex-shrink-0">
                    <svg
                      className="w-4 h-4 text-white"
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
                  </div>
                  <h2 className="text-base md:text-lg font-semibold text-gray-900">
                    Chamado Crítico
                  </h2>
                  <span className="px-2 py-1 text-xs font-medium bg-red-100 text-red-700 rounded">
                    Crítico
                  </span>
                </div>

                {/* Aviso Informativo - Acima do Formulário */}
                <div 
                  className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 md:p-4 cursor-pointer hover:bg-yellow-100 transition-colors"
                  onClick={() => setIsAvisoExpanded(!isAvisoExpanded)}
                >
                  <div className="flex items-start gap-2">
                    <svg
                      className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5"
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
                        <h3 className="font-medium text-xs md:text-sm text-yellow-900">
                          Informações importantes
                        </h3>
                        <svg
                          className={`w-3 h-3 text-yellow-600 transition-transform flex-shrink-0 ${isAvisoExpanded ? 'rotate-180' : ''}`}
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
                        <p className="text-xs md:text-sm text-yellow-800 whitespace-pre-line">
                          Este tipo de chamado é destinado <strong>apenas para casos de extrema urgência</strong> que impactam diretamente as operações críticas do negócio. 
                          Ao criar um chamado crítico, <strong>todos os líderes de cada setor serão notificados automaticamente</strong> para garantir visibilidade máxima e resposta imediata.
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
                    placeholder="Digite o título do chamado"
                    required
                    className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
                    className="w-full px-3 md:px-4 py-2 text-sm md:text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
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

                {/* Checkbox de confirmação */}
                <div className="bg-red-50 border border-red-200 rounded-lg p-3 md:p-4">
                  <label className="flex items-start gap-2 md:gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={aceitouTermos}
                      onChange={(e) => setAceitouTermos(e.target.checked)}
                      className="mt-1 w-4 h-4 md:w-5 md:h-5 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      required
                    />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs md:text-sm font-medium text-red-900">
                        Confirmo que este é um caso de extrema urgência
                      </span>
                      <p className="text-xs text-red-700 mt-1">
                        Ao marcar esta opção, você confirma que este chamado requer atenção imediata e que todos os líderes serão notificados automaticamente.
                      </p>
                    </div>
                  </label>
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
                  type="submit"
                  disabled={!titulo.trim() || !descricao.trim() || !aceitouTermos}
                  className="px-4 md:px-6 py-2 text-sm md:text-base bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
                >
                  Criar Chamado Crítico
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

