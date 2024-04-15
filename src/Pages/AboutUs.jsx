import "../app.scss";
import Who from "../components/Who/Who";

import Contact from "../components/contact/Contact";

const AboutUs = () => {
  return (
    <div>
      <section>
        <Who />
      </section>
      <section>
        {" "}
        <Contact />
      </section>
    </div>
  );
};

export default AboutUs;
