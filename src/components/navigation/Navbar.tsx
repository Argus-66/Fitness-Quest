<nav className="fixed top-0 left-0 right-0 z-50 bg-theme-dark/80 backdrop-blur-sm border-b border-theme-accent/20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      <div className="flex items-center">
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Fitness Quest Logo"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="ml-2 text-xl font-bold text-theme-light">Fitness Quest</span>
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <Link href="/dashboard" className="text-theme-light hover:text-theme-accent transition-colors">
              Dashboard
            </Link>
            <Link href={`/${user.username}`} className="text-theme-light hover:text-theme-accent transition-colors">
              Profile
            </Link>
            <button
              onClick={handleLogout}
              className="text-theme-light hover:text-theme-accent transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <Link href="/login" className="text-theme-light hover:text-theme-accent transition-colors">
            Login
          </Link>
        )}
      </div>
    </div>
  </div>
</nav> 