import { NextResponse } from 'next/server';

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

  return NextResponse.json(ordersData);
}
