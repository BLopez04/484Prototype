import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import type {Task} from "../types";

interface TaskDetailModalProps {
  onClose: () => void;
  onEdit: () => void;
  task: Task | null;
}

export default function TaskDetailModal({ onClose, onEdit, task }: TaskDetailModalProps) {
    if (task === null) {
        return <div> TASK IS NULL (TEMPORARY THIS SHOULDNT HAPPEN) </div>
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
              <span>{task.time}</span>
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

          <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '16px'}}>
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

