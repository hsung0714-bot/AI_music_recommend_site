import React, { useEffect, useState, useCallback } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from './MusicURL.module.css';

interface UserInputState {
  mood: string;
  weather: string;
  season?: string;
  genre?: string;
  activity?: string;
  timeOfDay: string;
}

interface MusicURLProps {
  userInput: UserInputState;
}

const MusicURL: React.FC<MusicURLProps> = ({ userInput }) => {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMusicRecommendation = useCallback(async () => {
    if (!userInput) {
      setError("입력된 정보가 없습니다.");
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    setRecommendations([]);

    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
      if (!API_KEY) throw new Error("API Key가 설정되지 않았습니다.");

      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-preview-09-2025"
      });

      const prompt = `
        너는 센스 있는 음악 큐레이터야.
        [사용자 정보]
        - 날씨: ${userInput.weather}
        - 기분: ${userInput.mood}
        - 시간대 : ${userInput.timeOfDay}
        ${userInput.season ? `- 계절: ${userInput.season}` : ''}
        ${userInput.genre ? `- 선호 장르: ${userInput.genre}` : ''}
        ${userInput.activity ? `- 현재 활동: ${userInput.activity}` : ''}
        
        이 상황과 분위기에 딱 맞는 노래 5곡을 추천해줘.
        형식: "가수 - 노래제목"
        설명이나 번호 매기기 없이 오직 노래 목록만 한 줄에 하나씩 출력해줘.
      `;

      const result = await model.generateContent({
        contents: [{ role: "user", parts: [{ text: prompt }] }]
      });

      const response = await result.response;
      const text = response.text();

      const songList = text
        .split('\n')
        .map(line => line.replace(/^\d+\.\s*/, '').trim())
        .filter(line => line.length > 0);

      setRecommendations(songList);

    } catch (err) {
      console.error("Gemini 요청 실패:", err);
      setError("AI와 연결 중 문제가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  }, [userInput]);

  useEffect(() => {
    fetchMusicRecommendation();
  }, [fetchMusicRecommendation]);

  return (
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
          <ul className={styles.songList}>
            {recommendations.map((song, index) => (
              <li key={index} className={styles.songItem}>
                <a 
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(song)}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className={styles.songLink}
                >
                  🎵 {song}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MusicURL;

