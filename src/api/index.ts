import { useInfiniteQuery } from '@tanstack/react-query';
import { productKeys } from './queryKeyFactory';
import { PAGINATION_LIMIT } from '@/constants';
import { fetchProducts, fetchProductsBySearch } from './product';

export function useInfiniteProducts() {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: productKeys.lists(),
    queryFn: ({ pageParam }) => fetchProducts({ skip: pageParam }),
    getNextPageParam: lastPage => {
      if (lastPage.limit < PAGINATION_LIMIT) {
        return;
      }

      return lastPage.skip + PAGINATION_LIMIT;
    },
    select: data => data.pages.flatMap(page => page.products),
  });
}

export function useInfiniteProductsBySearch(search: string) {
  return useInfiniteQuery({
    initialPageParam: 0,
    queryKey: productKeys.list(search),
    queryFn: ({ pageParam }) => fetchProductsBySearch({ search, skip: pageParam }),
    getNextPageParam: lastPage => {
      if (lastPage.limit < PAGINATION_LIMIT) {
        return;
      }

      return lastPage.skip + PAGINATION_LIMIT;
    },
    select: data => data.pages.flatMap(page => page.products),
  });
}
