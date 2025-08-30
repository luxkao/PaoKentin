import { useState, useEffect, type FormEvent } from 'react';
import api from '../services/api';

interface Pao {
  id: number;
  nome: string;
  descricao: string;
  tempoPreparoMinutos: number;
  corHex: string;
}

type PaoFormData = Omit<Pao, 'id'>;

function DonoPadaria() {
  const [paes, setPaes] = useState<Pao[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<PaoFormData>({
    nome: '',
    descricao: '',
    tempoPreparoMinutos: 20,
    corHex: '#FFD700'
  });

  useEffect(() => {
    async function fetchPaes() {
      try {
        setLoading(true);
        const response = await api.get<Pao[]>('/paes');
        setPaes(response.data);
      } catch (error) {
        console.error("Erro ao buscar os pães:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchPaes();
  }, []);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const novoPao = {
      ...formData,
      tempoPreparoMinutos: Number(formData.tempoPreparoMinutos)
    };

    try {
      const response = await api.post<Pao>('/paes', novoPao);
      setPaes([...paes, response.data]);
      setFormData({
        nome: '',
        descricao: '',
        tempoPreparoMinutos: 20,
        corHex: '#FFD700'
      });

    } catch (error) {
      console.error("Erro ao cadastrar o pão:", error);
      alert("Não foi possível cadastrar o pão. Verifique o console.");
    }
  }

  if (loading) {
    return <div>Carregando pães...</div>;
  }


  return (
    <div className="space-y-8">
      <div className="bg-gray-800 border-2 border-white p-6">
        <h2 className="text-2xl font-bold mb-4">Cadastrar Novo Pão</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label className="mb-1 font-bold">Nome:</label>
            <input
              type="text"
              value={formData.nome}
              onChange={e => setFormData({ ...formData, nome: e.target.value })}
              required
              className="p-2 bg-gray-900 border-2 border-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-bold">Descrição:</label>
            <input
              type="text"
              value={formData.descricao}
              onChange={e => setFormData({ ...formData, descricao: e.target.value })}
              required
              className="p-2 bg-gray-900 border-2 border-white"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-1 font-bold">Tempo de Preparo (minutos):</label>
            <input
              type="number"
              value={formData.tempoPreparoMinutos}
              onChange={e => setFormData({ ...formData, tempoPreparoMinutos: Number(e.target.value) })}
              required
              className="p-2 bg-gray-900 border-2 border-white"
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="font-bold">Cor do Botão:</label>
            <input
              type="color"
              value={formData.corHex}
              onChange={e => setFormData({ ...formData, corHex: e.target.value })}
              required
              className="w-12 h-10 p-1 bg-gray-900 border-2 border-white"
            />
          </div>
          <button type="submit" className="w-full py-3 px-4 bg-white text-black font-bold border-2 border-white hover:bg-gray-300">
            Cadastrar Pão
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Pães Cadastrados</h2>
        {paes.length === 0 ? (
          <p>Nenhum pão cadastrado ainda.</p>
        ) : (
          <ul className="space-y-2">
            {paes.map(pao => (
              <li key={pao.id} className="bg-gray-800 p-4 border-2 border-white flex items-center gap-4">
                <div style={{ backgroundColor: pao.corHex }} className="w-6 h-6 border-2 border-white"></div>
                <span className="font-bold">{pao.nome}:</span> {pao.descricao} ({pao.tempoPreparoMinutos} min)
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default DonoPadaria;