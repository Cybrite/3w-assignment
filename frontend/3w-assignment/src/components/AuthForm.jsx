export const AuthForm = ({
  mode,
  form,
  onChange,
  onSubmit,
  onModeChange,
  loading,
}) => {
  const isSignup = mode === "signup";

  return (
    <div className="card auth-card">
      <div className="card-header">
        <h2>{isSignup ? "Create account" : "Welcome back"}</h2>
        <p>
          {isSignup
            ? "Sign up in seconds to share updates."
            : "Log in to join the conversation."}
        </p>
      </div>
      <form onSubmit={onSubmit} className="form">
        {isSignup && (
          <label className="field">
            <span>Username</span>
            <input
              type="text"
              value={form.username}
              onChange={(e) => onChange("username", e.target.value)}
              placeholder="TaskTrekker"
              required
            />
          </label>
        )}
        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
            placeholder="you@example.com"
            required
          />
        </label>
        <label className="field">
          <span>Password</span>
          <input
            type="password"
            value={form.password}
            onChange={(e) => onChange("password", e.target.value)}
            placeholder="••••••••"
            required
          />
        </label>
        <button className="primary" type="submit" disabled={loading}>
          {isSignup ? "Sign up" : "Login"}
        </button>
      </form>
      <button type="button" className="link" onClick={onModeChange}>
        {isSignup
          ? "Already have an account? Login."
          : "New here? Create an account."}
      </button>
    </div>
  );
};
