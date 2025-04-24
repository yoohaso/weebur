import { useEffect, useRef } from 'react';

export function useIntersectionObserver<Element extends HTMLElement>(
  callback: () => void,
  option: IntersectionObserverInit
) {
  const ref = useRef<Element>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    observer.current = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        callback();
      }
    }, option);

    observer.current.observe(element);

    return () => {
      if (observer.current) {
        observer.current.unobserve(element);
      }
    };
  }, [callback, option]);

  return ref;
}
