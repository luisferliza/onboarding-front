import React,{useState,useEffect} from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import IconButton from "@mui/material/IconButton";
import Grid from '@mui/material/Grid';
import Chip from '@mui/material/Chip';
import Autocomplete from '@mui/material/Autocomplete';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';


import {asignarPermisoRequest,getPermisosRequest,removerPermiso} from "../Api/nodoRolPolitica";
import {getRoles} from "../Api/roles.api";
import {getPoliticas} from "../Api/politicas.api";
import { toast } from "react-toastify";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "none",
  boxShadow: 24,
  p: 4,
};

export default function TransitionsModal(props) {  

  const [cargandoGrabacionPermisos,setCargandoGrabacionPermisos] = useState(false);
  const [editandoRol, setEditandoRol] = useState(false);
  const [nombreRolEditando,setNombreRolEditando] = useState("");
    const [listaPermisos,setListaPermisos] = useState([]);
  const[rolSeleccionadoId,setRolSeleccionadoId] = useState(null);
  const[rolSeleccionadoObjeto,setRolSeleccionadoObjeto] = useState(null);
  const[listaRoles,setListaRoles] = useState();
  const[politicaSeleccionadaId,setPoliticaSeleccionadaId] = useState(null);
  const[politicaSeleccionadaObjeto,setPoliticaSeleccionadaObjeto] = useState(null);
  const[listaPoliticas,setListaPoliticas] = useState([]);

  
  useEffect(() => {
    if (rolSeleccionadoObjeto !== null) {
      setRolSeleccionadoId(rolSeleccionadoObjeto.id);
    } else {
      setRolSeleccionadoId(null);
    }
    
  }, [rolSeleccionadoObjeto]);  

  useEffect(()=>{
    if(props.open){
      limpiarState();
      cargarListaPermisos();
      cargarListaRoles();
      cargarListaPoliticas();
    }
   
  },[props.open])

  useEffect(() => {
    if (politicaSeleccionadaObjeto !== null) {
      setPoliticaSeleccionadaId(politicaSeleccionadaObjeto.id);
    } else {
      setPoliticaSeleccionadaId(null);
    }
    
  }, [politicaSeleccionadaObjeto]);

  const cargarListaPermisos = async()=>{
    if(props.nodoId !==null){
      const respuesta = await getPermisosRequest(props.nodoId);
      setListaPermisos(respuesta);      
    }
    
  }

  const revocarPermisos = async(rolId)=>{
    try {
      const data =  {
        nodoId: props.nodoId,
        rolId: rolId 
      }
      await removerPermiso(data);
      cargarListaPermisos();
      props.recargarArbolNodos();
    } catch (error) {
      console.error(error);
    }
  }

  const cargarPermisosPorId =  async()=>{
    
  }
  
   
  const otorgarPermisos =  async()=>{
    setCargandoGrabacionPermisos(true);
    try{
      setCargandoGrabacionPermisos(true);

      if(rolSeleccionadoId === null || isNaN(rolSeleccionadoId)){
        toast.warn("Selecciona un rol");
        return;
      }

      if(politicaSeleccionadaId===null || isNaN(politicaSeleccionadaId)){
        toast.warn("Selecciona una política");
        return;
      }

      const data = {
        nodoId:props.nodoId,
        rolId:rolSeleccionadoId,
        politicaId:politicaSeleccionadaId
      }

      await asignarPermisoRequest(data);
      cargarListaPermisos();
      props.recargarArbolNodos();
    }catch(error){
      console.error(error);
    }finally{
      setCargandoGrabacionPermisos(false);
    }
  }
  
  const limpiarState = async()=>{
  setRolSeleccionadoId(null);
  setPoliticaSeleccionadaId(null);
  setRolSeleccionadoObjeto(null);
  setPoliticaSeleccionadaObjeto(null);
  }

  const cargarListaRoles = async()=>{
    try{
      let roles = await getRoles();
      if(roles.body){
        roles= roles.body;
        roles = roles.map((item)=>{
          return {
            id:item.id,
            label:item.nombre
          }
        })
      }
      setListaRoles(roles);
      
    }catch(err){
      console.error(err);
    }
  }

  const cargarListaPoliticas = async()=>{
    try{
      let politicas = await getPoliticas();
      if(politicas.body){
        politicas= politicas.body;
        politicas = politicas.map((item)=>{
          return {
            id:item.id,
            label:item.nombre
          }
        })
      }
      setListaPoliticas(politicas);
     
    }catch(err){
      console.error(err);
    }
  }
  


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={props.open}
        onClose={ props.handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={props.open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              {props.title}
            </Typography>
            <div>
  <form  noValidate autoComplete="off">
    <Grid container spacing={3}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        style={{ height: 500 }}
      >
        <h4>Roles con acceso</h4>
       
           {listaPermisos.map((permiso, i) => (
            <Chip
              key={permiso.id}
              label={`${permiso.rol} (${permiso.politica})`}
              onClick={() => {
              //cargarPermisosPorId(permiso.Id);
              }}
              onDelete={() => {
                revocarPermisos(permiso.rolId);
              }}
              color="primary"
              style={{
                margin: 5,
              }}
            />
          ))} 
        
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        style={{ height: 700 }}
      >
        
         {editandoRol ? (
          <h4>{`Edita los permisos del rol ${nombreRolEditando}`}</h4>
        ) : (
          <h4>Selecciona uno rol para otorgarles permiso</h4>
        )}
         
          {!editandoRol && (
            <div>
               <Grid container spacing={3}>
             <Grid item xs={12} lg={12} sm={12}>
               <Autocomplete
               value={rolSeleccionadoObjeto}
               onChange={(event, newValue) => {
                setRolSeleccionadoObjeto(newValue);
               }}
               id="rolAutocomplete"
               options={listaRoles}
               sx={{ width: "100%" }}
               renderInput={(params) => (
                 <TextField {...params} label="Rol" />
               )}
             />
             </Grid>
              <Grid item xs={12} lg={12} sm={12}>
              <Autocomplete
              value={politicaSeleccionadaObjeto}
              onChange={(event, newValue) => {
                 setPoliticaSeleccionadaObjeto(newValue);
              }}
              id="politicaAutocomplete"
              options={listaPoliticas}
              sx={{ width: "100%" }}
              renderInput={(params) => (
                <TextField {...params} label="Política" />
              )}
            />
            </Grid>
            </Grid>
            </div>
          )} 

          <Grid item xs={12} lg={12} sm={12}>
            <div style={{marginTop:10}}>
            <Button
              disabled={cargandoGrabacionPermisos}
              variant="contained"
              style={{ backgroundColor: "#69bd4b", color: "white", marginRight:3}}
               onClick={() => {
                otorgarPermisos();
              }}
            >
              {cargandoGrabacionPermisos ? (
                <div
                  style={{
                    width: "100%",
                    marginTop: 0,
                    textAlign: "center",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {/* <Loader
                    type="Oval"
                    color="#FFF"
                    height="20"
                    width="20"
                    style={{ textAlign: "left", marginRight: 5 }}
                  /> */}
                </div>
              ) : (
                <></>
              )}
              Guardar
            </Button>
            <Button
              variant="contained"
              style={{ backgroundColor: "#c0392b", color: "white" }}
              onClick={() => {
                limpiarState();
              }}
            >
              Cancelar
            </Button>
            </div>
          </Grid>
      </Grid>
      <Grid item xs={12} lg={12} sm={12} md={12}>
        <Button
          style={{
            width: "100%",
          }}
          onClick={() => props.handleClose()}
          color="primary"
        >
          Cerrar
        </Button>
      </Grid>
    </Grid>
  </form>
</div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
