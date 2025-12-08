import React from 'react';
import { useNavigate } from 'react-router-dom';

const IntroducePage = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🎵 AI Music Curator</h1>
      <p>당신의 현재 상황과 기분에 딱 맞는 음악을 찾아드립니다.</p>
      <p>AI가 분석하여 최고의 플레이리스트를 추천해 줄 거예요.</p>
      
      

[Image of music listening concept illustration]

      
      <button 
        onClick={() => navigate('/info')}
        style={{ padding: '10px 20px', fontSize: '16px', marginTop: '20px', cursor: 'pointer' }}
      >
        음악 추천 받으러 가기
      </button>
    </div>
  );
};

export default IntroducePage;