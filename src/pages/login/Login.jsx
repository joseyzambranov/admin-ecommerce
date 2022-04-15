const { useState } = require("react")

const Login =()=>{
    const [username,setUsername]=useState("");
    const [password,setUPassword]=useState("");
    const handleClick =()=>{
        e.preventDefault()
    }
    return (
        <div>
            <imput 
            type="text"
            placeholder = "username"
            onChange={(e)=>setUsername(e.target.value)} />
            <imput 
            type="password"
            placeholder ="password"
            onChange={(e)=>setUPassword(e.target.value)} />
            <button onClick={handleClick}>login</button>
        </div>
    )
}

export default Login