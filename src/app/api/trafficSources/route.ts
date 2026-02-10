import { NextResponse } from 'next/server';
import mockData from '@/mock/db.json';

export async function GET() {
  return NextResponse.json(mockData.trafficSources);
}
