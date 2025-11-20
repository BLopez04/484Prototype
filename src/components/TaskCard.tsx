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

    // Format date to be more user-friendly
    const formatDate = (dateStr: string): string => {
        if (!dateStr) return 'No due date';
        
        try {
            const date = new Date(dateStr);
            if (isNaN(date.getTime())) {
                return dateStr; // Return original if invalid
            }

            const today = new Date();
            today.setHours(0, 0, 0, 0);
            const taskDate = new Date(date);
            taskDate.setHours(0, 0, 0, 0);
            
            const diffTime = taskDate.getTime() - today.getTime();
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            // Show relative dates for nearby tasks
            if (diffDays === 0) return 'Today';
            if (diffDays === 1) return 'Tomorrow';
            if (diffDays === -1) return 'Yesterday';
            if (diffDays < 0) return `${Math.abs(diffDays)} days overdue`;
            if (diffDays <= 7) return `In ${diffDays} days`;

            // Otherwise show formatted date
            return date.toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric',
                year: date.getFullYear() !== today.getFullYear() ? 'numeric' : undefined
            });
        } catch {
            return dateStr; // Return original if error occurs
        }
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
          <p className="task-meta">{formatDate(task.time)} • {task.type}</p>
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

