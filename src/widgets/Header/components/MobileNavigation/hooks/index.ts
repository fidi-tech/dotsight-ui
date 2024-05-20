import {useCallback, useEffect, useRef, useState} from 'react';

export const useEnhance = () => {
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [isOpened, setIsOpened] = useState(false);
  const toggleIsOpened = useCallback(() => setIsOpened(!isOpened), [isOpened, setIsOpened]);
  const close = useCallback(() => setIsOpened(false), [setIsOpened]);
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Element)) {
      setIsOpened(false);
    }
  }, []);
  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [handleClickOutside]);

  return {
    isOpened,
    toggleIsOpened,
    popupRef,
    close,
  };
}