import { useState } from 'react';
import HomeScreen from './screens/HomeScreen';
import GameScreen from './screens/GameScreen';
import AddTaskScreen from './screens/AddTaskScreen';
import SettingsScreen from './screens/SettingsScreen';
import BottomNav from './components/BottomNav';
import TaskDetailModal from './components/TaskDetailModal';
import EditTaskModal from './components/EditTaskModal';
import type { Screen, Task } from './types';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const sampleTasks: Task[] = [
    {
      id: 1,
      title: 'Morning Routine',
      time: '10:00 AM',
      type: 'Daily Routine',
      steps: ['Wake up at 8am', 'Exercise for 20 mins', 'Healthy breakfast']
    },
    {
      id: 2,
      title: 'Walk Dog',
      time: 'Noon',
      type: 'Household',
      steps: ['Get leash', 'Walk around the block', 'Give treats']
    },
    {
      id: 3,
      title: 'Calc HW',
      time: 'Midnight',
      type: 'School',
      steps: ['Review chapter 5', 'Complete problems 1-20', 'Check answers']
    },
    {
      id: 4,
      title: 'Team Meeting',
      time: '2:00 PM',
      type: 'Work',
      steps: []
    },
    // {
    //   id: 5,
    //   title: 'Grocery Shopping',
    //   time: '5:00 PM',
    //   type: 'Household',
    //   steps: []
    // }
  ];

  const handleTaskClick = () => {
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

  return (
    <div className="app">
      {/* Screens */}
      {currentScreen === 'home' && (
        <HomeScreen tasks={sampleTasks} onTaskClick={handleTaskClick} />
      )}
      {currentScreen === 'game' && <GameScreen />}
      {currentScreen === 'add-task' && <AddTaskScreen />}
      {currentScreen === 'settings' && <SettingsScreen />}

      {/* Modals */}
      {showTaskModal && (
        <TaskDetailModal 
          onClose={() => setShowTaskModal(false)}
          onEdit={handleEditClick}
        />
      )}
      {showEditModal && (
        <EditTaskModal 
          onClose={() => setShowEditModal(false)}
          onBack={handleBackToTask}
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
