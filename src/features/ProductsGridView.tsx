import { Product } from '@/api/product';
import { Grid } from '@/components/ui/Grid';
import { GridItem } from '@/components/ui/GridItem';

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
              <GridItem.Text1Rows text={product.title} />
              <GridItem.Text2Rows text={product.description} />
              <GridItem.Text3Rows text={`별점 ${product.rating} 후기 (${product.reviews.length})`} />
            </GridItem.Contents>
          }
        />
      ))}
    </Grid>
  );
}
