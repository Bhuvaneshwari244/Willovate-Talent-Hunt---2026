import api from './api';
import { Offer, OfferListItem } from '../types';

export const offerService = {
  async getAll(activeOnly = false): Promise<OfferListItem[]> {
    const { data } = await api.get<OfferListItem[]>('/offers', {
      params: { activeOnly },
    });
    return data;
  },

  async getById(id: number): Promise<Offer> {
    const { data } = await api.get<Offer>(`/offers/${id}`);
    return data;
  },

  async create(offer: any): Promise<Offer> {
    const { data } = await api.post<Offer>('/offers', offer);
    return data;
  },

  async update(id: number, offer: any): Promise<Offer> {
    const { data } = await api.put<Offer>(`/offers/${id}`, offer);
    return data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/offers/${id}`);
  },
};
