import { useRandomViewMode } from '@/hooks/useRandomViewMode';
import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { ProductsView } from '@/features/ProductsView';
import { InfiniteScroll } from '@/components/InfiniteScroll';
import { fetchProducts } from '@/api/product';
import { PAGINATION_LIMIT } from '@/constants';
import { productKeys } from '@/api/queryKeyFactory';
import { SearchForm } from '@/features/SearchForm';
import { PageWrapper } from '@/components/styled';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: productKeys.lists(),
    queryFn: () => fetchProducts({ skip: 0 }),
    initialPageParam: 0,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const {
    data: products,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
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

  const [viewMode] = useRandomViewMode();

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
    <PageWrapper>
      <SearchForm />
      <InfiniteScroll
        onIntersect={handleIntersect}
        disabled={!hasNextPage && products.length > PAGINATION_LIMIT}
        disabledComponent={<p>더 이상 불러올 수 없습니다.</p>}
      >
        <ProductsView viewMode={viewMode} products={products} />
      </InfiniteScroll>
    </PageWrapper>
  );
}
