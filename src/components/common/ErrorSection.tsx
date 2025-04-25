import { CenterWrapper } from '@/components/ui/styled';

interface ErrorProps {
  message: string;
  onRefetch: () => void;
  error: unknown;
}

export function ErrorSection({ message, onRefetch, error }: ErrorProps) {
  return (
    <CenterWrapper>
      <p>{message}</p>
      <p>{error instanceof Error ? error.message : '알 수 없는 에러가 발생했습니다.'}</p>
      <button onClick={onRefetch}>다시 시도</button>
    </CenterWrapper>
  );
}
