import { useRandomViewMode } from '@/hooks/useRandomViewMode';
import { dehydrate, QueryClient, UseInfiniteQueryResult } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { ProductsView } from '@/features/ProductsView';
import { InfiniteScroll } from '@/components/InfiniteScroll';
import { fetchProductsBySearch, Product } from '@/api/product';
import { PAGINATION_LIMIT } from '@/constants';
import { productKeys } from '@/api/queryKeyFactory';
import { SearchForm } from '@/features/SearchForm';
import { useRouter } from 'next/router';
import { PageWrapper } from '@/components/styled';
import { useInfiniteProductsBySearch } from '@/api';

interface ContainerProps {
  children: (props: {
    products: Product[];
    hasNextPage: UseInfiniteQueryResult['hasNextPage'];
    isFetchingNextPage: UseInfiniteQueryResult['isFetchingNextPage'];
    fetchNextPage: UseInfiniteQueryResult<Product[]>['fetchNextPage'];
  }) => React.ReactNode;
}

export function Container({ children }: ContainerProps) {
  const router = useRouter();
  const { q: search } = router.query as { q: string };

  const {
    data: products,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteProductsBySearch(search);

  if (isPending || !products) {
    return <div>로딩 중...</div>;
  }

  return children({
    products,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });
}

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

  if (!viewMode) {
    return null;
  }

  return (
    <PageWrapper>
      <SearchForm initialValue={search} />
      <Container>
        {({ products, hasNextPage, isFetchingNextPage, fetchNextPage }) => (
          <>
            {products.length === 0 ? (
              <p>일치하는 결과가 없습니다.</p>
            ) : (
              <InfiniteScroll
                onIntersect={() => hasNextPage && !isFetchingNextPage && fetchNextPage()}
                disabled={!hasNextPage && products.length > PAGINATION_LIMIT}
                disabledComponent={<p>더 이상 불러올 수 없습니다.</p>}
              >
                <ProductsView viewMode={viewMode} products={products} />
              </InfiniteScroll>
            )}
          </>
        )}
      </Container>
    </PageWrapper>
  );
}
