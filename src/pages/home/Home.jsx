import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";
import { useEffect, useState,useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserStats } from "../../redux/apiCalls";

export default function Home() {
  const dispatch = useDispatch()
  const userStats = useSelector((state)=>state.user.userStats)
useEffect(()=>{
  getUserStats(dispatch)
},[dispatch])


  const [userStatsResult,setUserStatsResult] = useState([])
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
    const getStats =  ()=>{
   try{
      const res =  userStats;
      res.map(item=>{
        setUserStatsResult(prev=>[
          ...prev,
          {name:MONTHS[item._id-1],"Active User": item.total}
        ])
      })
    }catch{}
  }
   getStats()
  },[MONTHS])


  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={userStatsResult} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
        <WidgetLg/>
      </div>
    </div>
  );
}
