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
    <div>
      <h1>Painel do Dono da Padaria</h1>

      <form onSubmit={handleSubmit}>
        <h2>Cadastrar Novo Pão</h2>
        <div>
          <label>Nome: </label>
          <input
            type="text"
            value={formData.nome}
            onChange={e => setFormData({ ...formData, nome: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Descrição: </label>
          <input
            type="text"
            value={formData.descricao}
            onChange={e => setFormData({ ...formData, descricao: e.target.value })}
            required
          />
        </div>
        <div>
          <label>Tempo de Preparo (minutos): </label>
          <input
            type="number"
            value={formData.tempoPreparoMinutos}
            onChange={e => setFormData({ ...formData, tempoPreparoMinutos: Number(e.target.value) })}
            required
          />
        </div>
        <div>
          <label>Cor do Botão: </label>
          <input
            type="color"
            value={formData.corHex}
            onChange={e => setFormData({ ...formData, corHex: e.target.value })}
            required
          />
        </div>
        <button type="submit">Cadastrar Pão</button>
      </form>

      <hr />

      <h2>Pães Cadastrados</h2>
      {paes.length === 0 ? (
        <p>Nenhum pão cadastrado ainda.</p>
      ) : (
        <ul>
          {paes.map(pao => (
            <li key={pao.id}>
              <strong style={{ color: pao.corHex }}>{pao.nome}</strong>: {pao.descricao} ({pao.tempoPreparoMinutos} min)
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default DonoPadaria;