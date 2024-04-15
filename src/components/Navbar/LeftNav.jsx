import React, { useState, useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

import { IoCartOutline } from "react-icons/io5";
import { MdClose } from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import "./LeftNav.css";
import { useAuth } from "../../Context/AuthContext";
import { dotStream } from "ldrs";
import { FaUserCircle } from "react-icons/fa";

function LeftNav() {
  const [showExploreDropdown, setShowExploreDropdown] = useState(false);
  const [showStudioDropdown, setShowStudioDropdown] = useState(false);

  //--------------------NavBar scroll state--------------------
  const { isAuthenticated, logout, isLoading } = useAuth();
  // console.log(isAuthenticated, isLoading);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const threshold = 20; // Adjust this value to set the scroll threshold for changing the background color

      setIsScrolled(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  //-------------------------------------------

  const handleExploreClick = () => {
    setShowExploreDropdown(true);
  };

  const handleStudioClick = () => {
    setShowStudioDropdown(true);
  };
  const handleEventLeave = () => {
    setShowExploreDropdown(false);
  };
  const handleStudioLeave = () => {
    setShowStudioDropdown(false);
  };


  const handleAccountClick = () => {
    setShowAccountDropdown(true);
  };
  const handleAccountLeave = () => {
    setShowAccountDropdown(false);
  };
  const handleClose = () => {
    setMenuOpen(false);
    console.log(menuOpen);
  };
  
  dotStream.register();
 

  return (
    <nav
      className={`${isScrolled ? "scrolled" : ""} ${
        showStudioDropdown ? "hovered" : ""
      } ${showExploreDropdown ? "hovered" : ""}`}
    >
      <div className="nav-links">
        <p className="logo">LOGO</p>

        <ul className="ul">
          <li className="home">
            <Link to="/">HOME</Link>
          </li>
          <li
            className="button"
            id="button1"
            onMouseEnter={handleExploreClick}
            onMouseLeave={handleEventLeave}
          >
            EXPLORE
            {showExploreDropdown && (
              <ul
                className="dropdown"
                onMouseEnter={handleExploreClick}
                onMouseLeave={handleEventLeave}
              >
                {/* <hr /> */}
                <li>
                  <Link to="/Products">PRODUCTS</Link>
                </li>
                <li>
                  <Link to="/Services">SERVICES</Link>
                </li>
                <li>
                  <Link to="/Events">EVENTS</Link>
                </li>
              </ul>
            )}
          </li>

          


          {isAuthenticated && !isLoading && (
            <li
              className="button"
              id="button2"
              onMouseEnter={handleStudioClick}
              onMouseLeave={handleStudioLeave}
            >
              STUDIO
              {showStudioDropdown && (
                <ul
                  className="dropdown"
                  onMouseEnter={handleStudioClick}
                  onMouseLeave={handleStudioLeave}
                >
                  {/* <hr /> */}
                  <li>
                    <Link to="/Saved">SAVED</Link>
                  </li>
                  <li>
                    <Link to="/Create">CREATE</Link>
                  </li>
                </ul>
              )}
            </li>
          )}

          </ul>
          {!isAuthenticated && !isLoading && (
            <div className="flex flex-row gap-10 pr-10 ">
              <li>
                <Link to="/register">REGISTER</Link>
              </li>

              <li className="w-auto">
                <Link to="/SignIn">SIGNIN</Link>
              </li>
              </div>
          )}
          
        {isAuthenticated && !isLoading && (
            <li>
              <Link to="/Profile" className="absolute right-10 bottom-3 ">
                <FaUserCircle color="grey" size={40} />
              </Link>
            </li>
          )}
      </div>
    </nav>
  );
}

// const Dropnav=()=>{
//   return(
//     <div className="flex flex-row justify-center items-center">
//     <IoCartOutline size={20} color="gray"/>
//     <p className="ml-1.5">PRODUCTS</p>
//     </div>
//   )
// }

export default LeftNav;
