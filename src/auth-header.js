export default function authHeader() {

   const userTrue = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser

   const user = JSON.parse(localStorage.getItem("persist:root"));
    if (user && userTrue) {
      return userTrue.accessToken ;
    } else {
      return {};
    }
  }