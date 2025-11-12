import MoreVertIcon from '@mui/icons-material/MoreVert';
import type { Task } from '../types';

interface TaskCardProps {
  task: Task;
  onClick: () => void;
}

export default function TaskCard({ task, onClick }: TaskCardProps) {
  return (
    <div className="task-card" onClick={onClick}>
      <div className="task-card-content">
        <input 
          type="checkbox" 
          className="task-checkbox"
          onClick={(e) => e.stopPropagation()}
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

