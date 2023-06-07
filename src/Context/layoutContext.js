import React from "react";
import { initialMenu } from "../Utils/initialMenu";
const LayoutContext = React.createContext();

function LayoutProvider(props) {
  const [isDrawerOpen, setDrawerOpen] = React.useState(false);  
  const [showCreateNodeButton, setShowCreateNodeButton] = React.useState(false);
  const [menuItems, setMenuItems] = React.useState(initialMenu);
  const [fireInformeReload, setFireInformeReload] = React.useState(1);

  return (
    <LayoutContext.Provider
      value={{
        isDrawerOpen, 
        setDrawerOpen,
        showCreateNodeButton, 
        setShowCreateNodeButton,
        menuItems,
        setMenuItems,
        fireInformeReload,
        setFireInformeReload
      }}
    >
      {props.children}
    </LayoutContext.Provider>
  );
}

export { LayoutContext, LayoutProvider};
