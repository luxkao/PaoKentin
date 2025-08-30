import { useState, useEffect } from 'react';
import api from '../services/api';

interface Pao {
  id: number;
  nome: string;
  corHex: string;
}

function PadeiroDashboard() {
  const [paes, setPaes] = useState<Pao[]>([]);
  const [loading, setLoading] = useState(true);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    async function fetchPaes() {
      try {
        const response = await api.get<Pao[]>('/paes');
        setPaes(response.data);
      } catch (error) {
        console.error("Erro ao buscar os pães:", error);
        setFeedback('Erro ao carregar os pães.');
      } finally {
        setLoading(false);
      }
    }
    fetchPaes();
  }, []);

  async function handleIniciarFornada(paoId: number) {
    try {
      setFeedback(`Iniciando fornada...`);
      await api.post('/fornadas', { paoId });
      
      const paoClicado = paes.find(p => p.id === paoId);
      const nomePao = paoClicado ? paoClicado.nome : '';

      setFeedback(`Fornada de ${nomePao} iniciada com sucesso às ${new Date().toLocaleTimeString()}!`);

    } catch (error) {
      console.error("Erro ao iniciar fornada:", error);
      setFeedback('Falha ao iniciar fornada.');
    }
  }

  if (loading) {
    return <div>Carregando dashboard...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Painel do Padeiro: Iniciar Fornada</h1>
      <div className="flex flex-wrap gap-8">
        {paes.map(pao => (
          <button
            key={pao.id}
            onClick={() => handleIniciarFornada(pao.id)}
            style={{ backgroundColor: pao.corHex }}
            className="p-10 text-2xl font-bold text-black border-4 border-black hover:scale-105 transition-transform"
          >
            {pao.nome}
          </button>
        ))}
      </div>
      {feedback && <p className="mt-6 text-xl p-4 bg-gray-800 border-2 border-white">{feedback}</p>}
    </div>
  );
}

export default PadeiroDashboard;