import { NextResponse } from 'next/server';

// Force dynamic rendering - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ordersData = [
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

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));

  return NextResponse.json(ordersData, {
    headers: {
      'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0',
      'Pragma': 'no-cache',
      'Expires': '0',
      'Surrogate-Control': 'no-store',
    },
  });
}
