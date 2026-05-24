import api from './api';
import { Business } from '../types';

export const businessService = {
  async getAll(): Promise<Business[]> {
    const { data } = await api.get<Business[]>('/business');
    return data;
  },

  async getById(id: number): Promise<Business> {
    const { data } = await api.get<Business>(`/business/${id}`);
    return data;
  },

  async create(business: any): Promise<Business> {
    const { data } = await api.post<Business>('/business', business);
    return data;
  },

  async update(id: number, business: any): Promise<Business> {
    const { data } = await api.put<Business>(`/business/${id}`, business);
    return data;
  },
};
