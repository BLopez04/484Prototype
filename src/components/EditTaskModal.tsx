import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface EditTaskModalProps {
  onClose: () => void;
  onBack: () => void;
}

export default function EditTaskModal({ onClose, onBack }: EditTaskModalProps) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="icon-btn" onClick={onBack}>
            <ArrowBackIcon />
          </button>
          <h2 className="modal-title">Edit</h2>
          <button className="icon-btn" onClick={onClose}>
            <CloseIcon />
          </button>
        </div>
        
        <div className="modal-content">
          <div className="placeholder-box">
            <p>Type your prompt here (Gen AI Text...)</p>
          </div>
          
          <button className="generate-btn">generate response</button>
          
          <div className="modal-actions">
            <button className="action-btn secondary">save</button>
            <button className="action-btn secondary">cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

