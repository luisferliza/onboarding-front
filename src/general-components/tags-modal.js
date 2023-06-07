import React, { useState, useEffect } from "react";
import Modal from "./modal";
import PerfectScrollbar from "react-perfect-scrollbar";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import { getList } from "../Utils/tagsRequest";
import { toast } from "react-toastify";

export default function TagsModal({
  open,
  closeFn,
  onClickItem,
  mostrarPorcentaje = false,
}) {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [originalItems, setOriginalItems] = useState([]);
  const [items, setItems] = useState([]);
  const [porcentaje, setPorcentaje] = useState(null);

  const getItems = async () => {
    const res = await getList();
    if (Array.isArray(res)) {
      setOriginalItems(res);
    }
  };

  useEffect(() => {
    getItems();
  }, []);

  useEffect(() => {
    setTextoBusqueda("");
    setItems([]);
    setPorcentaje(null);
  }, [open]);

  const handleSearch = async () => {
    const res = originalItems.filter((el) => {
      return el.nombre.toLowerCase().includes(textoBusqueda.toLowerCase());
    });
    setItems(res);
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <Modal title="Selecciona un pilar" open={open} handleClose={closeFn}>
      <PerfectScrollbar>
        <div>
          <Grid container spacing={1}>
            {mostrarPorcentaje === true && (
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  type="number"
                  id="txtPorcentaje"
                  label={"Porcentaje"}
                  value={porcentaje}
                  onChange={(event) => setPorcentaje(event.target.value)}
                  margin="normal"
                  inputProps={{ maxLength: 6 }}
                  style={{ width: "100%" }}
                  required={true}
                />
              </Grid>
            )}

            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="txtTextoBusquedaTag"
                  label={"Etiqueta"}
                  value={textoBusqueda}
                  onChange={(event) => setTextoBusqueda(event.target.value)}
                  margin="normal"
                  inputProps={{ maxLength: 512 }}
                  onKeyDown={keyPress}
                  style={{ width: "100%" }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  endIcon={<SearchIcon>send</SearchIcon>}
                  onClick={handleSearch}
                >
                  Buscar
                </Button>
              </div>
            </Grid>
          </Grid>

          <Grid item xs={12} lg={12} sm={12}>
            <Grid container spacing={1}>
              <List
                component="nav"
                aria-label="main mailbox folders"
                style={{ width: "100%" }}
              >
                {items.length === 0 && (
                  <div>
                    <div style={{ textAlign: "center" }}>No hay registros.</div>
                  </div>
                )}
                {items.map((item) => (
                  <ListItem
                    button
                    onClick={() => {
                      if (mostrarPorcentaje === true) {
                        if (porcentaje === null || porcentaje <= 0) {
                          toast.warn(
                            "Debes asignar un porcentaje a esta etiqueta"
                          );
                          return;
                        }

                        onClickItem(item, porcentaje);
                      } else {
                        onClickItem(item);
                      }
                    }}
                    style={{ width: "100% !important" }}
                  >
                    <ListItemIcon>
                      <LocalOfferIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.nombre}
                      // secondary={
                      //   item.TiempoEsperaEstimado > 0
                      //     ? convertirHHMM(item.TiempoEsperaEstimado)
                      //     : ""
                      // }
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </div>
      </PerfectScrollbar>
    </Modal>
  );
}
