import axios from "axios"
import authHeader from "./auth-header";
//import { useSelector } from "react-redux";
//import { currenUser } from "./redux/userRedux";

/*const currenUser = ()=> {
    const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
    if (user && user.accessToken) {
      return user.accessToken ;
    } else {
      return {};
    }
  }*/

const BASE_URL = "https://nodejs-ecommerce-api-mongodb.joseyzambranov.repl.co/api/";

const TOKEN = authHeader()//JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken



export const publicRequest = axios.create({
    baseURL:BASE_URL,
})

export const userRequest = axios.create({
    baseURL:BASE_URL,
    headers:{token:`Bearer ${authHeader()}`}
})