import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import type {Task} from "../types";

interface TaskDetailModalProps {
  onClose: () => void;
  onEdit: () => void;
  onDelete: (taskId: number) => void;
  task: Task | null;
}

export default function TaskDetailModal({ onClose, onEdit, onDelete, task }: TaskDetailModalProps) {
    if (task === null) {
        return <div> TASK IS NULL (TEMPORARY THIS SHOULDNT HAPPEN) </div>
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

            // Build formatted string
            const formattedDate = date.toLocaleDateString('en-US', { 
                weekday: 'short',
                month: 'short', 
                day: 'numeric',
                year: 'numeric'
            });

            // Add relative info
            if (diffDays === 0) return `${formattedDate} (Today)`;
            if (diffDays === 1) return `${formattedDate} (Tomorrow)`;
            if (diffDays === -1) return `${formattedDate} (Yesterday)`;
            if (diffDays < 0) return `${formattedDate} (${Math.abs(diffDays)} days overdue)`;
            if (diffDays <= 7) return `${formattedDate} (In ${diffDays} days)`;

            return formattedDate;
        } catch {
            return dateStr; // Return original if error occurs
        }
    }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ width: '24px' }}></div>
          <h2 className="modal-title">Task</h2>
          <button className="icon-btn" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className="modal-content">
          <h3 className="task-detail-title">{task.title}</h3>
          
          <div className="task-section">
            <h4>Steps:</h4>
            <ol className="steps-list">
                {task.steps.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ol>
          </div>

          <div className="task-section">
            <div className="task-detail-row">
              <span className="detail-label">Type:</span>
              <span>{task.type}</span>
            </div>
            <div className="task-detail-row">
              <span className="detail-label">Due:</span>
              <span>{formatDate(task.time)}</span>
            </div>
            <div className="task-detail-row">
              <span className="detail-label">XP:</span>
              <span>{task.xp}</span>
            </div>
            <div className="task-detail-row">
              <span className="detail-label">Status:</span>
              <span>{task.flag ? "Completed" : "In Progress"}</span>
            </div>
          </div>

          <div style={{display: 'flex', justifyContent: 'space-between', marginTop: '16px'}}>
            <button 
              className="delete-task-btn" 
              onClick={() => task.id !== undefined && onDelete(task.id)}
              style={{color: '#dc3545'}}
            >
              <DeleteIcon sx={{ fontSize: 18 }} />
              Delete
            </button>
            <button className="edit-task-btn" onClick={onEdit}>
              <EditIcon sx={{ fontSize: 18 }} />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

