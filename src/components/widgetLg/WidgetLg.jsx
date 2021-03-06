import "./widgetLg.css";
import {useEffect} from "react"

import { format } from 'timeago.js';
import { useDispatch, useSelector } from "react-redux";
import { getOrder } from "../../redux/apiCalls";

export default function WidgetLg() {

  const dispatch = useDispatch()
  const orders = useSelector((state)=>state.order.orders)

useEffect(()=>{
  getOrder(dispatch)
},[dispatch])

  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };

  //console.log(orders)
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest transactions</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Customer</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Amount</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        {orders.map(order=>(
          <tr className="widgetLgTr" key={order._id}>
          <td className="widgetLgUser">
            <span className="widgetLgName">{order.userId}</span>
          </td>
          <td className="widgetLgDate">{format(order.createdAt)}</td>
          <td className="widgetLgAmount">$ {order.amount}</td>
          <td className="widgetLgStatus">
            <Button type={order.status} />
          </td>
        </tr>

        ))}
        
       
      </table>
    </div>
  );
}
