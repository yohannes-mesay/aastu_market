import React from "react";
import ProductsSaved from "../components/Saved/ProductsSaved";
import EventsSaved from "../components/Saved/EventsSaved";
import ServicesSaved from "../components/Saved/ServicesSaved";

const Saved = () => {
  return (
    <div>
      <EventsSaved />
      <ProductsSaved />
      <ServicesSaved/>
    </div>
  );
};

export default Saved;
