import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Header from '../components/Header';

export default function AddTaskScreen() {
  return (
    <div className="screen">
      <Header title="Create Task" />
      <div className="content">
        <div className="placeholder-card">
          <AddCircleOutlineIcon sx={{ fontSize: 48, color: '#60a5fa', mb: 2 }} />
          <h2>Add Task</h2>
          <p>Task creation form will go here</p>
        </div>
      </div>
    </div>
  );
}

