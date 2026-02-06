import React, { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './InformationPage.module.css';
import Season from '../component/Informationcomponet/Season';

// state의 타입 정의
interface FormData {
  situation: string; 
  mood: string; 
  season: string;
  timeOfDay: string; 
  genre: string; 
  weather: string;  
}

const InformationPage: React.FC = () => {
  const navigate = useNavigate();
  
  // 초기 상태값
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
    if (!formData.situation || !formData.mood || !formData.weather) {
      alert("정확한 추천을 위해 상황, 기분, 날씨는 꼭 입력해주세요!");
      return;
    }
    
    // RecommendPage로 데이터 전달
    navigate('/recommend', { state: formData });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>맞춤 추천을 위한 정보 입력</h2>
      <div className={styles.formWrapper}>

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

        <Season
          selectedSeason={formData.season}
          onSeasonChange={(season) =>
            setFormData((prev) => ({ ...prev, season }))
          }
        />

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