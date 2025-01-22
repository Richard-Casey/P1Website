import { useRef, useEffect } from "react";

const usePopupWidth = (width) => {
  const popupRef = useRef();

  useEffect(() => {
    if (popupRef.current) {
      const popupElement = popupRef.current._contentNode.parentElement;
      if (popupElement) {
        popupElement.style.width = `${width}px`;
      }
    }
  }, [width]);

  return popupRef;
};

export default usePopupWidth;
