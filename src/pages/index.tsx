import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Grid } from '@/components/Grid';
import { GridItem } from '@/components/GridItem';
import { useRandomViewMode } from '@/hooks/useRandomViewMode';
import { dehydrate, QueryClient, useInfiniteQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { Formik, Form, Field } from 'formik';
import { useRouter } from 'next/router';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface Product {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  rating: number;
  reviews: {
    comment: string;
    date: string;
    rating: number;
    reviewerEmail: string;
    reviewerName: string;
  }[];
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

const fetchProducts = async ({ skip = 0 }: { skip?: number }): Promise<ProductsResponse> => {
  const response = await fetch(`https://dummyjson.com/products?limit=20&skip=${skip}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return await response.json();
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts({ skip: 0 }),
    initialPageParam: 0,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const LIMIT = 20;

export default function Home() {
  const {
    data: products,
    isPending,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    initialPageParam: 0,
    queryKey: ['products'],
    queryFn: ({ pageParam }) => fetchProducts({ skip: pageParam }),
    getNextPageParam: lastPage => {
      if (lastPage.limit < LIMIT) {
        return;
      }

      return lastPage.skip + LIMIT;
    },
    select: data => data.pages.flatMap(page => page.products),
  });

  const [viewMode] = useRandomViewMode();

  const handleIntersect = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const ref = useIntersectionObserver<HTMLDivElement>(handleIntersect, {
    threshold: 0.5,
  });

  const router = useRouter();

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
      {!hasNextPage && products.length > LIMIT && <p>더 이상 불러올 수 없습니다.</p>}
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
