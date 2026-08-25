import { Routes, Route, Navigate } from 'react-router-dom';
import { ResultsProvider } from './context/ResultsContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import QuizGods from './pages/QuizGods';
import QuizOrgs from './pages/QuizOrgs';
import Result from './pages/Result';
import MapaMundi from './pages/MapaMundi';

function App() {
  return (
    <ResultsProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz/deuses" element={<QuizGods />} />
          <Route path="/quiz/organizacoes" element={<QuizOrgs />} />
          <Route path="/resultado" element={<Result />} />
          <Route path="/mapa" element={<MapaMundi />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </ResultsProvider>
  );
}

export default App;
