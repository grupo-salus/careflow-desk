'use client'

import React, { useState, useRef, useEffect } from 'react'

interface Mensagem {
  id: string
  autor: string
  texto: string
  data: string
  tipo: 'sistema' | 'usuario' | 'franqueado'
}

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
  mensagens?: Mensagem[]
}

interface ChamadoDetailsProps {
  chamado: Chamado | null
  isOpen: boolean
  onClose: () => void
  isSidebarOpen?: boolean
  isSidebarCollapsed?: boolean
}

export default function ChamadoDetails({
  chamado,
  isOpen,
  onClose,
  isSidebarOpen = false,
  isSidebarCollapsed = false
}: ChamadoDetailsProps) {
  const [novaMensagem, setNovaMensagem] = useState<string>('')
  const [mensagens, setMensagens] = useState<Mensagem[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (chamado) {
      // Se o chamado já tiver mensagens no JSON, usar elas
      if (chamado.mensagens && chamado.mensagens.length > 0) {
        setMensagens(chamado.mensagens)
      } else {
        // Caso contrário, criar mensagem inicial com a descrição do chamado
        const mensagemInicial: Mensagem = {
          id: '1',
          autor: chamado.franqueado,
          texto: chamado.descricao,
          data: chamado.dataAbertura,
          tipo: 'franqueado'
        }
        setMensagens([mensagemInicial])
      }
    }
  }, [chamado])

  useEffect(() => {
    // Scroll para o final quando novas mensagens forem adicionadas
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [mensagens])

  const ajustarAlturaTextarea = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      const alturaMaxima = 120 // ~5 linhas
      const novaAltura = Math.min(textarea.scrollHeight, alturaMaxima)
      textarea.style.height = `${novaAltura}px`
    }
  }

  useEffect(() => {
    if (isOpen && chamado && textareaRef.current) {
      const textarea = textareaRef.current
      textarea.style.height = 'auto'
      const alturaMaxima = 120
      const novaAltura = Math.min(textarea.scrollHeight, alturaMaxima)
      textarea.style.height = `${novaAltura}px`
    }
  }, [novaMensagem, isOpen, chamado])

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


  const formatarHora = (data: string) => {
    return new Date(data).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleEnviarMensagem = (e: React.FormEvent) => {
    e.preventDefault()
    if (novaMensagem.trim() === '') return

    const novaMsg: Mensagem = {
      id: Date.now().toString(),
      autor: 'Usuário',
      texto: novaMensagem,
      data: new Date().toISOString(),
      tipo: 'usuario'
    }

    setMensagens([...mensagens, novaMsg])
    setNovaMensagem('')
    
    // Resetar altura do textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }
  }

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setNovaMensagem(e.target.value)
  }

  if (!chamado || !isOpen) {
    return null
  }

  return (
    <React.Fragment>
      {/* Overlay - Não cobre o sidebar */}
      <div
        className={`fixed bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        } ${
          isSidebarCollapsed 
            ? 'inset-0 lg:left-20' 
            : isSidebarOpen 
            ? 'inset-0 lg:left-80' 
            : 'inset-0'
        }`}
        onClick={onClose}
      />

      {/* Painel Lateral */}
      <div
        className={`fixed right-0 top-0 h-full bg-white shadow-2xl z-50 transition-all duration-300 ease-in-out flex flex-col w-full md:w-[600px] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header do Painel */}
        <div className="border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-between p-3 md:p-4">
            <div className="flex items-center gap-2 md:gap-3 flex-1 min-w-0">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 md:gap-2 mb-1 flex-wrap">
                  <h2 className="text-base md:text-lg font-bold text-gray-900">{chamado.id}</h2>
                  {chamado.prioridade === 'crítico' && (
                    <span className="px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-red-100 text-red-700 border border-red-200">
                      Crítico
                    </span>
                  )}
                  <span
                    className={`px-1.5 md:px-2 py-0.5 md:py-1 rounded-full text-[10px] md:text-xs font-medium ${getStatusColor(
                      chamado.status
                    )}`}
                  >
                    {chamado.status === 'aguardando_retorno'
                      ? 'AGUARDANDO RETORNO'
                      : chamado.status === 'em_andamento'
                      ? 'EM ANDAMENTO'
                      : chamado.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-xs md:text-sm font-semibold text-gray-900 line-clamp-2">{chamado.titulo}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 md:p-2 hover:bg-gray-200 rounded transition-colors flex-shrink-0 ml-2"
              title="Fechar"
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Área de Mensagens - Chat */}
        <div className="flex-1 overflow-y-auto p-2 md:p-4 bg-gray-50 min-h-0">
          <div className="space-y-3 md:space-y-4">
            {mensagens.map((mensagem) => {
              // Mensagens dos técnicos (tipo 'usuario') à esquerda, franqueado à direita
              const isTecnico = mensagem.tipo === 'usuario'
              const isFranqueado = mensagem.tipo === 'franqueado'
              const isSistema = mensagem.tipo === 'sistema'
              
              return (
              <div
                key={mensagem.id}
                className={`flex ${
                  isFranqueado ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[85%] md:max-w-[75%] rounded-lg p-2 md:p-3 ${
                    isFranqueado
                      ? 'bg-orange-50 border border-orange-200 text-gray-900'
                      : isTecnico
                      ? 'bg-white border border-gray-200 text-gray-900'
                      : isSistema
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-white border border-gray-200 text-gray-900'
                  }`}
                >
                  <div className="flex items-center gap-1.5 md:gap-2 mb-1 flex-wrap">
                    <span className="text-[10px] md:text-xs font-semibold text-gray-600">
                      {mensagem.autor}
                    </span>
                    <span className="text-[10px] md:text-xs text-gray-400">
                      {formatarHora(mensagem.data)}
                    </span>
                  </div>
                  <p className="text-xs md:text-sm text-gray-700 break-words">
                    {mensagem.texto}
                  </p>
                </div>
              </div>
              )
            })}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Área de Input - Enviar Mensagem (Fixo na parte inferior) */}
        <div className="border-t border-gray-200 bg-white p-2 md:p-3 flex-shrink-0">
          <form onSubmit={handleEnviarMensagem} className="flex items-end gap-1.5 md:gap-2">
            {/* Botão de Anexo */}
            <button
              type="button"
              className="p-2 md:p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center flex-shrink-0"
              title="Anexar arquivo"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6"
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
            </button>
            <textarea
              ref={textareaRef}
              value={novaMensagem}
              onChange={handleTextareaChange}
              onInput={ajustarAlturaTextarea}
              placeholder="Digite sua mensagem..."
              rows={1}
              className="flex-1 px-3 md:px-4 py-2 md:py-2.5 text-sm md:text-base border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none overflow-hidden min-h-[38px] md:min-h-[42px] max-h-[100px] md:max-h-[120px] leading-5"
              style={{ height: 'auto' }}
            />
            <button
              type="submit"
              disabled={novaMensagem.trim() === ''}
              className="p-2 md:p-2.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0"
            >
              <svg
                className="w-4 h-4 md:w-5 md:h-5 transform rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </React.Fragment>
  )
}
