import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import "./Who.scss";

const items = [
  {
    id: 1,
    title: "Who We Are",
    img: "./WE.gif",
    desc: "We are a group of passionate students from Addis Ababa Science and Technology University (AASTU) who embarked on an exciting journey into the world of web development. With a shared love for technology and a drive to learn, we dove headfirst into the realms of front-end and back-end development, eager to turn our ideas into reality.",
  },
  {
    id: 2,
    title: "Our Work",
    img: "./WHO.gif",
    desc: "we are dedicated to curating an exceptional online shopping experience for our customers. our extensive range of offerings caters to diverse tastes and preferences. With a keen eye for detail and a commitment to customer satisfaction, we strive to create a seamless shopping journey that delights and inspires. Whether it's enhancing product visibility, optimizing user interface, or streamlining checkout processes, our team is continuously innovating to elevate the online retail experience. ",
  },
  {
    id: 3,
    title: "Our Journey",
    img: "./WhatWe.gif",
    desc: "We started as a team of eager students participating in the Google Developer Students Project, where we discovered our passion for technology and coding. With determination and curiosity as our guides, we embarked on a journey of exploration and discovery. Through challenges and triumphs, we honed our skills and deepened our understanding of web development.",
  },
];

const Who = () => {
  return (
    <section className="portfolio">
      <div className="star-background" /> {/* Star background */}
      <div className="itemWrapper">
        {items.map((item, index) => (
          <Item key={item.id} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

const Item = ({ item, index }) => {
  const { ref, inView } = useInView();

  return (
    <motion.div
      className="container"
      ref={ref}
      initial={{
        opacity: 0,
        x:
          window.innerWidth > 768 && index % 2 === 0
            ? -1000
            : window.innerWidth > 768
            ? 1000
            : 0,
      }}
      animate={
        inView
          ? { opacity: 1, x: 0 }
          : {
              opacity: 0,
              x:
                window.innerWidth > 768 && index % 2 === 0
                  ? -1000
                  : window.innerWidth > 768
                  ? 1000
                  : 0,
            }
      }
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      <div className="wrapper">
        <div
          className={`imageContainer ${index % 2 === 1 ? "reversed" : ""}`}
          style={{ backgroundImage: `url(${item.img})` }}
        />
        <div className={`textContainer ${index % 2 === 1 ? "reversed" : ""}`}>
          <motion.h2
            style={{ fontSize: "4rem", color: "orange", zIndex: 1 }}
            whileHover={{
              zIndex: 2,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <motion.b whileHover={{ color: "white" }}>{item.title}</motion.b>
          </motion.h2>

          <motion.p whileHover={{ color: "white" }}>{item.desc}</motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default Who;
