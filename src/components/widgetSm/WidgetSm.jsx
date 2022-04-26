import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNewUser } from "../../redux/apiCalls";

export default function WidgetSm() {

const dispatch = useDispatch()
const user = useSelector((state)=>state.user.newUsers)  

useEffect(()=>{
  getNewUser(dispatch)
})

const users = user;

/*useEffect(()=>{
  const getUsers = async ()=>{
    try{
      const res = user;
    setUsers(res)
    }catch{}
  }
  getUsers()
},[])*/

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>

      <ul className="widgetSmList">
        {users.map((user)=>(
          <li className="widgetSmListItem" key={user._id}>
          <img
            src={user.img ||"https://crowd-literature.eu/wp-content/uploads/2015/01/no-avatar.gif"}
            alt=""
            className="widgetSmImg"
          />
          <div className="widgetSmUser">
            <span className="widgetSmUsername">{user.username}</span>
          </div>
          <button className="widgetSmButton">
            <Visibility className="widgetSmIcon" />
            Display
          </button>
        </li>

        ))
        
        }
      </ul>
    </div>
  );
}
