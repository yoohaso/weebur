import Image from 'next/image';
import styled from 'styled-components';

interface GridItemProps {
  top: React.ReactNode;
  contents: React.ReactNode;
  columnCount: number;
}

export function GridItem({ top, contents, columnCount }: GridItemProps) {
  return (
    <Wrapper $columnCount={columnCount}>
      <Top>{top}</Top>
      <Contents>{contents}</Contents>
    </Wrapper>
  );
}

GridItem.Image = ({ src, alt }: { src: string; alt: string }) => {
  return <Image src={src} alt={alt} width={100} height={100} />;
};

GridItem.Contents = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

const Wrapper = styled.div<{ $columnCount: number }>`
  display: flex;
  flex-direction: column;
  flex-basis: calc(${props => 100 / props.$columnCount}% - 20px);
  margin: 0 10px;
`;

const Top = styled.div`
  flex-shrink: 0;
`;

const Contents = styled.div`
  width: 100%;
`;
