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
  return <div>{children}</div>;
};

const Wrapper = styled.li`
  display: flex;
  align-items: center;
`;

const Left = styled.div`
  flex-shrink: 0;
`;

const Contents = styled.div`
  width: 100%;
`;
