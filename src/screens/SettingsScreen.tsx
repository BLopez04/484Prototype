import SettingsIcon from '@mui/icons-material/Settings';
import Header from '../components/Header';

export default function SettingsScreen() {
  return (
    <div className="screen">
      <Header title="Settings" />
      <div className="content">
        <div className="placeholder-card">
          <SettingsIcon sx={{ fontSize: 48, color: '#60a5fa', mb: 2 }} />
          <h2>Settings</h2>
          <p>Profile and preferences will go here</p>
        </div>
      </div>
    </div>
  );
}

