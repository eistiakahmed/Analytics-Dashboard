'use client';
import { useEffect, useState } from 'react';

export default function DarkModeDebug() {
  const [isDark, setIsDark] = useState(false);
  const [theme, setTheme] = useState('');

  useEffect(() => {
    const checkDarkMode = () => {
      const dark = document.documentElement.classList.contains('dark');
      const savedTheme = localStorage.getItem('theme') || 'not set';
      setIsDark(dark);
      setTheme(savedTheme);
    };

    checkDarkMode();

    const interval = setInterval(checkDarkMode, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50 rounded-lg border-2 border-blue-500 bg-white p-4 shadow-lg dark:bg-zinc-800">
      <h3 className="mb-2 font-bold text-blue-600 dark:text-blue-400">
        Dark Mode Debug
      </h3>
      <div className="space-y-1 text-sm">
        <div>
          <strong>Dark Class:</strong>{' '}
          <span className={isDark ? 'text-green-600' : 'text-red-600'}>
            {isDark ? '✓ Applied' : '✗ Not Applied'}
          </span>
        </div>
        <div>
          <strong>localStorage:</strong> {theme}
        </div>
        <div>
          <strong>Background:</strong>{' '}
          <span className="dark:text-yellow-400">
            {isDark ? 'Dark' : 'Light'}
          </span>
        </div>
      </div>
      <button
        onClick={() => {
          document.documentElement.classList.toggle('dark');
          const newTheme = document.documentElement.classList.contains('dark')
            ? 'dark'
            : 'light';
          localStorage.setItem('theme', newTheme);
        }}
        className="mt-2 w-full rounded bg-blue-500 px-3 py-1 text-xs text-white hover:bg-blue-600"
      >
        Force Toggle
      </button>
    </div>
  );
}
