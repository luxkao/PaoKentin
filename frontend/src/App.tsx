// frontend/src/App.tsx

import { useState } from 'react';
import DonoPadaria from './pages/DonoPadaria';
import PadeiroDashboard from './pages/PadeiroDashboard';
import ClienteStatus from './pages/ClienteStatus'; // 1. Importar a nova página

type Pagina = 'dono' | 'padeiro' | 'cliente';

function App() {
  const [paginaAtual, setPaginaAtual] = useState<Pagina>('cliente');

  return (
    <div style={{ padding: '20px' }}>
      <header>
        <h1>Padaria PãoKentin</h1>
        <nav style={{ marginBottom: '20px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>
          <button onClick={() => setPaginaAtual('cliente')}>Visão do Cliente</button>
          <button onClick={() => setPaginaAtual('padeiro')} style={{ marginLeft: '10px' }}>Visão do Padeiro</button>
          <button onClick={() => setPaginaAtual('dono')} style={{ marginLeft: '10px' }}>Visão do Dono</button>
        </nav>
      </header>

      <main>
        {paginaAtual === 'dono' && <DonoPadaria />}
        {paginaAtual === 'padeiro' && <PadeiroDashboard />}
        {paginaAtual === 'cliente' && <ClienteStatus />}
      </main>
    </div>
  );
}

export default App;