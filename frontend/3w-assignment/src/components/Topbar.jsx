export const Topbar = ({ user, onLogout }) => {
  return (
    <header className="topbar">
      <div>
        <p className="eyebrow">🌐 Social Network</p>
        <h1 className="brand">Pulse</h1>
      </div>
      <div className="user-chip">
        {user ? (
          <>
            <div>
              <p className="chip-label">👤 Logged in</p>
              <p className="chip-name">{user.username}</p>
            </div>
            <button type="button" className="ghost" onClick={onLogout}>
              🚪 Logout
            </button>
          </>
        ) : (
          <p className="chip-muted">👋 Guest</p>
        )}
      </div>
    </header>
  );
};
