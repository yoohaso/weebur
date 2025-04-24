import { useRandomViewMode } from '@/hooks/useRandomViewMode';
import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { ProductsView } from '@/features/ProductsView';
import { InfiniteScroll } from '@/components/InfiniteScroll';
import { fetchProductsBySearch } from '@/api/product';
import { PAGINATION_LIMIT } from '@/constants';
import { productKeys } from '@/api/queryKeyFactory';
import { SearchForm } from '@/features/SearchForm';

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { q: search } = context.query as { q: string };

  await queryClient.prefetchInfiniteQuery({
    queryKey: productKeys.list(search),
    queryFn: () => fetchProductsBySearch({ search, skip: 0 }),
    initialPageParam: 0,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function SearchPage() {
  const [viewMode] = useRandomViewMode();

  const router = useRouter();
  const { q: search } = router.query as { q: string };

  const {
    data: products,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
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

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  if (!viewMode) {
    return null;
  }

  if (isPending || !products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <SearchForm initialValue={search} />
      {products.length === 0 ? (
        <p>일치하는 결과가 없습니다.</p>
      ) : (
        <InfiniteScroll
          onIntersect={handleIntersect}
          disabled={!hasNextPage && products.length > PAGINATION_LIMIT}
          disabledComponent={<p>더 이상 불러올 수 없습니다.</p>}
        >
          <ProductsView viewMode={viewMode} products={products} />
        </InfiniteScroll>
      )}
    </>
  );
}
