import React, { useEffect, useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from './RecomendPage.module.css';

// 1. 사용자 입력 데이터의 타입을 미리 정의합니다.
interface UserInputState {
  mood: string;
  weather: string;
  genre?: string;   // 선택사항이라 ? 붙임
  activity?: string; // 선택사항이라 ? 붙임
}

const RecommendPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // 2. 받아온 state를 타입 단언(as)을 통해 타입을 지정해줍니다.
  const userInput = location.state as UserInputState;

  const [recommendations, setRecommendations] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  
  // 3. 여기가 에러가 났던 부분입니다. <string | null>로 해결!
  const [error, setError] = useState<string | null>(null);

  const fetchMusicRecommendation = useCallback(async () => {
    if (!userInput) {
      alert("입력된 정보가 없습니다. 처음부터 다시 시작해주세요.");
      navigate('/');
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendations("");

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) throw new Error("API Key가 설정되지 않았습니다.");

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
        너는 센스 있는 음악 큐레이터야.
        [사용자 정보]
        - 날씨: ${userInput.weather}
        - 기분: ${userInput.mood}
        ${userInput.genre ? `- 선호 장르: ${userInput.genre}` : ''}
        ${userInput.activity ? `- 현재 활동: ${userInput.activity}` : ''}
        
        이 상황과 분위기에 딱 맞는 노래 5곡을 추천해줘.
        형식: "가수 - 노래제목 : 이유"
        불필요한 말 없이 리스트만 출력해줘.
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      setRecommendations(response.text());

    } catch (err) {
      console.error("Gemini 요청 실패:", err);
      // 에러 메시지 설정
      setError("AI와 연결 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [userInput, navigate]);

  useEffect(() => {
    fetchMusicRecommendation();
  }, [fetchMusicRecommendation]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>🎵 AI의 추천 플레이리스트</h2>
      
      {userInput && (
        <div className={styles.summaryBox}>
          <p>
            <span className={styles.highlight}>{userInput.weather}</span> 날씨에 
            <span className={styles.highlight}> {userInput.mood}</span> 기분이시군요.<br/>
            이 노래들은 어떠세요?
          </p>
        </div>
      )}

      <div className={styles.resultBox}>
        {loading ? (
          <div className={styles.loading}>
            <p className={styles.spinner}>💿</p>
            <p>AI가 플레이리스트를 고르고 있습니다...</p>
          </div>
        ) : error ? (
          <div className={styles.error}>
            <p>⚠️ {error}</p>
            <button onClick={fetchMusicRecommendation} className={styles.retryBtn}>
              다시 시도
            </button>
          </div>
        ) : (
          <div className={styles.content}>
            {recommendations}
          </div>
        )}
      </div>

      <div className={styles.buttonGroup}>
        <button 
          onClick={fetchMusicRecommendation} 
          disabled={loading}
          className={`${styles.button} ${styles.refreshButton}`}
        >
          🔄 다른 노래 추천
        </button>
        
        <button 
          onClick={() => navigate('/')} 
          className={`${styles.button} ${styles.homeButton}`}
        >
          🏠 처음으로
        </button>
      </div>
    </div>
  );
};

export default RecommendPage;