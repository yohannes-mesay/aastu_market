import { useAuth } from "../Context/AuthContext";
import React, { useEffect, useState } from "react";
import axios from "axios";
import laptop from "../Assets/Shoping.jpg";

import "./Profile.css";

//Logout imports
import { useNavigate } from "react-router-dom";
import 'ldrs/ring'
import Loader from "../components/Loaders/Loader";

const ProfilePage = () => {
  const [render, setRender] = useState([]);
  const [display, setDisplay] = useState([]);
  const [selectedPage, setSelectedPage] = useState("product");
  const [page, setPage] = useState("product");
  const { logout, user,getUserFromToken, isLoading } = useAuth();
  const navigate=useNavigate();

  const [userTest, setUserTest] = useState([]);
  

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      getUserFromToken(token);
    }
  }, [user]);

  if (!user == null){
    return <p>loading</p>
  }

  //------For the logout-------

  function handleLogout(e) {
    e.preventDefault();
    const x = confirm("Do you really want to log out");
    console.log("x", x);
    if (x) {
      logout();
      navigate("/");
    }
  }




  //-------------------- End -----------------
  
  const userCall = async () => {
    try {
      const response = await axios.get(
        "https://aguero.pythonanywhere.com/user"
      );
      const data = response.data;
      setUserTest(data);
      console.log(userTest);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    userCall();
  }, []);


  

  const typeSellector = (page, user) => {
    const display = userTest.map((each) => {
      if (user.username === each.username) {

        console.log(userTest)
        console.log(each)
        console.log(page)
        console.log(user)
        console.log('user.username= '+user.username)
        console.log('each.username= '+each.service)

        

        const postType = each[page];
        console.log('post type= '+ postType)
        if (postType) {
          console.log("matched");
          return postType; 
        } else {
          return null; 
        }
      } else {
        return undefined; 
      }
    }).filter(item=>item);

    console.log(display)
    setDisplay(display)
  };
  


  useEffect(()=>{
    typeSellector(page,user)
  },[user])

  console.log(display)
  

  const handleClick = async (page, user) => {
    setSelectedPage(page);
    setPage(page);
    typeSellector(page, user);
  };

  useEffect(() => {
    handleClick(page, user);
  }, []);




  return (
    <div className="body">
      <div className="header_wrapper">
        <header></header>
        <div className="cols_container">
          <div className="left_col">
            <div className="img_container">
              <img src={laptop} alt="laptop" />
              <span></span>
            </div>

            <div className="basic_data">
              
              {user &&(
                <h2>
               
                {user.first_name} {user.last_name}
                  
              </h2>)}
              {user &&(
              <p> {user.username}</p>)}
              {user &&(
              <p>{user.phone}</p>
              )}
            </div>

            <hr />

            <div className="content">
              {user&&(<p>{user.bio}</p>)}

              <hr />

              <p className="residence">Residence: AASTU</p>
              <a className="relative left-0" href="/">
                <div
                  className="bg-orange-400 hover:bg-orange-500 text-black font-bold py-3 px-8 rounded-xl mr-2 w-2/6 scale-95 flex items-center align-middle"
                  onClick={handleLogout}
                >
                  <span className="ml-1 relative right-3">Logout</span>

                </div>
              </a>
              {/* -----------------For the logout----------------------*/}

            </div>
          </div>
          <div className="right_col">
            <div className="nav">
              <ul className="ul">
                <li
                  className={selectedPage === "product" ? "active" : ""}
                  onClick={() => handleClick("product", user)}
                >
                  PRODUCTS
                </li>
                <li
                  className={selectedPage === "service" ? "active" : ""}
                  onClick={() => handleClick("service",user)}
                >
                  SERVICES
                </li>
                <li
                  className={selectedPage === "event" ? "active" : ""}
                  onClick={() => handleClick("event",user)}
                >
                  EVENTS
                </li>
              </ul>
            </div>

            <div className="photos">
              {userTest.length > 0 ? (
                display.length !==0 ? (
                  display.map((each) =>
                    each.map((item) => (
                      <PostItem
                        key={item.id}
                        image={item.image}
                        title={item.title}
                      />
                    ))
                  )
                ) : (
                  <p className="m-40">No {page} posted here yet!!</p>
                )
              ) : (
                <p className="m-40">Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostItem = (props) => (
  <div className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer">
    <img src={props.image} alt="item" className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-1">{props.title}</h3>
      <p className="text-gray600">Rating: Rating</p>
      <p className="text-gray-600">Date: date</p>
    </div>
  </div>
);

export default ProfilePage;