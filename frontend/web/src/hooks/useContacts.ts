import { useQuery } from '@tanstack/react-query';
import { contactsApi } from '@/api/contactsApi';
import { queryKeys } from '@/lib/queryKeys';

export function useContacts(page: number, size: number, query?: string) {
  return useQuery({
    queryKey: queryKeys.contacts.list(page, size, query),
    queryFn: () => contactsApi.getAll(page, size, query),
  });
}
