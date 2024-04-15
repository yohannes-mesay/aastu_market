import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./portfolio.scss";
import { Link } from "react-router-dom";

const items = [
  {
    id: 1,
    title: "EVENT",
    img: "./meeting (3).jpg",
    desc: (
      <>
        <div className="title-line">Host Your Next Event With Us !</div>
        <div className="description">
          Are you looking for the perfect platform to showcase your upcoming
          event? Look no further! Our website provides a dynamic and engaging
          space for event promotion. we have got you covered.
        </div>
      </>
    ),
    link: "/events",
  },
  {
    id: 2,
    title: "PRODUCTS",
    img: "./pc.jpg",
    desc: (
      <>
        <div className="title-line"> showcase your products to the world !</div>
        <div className="description">
          Join our vibrant community of sellers and reach thousands of potential
          customers effortlessly! our platform provides you with the perfect
          opportunity to showcase your products and boost your sales.
        </div>
      </>
    ),
    link: "products",
  },
  {
    id: 3,
    title: "SERVICES",
    img: "./element.jpg",
    desc: (
      <>
        <div className="title-line">
          {" "}
          Unlock the full potential of your services !
        </div>
        <div className="description">
          Whether you're a budding entrepreneur or an established business, our
          website provides a powerful platform to showcase your services to a
          wide audience. With seamless integration and user-friendly tools,
          promoting your services has never been easier.
        </div>
      </>
    ),
    link: "/services",
  },
];

const Portfolio = () => {
  const { ref, inView } = useInView();
  const [direction, setDirection] = useState("left");

  useEffect(() => {
    const handleResize = () => {
      setDirection(window.innerWidth <= 768 ? "bottom" : "left");
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="portfolio">
      <div className="star-background" />
      <motion.p
        ref={ref}
        className="title"
        style={{
          fontSize: "3rem",
          color: "white",
          textAlign: "center",
          textTransform: "uppercase",
          marginTop: "3rem",
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
      >
        <motion.b whileHover={{ color: "WHITE" }}>Our Services</motion.b>
      </motion.p>
      <div className="progressBar" />
      <div className="itemWrapper">
        {items.map((item, index) => (
          <Item key={item.id} item={item} index={index} direction={direction} />
        ))}
      </div>
    </section>
  );
};

const Item = ({ item, index, direction }) => {
  const { ref, inView } = useInView();

  return (
    <Link to={item.link} style={{ textDecoration: "none" }}>
      <motion.div
        className="container"
        ref={ref}
        initial={{
          opacity: 0,
          x: direction === "left" ? (index % 2 === 0 ? -1000 : 1000) : 0,
          y: direction === "bottom" ? 50 : 0,
        }}
        animate={
          inView
            ? { opacity: 1, x: 0, y: 0 }
            : {
                opacity: 0,
                x: direction === "left" ? (index % 2 === 0 ? -1000 : 1000) : 0,
                y: direction === "bottom" ? 50 : 0,
              }
        }
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        <div className="wrapper">
          <div
            className={`imageContainer ${index % 2 === 1 ? "reversed" : ""}`}
          >
            <img src={item.img} alt="" />
          </div>
          <div className={`textContainer ${index % 2 === 1 ? "reversed" : ""}`}>
            <motion.h2 style={{ fontSize: "4rem", color: "orange" }}>
              <motion.b whileHover={{ color: "white" }}>{item.title}</motion.b>
            </motion.h2>

            <motion.p whileHover={{ color: "white" }}>{item.desc}</motion.p>
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 20 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.1 }}
            >
              See Demo
            </motion.button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

export default Portfolio;
