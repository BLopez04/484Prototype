interface HeaderProps {
  title: string;
}

export default function Header({ title }: HeaderProps) {
  return (
    <header className="app-header">
      <h2 className="app-title">{title}</h2>
    </header>
  );
}

