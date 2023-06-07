import Button from "@mui/material/Button";
import {styled} from "@mui/material/styles";

export const OutlinedButton = styled(Button)({  
    color: "#fff",
    margin: "2px",
    border: "1px solid transparent",
    '&:hover': {    
      border: '1px solid #fff',    
    }
  })