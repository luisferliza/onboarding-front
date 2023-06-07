import React from "react";
import { toast } from "react-toastify";
import { getOpcionesMenuPermitidas } from "../Api/opcionesMenu.api";
import { LayoutContext } from "../Context/layoutContext";
import { SHOW_CREATE_NODE_BUTTON_OPTION } from "../Utils/enums";

export function useMainMenu() {  
  const { menuItems, setMenuItems, setShowCreateNodeButton } = React.useContext(LayoutContext);  

  function updateMenuOptions() {    
    getOpcionesMenuPermitidas().then((response) => {      
      if (response.status === 200) {
        const menuItemsCopy = { ...menuItems, firstLoad: false };
        const allowedOptions = response.body;
        const permitirCrearNodos = allowedOptions.includes(
          SHOW_CREATE_NODE_BUTTON_OPTION
        );
        setShowCreateNodeButton(permitirCrearNodos);
        menuItemsCopy.procesos.forEach((item) => {
          if (allowedOptions.includes(item.index)) {
            item.visible = 1;
          } else {
            item.visible = 0;
          }
        });
        menuItemsCopy.evaluaciones.forEach((item) => {
          if (allowedOptions.includes(item.index)) {
            item.visible = 1;
          } else {
            item.visible = 0;
          }
        });
        menuItemsCopy.administracion.forEach((item) => {
          if (allowedOptions.includes(item.index)) {
            item.visible = 1;
          } else {
            item.visible = 0;
          }
        });        
        setMenuItems(menuItemsCopy);        
      } else {
        toast.error("Ocurrió un error al cargar los menús");
      }
    });
  }

  return [menuItems, updateMenuOptions];
}
