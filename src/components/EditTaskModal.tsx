import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import type { Task } from '../types';
import { useTaskContext } from '../contexts/TaskContext';

interface EditTaskModalProps {
  onClose: () => void;
  onBack: () => void;
  task: Task;
}

export default function EditTaskModal({ onClose, onBack, task }: EditTaskModalProps) {
  const { updateTask } = useTaskContext();
  const [prompt, setPrompt] = useState(task.steps.join('\n') || '');
  const [previousPrompt, setPreviousPrompt] = useState<string | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleGenerate = () => {
    // If there's existing content, show confirmation dialog
    if (prompt.trim()) {
      setShowConfirmDialog(true);
    } else {
      generateContent();
    }
  };

  const generateContent = () => {
    const placeholderTexts = [
      "Break down your task into smaller, manageable steps:\n\n1. Start by gathering all necessary materials\n2. Set a clear timeline with milestones\n3. Prioritize the most important subtasks\n4. Take regular breaks to maintain focus\n5. Review your progress and adjust as needed",

      "Here's a suggested approach:\n\n• Begin with research and planning phase (30 mins)\n• Create an outline or framework\n• Work in focused 25-minute intervals\n• Document your progress as you go\n• Schedule time for review and refinement",

      "Consider this structured plan:\n\nPhase 1: Preparation\n- Define clear objectives\n- Identify potential obstacles\n\nPhase 2: Execution\n- Follow your planned timeline\n- Stay organized and focused\n\nPhase 3: Completion\n- Review and polish your work\n- Celebrate your achievement!"
    ];

    // Store current content for undo
    setPreviousPrompt(prompt);
    const randomText = placeholderTexts[Math.floor(Math.random() * placeholderTexts.length)];
    setPrompt(randomText);
    setShowConfirmDialog(false);
  };

  const handleUndo = () => {
    if (previousPrompt !== null) {
      setPrompt(previousPrompt);
      setPreviousPrompt(null);
    }
  };

  const handleSave = () => {
    // text to steps
    const steps = prompt.split('\n').filter(line => line.trim() !== '');

    // update task
    if (task.id !== undefined) {
      updateTask(task.id, {
        ...task,
        steps: steps
      });
    }

    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

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
          <textarea
            className="prompt-input"
            placeholder="Type your prompt here (Gen AI Text...)"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={10}
          />

          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button className="generate-btn" onClick={handleGenerate}>
              generate AI suggestions
            </button>
            {previousPrompt !== null && (
              <button 
                className="generate-btn" 
                onClick={handleUndo}
                style={{ backgroundColor: '#6c757d' }}
              >
                undo generation
              </button>
            )}
          </div>

          <div className="modal-actions">
            <button className="action-btn secondary" onClick={handleSave}>save</button>
            <button className="action-btn secondary" onClick={handleCancel}>cancel</button>
          </div>
        </div>

        {/* Confirmation Dialog */}
        {showConfirmDialog && (
          <div className="modal-overlay" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
            <div className="modal" style={{ maxWidth: '400px' }} onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2 className="modal-title">Confirm Generation</h2>
                <button className="icon-btn" onClick={() => setShowConfirmDialog(false)}>
                  <CloseIcon />
                </button>
              </div>
              <div className="modal-content">
                <p style={{ marginBottom: '20px', color: '#666' }}>
                  Generating AI suggestions will replace your current content. You can undo this action afterwards.
                </p>
                <p style={{ marginBottom: '20px', fontWeight: 'bold' }}>
                  Do you want to continue?
                </p>
                <div className="modal-actions">
                  <button className="action-btn secondary" onClick={generateContent}>
                    Yes, generate
                  </button>
                  <button className="action-btn secondary" onClick={() => setShowConfirmDialog(false)}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

