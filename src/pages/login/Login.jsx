import { useState } from "react";
import { useDispatch, } from "react-redux";
import {login} from "../../redux/apiCalls";





const Login =()=>{
    const [username,setUsername]=useState("");
    const [password,setUPassword]=useState("");
    const dispatch = useDispatch()
    

    const handleClick =(e)=>{
        //e.preventDefault()
        login(dispatch,{username,password})
    }   
    
    return (
        <div style={{
            height:"100vh",
            display:"flex",
            alignItems:"center",
            flexDirection:"column",
            justifyContent:"center"}}>
            <input style={{
                            padding:10,
                            marginBottom:20
                            }}
            type="text"
            placeholder = "username"
            onChange={(e)=>setUsername(e.target.value)} />
            <input style={{
                            padding:10,
                            marginBottom:20
                            }}
            type="password"
            placeholder ="password"
            onChange={(e)=>setUPassword(e.target.value)} />
            <button style={{padding:10,width:100,cursor:"pointer"}} onClick={handleClick}>login</button>
        </div>
    )
                        
}

export default Login