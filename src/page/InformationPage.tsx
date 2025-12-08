import React, { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InformationPage.module.css'; // CSS 모듈 import

// state의 타입 정의
interface FormData {
  mood: string;
  weather: string;
  genre: string;
  activity: string;
}

const InformationPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    mood: '',
    weather: '',
    genre: '',
    activity: ''
  });

  // 이벤트 핸들러 타입 지정 (HTMLInputElement의 변경 이벤트)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // 간단한 유효성 검사
    if (!formData.mood || !formData.weather) {
      alert("기분과 날씨를 입력해주세요!");
      return;
    }
    
    // RecommendPage로 데이터 전달
    navigate('/recommend', { state: formData });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📋 정보를 알려주세요</h2>
      <div className={styles.formWrapper}>
        
        <label className={styles.labelGroup}>
          <span>오늘 기분은 어떤가요?</span>
          <input 
            type="text" 
            name="mood" 
            placeholder="예: 우울함, 신남, 차분함" 
            value={formData.mood}
            onChange={handleChange} 
            className={styles.inputField}
          />
        </label>

        <label className={styles.labelGroup}>
          <span>현재 날씨는요?</span>
          <input 
            type="text" 
            name="weather" 
            placeholder="예: 비오는 날, 맑음" 
            value={formData.weather}
            onChange={handleChange} 
            className={styles.inputField}
          />
        </label>

        <label className={styles.labelGroup}>
          <span>선호하는 장르가 있나요? (선택)</span>
          <input 
            type="text" 
            name="genre" 
            placeholder="예: 재즈, K-pop" 
            value={formData.genre}
            onChange={handleChange} 
            className={styles.inputField}
          />
        </label>

        <button 
          onClick={handleSubmit}
          className={styles.submitButton}
        >
          AI에게 추천 요청하기
        </button>
      </div>
    </div>
  );
};

export default InformationPage;