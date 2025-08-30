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
      <h1>Painel do Padeiro</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {paes.map(pao => (
          <button
            key={pao.id}
            onClick={() => handleIniciarFornada(pao.id)}
            style={{
              backgroundColor: pao.corHex,
              padding: '40px',
              fontSize: '24px',
              cursor: 'pointer',
              border: '2px solid black',
              borderRadius: '10px'
            }}
          >
            {pao.nome}
          </button>
        ))}
      </div>
      {feedback && <p style={{ marginTop: '20px', fontSize: '18px' }}>{feedback}</p>}
    </div>
  );
}

export default PadeiroDashboard;