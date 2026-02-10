import { NextResponse } from 'next/server';

const usersData = [
  { name: 'Free', value: 6000 },
  { name: 'Premium', value: 4000 },
  { name: 'Enterprise', value: 1000 },
];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return NextResponse.json(usersData);
}
