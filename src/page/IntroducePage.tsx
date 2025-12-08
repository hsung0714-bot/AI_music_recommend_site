import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './IntroducePage.module.css';

const IntroducePage: React.FC = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/info');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>🎵 AI Music Curator</h1>
      
      <p className={styles.description}>
        당신의 현재 상황과 기분에 딱 맞는 음악을 찾아드립니다.
      </p>
      <p className={styles.description}>
        AI가 분석하여 최고의 플레이리스트를 추천해 줄 거예요.
      </p>
      
      <div className={styles.imageContainer}>
      </div>

      <button 
        onClick={handleStart}
        className={styles.startButton}
      >
        음악 추천 받으러 가기
      </button>
    </div>
  );
};

export default IntroducePage;