import { CenterWrapper } from './styled';

interface LoadingProps {
  message: string;
}

export function Loading({ message }: LoadingProps) {
  return (
    <CenterWrapper>
      <p>{message}</p>
    </CenterWrapper>
  );
}
