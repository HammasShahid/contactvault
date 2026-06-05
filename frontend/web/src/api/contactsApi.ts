import apiClient from '@/lib/apiClient';
import type { ContactResponse, Page } from '@/types';

export const contactsApi = {
  getAll: async (
    page: number,
    size: number,
    query?: string,
  ): Promise<Page<ContactResponse>> => {
    const response = await apiClient.get<Page<ContactResponse>>('/contacts', {
      params: { page, size, ...(query ? { query } : {}) },
    });
    return response.data;
  },

  getById: async (id: number): Promise<ContactResponse> => {
    const response = await apiClient.get<ContactResponse>(`/contacts/${id}`);
    return response.data;
  },
};
