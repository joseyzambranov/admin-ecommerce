import React from "react";
import "./topbar.css";
import { useDispatch ,useSelector} from "react-redux";
import { logoutUser } from "../../redux/apiCalls";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';




export default function Topbar() {
  const dispatch = useDispatch()
  const user= useSelector((state)=>state.user.currentUser)
  
  const handleClick=(e)=>{
    e.preventDefault()
    logoutUser(dispatch)
   // return <Redirect to="/login" />;
    
  }
  
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">SumerAdmin</span>
        </div>
        <div className="topRight">
          
          <div className="topbarIconContainer">
            <ExitToAppIcon onClick={handleClick} />
          </div>
          <img src={user==null ? "https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif":user.img} alt="" className="topAvatar" />
        </div>
      </div>
    </div>
  );
}
