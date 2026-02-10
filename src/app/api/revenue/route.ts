import { NextResponse } from 'next/server';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const revenueData = [
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

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(revenueData, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
    },
  });
}
