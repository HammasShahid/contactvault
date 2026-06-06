import { useQuery } from '@tanstack/react-query'
import { contactsApi } from '@/api/contactsApi'
import { queryKeys } from '@/lib/queryKeys'

export function useContact(id: number) {
  return useQuery({
    queryKey: queryKeys.contacts.detail(id),
    queryFn: () => contactsApi.getById(id),
  })
}