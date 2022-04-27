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

const url = "https://nodejs-ecommerce-api-mongodb.joseyzambranov.repl.co/api/";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNDc2OWY0MmFiZDY3ODNlYmRiMGMxYSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTAxOTQ3MSwiZXhwIjoxNjUxMjc4NjcxfQ.LKqnVIn1N2dDDkn-DiXhYWgfmP79VpEctEaVM9_lnTw"
//console.log(TOKEN)

export const publicRequest = axios.create({
    baseURL:url,
})

export const userRequest = axios.create({
    baseURL:url/*BASE_URL*/,
    headers:{token:`Bearer ${TOKEN}`}
})