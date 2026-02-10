'use client';
import React, { useEffect, useState, useMemo } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { api, UserDistribution } from '@/lib/api';
import ChartSkeleton from '../ChartSkeleton';
import { useAppSelector } from '@/store/hook';


const sampleData: UserDistribution[] = [
  { name: 'Free', value: 6000 },
  { name: 'Premium', value: 4000 },
  { name: 'Enterprise', value: 1000 },
];

const COLORS = ['#2563eb', '#10b981', '#f59e0b'];

export default function UsersPieChart() {
  const [data, setData] = useState<UserDistribution[]>(sampleData);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { userType } = useAppSelector((state) => state.filters);

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      try {
        const result = await api.getUsersDistribution();
        if (mounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (mounted) {
          
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
  }, []);

  const filteredData = useMemo(() => {
    if (!userType) return data;
    return data.filter((d) => d.name.toLowerCase() === userType.toLowerCase());
  }, [data, userType]);

  if (loading) return <ChartSkeleton />;
  if (error) {
    return (
      <div className="flex h-48 items-center justify-center text-sm text-red-600">
        {error}
      </div>
    );
  }

  return (
    <div className="h-65 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={filteredData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            fill="#8884d8"
            label={(entry) => `${entry.name}: ${entry.value}`}
            animationDuration={1000}
            className=''
          >
            {filteredData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend/>

        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
