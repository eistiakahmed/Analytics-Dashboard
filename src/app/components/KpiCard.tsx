'use client';
import React from 'react';

interface KpiCardProps {
  title: string;
  value: string;
  delta: number;
  positive: boolean;
  loading?: boolean;
  icon?: string;
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
      <div className="animate-pulse rounded-xl border border-zinc-200/50 bg-linear-to-br from-white to-zinc-50 p-6 shadow-sm dark:border-zinc-700/50 dark:from-zinc-800 dark:to-zinc-800/50">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <div className="h-4 w-24 rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
            <div className="h-9 w-32 rounded-md bg-zinc-200 dark:bg-zinc-700"></div>
          </div>
          <div className="h-12 w-12 rounded-xl bg-zinc-200 dark:bg-zinc-700"></div>
        </div>
        <div className="mt-4 h-3 w-20 rounded-full bg-zinc-200 dark:bg-zinc-700"></div>
      </div>
    );
  }

  const iconBgColor = positive
    ? 'bg-gradient-to-br from-green-500 to-emerald-600'
    : 'bg-gradient-to-br from-blue-500 to-indigo-600';

  return (
    <div className="group relative overflow-hidden rounded-xl border border-zinc-200/50 bg-linear-to-br from-white to-zinc-50/50 p-6 shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:border-zinc-700/50 dark:from-zinc-800 dark:to-zinc-800/50 dark:hover:shadow-zinc-900/50">
      
      <div className="absolute inset-0 bg-linear-to-br from-blue-500/0 to-purple-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-5"></div>

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {title}
            </p>
            <div className="mt-3 flex items-baseline gap-2">
              <h3 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                {value}
              </h3>
            </div>
          </div>

          
          {icon && (
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBgColor} text-white shadow-lg transition-transform duration-300 group-hover:scale-110`}
            >
              <span className="text-xl">{icon}</span>
            </div>
          )}
        </div>

        
        <div className="mt-4 flex items-center gap-2">
          <div
            className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-all duration-300 ${
              positive
                ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
            }`}
          >
            <svg
              className={`h-3.5 w-3.5 transition-transform duration-300 group-hover:scale-110 ${
                positive ? '' : 'rotate-180'
              }`}
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
            <span>{Math.abs(delta)}%</span>
          </div>
          <span className="text-xs text-zinc-500 dark:text-zinc-500">
            vs last period
          </span>
        </div>
      </div>
    </div>
  );
}
