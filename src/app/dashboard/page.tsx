'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { api, StatsData } from '@/lib/api';

import TrafficSourceChart from '../components/charts/TrafficSourceChart';
import UsersPieChart from '../components/charts/UsersPieChart';
import OrdersBarChart from '../components/charts/OrdersBarChart';
import KpiCard from '../components/KpiCard';
import { useAppSelector } from '@/store/hook';
import RevenueLineChart from '../components/charts/RevenueLineChart';
import DashboardLayout from '../components/Layout';
import { TbMoneybag } from 'react-icons/tb';
import { IoPeopleSharp } from 'react-icons/io5';
import { BsFillBoxFill, BsGraphUpArrow } from 'react-icons/bs';

const defaultStats: StatsData = {
  totalRevenue: 124320,
  totalUsers: 12430,
  orders: 3210,
  conversionRate: 3.8,
};

export default function DashboardPage() {
  const [stats, setStats] = useState<StatsData>(defaultStats);
  const [loading, setLoading] = useState(true);
  const { dateRange } = useAppSelector((state) => state.filters);

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        const data = await api.getStats();
        if (mounted) {
          setStats(data);
        }
      } catch (err) {
        console.warn('API not available, using default stats:', err);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchStats();

    return () => {
      mounted = false;
    };
  }, [dateRange]);

  const kpis = useMemo(
    () => [
      {
        id: 1,
        title: 'Total Revenue',
        value: `$${stats.totalRevenue.toLocaleString()}`,
        delta: 8.6,
        positive: true,
        icon: <TbMoneybag />,
      },
      {
        id: 2,
        title: 'Total Users',
        value: stats.totalUsers.toLocaleString(),
        delta: -1.2,
        positive: false,
        icon: <IoPeopleSharp />,
      },
      {
        id: 3,
        title: 'Orders',
        value: stats.orders.toLocaleString(),
        delta: 2.3,
        positive: true,
        icon: <BsFillBoxFill />,
      },
      {
        id: 4,
        title: 'Conversion Rate',
        value: `${stats.conversionRate}%`,
        delta: 0.4,
        positive: true,
        icon: <BsGraphUpArrow />,
      },
    ],
    [stats]
  );

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gray-50 dark:bg-zinc-950">
        <div className="space-y-6 p-4 sm:p-6 lg:p-8">
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Overview
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Track your business performance at a glance
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {kpis.map((k) => (
                <KpiCard
                  key={k.id}
                  title={k.title}
                  value={k.value}
                  delta={k.delta}
                  positive={k.positive}
                  loading={loading}
                  icon={k.icon}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Analytics
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Detailed insights and performance trends
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
              <div className="col-span-1 overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 lg:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Revenue Over Time
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Monthly revenue growth trends
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white">
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
                        d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                      />
                    </svg>
                  </div>
                </div>
                <RevenueLineChart />
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      User Distribution
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      By subscription tier
                    </p>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-600 text-white">
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
                        d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                      />
                    </svg>
                  </div>
                </div>
                <UsersPieChart />
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Orders Per Month
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Monthly order volume trends
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600 text-white">
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
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
              </div>
              <OrdersBarChart />
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Traffic Sources
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Visitor acquisition channels
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white">
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
                      d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                    />
                  </svg>
                </div>
              </div>
              <TrafficSourceChart />
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}
