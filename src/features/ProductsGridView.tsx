import { Product } from '@/api/product';
import { Grid } from '@/components/Grid';
import { GridItem } from '@/components/GridItem';

interface ProductsGridViewProps {
  products: Product[];
}

export function ProductsGridView({ products }: ProductsGridViewProps) {
  return (
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
  );
}
