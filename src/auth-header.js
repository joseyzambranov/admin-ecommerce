export default function authHeader() {


   const user = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser;
    if (user && user.accessToken) {
      return user.accessToken ;
    } else {
      return {};
    }
  }