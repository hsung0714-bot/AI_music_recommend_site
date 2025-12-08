import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IntroducePage from './page/IntroducePage';
import InformationPage from './page/InformationPage';
import RecommendPage from './page/RecomendPage';

function App() {
  return (
    <Router>
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        {/* 네비게이션이나 헤더가 필요하면 여기에 추가 */}
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