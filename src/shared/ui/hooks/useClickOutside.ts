/* istanbul ignore file */
/* Improved version of https://usehooks.com/useOnClickOutside/ */
import { useEffect, RefObject } from "react";

const useClickOutside = (ref: RefObject<HTMLElement>, handler: (e: Event) => void) => {
  useEffect(() => {
    let startedInside: null | boolean = false;
    let startedWhenMounted: null | boolean = false;

    const listener = (event: Event) => {
      // Do nothing if `mousedown` or `touchstart` started inside ref element
      if (startedInside || !startedWhenMounted) return;
      const target = event.target as Node | null;
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(target)) return;

      handler(event);
    };

    const validateEventStart = (event: Event) => {
      startedWhenMounted = Boolean(ref.current);
      const target = event.target as Node | null;
      startedInside = ref.current && ref.current.contains(target);
    };

    document.addEventListener("mousedown", validateEventStart);
    document.addEventListener("touchstart", validateEventStart);
    document.addEventListener("click", listener);

    return () => {
      document.removeEventListener("mousedown", validateEventStart);
      document.removeEventListener("touchstart", validateEventStart);
      document.removeEventListener("click", listener);
    };
  }, [ref, handler]);
};

export default useClickOutside;
