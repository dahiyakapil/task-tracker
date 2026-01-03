const Header = ({ taskCount = 0 }) => {
    return (
        <header className="bg-linear-to-r from-blue-600 to-blue-700 text-white shadow-lg">
            <div className="container mx-auto px-4 py-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">Task Tracker</h1>
                            <p className="text-blue-100 text-sm">Manage your tasks efficiently</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg">
                        <span className="text-3xl font-bold">{taskCount}</span>
                        <span className="text-blue-100 text-sm">Tasks</span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
