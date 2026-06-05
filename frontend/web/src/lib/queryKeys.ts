export const queryKeys = {
  contacts: {
    all: ['contacts'] as const,
    lists: () => [...queryKeys.contacts.all, 'list'] as const,
    list: (page: number, size: number, query?: string) =>
      [...queryKeys.contacts.lists(), { page, size, query }] as const,
    details: () => [...queryKeys.contacts.all, 'detail'] as const,
    detail: (id: number) => [...queryKeys.contacts.details(), id] as const,
  },
};
