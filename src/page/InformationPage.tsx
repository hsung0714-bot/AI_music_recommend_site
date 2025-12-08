import React, { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InformationPage.module.css';

// 1. state의 타입 정의 (요청하신 6가지 항목으로 변경)
interface FormData {
  situation: string; // 현 상황
  mood: string;      // 현 기분
  season: string;    // 계절
  timeOfDay: string; // 시간대
  genre: string;     // 음악 장르
  weather: string;   // 현재 날씨
}

const InformationPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 2. 초기 상태값 설정
  const [formData, setFormData] = useState<FormData>({
    situation: '',
    mood: '',
    season: '',
    timeOfDay: '',
    genre: '',
    weather: ''
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = () => {
    // 유효성 검사: 상황, 기분, 날씨 정도는 필수로 받는 것이 추천 정확도에 좋습니다.
    // 필요에 따라 조건을 수정하세요.
    if (!formData.situation || !formData.mood || !formData.weather) {
      alert("정확한 추천을 위해 상황, 기분, 날씨는 꼭 입력해주세요!");
      return;
    }
    
    // RecommendPage로 데이터 전달
    navigate('/recommend', { state: formData });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>📋 맞춤 추천을 위한 정보 입력</h2>
      <div className={styles.formWrapper}>
        
        {/* 1. 현 상황 */}
        <label className={styles.labelGroup}>
          <span>현재 어떤 상황인가요?</span>
          <input 
            type="text" 
            name="situation" 
            placeholder="예: 코딩 중, 운동 중, 휴식, 출근길" 
            value={formData.situation}
            onChange={handleChange} 
            className={styles.inputField}
          />
        </label>

        {/* 2. 현 기분 */}
        <label className={styles.labelGroup}>
          <span>지금 기분은 어떤가요?</span>
          <input 
            type="text" 
            name="mood" 
            placeholder="예: 우울함, 신남, 차분함, 피곤함" 
            value={formData.mood}
            onChange={handleChange} 
            className={styles.inputField}
          />
        </label>

        {/* 3. 계절 */}
        <label className={styles.labelGroup}>
          <span>현재 계절은요?</span>
          <input 
            type="text" 
            name="season" 
            placeholder="예: 늦가을, 무더운 여름, 쌀쌀한 봄" 
            value={formData.season}
            onChange={handleChange} 
            className={styles.inputField}
          />
        </label>

        {/* 4. 시간대 */}
        <label className={styles.labelGroup}>
          <span>지금 시간대는 언제인가요?</span>
          <input 
            type="text" 
            name="timeOfDay" 
            placeholder="예: 새벽, 늦은 밤, 점심시간, 해질녘" 
            value={formData.timeOfDay}
            onChange={handleChange} 
            className={styles.inputField}
          />
        </label>

        {/* 5. 음악 장르 */}
        <label className={styles.labelGroup}>
          <span>선호하는 장르가 있나요? (선택)</span>
          <input 
            type="text" 
            name="genre" 
            placeholder="예: 재즈, K-pop, 클래식, 힙합" 
            value={formData.genre}
            onChange={handleChange} 
            className={styles.inputField}
          />
        </label>

        {/* 6. 현재 날씨 */}
        <label className={styles.labelGroup}>
          <span>현재 날씨는 어떤가요?</span>
          <input 
            type="text" 
            name="weather" 
            placeholder="예: 비오는 날, 맑음, 눈이 펑펑 옴" 
            value={formData.weather}
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