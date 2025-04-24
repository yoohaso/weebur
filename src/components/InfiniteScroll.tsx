import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { useCallback } from 'react';

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
      <div
        style={{
          width: '100%',
          height: '1px',
          backgroundColor: 'transparent',
          position: 'relative',
          top: '-300px',
        }}
        ref={ref}
      />
      {disabled && disabledComponent}
    </>
  );
}
