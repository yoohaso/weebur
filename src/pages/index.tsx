import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Grid } from '@/components/Grid';
import { GridItem } from '@/components/GridItem';
import { useRandomViewMode } from '@/hooks/useRandomViewMode';
import { dehydrate, QueryClient, useQuery } from '@tanstack/react-query';

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

const fetchProducts = async (): Promise<ProductsResponse> => {
  const response = await fetch('https://dummyjson.com/products?limit=20');

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return await response.json();
};

export const getServerSideProps = async () => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

export default function Home() {
  const { data: products, isPending } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
    select: data => data.products,
  });

  const [viewMode] = useRandomViewMode();

  if (!viewMode) {
    return null;
  }

  if (isPending || !products) {
    return <div>Loading...</div>;
  }

  return (
    <>
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
    </>
  );
}
