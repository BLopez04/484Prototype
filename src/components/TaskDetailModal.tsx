import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';

interface TaskDetailModalProps {
  onClose: () => void;
  onEdit: () => void;
}

export default function TaskDetailModal({ onClose, onEdit }: TaskDetailModalProps) {
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
          <h3 className="task-detail-title">Morning Routine</h3>
          
          <div className="task-section">
            <h4>Steps:</h4>
            <ol className="steps-list">
              <li>Wake up at 8am</li>
              <li>Exercise for 20 mins</li>
              <li>Healthy breakfast</li>
            </ol>
          </div>

          <div className="task-section">
            <div className="task-detail-row">
              <span className="detail-label">Type:</span>
              <span>Daily Routine</span>
            </div>
            <div className="task-detail-row">
              <span className="detail-label">Due:</span>
              <span>10:00 AM</span>
            </div>
            <div className="task-detail-row">
              <span className="detail-label">Status:</span>
              <span>In Progress</span>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '16px' }}>
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

