'use client';
import React from 'react';

interface StatItem {
  label: string;
  value: string;
  change: number;
  icon: string;
}

export default function StatsComparison() {
  const stats: StatItem[] = [
    { label: 'Avg. Order Value', value: '$72', change: 12.5, icon: '💵' },
    { label: 'Customer Retention', value: '84%', change: 5.2, icon: '🔄' },
    { label: 'Response Time', value: '2.3s', change: -15.8, icon: '⚡' },
    { label: 'Satisfaction Score', value: '4.8', change: 8.3, icon: '⭐' },
  ];

  return (
    <div className="rounded-2xl border border-zinc-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg dark:border-zinc-700/50 dark:bg-zinc-800/80">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
            Performance Metrics
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Additional insights at a glance
          </p>
        </div>
        <button className="rounded-lg bg-zinc-100 px-3 py-1.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-200 dark:bg-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-600">
          View Details
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl border border-zinc-200/50 bg-linear-to-br from-white to-zinc-50/50 p-4 transition-all hover:shadow-lg dark:border-zinc-700/50 dark:from-zinc-800 dark:to-zinc-800/50"
          >
            <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 opacity-0 transition-opacity group-hover:opacity-5" />

            <div className="relative">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-2xl">{stat.icon}</span>
                <div
                  className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
                    stat.change > 0
                      ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}
                >
                  <svg
                    className={`h-3 w-3 ${stat.change < 0 ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  {Math.abs(stat.change)}%
                </div>
              </div>

              <div className="text-2xl font-bold text-zinc-900 dark:text-white">
                {stat.value}
              </div>

              <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
                {stat.label}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
