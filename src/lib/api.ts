import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || '/api';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
  },
});

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
    const { data } = await axiosInstance.get('/revenue', {
      params: { _t: Date.now() }, 
    });
    return data;
  },

  getOrders: async (): Promise<OrdersData[]> => {
    const { data } = await axiosInstance.get('/orders', {
      params: { _t: Date.now() },
    });
    return data;
  },

  getUsersDistribution: async (): Promise<UserDistribution[]> => {
    const { data } = await axiosInstance.get('/usersDistribution', {
      params: { _t: Date.now() },
    });
    return data;
  },

  getTrafficSources: async (): Promise<TrafficSource[]> => {
    const { data } = await axiosInstance.get('/trafficSources', {
      params: { _t: Date.now() },
    });
    return data;
  },

  getStats: async (): Promise<StatsData> => {
    const { data } = await axiosInstance.get('/stats', {
      params: { _t: Date.now() },
    });
    return data;
  },
};
