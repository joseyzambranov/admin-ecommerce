import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";
import { useState } from "react";
import { useEffect } from "react";
import { userRequest } from "../../requestMethods";
import { useDispatch, useSelector } from "react-redux";
import { getIncome } from "../../redux/apiCalls";

export default function FeaturedInfo() {

const dispatch = useDispatch();
const income = useSelector((state)=>state.order.income)  

useEffect(()=>{
  getIncome(dispatch)
},[dispatch])

const [incomeResult,setIncomeResult] = useState([]);
const [perc,setPerc] = useState(0);

useEffect(()=>{
  const getIncome = async ()=>{
    try{
      const res = income;
      setIncomeResult(res)
      setPerc((res[1].total*100)/res[0].total-100)
    }catch{}
  }
  getIncome()
},[])
  
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Revanue</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">${incomeResult[1]?.total}</span>
          <span className="featuredMoneyRate">
          {Math.floor(perc)}{" "}{
             perc < 0 ? ( <ArrowDownward  className="featuredIcon negative"/> )
                      : ( < ArrowUpward className="featuredIcon"/> )
           } 
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$4,415</span>
          <span className="featuredMoneyRate">
            -1.4 <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">$2,225</span>
          <span className="featuredMoneyRate">
            +2.4 <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
