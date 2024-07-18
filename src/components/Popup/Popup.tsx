import React from "react";
import { usePopup } from "../../contexts/PopupContext";
import { PopupOverlay, PopupContent, CloseButton } from "./styles";

const Popup: React.FC = () => {
  const { isPopupVisible, popupContent, hidePopup } = usePopup();

  if (!isPopupVisible) return null;

  return (
    <PopupOverlay onClick={hidePopup}>
      <PopupContent onClick={(e) => e.stopPropagation()}>
        {popupContent}
        <CloseButton onClick={hidePopup}>×</CloseButton>
      </PopupContent>
    </PopupOverlay>
  );
};

export default Popup;
