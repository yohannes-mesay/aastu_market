import "./hero.scss";
import { motion } from "framer-motion";

const textVariants = {
  initial: {
    x: -40,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 1,
      staggerChildren: 0.2,
      ease: "easeInOut", // Add easing effect
    },
  },
  scrollButton: {
    opacity: 0,
    y: 10,
    transition: {
      duration: 2,
      repeat: Infinity,
      repeatType: "reverse", // Change repeat type to reverse
    },
  },
};

const sliderVariants = {
  initial: {
    x: 0,
  },
  animate: {
    x: "-220%",
    transition: {
      repeat: Infinity,
      repeatType: "mirror",
      duration: 20,
    },
  },
};

const imageVariants = {
  initial: {
    opacity: 0, // Start with opacity 0
  },
  animate: {
    opacity: 1, // Fade in the image
    x: 0,
    transition: {
      duration: 1.5, // Longer duration for a smoother effect
      ease: "easeInOut", // Add easing effect
    },
  },
};

const Hero = () => {
  return (
    <div className="hero">
      <div className="wrapper">
        <motion.div
          className="textContainer"
          variants={textVariants}
          initial="initial"
          animate="animate"
        >
          <motion.h1 variants={textVariants}>AASTU MARKET</motion.h1>
          <motion.h4 variants={textVariants}>
            Fueling Excitement, Igniting Connections - Unleash the Experience
          </motion.h4>
          <motion.div variants={textVariants} className="buttons">
            {/* Add more motion effects to the buttons */}
          </motion.div>
          <motion.img
            variants={textVariants}
            animate="scrollButton"
            src="/scroll.png"
            alt=""
          />
        </motion.div>
      </div>
      <motion.div
        className="slidingTextContainer"
        variants={sliderVariants}
        initial="initial"
        animate="animate"
      >
        let's boost your market experience
      </motion.div>
      <motion.div
        className="imageContainer"
        variants={imageVariants}
        initial="initial"
        animate="animate"
      >
        <img className="" src="/hero.jpg" alt="" />
      </motion.div>
    </div>
  );
};

export default Hero;
