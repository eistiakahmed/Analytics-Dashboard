'use client';
import React, { useState } from 'react';

import Header from './Header';
import Sidebar from './Sidebar';

export default function DashboardLayout({
  children,
  onExportCSV,
}: {
  children: React.ReactNode;
  onExportCSV?: () => void;
}) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900">
      <div className="flex">
        <Sidebar
          collapsed={collapsed}
          onToggle={() => setCollapsed((s) => !s)}
        />
        <div className="flex min-h-screen flex-1 flex-col">
          <Header
            onToggleSidebar={() => setCollapsed((s) => !s)}
            onExportCSV={onExportCSV}
          />
          <main className="flex-1 overflow-x-hidden">{children}</main>
        </div>
      </div>
    </div>
  );
}
