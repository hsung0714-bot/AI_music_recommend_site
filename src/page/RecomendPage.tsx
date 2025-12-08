import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MusicURL from '../component/Recomendcomponent/MusicURL';
import styles from './RecomendPage.module.css';

interface UserInputState {
  mood: string;
  weather: string;
  season?: string;
  genre?: string;
  situation: string;
  timeOfDay: string;
}

const RecommendPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userInput = location.state as UserInputState;
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!userInput) {
      alert("입력된 정보가 없습니다. 처음부터 다시 시작해주세요.");
      navigate('/');
    }
  }, [userInput, navigate]);

  const handleRefresh = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>AI의 추천 플레이리스트</h2>
        <div className={styles.Wrapper}>
      
      {userInput && (
        <div className={styles.summaryBox}>
          <p>
             사용자의 <span className={styles.highlight}>"{userInput.situation}" 이라는 상황과</span> <br/>
            <span className={styles.highlight}> {userInput.mood}</span>이라는 기분, 그리고 <br/>
            <span className={styles.highlight}>계절, 시간대, 날씨</span> 등을 고려한 음악을 추천합니다.
            <br/>
            이 노래들은 어떠세요? (클릭하면 유튜브로 이동합니다)
          </p>
        </div>
      )}

      {userInput && <MusicURL key={refreshKey} userInput={userInput} />}
      </div>

      <div className={styles.buttonGroup}>
        <button 
          onClick={handleRefresh} 
          className={`${styles.button} ${styles.refreshButton}`}
        >
          다른 노래 추천
        </button>
        
        <button 
          onClick={() => navigate('/')} 
          className={`${styles.button} ${styles.homeButton}`}
        >
          처음으로
        </button>
      </div>
    </div>
  );
};

export default RecommendPage;