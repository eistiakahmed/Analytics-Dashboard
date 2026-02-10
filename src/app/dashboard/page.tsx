'use client';
import React, { useEffect, useState, useMemo } from 'react';
import { api, StatsData } from '@/lib/api';
import StatsComparison from '../components/StatsComparison';
import TrafficSourceChart from '../components/charts/TrafficSourceChart';
import UsersPieChart from '../components/charts/UsersPieChart';
import OrdersBarChart from '../components/charts/OrdersBarChart';
import KpiCard from '../components/KpiCard';
import { useAppSelector } from '@/store/hook';
import RevenueLineChart from '../components/charts/RevenueLineChart';
import DashboardLayout from '../components/Layout';

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
        icon: '💰',
      },
      {
        id: 2,
        title: 'Total Users',
        value: stats.totalUsers.toLocaleString(),
        delta: -1.2,
        positive: false,
        icon: '👥',
      },
      {
        id: 3,
        title: 'Orders',
        value: stats.orders.toLocaleString(),
        delta: 2.3,
        positive: true,
        icon: '📦',
      },
      {
        id: 4,
        title: 'Conversion Rate',
        value: `${stats.conversionRate}%`,
        delta: 0.4,
        positive: true,
        icon: '📈',
      },
    ],
    [stats]
  );

  const handleExportCSV = async () => {
    try {
      const [revenue, orders, users, traffic] = await Promise.all([
        api.getRevenue(),
        api.getOrders(),
        api.getUsersDistribution(),
        api.getTrafficSources(),
      ]);

      let csv = 'Dashboard Export\n\n';

      csv += 'KPI Metrics\n';
      csv += 'Metric,Value,Change\n';
      csv += `Total Revenue,$${stats.totalRevenue.toLocaleString()},+8.6%\n`;
      csv += `Total Users,${stats.totalUsers.toLocaleString()},-1.2%\n`;
      csv += `Orders,${stats.orders.toLocaleString()},+2.3%\n`;
      csv += `Conversion Rate,${stats.conversionRate}%,+0.4%\n\n`;

      csv += 'Revenue Over Time\n';
      csv += 'Month,Revenue\n';
      revenue.forEach((item) => {
        csv += `${item.month},$${item.revenue}\n`;
      });
      csv += '\n';

      csv += 'Orders Per Month\n';
      csv += 'Month,Orders\n';
      orders.forEach((item) => {
        csv += `${item.month},${item.orders}\n`;
      });
      csv += '\n';

      csv += 'User Distribution\n';
      csv += 'Type,Count\n';
      users.forEach((item) => {
        csv += `${item.name},${item.value}\n`;
      });
      csv += '\n';

      csv += 'Traffic Sources\n';
      csv += 'Source,Visitors,Percentage\n';
      traffic.forEach((item) => {
        csv += `${item.source},${item.visitors},${item.percentage}%\n`;
      });

      const blob = new Blob([csv], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  return (
    <DashboardLayout onExportCSV={handleExportCSV}>
      <div className="min-h-screen bg-linear-to-br from-zinc-50 via-white to-zinc-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800">
        <div className="space-y-8 p-4 sm:p-6 lg:p-8">
          {/* Welcome Banner */}

          
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Overview
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Key performance indicators for your business
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
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

          
          <StatsComparison />

          
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
                Analytics
              </h2>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Detailed insights and trends
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="col-span-1 overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg shadow-zinc-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:shadow-zinc-900/50 dark:hover:shadow-zinc-900/50 lg:col-span-2">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      Revenue Over Time
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      Monthly revenue trends
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/30">
                    <svg
                      className="h-6 w-6"
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

              <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg shadow-zinc-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:shadow-zinc-900/50 dark:hover:shadow-zinc-900/50">
                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                      User Distribution
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400">
                      By subscription type
                    </p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-green-500 to-emerald-600 text-white shadow-lg shadow-green-500/30">
                    <svg
                      className="h-6 w-6"
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

          
          <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg shadow-zinc-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:shadow-zinc-900/50 dark:hover:shadow-zinc-900/50">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    Orders Per Month
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Monthly order volume
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-purple-500 to-pink-600 text-white shadow-lg shadow-purple-500/30">
                  <svg
                    className="h-6 w-6"
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

            <div className="overflow-hidden rounded-2xl border border-zinc-200/50 bg-white/80 backdrop-blur-sm p-6 shadow-lg shadow-zinc-200/50 transition-all duration-300 hover:shadow-xl hover:shadow-zinc-200/50 dark:border-zinc-700/50 dark:bg-zinc-800/80 dark:shadow-zinc-900/50 dark:hover:shadow-zinc-900/50">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    Traffic Sources
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400">
                    Visitor acquisition channels
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-red-600 text-white shadow-lg shadow-orange-500/30">
                  <svg
                    className="h-6 w-6"
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
