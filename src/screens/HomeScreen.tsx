import Header from '../components/Header';
import WelcomeCard from '../components/WelcomeCard';
import TaskCard from '../components/TaskCard';
import ProgressCard from '../components/ProgressCard';
import type { Task } from '../types';

interface HomeScreenProps {
  tasks: Task[];
  onTaskClick: (e: Task) => void;
  onTaskToggle: (checked: boolean, xp: number) => void
  currentLevel: number;
  currentXP: number;
  currentMaxXP: number;
}

export default function HomeScreen({ tasks, onTaskClick, onTaskToggle, currentLevel, currentXP, currentMaxXP }: HomeScreenProps) {
  return (
    <div className="screen">
      <Header title="Task Management" />
      
      <div className="content">
        <WelcomeCard username="User" />

        <section className="section">
          <h2 className="section-title">Upcoming Tasks</h2>
          
          {tasks.length > 0 ? (
            tasks.map(task => (
              <TaskCard key={task.id} task={task} onClick={() => onTaskClick(task)}
              onToggle={(checked, xp) => onTaskToggle(checked, xp)}/>
            ))
          ) : (
            <div className="empty-state">
              <p>No tasks yet</p>
            </div>
          )}
        </section>

        <section className="section">
          <h2 className="section-title">Your Progress</h2>
          <ProgressCard 
            currentLevel={currentLevel}
            currentXP={currentXP}
            maxXP={currentMaxXP}
          />
        </section>
      </div>
    </div>
  );
}

