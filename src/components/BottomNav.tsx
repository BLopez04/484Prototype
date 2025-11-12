import HomeIcon from '@mui/icons-material/Home';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import type { Screen } from '../types';

interface BottomNavProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export default function BottomNav({ currentScreen, onNavigate }: BottomNavProps) {
  return (
    <nav className="bottom-nav">
      <button 
        className={`nav-btn ${currentScreen === 'home' ? 'active' : ''}`}
        onClick={() => onNavigate('home')}
      >
        <HomeIcon />
        <span>Home</span>
      </button>
      
      <button 
        className={`nav-btn ${currentScreen === 'game' ? 'active' : ''}`}
        onClick={() => onNavigate('game')}
      >
        <SportsEsportsIcon />
        <span>Game</span>
      </button>
      
      <button 
        className={`nav-btn ${currentScreen === 'add-task' ? 'active' : ''}`}
        onClick={() => onNavigate('add-task')}
      >
        <AddCircleOutlineIcon />
        <span>Add</span>
      </button>
      
      <button 
        className={`nav-btn ${currentScreen === 'settings' ? 'active' : ''}`}
        onClick={() => onNavigate('settings')}
      >
        <SettingsIcon />
        <span>Settings</span>
      </button>
    </nav>
  );
}

