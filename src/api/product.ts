export interface Product {
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

const PRODUCTS_BASE_URL = 'https://dummyjson.com/products';

export async function fetchProducts({ skip = 0 }: { skip?: number }): Promise<ProductsResponse> {
  const response = await fetch(`${PRODUCTS_BASE_URL}?limit=20&skip=${skip}`);

  if (!response.ok) {
    throw new Error('Failed to fetch products');
  }

  return await response.json();
}

export async function fetchProductsBySearch({
  search,
  skip = 0,
}: {
  search: string;
  skip: number;
}): Promise<ProductsResponse> {
  const response = await fetch(
    `${PRODUCTS_BASE_URL}/search?q=${search}&limit=20&skip=${skip}&sortBy=rating&order=desc`
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch products by ${search}`);
  }

  return await response.json();
}
