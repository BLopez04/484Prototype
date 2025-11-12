import PersonIcon from '@mui/icons-material/Person';

interface WelcomeCardProps {
  username?: string;
}

export default function WelcomeCard({ username = 'User' }: WelcomeCardProps) {
  return (
    <div className="welcome-card">
      <div className="welcome-text">
        <h1 className="greeting">Welcome back,</h1>
        <p className="username">{username}</p>
      </div>
      <div className="user-avatar">
        <PersonIcon sx={{ fontSize: 32, color: '#fff' }} />
      </div>
    </div>
  );
}

