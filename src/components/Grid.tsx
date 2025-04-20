import styled from 'styled-components';

interface GridProps {
  children: React.ReactNode;
}

export function Grid({ children }: GridProps) {
  return <Wrapper>{children}</Wrapper>;
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
`;
