import Header from '../components/Header';
import ProgressCard from '../components/ProgressCard';

export default function GameScreen() {
  return (
    <div className="screen">
      <Header title="Progress & Rewards" />
      
      <div className="content">
        {/* Progress Section */}
        <section className="section">
          <h2 className="section-title">View your progress:</h2>
          <ProgressCard 
            currentLevel={4}
            nextLevel={5}
            currentXP={650}
            maxXP={1000}
          />
        </section>

        {/* XP Info Section */}
        <section className="section">
          <h3 className="section-title">Gain XP:</h3>
          <p className="xp-info-text">Finish tasks</p>
        </section>

        {/* Reward Section */}
        <section className="section">
          <div className="reward-card">
            <span className="reward-label">Reward for Level 3</span>
          </div>
        </section>
      </div>
    </div>
  );
}
