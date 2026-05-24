import api from './api';
import { Slot } from '../types';

export const slotService = {
  async getByOfferId(offerId: number): Promise<Slot[]> {
    const { data } = await api.get<Slot[]>(`/slots/offer/${offerId}`);
    return data;
  },

  async create(slot: any): Promise<Slot> {
    const { data } = await api.post<Slot>('/slots', slot);
    return data;
  },

  async update(id: number, slot: any): Promise<Slot> {
    const { data } = await api.put<Slot>(`/slots/${id}`, slot);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/slots/${id}`);
  },
};
