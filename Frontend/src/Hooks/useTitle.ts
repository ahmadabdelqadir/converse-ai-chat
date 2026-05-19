import { useEffect } from "react";

// Sets the browser tab title while a page is mounted.
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
