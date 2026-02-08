import './Navbar.css';

type NavbarProps = {
  username: string;
  onLogout: () => void;
};

export default function Navbar({ username }: NavbarProps) {
  return (
    <header className="navbar">
      <div className="navbar-spacer" />
      <div className="navbar-user">
        <span className="navbar-username">{username}</span>
      </div>
    </header>
  );
}
