import styled from 'styled-components';

interface ListProps {
  children: React.ReactNode;
}

export function List({ children }: ListProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;
