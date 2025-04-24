import { Product } from '@/api/product';
import { ProductsListView } from './ProductsListView';
import { ProductsGridView } from './ProductsGridView';

interface ProductsViewProps {
  viewMode: 'LIST' | 'GRID';
  products: Product[];
}

export function ProductsView({ viewMode, products }: ProductsViewProps) {
  return (
    <>{viewMode === 'LIST' ? <ProductsListView products={products} /> : <ProductsGridView products={products} />}</>
  );
}
