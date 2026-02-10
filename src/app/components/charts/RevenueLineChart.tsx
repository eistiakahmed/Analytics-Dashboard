'use client';
import React, { useEffect, useState, useMemo } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { api, RevenueData } from '@/lib/api';
import ChartSkeleton from '../ChartSkeleton';
import { useAppSelector } from '@/store/hooks';

const sampleData: RevenueData[] = [
  { month: 'Jan', revenue: 8000 },
  { month: 'Feb', revenue: 12000 },
  { month: 'Mar', revenue: 14000 },
  { month: 'Apr', revenue: 16000 },
  { month: 'May', revenue: 18000 },
  { month: 'Jun', revenue: 20000 },
  { month: 'Jul', revenue: 22000 },
  { month: 'Aug', revenue: 24000 },
  { month: 'Sep', revenue: 20000 },
  { month: 'Oct', revenue: 23000 },
  { month: 'Nov', revenue: 25000 },
  { month: 'Dec', revenue: 27000 },
];

export default function RevenueLineChart() {
  const [data, setData] = useState<RevenueData[]>(sampleData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dateRange } = useAppSelector((state) => state.filters);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const result = await api.getRevenue();
        if (mounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          // Use sample data as fallback - no error shown
          console.warn('API not available, using sample data:', err);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [dateRange]);

  const filteredData = useMemo(() => {
    if (dateRange === '7d') return data.slice(-2);
    if (dateRange === '30d') return data.slice(-3);
    return data;
  }, [data, dateRange]);

  if (loading) return <ChartSkeleton />;
  if (error) {
    return (
      <div className="flex h-56 items-center justify-center text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="h-56 w-full">
      <ResponsiveContainer>
        <LineChart data={filteredData}>
          <defs>
            <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            strokeOpacity={0.5}
            className="dark:stroke-zinc-700"
          />
          <XAxis
            dataKey="month"
            tick={{ fontSize: 12, fill: '#71717a' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis
            tick={{ fontSize: 12, fill: '#71717a' }}
            tickLine={false}
            axisLine={{ stroke: '#e5e7eb' }}
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '12px',
            }}
            labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
            formatter={(value: number) => [
              `$${value.toLocaleString()}`,
              'Revenue',
            ]}
            cursor={{
              stroke: '#3b82f6',
              strokeWidth: 1,
              strokeDasharray: '5 5',
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="url(#gradient)"
            strokeWidth={3}
            dot={{
              fill: '#3b82f6',
              r: 4,
              strokeWidth: 2,
              stroke: '#fff',
            }}
            activeDot={{
              r: 6,
              fill: '#3b82f6',
              stroke: '#fff',
              strokeWidth: 2,
            }}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
          <defs>
            <linearGradient id="gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#6366f1" />
            </linearGradient>
          </defs>
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
