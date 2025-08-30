import { useState } from 'react';
import DonoPadaria from './pages/DonoPadaria';
import PadeiroDashboard from './pages/PadeiroDashboard';
import ClienteStatus from './pages/ClienteStatus';

type Pagina = 'dono' | 'padeiro' | 'cliente';

function App() {
  const [paginaAtual, setPaginaAtual] = useState<Pagina>('cliente');

  const getButtonClass = (pagina: Pagina) => {
    return paginaAtual === pagina
      ? 'bg-white text-black'
      : 'bg-gray-700 text-white';
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-mono p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold border-b-2 border-white pb-2">🥖 Padaria PãoKentin 🥖</h1>
          <nav className="mt-4 flex flex-wrap gap-4">
            <button onClick={() => setPaginaAtual('cliente')} className={`py-2 px-4 border-2 border-white font-bold ${getButtonClass('cliente')}`}>
              Cliente
            </button>
            <button onClick={() => setPaginaAtual('padeiro')} className={`py-2 px-4 border-2 border-white font-bold ${getButtonClass('padeiro')}`}>
              Padeiro
            </button>
            <button onClick={() => setPaginaAtual('dono')} className={`py-2 px-4 border-2 border-white font-bold ${getButtonClass('dono')}`}>
              Dono
            </button>
          </nav>
        </header>
        <main>
          {paginaAtual === 'dono' && <DonoPadaria />}
          {paginaAtual === 'padeiro' && <PadeiroDashboard />}
          {paginaAtual === 'cliente' && <ClienteStatus />}
        </main>
      </div>
    </div>
  );
}

export default App;