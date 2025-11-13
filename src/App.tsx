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

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [showTaskModal, setShowTaskModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const { tasks } = useTaskContext();

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

  return (
    <div className="app">
      {/* Screens */}
      {currentScreen === 'home' && (
        <HomeScreen tasks={tasks} onTaskClick={handleTaskClick} />
      )}
      {currentScreen === 'game' && <GameScreen />}
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
