import Image from 'next/image';
import styled from 'styled-components';

interface ListItemProps {
  left: React.ReactNode;
  contents?: React.ReactNode;
}

export function ListItem({ left, contents }: ListItemProps) {
  return (
    <Wrapper>
      <Left>{left}</Left>
      <Contents>{contents}</Contents>
    </Wrapper>
  );
}

ListItem.Image = ({ src, alt }: { src: string; alt: string }) => {
  return <Image src={src} alt={alt} width={100} height={100} />;
};

ListItem.Contents = ({ children }: { children: React.ReactNode }) => {
  return children;
};

ListItem.Text1Rows = ({ text }: { text: string }) => {
  return (
    <Text1RowsWrapper>
      <h4>{text}</h4>
    </Text1RowsWrapper>
  );
};

ListItem.Text2Rows = ({ text }: { text: string }) => {
  return (
    <Text2RowsWrapper>
      <p>{text}</p>
    </Text2RowsWrapper>
  );
};

ListItem.Text3Rows = ({ text }: { text: string }) => {
  return (
    <Text3RowsWrapper>
      <p>{text}</p>
    </Text3RowsWrapper>
  );
};

const Wrapper = styled.li`
  display: flex;
  border: 1px solid black;
  padding: 10px;
  margin-bottom: 10px;
  align-items: center;
  overflow: hidden;
  width: 100%;

  &:last-child {
    margin-bottom: 0;
  }
`;

const Left = styled.div`
  flex-shrink: 0;
  margin-right: 10px;
`;

const Contents = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 8px;
`;

const Text1RowsWrapper = styled.div`
  height: 24px;
  overflow: hidden;
  width: 100%;

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
  overflow: hidden;

  p {
    margin: 0;
    font-size: 14px;
    line-height: 1.4;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
`;

const Text3RowsWrapper = styled.div`
  p {
    margin: 0;
    font-size: 12px;
    color: #666;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
