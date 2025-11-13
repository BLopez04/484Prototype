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

  const handleGenerate = () => {
    const placeholderTexts = [
      "Break down your task into smaller, manageable steps:\n\n1. Start by gathering all necessary materials\n2. Set a clear timeline with milestones\n3. Prioritize the most important subtasks\n4. Take regular breaks to maintain focus\n5. Review your progress and adjust as needed",

      "Here's a suggested approach:\n\n• Begin with research and planning phase (30 mins)\n• Create an outline or framework\n• Work in focused 25-minute intervals\n• Document your progress as you go\n• Schedule time for review and refinement",

      "Consider this structured plan:\n\nPhase 1: Preparation\n- Define clear objectives\n- Identify potential obstacles\n\nPhase 2: Execution\n- Follow your planned timeline\n- Stay organized and focused\n\nPhase 3: Completion\n- Review and polish your work\n- Celebrate your achievement!"
    ];

    const randomText = placeholderTexts[Math.floor(Math.random() * placeholderTexts.length)];
    setPrompt(randomText);
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

          <button className="generate-btn" onClick={handleGenerate}>
            generate response
          </button>

          <div className="modal-actions">
            <button className="action-btn secondary" onClick={handleSave}>save</button>
            <button className="action-btn secondary" onClick={handleCancel}>cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
}

