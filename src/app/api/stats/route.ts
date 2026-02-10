import { NextResponse } from 'next/server';

const statsData = {
  totalRevenue: 229000,
  totalUsers: 11000,
  orders: 3180,
  conversionRate: 3.8,
  revenueDelta: 8.6,
  usersDelta: -1.2,
  ordersDelta: 2.3,
  conversionDelta: 0.4,
};

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(statsData);
}
