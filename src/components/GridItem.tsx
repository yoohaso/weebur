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
  return children;
};

GridItem.Text1Rows = ({ text }: { text: string }) => {
  return (
    <Text1RowsWrapper>
      <h4>{text}</h4>
    </Text1RowsWrapper>
  );
};

GridItem.Text2Rows = ({ text }: { text: string }) => {
  return (
    <Text2RowsWrapper>
      <p>{text}</p>
    </Text2RowsWrapper>
  );
};

GridItem.Text3Rows = ({ text }: { text: string }) => {
  return (
    <Text3RowsWrapper>
      <p>{text}</p>
    </Text3RowsWrapper>
  );
};

const Wrapper = styled.div<{ $columnCount: number }>`
  display: flex;
  flex-direction: column;
  flex-basis: calc((100% - (${props => props.$columnCount - 1} * 10px)) / ${props => props.$columnCount});
  height: 300px;
  overflow: hidden;
  border: 1px solid black;
  padding: 10px;
`;

const Top = styled.div`
  flex-shrink: 0;
  margin: 0 auto;
  height: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Contents = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 8px 0;
`;

const Text1RowsWrapper = styled.div`
  height: 24px;
  overflow: hidden;

  h4 {
    margin: 0;
    font-size: 16px;
    font-weight: bold;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const Text2RowsWrapper = styled.div`
  height: 60px;
  overflow: hidden;

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
  }
`;

const Text3RowsWrapper = styled.div`
  height: 20px;
  overflow: hidden;

  p {
    margin: 0;
    font-size: 12px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
