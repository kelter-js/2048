import { useEffect } from "react";

export const useEvent = (
  event: keyof WindowEventMap,
  handler: (e: Event) => void,
  passive: boolean = false
) => {
  useEffect(() => {
    window.addEventListener(event, handler, passive);

    return () => {
      window.removeEventListener(event, handler);
    };
  });
};
