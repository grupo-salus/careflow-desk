import { useState } from 'react'
import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'
import MainContent from '@/components/MainContent'
import AbrirChamadoModal from '@/components/AbrirChamadoModal'
import AbrirChamadoCriticoModal from '@/components/AbrirChamadoCriticoModal'
import Toast from '@/components/Toast'
import chamadosData from '@/data/chamados.json'

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

function App() {
  const [filtroAtivo, setFiltroAtivo] = useState<string>('todos')
  const [chamados, setChamados] = useState<Chamado[]>(chamadosData as Chamado[])
  const [isAbrirChamadoOpen, setIsAbrirChamadoOpen] = useState<boolean>(false)
  const [isAbrirChamadoCriticoOpen, setIsAbrirChamadoCriticoOpen] = useState<boolean>(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'success',
    isVisible: false
  })

  const handleFilterChange = (filtro: string) => {
    setFiltroAtivo(filtro)
  }

  const handleCriarChamado = () => {
    setIsAbrirChamadoOpen(true)
  }

  const handleCriarChamadoCritico = () => {
    setIsAbrirChamadoCriticoOpen(true)
  }

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true })
  }

  const handleAbrirChamadoSubmit = (dados: {
    titulo: string
    descricao: string
    categoria: string
    motivoId: string
    anexos?: File[]
  }) => {
    // Gerar ID do novo chamado
    const novoId = `CH-${String(chamados.length + 1).padStart(3, '0')}`
    
    // Criar novo chamado
    const novoChamado: Chamado = {
      id: novoId,
      titulo: dados.titulo,
      descricao: dados.descricao,
      prioridade: 'normal',
      status: 'novo',
      categoria: dados.categoria,
      dataAbertura: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      franqueado: 'Unidade Atual',
      responsavel: '',
      tempoResolucao: null,
      sla: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 horas
      mensagens: [
        {
          id: '1',
          autor: 'Unidade Atual',
          texto: dados.descricao,
          data: new Date().toISOString(),
          tipo: 'franqueado'
        }
      ]
    }

    // Adicionar ao array de chamados
    setChamados([novoChamado, ...chamados])
    
    // Fechar o modal
    setIsAbrirChamadoOpen(false)
    
    // Mostrar toast de sucesso
    showToast('Chamado criado com sucesso!', 'success')
  }

  const handleAbrirChamadoCriticoSubmit = (dados: {
    titulo: string
    descricao: string
    categoria: string
    motivoId: string
    anexos?: File[]
  }) => {
    // Gerar ID do novo chamado
    const novoId = `CH-${String(chamados.length + 1).padStart(3, '0')}`
    
    // Criar novo chamado crítico
    const novoChamado: Chamado = {
      id: novoId,
      titulo: dados.titulo,
      descricao: dados.descricao,
      prioridade: 'crítico',
      status: 'novo',
      categoria: dados.categoria,
      dataAbertura: new Date().toISOString(),
      dataAtualizacao: new Date().toISOString(),
      franqueado: 'Unidade Atual',
      responsavel: '',
      tempoResolucao: null,
      sla: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 horas para crítico
      mensagens: [
        {
          id: '1',
          autor: 'Unidade Atual',
          texto: dados.descricao,
          data: new Date().toISOString(),
          tipo: 'franqueado'
        }
      ]
    }

    // Adicionar ao array de chamados
    setChamados([novoChamado, ...chamados])
    
    // Fechar o modal
    setIsAbrirChamadoCriticoOpen(false)
    
    // Mostrar toast de sucesso
    showToast('Chamado crítico criado com sucesso! Todos os líderes foram notificados.', 'success')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar
          onFilterChange={handleFilterChange}
          onCriarChamado={handleCriarChamado}
          onCriarChamadoCritico={handleCriarChamadoCritico}
        />
        <MainContent chamados={chamados} filtroAtivo={filtroAtivo} />
      </div>

      {/* Modal de Abertura de Chamado */}
      <AbrirChamadoModal
        isOpen={isAbrirChamadoOpen}
        onClose={() => setIsAbrirChamadoOpen(false)}
        onSubmit={handleAbrirChamadoSubmit}
      />

      {/* Modal de Abertura de Chamado Crítico */}
      <AbrirChamadoCriticoModal
        isOpen={isAbrirChamadoCriticoOpen}
        onClose={() => setIsAbrirChamadoCriticoOpen(false)}
        onSubmit={handleAbrirChamadoCriticoSubmit}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  )
}

export default App

