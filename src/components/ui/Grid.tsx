import styled from 'styled-components';

interface GridProps {
  children: React.ReactNode;
}

export function Grid({ children }: GridProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  width: 100%;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
