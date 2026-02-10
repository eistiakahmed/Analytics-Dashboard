'use client';
import React, { useEffect, useState, useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { api, OrdersData } from '@/lib/api';
import ChartSkeleton from '../ChartSkeleton';
import { useAppSelector } from '@/store/hooks';

const sampleData: OrdersData[] = [
  { month: 'Jan', orders: 120 },
  { month: 'Feb', orders: 210 },
  { month: 'Mar', orders: 240 },
  { month: 'Apr', orders: 200 },
  { month: 'May', orders: 280 },
  { month: 'Jun', orders: 300 },
  { month: 'Jul', orders: 320 },
  { month: 'Aug', orders: 310 },
  { month: 'Sep', orders: 260 },
  { month: 'Oct', orders: 290 },
  { month: 'Nov', orders: 330 },
  { month: 'Dec', orders: 360 },
];

export default function OrdersBarChart() {
  const [data, setData] = useState<OrdersData[]>(sampleData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { dateRange } = useAppSelector((state) => state.filters);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const result = await api.getOrders();
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
        <BarChart data={filteredData}>
          <defs>
            <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
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
            formatter={(value: number) => [value.toLocaleString(), 'Orders']}
            cursor={{ fill: 'rgba(168, 85, 247, 0.1)' }}
          />
          <Bar
            dataKey="orders"
            fill="url(#colorOrders)"
            radius={[8, 8, 0, 0]}
            animationDuration={1500}
            animationEasing="ease-in-out"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
