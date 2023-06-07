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
import Autocomplete from "@mui/material/Autocomplete";

import { getTags,getAllTags } from "../Api/tag.api";
import {getTagFamilies}  from "../Api/tagFamily.api";
import {getTags as getTagsNode, postTag,deleteTag}  from "../Api/tagNode.api";
import { toast } from "react-toastify";

export default function TagsNodeModal({
  open,
  closeFn,
  onClickItem,
  mostrarPorcentaje = false,
}) {
  const [textoBusqueda, setTextoBusqueda] = useState("");
  const [originalItems, setOriginalItems] = useState([]);
  const [items, setItems] = useState([]);
  const [porcentaje, setPorcentaje] = useState(null);
  const [familiaSeleccionadaObjeto, setFamiliaSeleccionadaObjeto] = useState(null);
  const [listaFamilias, setListaFamilias] =  useState([]);

  const getItems = async (id) => {
    if(id===null){
      const res = await getAllTags();      
      if (Array.isArray(res.body)) {
        setOriginalItems(res.body);
      }
    }else{
      const res = await getTags(id);      
      if (Array.isArray(res.body)) {
        setOriginalItems(res.body);
      }
    }
    
  };

  useEffect(() => {
    getItems(null);
    cargarListaFamilias();
  }, []);

  useEffect(()=>{    
    if(familiaSeleccionadaObjeto!==null && familiaSeleccionadaObjeto.id>0){
      getItems(familiaSeleccionadaObjeto.id);
    }
    else{
      getItems(null);
    }
   
  },[familiaSeleccionadaObjeto]);

  useEffect(() => {
    setTextoBusqueda("");
    setItems([]);
    setPorcentaje(null);
  }, [open]);

  const cargarListaFamilias= async()=>{
    try {
      const data = await getTagFamilies();
     
      if(data.status == 200){
        const newData =  data.body.map((item)=>{return {id:item.id, label:item.nombre}})
        setListaFamilias(newData);
      }
      
    } catch (error) {
      console.error(error);
    }
  }

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
    <Modal title="Selecciona una etiqueta" open={open} handleClose={closeFn}>
      <PerfectScrollbar>
        <div>
          <Grid container spacing={1}>
          
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Autocomplete
            value={familiaSeleccionadaObjeto}
            onChange={(event, newValue) => {
              setFamiliaSeleccionadaObjeto(newValue);
            }}
            id="familiaAutocomplete"
            options={listaFamilias}
            sx={{ width: "100%" }}
            renderInput={(params) => <TextField {...params} label="Familia de etiquetas" />}
          />
              </Grid>
            

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
                    
                        onClickItem(item);
                    
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
