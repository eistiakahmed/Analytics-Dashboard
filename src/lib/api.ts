import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface OrdersData {
  month: string;
  orders: number;
}

export interface UserDistribution {
  name: string;
  value: number;
}

export interface TrafficSource {
  source: string;
  visitors: number;
  percentage: number;
}

export interface StatsData {
  totalRevenue: number;
  totalUsers: number;
  orders: number;
  conversionRate: number;
}

export const api = {
  getRevenue: async (): Promise<RevenueData[]> => {
    const { data } = await axios.get(`${API_BASE}/revenue`);
    return data;
  },

  getOrders: async (): Promise<OrdersData[]> => {
    const { data } = await axios.get(`${API_BASE}/orders`);
    return data;
  },

  getUsersDistribution: async (): Promise<UserDistribution[]> => {
    const { data } = await axios.get(`${API_BASE}/usersDistribution`);
    return data;
  },

  getTrafficSources: async (): Promise<TrafficSource[]> => {
    const { data } = await axios.get(`${API_BASE}/trafficSources`);
    return data;
  },

  getStats: async (): Promise<StatsData> => {
    const { data } = await axios.get(`${API_BASE}/stats`);
    return data;
  },
};
