'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const menuItems = [
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),
    label: 'Dashboard',
    href: '/dashboard',
    badge: null,
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
        />
      </svg>
    ),
    label: 'Analytics',
    href: '/analytics',
    badge: null,
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
        />
      </svg>
    ),
    label: 'Reports',
    href: '/reports',
    badge: '3',
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
        />
      </svg>
    ),
    label: 'Users',
    href: '/users',
    badge: null,
  },
  {
    icon: (
      <svg
        className="h-5 w-5"
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
    ),
    label: 'Settings',
    href: '/settings',
    badge: null,
  },
];

export default function Sidebar({
  collapsed,
  onToggle,
}: {
  collapsed: boolean;
  onToggle: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile overlay */}
      {!collapsed && (
        <div
          className="fixed inset-0 z-20 bg-black/60 backdrop-blur-sm transition-opacity lg:hidden"
          onClick={onToggle}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-30 h-screen border-r border-zinc-200/50 bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-300 dark:border-zinc-700/50 dark:bg-zinc-900/95 lg:static lg:shadow-none ${
          collapsed
            ? '-translate-x-full lg:w-20 lg:translate-x-0'
            : 'w-72 translate-x-0'
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center justify-between border-b border-zinc-200/50 p-5 dark:border-zinc-700/50">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-linear-to-br from-blue-600 to-indigo-600 text-white font-bold shadow-lg shadow-blue-500/30">
                {collapsed ? 'A' : 'AD'}
              </div>
              {!collapsed && (
                <div>
                  <h1 className="text-lg font-bold text-zinc-900 dark:text-white">
                    Analytics
                  </h1>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Dashboard v2.0
                  </p>
                </div>
              )}
            </div>
            <button
              onClick={onToggle}
              aria-label="Toggle sidebar"
              className="rounded-lg p-2 transition-all duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              <svg
                className="h-5 w-5 text-zinc-600 dark:text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={collapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
                />
              </svg>
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className={`group relative flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                        isActive
                          ? 'bg-linear-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                          : 'text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800'
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      {/* Active indicator */}
                      {isActive && !collapsed && (
                        <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-white"></div>
                      )}

                      <span
                        className={`transition-transform duration-200 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}
                      >
                        {item.icon}
                      </span>

                      {!collapsed && (
                        <>
                          <span className="flex-1">{item.label}</span>
                          {item.badge && (
                            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}

                      {collapsed && item.badge && (
                        <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                          {item.badge}
                        </span>
                      )}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Quick Actions */}
            {!collapsed && (
              <div className="mt-8">
                <h3 className="mb-3 px-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Quick Actions
                </h3>
                <button className="w-full rounded-xl bg-linear-to-r from-blue-600 to-indigo-600 px-4 py-3 text-sm font-medium text-white shadow-lg shadow-blue-500/30 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/40">
                  <div className="flex items-center gap-2">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span>New Report</span>
                  </div>
                </button>
              </div>
            )}
          </nav>

          {/* Footer */}
          <div className="border-t border-zinc-200/50 p-4 dark:border-zinc-700/50">
            {!collapsed ? (
              <div className="flex items-center gap-3 rounded-xl bg-zinc-100 p-3 dark:bg-zinc-800">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
                  JD
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-white">
                    John Doe
                  </p>
                  <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                    john@example.com
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex justify-center">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-purple-500 to-pink-500 text-sm font-bold text-white">
                  JD
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
