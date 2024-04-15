import "../app.scss";

import Hero from "../components/hero/Hero";
import Display from "../components/Display/display";
import Portfolio from "../components/portfolio/Portfolio";
import DisplayService from "../components/Display/displayService";
import DisplayEvent from "../components/Display/displayEvent";

const Home = () => {
  return (
    <div>
      <div>
        <section id="Homepage">
          <Hero />
        </section>

        <section>
          <Portfolio />
        </section>
        <section>
          <Display />
        </section>
        <section>
          <DisplayService />
        </section>
        <section>
          <DisplayEvent />
        </section>
      </div>
    </div>
  );
};

export default Home;
