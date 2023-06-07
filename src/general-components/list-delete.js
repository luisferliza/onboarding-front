import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import CommentIcon from "@mui/icons-material/Comment";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";

export default function ListDelete({ items, fnAdd, fnDelete, objectType = 0 }) {
  //objectType 0- text only, 1- is object {id:1, texto:"hola"}

  const [itemText, setItemText] = React.useState("");

  const handleChangeItem = async (event) => {
    setItemText(event.target.value);
  };

  const keyPress = (e) => {
    if (e.keyCode == 13) {
      add();
    }
  };

  const clearItem = () => {
    setItemText("");
  };

  const add = () => {
    if (itemText !== "") {
      fnAdd(itemText);
      clearItem();
    }
  };

  return (
    <React.Fragment>
      <List
        sx={{ width: "100%", maxWidth: "100%", bgcolor: "background.paper" }}
      >
        {items.map((item, i) => (
          <ListItem
            key={"item" + i}
            disableGutters
            secondaryAction={
              <IconButton
                onClick={() => {
                  fnDelete(item);
                }}
              >
                <RemoveCircleIcon />
              </IconButton>
            }
          >
            <ListItemText
              primary={objectType === 0 ? `${item}` : `${item.texto}`}
            />
          </ListItem>
        ))}
      </List>
      <Grid container spacing={3}>
        <Grid item xs={11} lg={11} sm={11}>
          <TextField
            id="txtNewItem"
            label="Nuevo"
            variant="outlined"
            value={itemText}
            style={{ width: "100%" }}
            onChange={handleChangeItem}
            onKeyDown={keyPress}
          />
        </Grid>
        <Grid
          item
          xs={1}
          lg={1}
          sm={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton color="primary" aria-label="add" onClick={add}>
            <AddIcon />
          </IconButton>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
