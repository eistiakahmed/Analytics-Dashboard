'use client';
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  delta: number;
  positive: boolean;
  loading?: boolean;
  icon?: React.ReactNode;
}

export default function KpiCard({
  title,
  value,
  delta,
  positive,
  loading = false,
  icon,
}: KpiCardProps) {
  if (loading) {
    return (
      <div className="animate-pulse rounded-xl border border-gray-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex items-start justify-between">
          <div className="space-y-3 flex-1">
            <div className="h-4 w-24 rounded bg-gray-200 dark:bg-zinc-700"></div>
            <div className="h-8 w-32 rounded bg-gray-200 dark:bg-zinc-700"></div>
          </div>
          <div className="h-10 w-10 rounded-lg bg-gray-200 dark:bg-zinc-700"></div>
        </div>
        <div className="mt-4 h-3 w-20 rounded bg-gray-200 dark:bg-zinc-700"></div>
      </div>
    );
  }

  const getIconColor = () => {
    if (title.includes('Revenue')) return 'bg-blue-600';
    if (title.includes('Users')) return 'bg-emerald-600';
    if (title.includes('Orders')) return 'bg-purple-600';
    if (title.includes('Conversion')) return 'bg-orange-600';
    return 'bg-blue-600';
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
            {title}
          </p>
          <div className="mt-2 flex items-baseline gap-2">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
              {value}
            </h3>
          </div>
        </div>

        {icon && (
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-lg ${getIconColor()} text-white`}
          >
            <span className="text-xl">{icon}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center gap-2">
        <div
          className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
            positive
              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
              : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400'
          }`}
        >
          <svg
            className={`h-3 w-3 ${positive ? '' : 'rotate-180'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M5 15l7-7 7 7"
            />
          </svg>
          <span>{Math.abs(delta)}%</span>
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400">
          vs last period
        </span>
      </div>
    </div>
  );
}
