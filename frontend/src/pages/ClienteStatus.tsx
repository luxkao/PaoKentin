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
      <h1 className="text-3xl font-bold mb-6">Status das Fornadas</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {statusList.map(({ pao, status, tempoRestanteSegundos }) => (
          <div key={pao.id} className="bg-gray-800 p-6 border-2" style={{ borderColor: pao.corHex }}>
            <h2 className="text-2xl font-bold mb-2" style={{ color: pao.corHex }}>
              {pao.nome}
            </h2>
            <p className="text-lg">
              <span className="font-bold">Status:</span> {status}
            </p>
            {status === 'Assando' && (
              <p className="text-5xl font-bold mt-2">
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