import api from './api';
import { Booking } from '../types';

export const bookingService = {
  async getAll(): Promise<Booking[]> {
    const { data } = await api.get<Booking[]>('/bookings');
    return data;
  },

  async getById(id: number): Promise<Booking> {
    const { data } = await api.get<Booking>(`/bookings/${id}`);
    return data;
  },

  async create(booking: any): Promise<Booking> {
    const { data } = await api.post<Booking>('/bookings', booking);
    return data;
  },

  async updateStatus(id: number, status: string): Promise<Booking> {
    const { data } = await api.put<Booking>(`/bookings/${id}/status`, { status });
    return data;
  },

  async lookup(type: 'reference' | 'phone', query: string): Promise<Booking[]> {
    const { data } = await api.get<Booking[]>('/bookings/lookup', {
      params: { type, query },
    });
    return data;
  },
};
