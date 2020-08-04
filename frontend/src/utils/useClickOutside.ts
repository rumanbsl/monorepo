import { useEffect } from "react";

export default function useClickOutside(ref: React.MutableRefObject<any>, hideDropdown: ()=>void) {
  useEffect(() => {
    function handleClickOutside(event: Event) {
      if (event.target && ref.current && !ref.current.contains(event.target)) {
        hideDropdown();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("scroll", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("scroll", handleClickOutside);
    };
  }, [ref, hideDropdown]);
}
