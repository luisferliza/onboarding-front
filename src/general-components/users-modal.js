import React, { useState, useEffect } from "react";
import Modal from "./modal";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";

import { getUserList } from "../Utils/RaciRequest";

export default function UsersModal({ open, closeFn, onClickItem }) {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [originalItems, setOriginalItems] = useState([]);
  const [items, setItems] = useState([]);

  const getItems = async () => {
    const res = await getUserList();
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
  }, [open]);

  const handleSearch = async () => {
    const res = originalItems.filter((el) => {
      return el.nombreCompleto
        .toLowerCase()
        .includes(textoBusqueda.toLowerCase());
    });
    setItems(res);
  };

  const keyPress = (e) => {
    if (e.keyCode === 13) {
      handleSearch();
    }
  };

  return (
    <Modal title="Selecciona un usuario" open={open} handleClose={closeFn}>
        <div style={{maxHeight: "90vh"}}>
          <Grid container spacing={1}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <TextField
                  id="txtTextoBusquedaTag"
                  label={"Usuario"}
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
                <div style={{maxHeight: "60vh", overflowY: "scroll", marginTop: "10px"}}>
                {items.map((item) => (
                  <ListItem                    
                    onClick={() => {
                      onClickItem(item);
                    }}
                    style={{ width: "100% !important" }}
                  >
                    <ListItemIcon>
                      <PersonIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.nombreCompleto}
                      // secondary={
                      //   item.TiempoEsperaEstimado > 0
                      //     ? convertirHHMM(item.TiempoEsperaEstimado)
                      //     : ""
                      // }
                    />
                  </ListItem>
                ))}
                </div>
              </List>
            </Grid>
          </Grid>
        </div>
    </Modal>
  );
}
