import { useRef, useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import {addProduct} from "../../redux/apiCalls";
import {useDispatch, useSelector} from "react-redux"
/*required form */
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import { Redirect } from "react-router-dom";

const required = value => {
  if (!value ) {
    return (
      <div>
        This field is required!
      </div>
    );
  }
};


export default function NewProduct() {

  const form = useRef();
  const checkBtn = useRef();
  const {isFetching} = useSelector((state)=>state.product);

  const [inputs,setInput] = useState({});
  const [file,setFile]=useState(null);
  const [cat,setCat]=useState([]);
  const dispatch = useDispatch();
  const fileToF = file===null?false:true

  const handleChange = (e)=>{
    setInput(prev=>{
      return{...prev,[e.target.name]:e.target.value}
    })
  }
  const handleCat = (e)=>{
     setCat(e.target.value.split(","))
  }
  const handleClick = (e)=>{
    e.preventDefault();
    if(fileToF){
    const fileName = new Date().getTime()+file.name;
    const stogare = getStorage(app)
    const storageRef = ref(stogare,fileName)
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
      const product = {...inputs, img:downloadURL,categories:cat};
      addProduct(product,dispatch)
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
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <Form className="addProductForm" onSubmit={handleClick} ref={form}>
        <div className="addProductItem">
          <label>Image</label>
          <Input name="image" 
                 type="file" 
                 id="file" 
                 onChange={e=>setFile(e.target.files[0])} />
                 {!fileToF && <div style={{color: "red"}}>This field is required!</div>}
        </div>
        <div className="addProductItem">
          <label>title</label>
          <Input name="title" 
                 type="text" 
                 placeholder="Title" 
                 onChange={handleChange}
                 validations={[required]}/>
                 
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <Input name="desc" 
                 type="text" 
                 placeholder="Description" 
                 onChange={handleChange}
                 validations={[required]}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <Input name="price" 
                 type="number" 
                 placeholder="Price" 
                 onChange={handleChange}
                 validations={[required]} />
        </div>
        <div className="addProductItem">
          <label>Categories</label>
          <Input name="cat" 
                 type="text" 
                 placeholder="Jean,skirts" 
                 onChange={handleCat}
                 validations={[required]} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock"  
                  id="inStock" 
                  onChange={handleChange}
                  validations={[required]}>

          <option >select</option>
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        
        <button className="addProductButton" >Create</button>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
}
