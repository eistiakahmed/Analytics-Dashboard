'use client';
import React, { useState, useEffect } from 'react';
import { setDateRange, setUserType } from '@/store/store';
import { useAppDispatch, useAppSelector } from '@/store/hook';

export default function Header({
  onToggleSidebar,
}: {
  onToggleSidebar?: () => void;
  onExportCSV?: () => void;
}) {
  const dispatch = useAppDispatch();
  const { dateRange, userType } = useAppSelector((state) => state.filters);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = document.documentElement.classList.contains('dark');
    setDarkMode(isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <header className="sticky top-0 z-10 border-b border-zinc-200/50 bg-white/80 backdrop-blur-xl px-4 py-4 shadow-sm dark:border-zinc-700/50 dark:bg-zinc-900/80 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={onToggleSidebar}
            className="rounded-xl p-2 transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 lg:hidden"
            aria-label="Toggle sidebar"
          >
            <svg
              className="h-6 w-6 text-zinc-700 dark:text-zinc-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>

          <div className="hidden sm:block">
            <h2 className="text-xl font-bold text-zinc-900 dark:text-white">
              Dashboard
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Welcome back! Here &#39;s your overview
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <select
              value={dateRange}
              onChange={(e) => dispatch(setDateRange(e.target.value))}
              className="appearance-none rounded-xl border border-zinc-300 bg-white pl-4 pr-10 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="12m">Last 12 months</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-4 w-4 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <div className="relative hidden sm:block">
            <select
              value={userType || ''}
              onChange={(e) => dispatch(setUserType(e.target.value || null))}
              className="appearance-none rounded-xl border border-zinc-300 bg-white pl-4 pr-10 py-2.5 text-sm font-medium text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-200"
            >
              <option value="">All Users</option>
              <option value="free">Free</option>
              <option value="premium">Premium</option>
              <option value="enterprise">Enterprise</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              <svg
                className="h-4 w-4 text-zinc-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          <button
            onClick={toggleDarkMode}
            className="rounded-xl p-2.5 transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? (
              <svg
                className="h-5 w-5 text-yellow-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="h-5 w-5 text-zinc-700 dark:text-zinc-300"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label="Notifications"
              className="relative rounded-xl p-2.5 transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg
                className="h-5 w-5 text-zinc-700 dark:text-zinc-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute right-1.5 top-1.5 flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
              </span>
            </button>
            {showNotifications && (
              <div className="absolute right-0 top-14 z-50 w-80 rounded-xl border border-zinc-200 bg-white p-4 shadow-2xl dark:border-zinc-700 dark:bg-zinc-800">
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="font-semibold text-zinc-900 dark:text-white">
                    Notifications
                  </h3>
                  <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                    2 new
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="rounded-lg bg-blue-50 p-3 transition-colors hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      New user registered
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      2 minutes ago
                    </p>
                  </div>
                  <div className="rounded-lg bg-zinc-50 p-3 transition-colors hover:bg-zinc-100 dark:bg-zinc-800/50 dark:hover:bg-zinc-800">
                    <p className="text-sm font-medium text-zinc-900 dark:text-white">
                      Revenue milestone reached
                    </p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">
                      1 hour ago
                    </p>
                  </div>
                </div>
                <button className="mt-3 w-full rounded-lg bg-zinc-100 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600">
                  View all notifications
                </button>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button
              onClick={() => setShowProfile(!showProfile)}
              className="flex items-center gap-2 rounded-xl p-1.5 transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-linear-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-lg">
                A
              </div>
              <span className="hidden text-sm font-medium text-zinc-900 dark:text-white sm:inline">
                Admin
              </span>
              <svg
                className="hidden h-4 w-4 text-zinc-500 sm:block"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {showProfile && (
              <div className="absolute right-0 top-14 z-50 w-56 rounded-xl border border-zinc-200 bg-white p-2 shadow-2xl dark:border-zinc-700 dark:bg-zinc-800">
                <div className="mb-2 border-b border-zinc-200 p-3 dark:border-zinc-700">
                  <p className="font-medium text-zinc-900 dark:text-white">
                    Admin User
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    admin@example.com
                  </p>
                </div>
                <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    Profile
                  </div>
                </button>
                <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-700">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </div>
                </button>
                <hr className="my-2 border-zinc-200 dark:border-zinc-700" />
                <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-red-600 transition-colors hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
