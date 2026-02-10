'use client';
import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { api, TrafficSource } from '@/lib/api';
import ChartSkeleton from '../ChartSkeleton';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444'];

const sampleData: TrafficSource[] = [
  { source: 'Organic Search', visitors: 4500, percentage: 45 },
  { source: 'Direct', visitors: 2500, percentage: 25 },
  { source: 'Social Media', visitors: 1800, percentage: 18 },
  { source: 'Referral', visitors: 800, percentage: 8 },
  { source: 'Email', visitors: 400, percentage: 4 },
];

export default function TrafficSourceChart() {
  const [data, setData] = useState<TrafficSource[]>(sampleData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const result = await api.getTrafficSources();
        if (mounted) {
          setData(result);
        }
      } catch (err) {
        console.warn('API not available, using sample data:', err);
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
  }, []);

  if (loading) return <ChartSkeleton />;

  return (
    <div className="h-70 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            dataKey="visitors"
            nameKey="source"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry: any) => `${entry.percentage}%`}
            animationDuration={1000}
          >
            
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              border: '1px solid #e5e7eb',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
              padding: '12px',
            }}
            formatter={(value: number | undefined) => [
              `${value?.toLocaleString() ?? '0'} visitors`,
              'Visitors',
            ]}
          />
          <Legend
            verticalAlign="bottom"
            height={36}
            iconType="circle"
            wrapperStyle={{ fontSize: '12px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
