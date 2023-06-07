import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getTiposRaci } from "../Api/tipoRaci.api";

function useRACI() {
  const [tiposRaci, setTiposRaci] = useState([]);

  useEffect(() => {
    updateTiposRaci();
  }, []);

  function updateTiposRaci() {
    getTiposRaci().then((response) => {
      if (response.status === 200) {
        setTiposRaci(response.body);
      } else {
        toast.error("Error al cargar los tipos de RACI");
      }
    });
  }

  return [tiposRaci, updateTiposRaci];
}

export { useRACI };