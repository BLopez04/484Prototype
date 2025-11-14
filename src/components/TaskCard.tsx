import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { Task } from '../types';
import {useState} from "react";

interface TaskCardProps {
  task: Task;
  onClick: () => void;
  onToggle: (checked: boolean, xp: number) => void;
}

export default function TaskCard({ task, onClick, onToggle }: TaskCardProps) {
    const [currentTaskFlagState, setCurrentTaskFlagState] = useState<boolean>(task.flag);

    const handleTaskChecking = (task: Task) => {
        task.flag = !task.flag;
        setCurrentTaskFlagState(task.flag);
        onToggle(task.flag, task.xp);
    }
  return (
    <div className="task-card" onClick={onClick}>
      <div className="task-card-content">
        <input 
          type="checkbox" 
          className="task-checkbox"
          checked={currentTaskFlagState}
          onClick={(e) => e.stopPropagation()}
          onChange={() => handleTaskChecking(task)}
        />
        <div className="task-info">
          <h3 className="task-title">{task.title}</h3>
          <p className="task-meta">{task.time} • {task.type}</p>
        </div>
      </div>
      <button 
        className="task-menu-btn"
        onClick={(e) => e.stopPropagation()}
      >
        <MoreVertIcon sx={{ fontSize: 20 }} />
      </button>
    </div>
  );
}

