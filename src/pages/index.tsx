import { useRandomViewMode } from '@/hooks/useRandomViewMode';
import { dehydrate, QueryClient } from '@tanstack/react-query';
import { ProductsView } from '@/features/ProductsView';
import { InfiniteScroll } from '@/components/InfiniteScroll';
import { fetchProducts } from '@/api/product';
import { PAGINATION_LIMIT } from '@/constants';
import { productKeys } from '@/api/queryKeyFactory';
import { SearchForm } from '@/features/SearchForm';
import { CenterWrapper, PageWrapper } from '@/components/styled';
import { useInfiniteProducts } from '@/api';
import { Loading } from '@/components/Loading';

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  try {
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
  } catch (error: unknown) {
    console.error(error);

    return {
      props: { dehydratedState: dehydrate(queryClient) },
    };
  }
};

export default function Home() {
  const { data: products, isPending, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteProducts();
  const [viewMode] = useRandomViewMode();

  const handleIntersect = () => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage().catch(error => {
        console.error('Failed to fetch next page:', error);
      });
    }
  };

  if (!viewMode) {
    return null;
  }

  if (isPending || !products) {
    return <Loading message="상품을 불러오는 중입니다..." />;
  }

  return (
    <PageWrapper>
      <SearchForm />
      <InfiniteScroll
        onIntersect={handleIntersect}
        disabled={!hasNextPage && products.length > PAGINATION_LIMIT}
        disabledComponent={
          <CenterWrapper>
            <p>더 이상 불러올 수 없습니다.</p>
          </CenterWrapper>
        }
      >
        <ProductsView viewMode={viewMode} products={products} />
      </InfiniteScroll>
    </PageWrapper>
  );
}
