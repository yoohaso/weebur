import { useCallback, useEffect, useState } from 'react';

type ViewMode = 'LIST' | 'GRID';
const VIEW_MODE = 'viewMode';

interface StoredViewMode {
  viewMode: ViewMode;
  expiryTime: number;
}

const getRandomViewMode = (): ViewMode => {
  if (Math.random() > 0.5) {
    return 'LIST';
  } else {
    return 'GRID';
  }
};

const storeViewModeInLocalStorage = (viewMode: ViewMode): void => {
  const ONE_DAY_IN_MS = 1 * 24 * 60 * 60 * 1000;
  const expiryTime = new Date().getTime() + ONE_DAY_IN_MS;

  localStorage.setItem(VIEW_MODE, JSON.stringify({ viewMode, expiryTime }));
};

const getViewModeFromLocalStorage = (): StoredViewMode | undefined => {
  const storedViewMode = localStorage.getItem(VIEW_MODE);

  if (!storedViewMode) {
    return undefined;
  }

  const { viewMode, expiryTime } = JSON.parse(storedViewMode);

  if (new Date().getTime() > expiryTime) {
    localStorage.removeItem(VIEW_MODE);
    return undefined;
  }

  return { viewMode, expiryTime };
};

export function useRandomViewMode(): [ViewMode | undefined] {
  const [viewMode, setViewMode] = useState<ViewMode | undefined>();

  const setPersistViewMode = useCallback(() => {
    const newViewMode = getRandomViewMode();
    storeViewModeInLocalStorage(newViewMode);
    setViewMode(newViewMode);
  }, []);

  useEffect(
    function initializeViewMode() {
      const storedViewMode = getViewModeFromLocalStorage();

      if (!storedViewMode) {
        setPersistViewMode();
      } else {
        const { viewMode } = storedViewMode;
        setViewMode(viewMode);
      }
    },
    [setPersistViewMode]
  );

  useEffect(
    function initializeViewModeOnFocus() {
      const handleFocus = () => {
        const viewMode = getViewModeFromLocalStorage();

        if (viewMode === undefined) {
          setPersistViewMode();
        }
      };

      window.addEventListener('focus', handleFocus);

      return () => {
        window.removeEventListener('focus', handleFocus);
      };
    },
    [setPersistViewMode]
  );

  return [viewMode];
}
