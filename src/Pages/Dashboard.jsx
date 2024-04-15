import React, {useState,useEffect} from "react";
import "../components/Dashboard/dashboard.css";
import Intro from "../components/Dashboard/Intro";
import TopRatedProducts from "../components/Products/Topratedproducts";
import Topservices from "../components/Services/Topservices";
import UpcomingEvents from "../components/Events/UpcomingEvents";
import EventsSaved from "../components/Saved/EventsSaved";
import { useAuth } from "../Context/AuthContext";

const Dashboard = () => {

  const [events, setEvents] = useState([]);
  const { user } = useAuth();


  const getExploreEvents = async () => {
    try {
      const response = await axios.get(
        "https://aguero.pythonanywhere.com/event/0/save"
      );
      setEvents(response.data);
      console.log(events);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getExploreEvents();
  }, []);

  console.log(user)
  return (
    <div className="dashboard">
      {/* <div className="top_wrapper"></div> */}
      <Intro />
      
      
      <div className="wholeBlock">
      {events.length!==0 ?(<EventsSaved />):('')}
        
        <TopRatedProducts />
        <Topservices />
        <UpcomingEvents/>
      </div>
    </div>
  );
};

export default Dashboard;
