import { useRandomViewMode } from '@/hooks/useRandomViewMode';
import { dehydrate, QueryClient, UseInfiniteQueryResult } from '@tanstack/react-query';
import { GetServerSidePropsContext } from 'next';
import { ProductsView } from '@/features/ProductsView';
import { InfiniteScroll } from '@/components/common/InfiniteScroll';
import { fetchProductsBySearch, Product } from '@/api/product';
import { PAGINATION_LIMIT } from '@/constants';
import { productKeys } from '@/api/queryKeyFactory';
import { SearchForm } from '@/features/SearchForm';
import { useRouter } from 'next/router';
import { CenterWrapper, PageWrapper } from '@/components/ui/styled';
import { useInfiniteProductsBySearch } from '@/api';
import { ErrorSection } from '@/components/common/ErrorSection';
import { Loading } from '@/components/common/Loading';

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
    isError,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    refetch,
  } = useInfiniteProductsBySearch(search);

  if (isPending) {
    return <Loading message="검색 결과를 불러오는 중입니다..." />;
  }

  if (isError && error) {
    return (
      <ErrorSection message={`${search}의 검색 결과를 불러오는데 실패했습니다.`} onRefetch={refetch} error={error} />
    );
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

  if (!search?.trim()) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  try {
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
  } catch (error: unknown) {
    console.error(error);

    return {
      props: {
        dehydratedState: dehydrate(queryClient),
      },
    };
  }
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
              <CenterWrapper>
                <p>{`${search} 의 검색 결과가 없습니다.`}</p>
                <button onClick={() => router.push('/')}>홈으로 돌아가기</button>
              </CenterWrapper>
            ) : (
              <InfiniteScroll
                onIntersect={() => {
                  if (hasNextPage && !isFetchingNextPage) {
                    fetchNextPage().catch(error => {
                      console.error('Failed to fetch next page:', search, error);
                    });
                  }
                }}
                disabled={!hasNextPage && products.length > PAGINATION_LIMIT}
                disabledComponent={
                  <CenterWrapper>
                    <p>더 이상 불러올 수 없습니다.</p>
                  </CenterWrapper>
                }
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
