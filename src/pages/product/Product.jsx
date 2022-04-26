import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import { useSelector } from "react-redux";
import { useRef,useState,useMemo,useEffect } from "react";
import { userRequest } from "../../requestMethods";
import {useDispatch} from "react-redux";
import app from "../../firebase";
import {updateProduct} from "../../redux/apiCalls";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { Redirect } from "react-router-dom";
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

export default function Product() {

  const {isFetching,error} = useSelector((state)=>state.product);
  const form = useRef();
  const checkBtn = useRef();
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats,setPStats] = useState([])
    

    const product = useSelector((state)=>
    state.product.products.find((product)=>product._id===productId))

    /* ----------------------- */
    const [inputs,setInput] = useState({});
    const [file,setFile]=useState(null);
    const dispatch = useDispatch()
    const fileToF = file===null?false:true
    const MONTHS = useMemo(()=>[
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
  
    ],[]) 
    useEffect(()=>{
      const getStats = async ()=>{
     try{
        const res = await userRequest.get("order/income?pid="+productId);
        const list = res.data.sort((a,b)=>{
            return a._id-b._id
        })
        list.data.map((item)=>
          setPStats((prev)=>[
            ...prev,
            {name:MONTHS[item._id-1],Sales: item.total}
          ])
        )
      }catch{}
    }
     getStats()
    },[MONTHS,productId])


    const handleChange = (e)=>{
      setInput(prev=>{
        return{...prev,[e.target.name]:e.target.value}
      })
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
        const product = {...inputs, img:downloadURL}
        updateProduct(productId,product,dispatch)
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
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
          <div className="productTopLeft">
              <Chart data={pStats} dataKey="Sales" title="Sales Performance"/>
          </div>
          <div className="productTopRight">
              <div className="productInfoTop">
                  <img src={product.img} alt="" className="productInfoImg" />
                  <span className="productName">{product.title}</span>
              </div>
              <div className="productInfoBottom">
                  <div className="productInfoItem">
                      <span className="productInfoKey">id: </span>
                      <span className="productInfoValue"> {product._id}</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">sales:</span>
                      <span className="productInfoValue">5123</span>
                  </div>
                  <div className="productInfoItem">
                      <span className="productInfoKey">in stock:</span>
                      <span className="productInfoValue"> {product.inStock}</span>
                  </div>
              </div>
          </div>
      </div>
      <div className="productBottom">
          <Form className="productForm" onSubmit={handleClick} ref={form}>
              <div className="productFormLeft">
                  <label>Product Name</label>
                  <Input name="title" 
                         type="text" 
                         value={inputs.title}
                         placeholder={product.title} 
                         onChange={handleChange}
                         validations={[required]}/>

                  <label>Product Description</label>
                  <Input name="desc" 
                         type="text" 
                         placeholder={product.desc}
                         value={inputs.desc}
                         onChange={handleChange} 
                         validations={[required]}/>

                  <label>Price</label>
                  <Input name="price" 
                         type="number" 
                         placeholder={product.price} 
                         value={inputs.price}
                         onChange={handleChange} 
                         validations={[required]}/>

                  <label>In Stock</label>
                  <select name="inStock" 
                          id="idStock" 
                          value={inputs.inStock}
                          onChange={handleChange}
                          validations={[required]}>
                            
                  <option>Select</option>
                      <option value="true">Yes</option>
                      <option value="false">No</option>
                  </select>
              </div>
              <div className="productFormRight">
                  <div className="productUpload">
                      <img src={product.img} alt="" className="productUploadImg" />
                      <label for="file">
                          <Publish/>
                      </label>
                      <Input 
                      name="image"
                      type="file" 
                      id="file" 
                      style={{display:"none",cursor:"pointer"}} 
                      value={inputs.image}
                      onChange={e=>setFile(e.target.files[0])}/>
                      {!fileToF && <div style={{color: "red"}}>This field is required!</div>}
                  </div>
                  <button className="productButton" >Update</button>
                  <CheckButton style={{ display: "none" }} ref={checkBtn} />
              </div>
          </Form>
      </div>
    </div>
  );
}
