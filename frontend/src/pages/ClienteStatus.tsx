import { useState, useEffect } from 'react';
import api from '../services/api';

interface FornadaStatus {
  pao: {
    id: number;
    nome: string;
    corHex: string;
  };
  dataHoraInicio: string;
  tempoRestanteSegundos: number;
  status: 'Assando' | 'Pronto' | 'Aguardando fornada';
}

function formatTime(totalSeconds: number): string {
  if (totalSeconds < 0) totalSeconds = 0;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function ClienteStatus() {
  const [statusList, setStatusList] = useState<FornadaStatus[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchStatus() {
      try {
        const response = await api.get<FornadaStatus[]>('/status');
        setStatusList(response.data);
      } catch (error) {
        console.error("Erro ao buscar status:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStatus();
    const intervalId = setInterval(fetchStatus, 10000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      setStatusList(prevList =>
        prevList.map(status => {
          if (status.status === 'Assando' && status.tempoRestanteSegundos > 0) {
            return { ...status, tempoRestanteSegundos: status.tempoRestanteSegundos - 1 };
          }
          return status;
        })
      );
    }, 1000);

    return () => clearInterval(timerId);
  }, []);

  if (loading) {
    return <h2>Carregando status das fornadas...</h2>;
  }

  return (
    <div>
      <h1>Status das Fornadas</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {statusList.map(({ pao, status, tempoRestanteSegundos }) => (
          <div key={pao.id} style={{ border: `3px solid ${pao.corHex}`, borderRadius: '8px', padding: '16px' }}>
            <h2 style={{ margin: 0, color: pao.corHex }}>{pao.nome}</h2>
            <p style={{ fontSize: '1.5em', margin: '10px 0' }}>
              <strong>Status:</strong> {status}
            </p>
            {status === 'Assando' && (
              <p style={{ fontSize: '2em', fontWeight: 'bold', margin: 0 }}>
                {formatTime(tempoRestanteSegundos)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClienteStatus;