import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getEstructuraSubordinados } from "../Api/estructuraPuestos.api";
import { AuthContext } from "../Context/authContext";

export function useEstructuraPuestos(){
    const [estructuraPuestos, setEstructuraPuestos] = useState([]);  
    const { getSelectedUserDPI, selectedUser } = useContext(AuthContext);  

    useEffect(() => {
        updateEstructura()
    }, [selectedUser]);

    function updateEstructura() {        
        getEstructuraSubordinados(getSelectedUserDPI()).then((response) => {          
          if (response.status === 200) {
            setEstructuraPuestos(response.body);        
          } else {
            toast.error("No se pudo recuperar la estructura organizacional");
          }
        });
      }

    return {estructuraPuestos, updateEstructura};
}