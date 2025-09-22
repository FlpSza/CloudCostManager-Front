import { Routes, Route } from 'react-router-dom';

// Components
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard/Dashboard';
import CostAnalysis from './pages/CostAnalysis/CostAnalysis';
import Automation from './pages/Automation/Automation';
import Settings from './pages/Settings/Settings';
import Reports from './pages/Reports/Reports';

function App() {
  return (
    <div className="App">
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/analysis" element={<CostAnalysis />} />
          <Route path="/automation" element={<Automation />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;