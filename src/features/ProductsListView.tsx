import { Product } from '@/api/product';
import { List } from '@/components/ui/List';
import { ListItem } from '@/components/ui/ListItem';

interface ProductsListViewProps {
  products: Product[];
}

export function ProductsListView({ products }: ProductsListViewProps) {
  return (
    <List>
      {products.map(product => (
        <ListItem
          key={product.id}
          left={<ListItem.Image src={product.thumbnail} alt={product.title + ' thumbnail'} />}
          contents={
            <ListItem.Contents>
              <ListItem.Text1Rows text={product.title} />
              <ListItem.Text2Rows text={product.description} />
              <ListItem.Text3Rows text={`별점 ${product.rating} 후기 (${product.reviews.length})`} />
            </ListItem.Contents>
          }
        />
      ))}
    </List>
  );
}
