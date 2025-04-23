import { useEffect, useState } from 'react';

type ViewMode = 'LIST' | 'GRID';

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

  localStorage.setItem('viewMode', JSON.stringify({ viewMode, expiryTime }));
};

const getViewModeFromLocalStorage = (): StoredViewMode | undefined => {
  const storedViewMode = localStorage.getItem('viewMode');

  if (!storedViewMode) {
    return undefined;
  }

  const { viewMode, expiryTime } = JSON.parse(storedViewMode);

  if (new Date().getTime() > expiryTime) {
    localStorage.removeItem('viewMode');
    return undefined;
  }

  return { viewMode, expiryTime };
};

export function useRandomViewMode(): [ViewMode | undefined] {
  const [viewMode, setViewMode] = useState<ViewMode | undefined>();

  useEffect(() => {
    const storedViewMode = getViewModeFromLocalStorage();

    if (!storedViewMode) {
      const newViewMode = getRandomViewMode();
      storeViewModeInLocalStorage(newViewMode);
      setViewMode(newViewMode);
    } else {
      const { viewMode } = storedViewMode;
      setViewMode(viewMode);
    }
  }, []);

  return [viewMode];
}
