export const productKeys = {
  all: ['products'] as const,
  lists: () => [...productKeys.all, 'list'] as const,
  list: (search: string) => [...productKeys.lists(), search] as const,
};
