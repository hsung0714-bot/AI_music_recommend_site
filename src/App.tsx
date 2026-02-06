import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroducePage from './page/IntroducePage';
import InformationPage from './page/InformationPage';
import RecommendPage from './page/RecomendPage';

function App() {
  return (
    <Router>
      <div style={{ width: '100vw', minHeight: '100vh', margin: 0, padding: 0, fontFamily: 'Arial, sans-serif' }}>
        <Routes>
          <Route path="/" element={<IntroducePage />} />
          <Route path="/info" element={<InformationPage />} />
          <Route path="/recommend" element={<RecommendPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;