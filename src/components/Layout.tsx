type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="bg-zinc-700 min-h-screen pt-24 pb-8 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-8">
        <h1 className="text-5xl font-bold text-white">My Pomodoro Timer</h1>
        <p className="text-zinc-300">
          集中力を高める、時間管理テクニックです ⏰
          <br />
          25分間の作業と、5分間の休憩を繰り返し、生産性を向上させましょう！
        </p>
      </div>

      {/* Timer */}
      {children}

      {/* Footer */}
      <footer className="text-center">
        <p className="text-zinc-400">
          Created by{" "}
          <a
            className="text-amber-300"
            href="https://github.com/otaki0413/pomodoro-timer"
            target="_blank"
            rel="noreferrer"
          >
            @otaki0413
          </a>{" "}
          &copy; 2025
        </p>
      </footer>
    </div>
  );
};

export default Layout;
