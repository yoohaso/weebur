import { List } from '@/components/List';
import { ListItem } from '@/components/ListItem';
import { Grid } from '@/components/Grid';
import { GridItem } from '@/components/GridItem';
import { useRandomViewMode } from '@/hooks/useRandomViewMode';

const PRODUCTS = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
    rating: 4.5,
    reviews: 100,
  },
  {
    id: 2,
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
    rating: 4.5,
    reviews: 100,
  },
  {
    id: 3,
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
    rating: 4.5,
    reviews: 100,
  },
  {
    id: 4,
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
    rating: 4.5,
    reviews: 100,
  },
  {
    id: 5,
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
    rating: 4.5,
    reviews: 100,
  },
  {
    id: 6,
    title: 'Essence Mascara Lash Princess',
    description:
      'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.',
    thumbnail: 'https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png',
    rating: 4.5,
    reviews: 100,
  },
];

export default function Home() {
  const [viewMode] = useRandomViewMode();

  if (!viewMode) {
    return null;
  }

  return (
    <>
      {viewMode === 'LIST' ? (
        <List>
          {PRODUCTS.map(product => (
            <ListItem
              key={product.id}
              left={<ListItem.Image src={product.thumbnail} alt={product.title + ' thumbnail'} />}
              contents={
                <ListItem.Contents>
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  <p>
                    별점 {product.rating} 후기 ({product.reviews})
                  </p>
                </ListItem.Contents>
              }
            />
          ))}
        </List>
      ) : (
        <Grid>
          {PRODUCTS.map(product => (
            <GridItem
              key={product.id}
              columnCount={4}
              top={<GridItem.Image src={product.thumbnail} alt={product.title + ' thumbnail'} />}
              contents={
                <GridItem.Contents>
                  <h4>{product.title}</h4>
                  <p>{product.description}</p>
                  <p>
                    별점 {product.rating} 후기 ({product.reviews})
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
