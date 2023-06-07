import React, { useContext } from "react"
import { AuthContext } from "../Context/authContext"

function useAuth(){
    const auth = useContext(AuthContext);    
    return auth;
}

export {useAuth}