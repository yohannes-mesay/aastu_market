import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, logout, isLoading } = useAuth();
  const menuRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const threshold = 20;
      setIsScrolled(scrollTop > threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
  };

  const handleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  dotStream.register();

  return (
    <nav
      className={`${isScrolled ? "scrolled" : ""} ${
        showStudioDropdown || showExploreDropdown ? "hovered" : ""
      }`}
    >
      <div className="nav-links">
        <p className="logo">LOGO</p>

        <ul className={`ul ${menuOpen ? "show" : ""}`} ref={menuRef}>
          <li className="home">
            <Link to="/" onClick={handleClose}>
              HOME
            </Link>
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

          <li className="about-us">
            <Link to="/AboutUs" onClick={handleClose}>
              ABOUT US
            </Link>
          </li>

          {!isAuthenticated && !isLoading && (
            <>
              <li>
                <Link to="/register" onClick={handleClose}>
                  REGISTER
                </Link>
              </li>
              <li>
                <Link to="/SignIn" onClick={handleClose}>
                  SIGN IN
                </Link>
              </li>
            </>
          )}
        </ul>

        {isAuthenticated && !isLoading && (
          <Link to="/Profile" className="absolute right-5 bottom-3">
            <FaUserCircle color="grey" size={40} />
          </Link>
        )}

        <div className="menu-toggle" onClick={handleMenu}>
          {menuOpen ? (
            <MdClose size={30} onClick={handleClose} />
          ) : (
            <FiMenu size={30} />
          )}
        </div>
      </div>
    </nav>
  );
}

export default LeftNav;
