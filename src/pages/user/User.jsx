import {
  MailOutline,
  PermIdentity,
  Publish,
} from "@material-ui/icons";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useLocation } from "react-router-dom";
import "./user.css";
import app from "../../firebase"
import { updateUser } from "../../redux/apiCalls";
/*-------------validator------------------*/ 
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

const required = value => {
  if (!value ) {
    return (
      <div>
        This field is required!
      </div>
    );
  }
};

export default function User() {
  const {isFetching,error} = useSelector((state)=>state.user);
  const form = useRef();
  const checkBtn = useRef();
  const location = useLocation();
  const userId = location.pathname.split("/")[2];

  const user = useSelector((state)=>
  state.user.users.find((user)=>user._id===userId))

  const [file,setFile] = useState(null);
  const [inputs,setInput] = useState({});
  const dispatch = useDispatch()
  const fileToF = file===null?false:true

const handleChange=(e)=>{
  setInput(prev=>{
    return {...prev,[e.target.name]:e.target.value}
  })
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
        const user = {...inputs, img:downloadURL}
        //console.log({...inputs, img:downloadURL})
        updateUser(userId,user,dispatch)
        return <Redirect to="/" />
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
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src={user.img||"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
           
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <Form className="userUpdateForm" onSubmit={handleClick} ref={form}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <Input
                  type="text"
                  name="username"
                  placeholder={user.username}
                  className="userUpdateInput"
                  value={inputs.username}
                  onChange={handleChange}
                  validations={[required]}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <Input
                  type="text"
                  name="email"
                  placeholder={user.email}
                  value={inputs.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                  validations={[required]}
                />
              </div>
            
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src={user.img||"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
                  alt=""
                />
                <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <Input 
                type="file" 
                id="file"
                name="img" 
                style={{ display: "none" }}
                onChange={e=>setFile(e.target.files[0])} />
                {!fileToF && <div style={{color: "red"}}>This field is required!</div>}
              </div>
              <button 
              className="userUpdateButton">Update</button>
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
