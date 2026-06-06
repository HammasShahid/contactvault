import apiClient from '@/lib/apiClient';
import type { ContactResponse, CreateContactRequest, Page } from '@/types';

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

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/contacts/${id}`);
  },

  create: async (data: CreateContactRequest): Promise<ContactResponse> => {
    const response = await apiClient.post<ContactResponse>('/contacts', data);
    return response.data;
  },
};
