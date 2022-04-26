import "./newUser.css";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import app from "../../firebase";
import { addUser } from "../../redux/apiCalls";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";


const required = value => {
  if (!value ) {
    return (
      <div>
        This field is required!
      </div>
    );
  }
};


export default function NewUser() {
  const form = useRef();
  const checkBtn = useRef();
const {isFetching} = useSelector((state)=>state.user);
const [inputs,setInputs]= useState({})
const [file,setFile]=useState(null)
const dispatch = useDispatch()
const fileToF = file===null?false:true
const handleChange =(e)=>{
 setInputs(prev =>{
   return{...prev,[e.target.name]:e.target.value}}
 )
}

const handleClick=(e)=>{
  e.preventDefault()
  if(fileToF){
  const fileName = new Date().getTime()+file.name;
  const storage = getStorage(app);
  const storageRef = ref(storage,fileName);
  const uploadTask = uploadBytesResumable(storageRef, file);
  form.current.validateAll();
  if(checkBtn.current.context._errors.length === 0){

// Register three observers:
// 1. 'state_changed' observer, called any time the state changes
// 2. Error observer, called on failure
// 3. Completion observer, called on successful completion
uploadTask.on('state_changed', 
  (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
        default:
    }
  }, 
  (error) => {
    // Handle unsuccessful uploads
    
    
  }, 
  () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      //console.log({...inputs, img:downloadURL})
      const user = {...inputs, img:downloadURL};
      addUser(user,dispatch)

      
    });
  }
);
  }  
}
}
if(isFetching){
  return <Redirect to="/" />
}

  return (
    <div className="newUser">
      <h1 className="newUserTitle">New User</h1>
      <Form onSubmit={handleClick} ref={form} className="newUserForm">
      <div className="newUserItem">
          <label className="label">Image</label>
          <Input className="inputFile" name="image" 
                 type="file" 
                 id="file" 
                 //value={inputs.image}
                 onChange={e=>setFile(e.target.files[0])} 
                 
                 />{!fileToF && <div style={{color: "red"}}>This field is required!</div>}
        </div>
        <div className="newUserItem">
        
          <label className="label">Username</label>
          <Input className="input" name="username" 
                 type="text" 
                 placeholder="john"
                 value={inputs.username}
                 onChange={handleChange}
                 validations={[required]}
                 />
        </div>
        <div className="newUserItem">
          <label className="label">Email</label>
          <Input className="input" name="email"
                 type="email" 
                 placeholder="john@gmail.com"
                 value={inputs.email}
                 onChange={handleChange} 
                 validations={[required]}
                 />
        </div>
        <div className="newUserItem">
          <label className="label">Password</label>
          <Input className="input" name="password" 
                 type="password" 
                 placeholder="password"
                 value={inputs.password}
                 onChange={handleChange} 
                 validations={[required]}
                 />
        </div>
        
        <button  type="submit" className="newUserButton">Create</button>
        
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
}
