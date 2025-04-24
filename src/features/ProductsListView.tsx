import { Product } from '@/api/product';
import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';

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
  );
}
