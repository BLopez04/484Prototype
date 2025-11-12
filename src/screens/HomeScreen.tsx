import Header from '../components/Header';
import WelcomeCard from '../components/WelcomeCard';
import TaskCard from '../components/TaskCard';
import ProgressCard from '../components/ProgressCard';
import type { Task } from '../types';

interface HomeScreenProps {
  tasks: Task[];
  onTaskClick: () => void;
}

export default function HomeScreen({ tasks, onTaskClick }: HomeScreenProps) {
  return (
    <div className="screen">
      <Header title="Task Management" />
      
      <div className="content">
        <WelcomeCard username="User" />

        <section className="section">
          <h2 className="section-title">Upcoming Tasks</h2>
          
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onClick={onTaskClick} />
          ))}
        </section>

        <section className="section">
          <h2 className="section-title">Your Progress</h2>
          <ProgressCard 
            currentLevel={4}
            nextLevel={5}
            currentXP={650}
            maxXP={1000}
          />
        </section>
      </div>
    </div>
  );
}

