import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCallback } from 'react';
import styled from 'styled-components';

interface InfiniteScrollProps {
  children: React.ReactNode;
  onIntersect: () => void;
  disabled: boolean;
  disabledComponent: React.ReactNode;
}

export function InfiniteScroll({ children, onIntersect, disabled, disabledComponent }: InfiniteScrollProps) {
  const handleIntersect = useCallback(() => {
    onIntersect();
  }, [onIntersect]);

  const ref = useIntersectionObserver<HTMLDivElement>(handleIntersect, {
    threshold: 0.5,
  });

  return (
    <>
      {children}
      <Target
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: 'transparent',
          position: 'relative',
          top: '-300px',
        }}
        ref={ref}
      />
      <DisabledWrapper>{disabled && disabledComponent}</DisabledWrapper>
    </>
  );
}

const Target = styled.div`
  width: 100%;
  height: 1px;
  background-color: transparent;
  position: relative;
  top: -300px;
`;

const DisabledWrapper = styled.div`
  margin-top: 20px;
`;
