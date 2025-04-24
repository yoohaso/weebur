import { Grid } from '@/components/Grid';
import { GridItem } from '@/components/GridItem';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { useRandomViewMode } from '@/hooks/useRandomViewMode';
import { Field, Form, Formik } from 'formik';
import { useCallback } from 'react';
import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const fetchProductsBySearch = async ({ search, skip = 0 }: { search: string; skip: number }) => {
  const response = await fetch(`https://dummyjson.com/products/search?q=${search}&limit=20&skip=${skip}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch products by ${search}`);
  }

  return await response.json();
};

export const getServerSideProps = async (context: GetServerSidePropsContext) => {
  const queryClient = new QueryClient();
  const { q: search } = context.query as { q: string };

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products', search],
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

  const LIMIT = 20;

  const {
    data: products,
    isPending,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['products', search],
    queryFn: ({ pageParam }) => fetchProductsBySearch({ search, skip: pageParam }),
    getNextPageParam: lastPage => {
      if (lastPage.limit < LIMIT) {
        return;
      }

      return lastPage.skip + LIMIT;
    },
    select: data => data.pages.flatMap(page => page.products),
  });

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const ref = useIntersectionObserver<HTMLDivElement>(handleIntersect, {
    threshold: 0.5,
  });

  if (!viewMode) {
    return null;
  }

  if (isPending || !products) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Formik
        initialValues={{ search: '' }}
        onSubmit={({ search }, { setSubmitting }) => {
          router.push(`search?q=${search}`);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="search" placeholder="검색어를 입력하세요." />
            <button type="submit" disabled={isSubmitting}>
              검색
            </button>
          </Form>
        )}
      </Formik>
      {viewMode === 'LIST' ? (
        <List>
          {products.map(product => (
            <ListItem
              key={product.id}
              left={<ListItem.Image src={product.thumbnail} alt={product.title + ' thumbnail'} />}
              contents={
                <ListItem.Contents>
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  <p>
                    별점 {product.rating} 후기 ({product.reviews.length})
                  </p>
                </ListItem.Contents>
              }
            />
          ))}
        </List>
      ) : (
        <Grid>
          {products.map(product => (
            <GridItem
              key={product.id}
              columnCount={4}
              top={<GridItem.Image src={product.thumbnail} alt={product.title + ' thumbnail'} />}
              contents={
                <GridItem.Contents>
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  <p>
                    별점 {product.rating} 후기 ({product.reviews.length})
                  </p>
                </GridItem.Contents>
              }
            />
          ))}
        </Grid>
      )}
      {hasNextPage && (
        <div
          style={{
            width: '100%',
            height: '1px',
            backgroundColor: 'transparent',
            position: 'relative',
            top: '-300px',
          }}
          ref={ref}
        />
      )}
    </>
  );
}
