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
}

export default function ChamadoDetails({
  chamado,
  isOpen,
  onClose
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
      autor: 'Técnico',
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
      {/* Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Painel Lateral */}
      <div
        className={`fixed right-0 top-0 h-full bg-white shadow-2xl z-50 transition-all duration-300 ease-in-out flex flex-col w-[600px] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header do Painel */}
        <div className="border-b border-gray-200 bg-gray-50 flex-shrink-0">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h2 className="text-lg font-bold text-gray-900">{chamado.id}</h2>
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
                      ? 'AGUARDANDO RETORNO'
                      : chamado.status === 'em_andamento'
                      ? 'EM ANDAMENTO'
                      : chamado.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm font-semibold text-gray-900">{chamado.titulo}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-200 rounded transition-colors"
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
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50 min-h-0">
          <div className="space-y-4">
            {mensagens.map((mensagem) => (
              <div
                key={mensagem.id}
                className={`flex ${
                  mensagem.tipo === 'franqueado' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[75%] rounded-lg p-3 ${
                    mensagem.tipo === 'franqueado'
                      ? 'bg-orange-50 border border-orange-200 text-gray-900'
                      : mensagem.tipo === 'usuario'
                      ? 'bg-white border border-gray-200 text-gray-900'
                      : 'bg-blue-100 text-blue-900'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-semibold text-gray-600">
                      {mensagem.autor}
                    </span>
                    <span className="text-xs text-gray-400">
                      {formatarHora(mensagem.data)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-700">
                    {mensagem.texto}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Área de Input - Enviar Mensagem (Fixo na parte inferior) */}
        <div className="border-t border-gray-200 bg-white p-3 flex-shrink-0">
          <form onSubmit={handleEnviarMensagem} className="flex items-center gap-2">
            {/* Botão de Anexo */}
            <button
              type="button"
              className="p-2.5 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors flex items-center justify-center"
              title="Anexar arquivo"
            >
              <svg
                className="w-6 h-6"
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
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-3xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none overflow-hidden min-h-[42px] max-h-[120px] leading-5"
              style={{ height: 'auto' }}
            />
            <button
              type="submit"
              disabled={novaMensagem.trim() === ''}
              className="p-2.5 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 transform rotate-90"
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
