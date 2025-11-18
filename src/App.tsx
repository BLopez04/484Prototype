import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import {AddTaskScreen} from './screens/AddTaskScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNav from './components/BottomNav';
import TaskDetailModal from './components/TaskDetailModal';
import EditTaskModal from './components/EditTaskModal';
import type {Screen, Task} from './types';
import './App.css';
import { useTaskContext } from "./contexts/TaskContext.tsx";
import { useToast } from "./contexts/ToastContext.tsx";

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentXP, setCurrentXP] = useState(650);
  const [currentMaxXP] = useState(1000);
  const [currentLevel, setCurrentLevel] = useState(4);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { tasks } = useTaskContext();
  const { showToast } = useToast();

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setShowTaskModal(true);
  };

  const handleEditClick = () => {
    setShowTaskModal(false);
    setShowEditModal(true);
  };

  const handleBackToTask = () => {
    setShowEditModal(false);
    setShowTaskModal(true);
  };

  const changeXP = (amount: number) => {
    setCurrentXP(prevXP => {
      let nextXP = prevXP + amount;
      let nextLevel = currentLevel;

      // go up levels
      if (nextXP >= currentMaxXP) {
        nextLevel += Math.floor(nextXP / currentMaxXP);
        nextXP = nextXP % currentMaxXP;
        setCurrentLevel(nextLevel)
        return nextXP;
      }

      // go down levels (only down to lvl 1 0 xp)
      if (nextXP < 0) {
        while (nextXP < 0 && nextLevel > 1) {
          nextLevel -= 1;
          nextXP += currentMaxXP;
        }
        setCurrentLevel(nextLevel)
        return Math.max(nextXP, 0);
      }

      // simple XP change
      return nextXP;
    })
  }

  return (
    <div className="app">
      {/* Screens */}
      {currentScreen === 'home' && (
        <HomeScreen tasks={tasks} onTaskClick={handleTaskClick}
        onTaskToggle ={(checked, xp) => {
          changeXP(checked? +xp: -xp);
          if (checked) {
            showToast(`+${xp} XP gained!`, "success");
          } else {
            showToast(`-${xp} XP lost!`, "warning");
          }
        }}
                    currentLevel={currentLevel} currentXP={currentXP}
                    currentMaxXP={currentMaxXP}/>
      )}
      {currentScreen === 'game' &&
          <GameScreen
          currentLevel={currentLevel}
          currentXP={currentXP}
          currentMaxXP={currentMaxXP}
      />}
      {currentScreen === 'add-task' && <AddTaskScreen />}
      {currentScreen === 'settings' && <SettingsScreen />}

      {/* Modals */}
      {showTaskModal && (
        <TaskDetailModal 
          onClose={() => setShowTaskModal(false)}
          onEdit={handleEditClick}
          task={selectedTask}
        />
      )}
      {showEditModal && selectedTask && (
        <EditTaskModal 
          onClose={() => setShowEditModal(false)}
          onBack={handleBackToTask}
          task={selectedTask}
        />
      )}

      {/* Navigation */}
      <BottomNav 
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
      />
    </div>
  );
}

export default App;
