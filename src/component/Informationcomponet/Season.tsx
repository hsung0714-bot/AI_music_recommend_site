import React from 'react';
import styles from './Season.module.css';

interface SeasonProps {
  selectedSeason: string;
  onSeasonChange: (season: string) => void;
}

const Season: React.FC<SeasonProps> = ({ selectedSeason, onSeasonChange }) => {
  const seasons = ["봄", "여름", "가을", "겨울"];

  return (
    <label className={styles.labelGroup}>
      <span>현재 계절은요?</span>
      <div className={styles.buttonGroup}>
        {seasons.map((season) => (
          <button
            key={season}
            type="button"
            onClick={() => onSeasonChange(season)}
            className={
              selectedSeason === season
                ? styles.activeButton
                : styles.normalButton
            }
          >
            {season}
          </button>
        ))}
      </div>
    </label>
  );
};

export default Season;


