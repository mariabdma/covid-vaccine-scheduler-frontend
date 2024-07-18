import React, { createContext, useContext, useState, ReactNode } from "react";

interface PopupContextType {
  showPopup: (content: ReactNode) => void;
  hidePopup: () => void;
  isPopupVisible: boolean;
  popupContent: ReactNode;
}

const PopupContext = createContext<PopupContextType | undefined>(undefined);

export const PopupProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupContent, setPopupContent] = useState<ReactNode>(null);

  const showPopup = (content: ReactNode) => {
    setPopupContent(content);
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
    setPopupContent(null);
  };

  return (
    <PopupContext.Provider
      value={{ showPopup, hidePopup, isPopupVisible, popupContent }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => {
  const context = useContext(PopupContext);
  if (!context) {
    throw new Error("usePopup must be used within a PopupProvider");
  }
  return context;
};
