import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const InformationPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    mood: '',
    weather: '',
    genre: '',
    activity: '' // 예: 공부 중, 운동 중
  });

  const handleChange = (e: { target: { name: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // 입력값 검증 (간단히)
    if (!formData.mood || !formData.weather) {
      alert("기분과 날씨를 입력해주세요!");
      return;
    }
    
    // state를 통해 RecommendPage로 데이터 전달
    navigate('/recommend', { state: formData });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto' }}>
      <h2>📋 정보를 알려주세요</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <label>
          <strong>오늘 기분은 어떤가요?</strong>
          <input 
            type="text" name="mood" placeholder="예: 우울함, 신남, 차분함" 
            onChange={handleChange} style={{ width: '100%', padding: '8px' }}
          />
        </label>

        <label>
          <strong>현재 날씨는요?</strong>
          <input 
            type="text" name="weather" placeholder="예: 비오는 날, 맑음" 
            onChange={handleChange} style={{ width: '100%', padding: '8px' }}
          />
        </label>

        <label>
          <strong>선호하는 장르가 있나요? (선택)</strong>
          <input 
            type="text" name="genre" placeholder="예: 재즈, K-pop" 
            onChange={handleChange} style={{ width: '100%', padding: '8px' }}
          />
        </label>

        <button 
          onClick={handleSubmit}
          style={{ marginTop: '20px', padding: '12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          AI에게 추천 요청하기
        </button>
      </div>
    </div>
  );
};

export default InformationPage;