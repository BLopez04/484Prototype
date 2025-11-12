interface ProgressCardProps {
  currentLevel: number;
  nextLevel: number;
  currentXP: number;
  maxXP: number;
}

export default function ProgressCard({ 
  currentLevel, 
  nextLevel, 
  currentXP, 
  maxXP 
}: ProgressCardProps) {
  const progressPercentage = (currentXP / maxXP) * 100;

  return (
    <div className="progress-card">
      <div className="progress-info">
        <span className="progress-label">Level {currentLevel}</span>
        <span className="progress-label">Level {nextLevel}</span>
      </div>
      <div className="progress-bar-outer">
        <div 
          className="progress-bar-inner" 
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
      <p className="progress-text">{currentXP} / {maxXP} XP</p>
    </div>
  );
}

