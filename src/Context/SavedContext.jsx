import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://aguero.pythonanywhere.com";

const SavedContext = createContext();

function SavedProvider({ children }) {
  const token = localStorage.getItem("token");
  let config = null;

  if (token) {
    config = {
      headers: {
        Authorization: `JWT ${token}`,
        "Content-Type": "application/json", // Specify Content-Type header
      },
    };
  } else {
    console.error("Token not found in localStorage");
  }

  const getproducts = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/product/0/save`, config);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const getServices = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/service/0/save`, config);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const getEvents = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/event/0/save`, config);
      return response.data;
    } catch (err) {
      console.error(err);
    }
  };

  const saveProduct = async (product) => {
    console.log("product.id", product.id);
    if (!product) {
      return "No product is saved";
    }
    try {
      console.log(config);
      const res = await axios.post(
        `https://aguero.pythonanywhere.com/product/${product.id}/save/`,
        {},
        config
      );
      alert("Product uploaded successfully");
      console.log("uploaded:", res);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const saveService = async (service) => {
    console.log("service.id", service.id);
    try {
      console.log(config);
      const res = await axios.post(
        `https://aguero.pythonanywhere.com/service/${service.id}/save/`,
        {},
        config
      );
      alert("service uploaded successfully");
      console.log("uploaded:", res);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  const saveEvent = async (event) => {
    console.log("event.id", event.id);
    try {
      console.log(config);
      const res = await axios.post(
        `https://aguero.pythonanywhere.com/event/${event.id}/save/`,
        {},
        config
      );
      alert("event uploaded successfully");
      console.log("uploaded:", res);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <SavedContext.Provider
      value={{
        getproducts,
        saveProduct,
        saveEvent,
        saveService,
        getServices,
        getEvents,
      }}
    >
      {children}
    </SavedContext.Provider>
  );
}

function useSaved() {
  const context = useContext(SavedContext);
  if (context === undefined)
    throw new Error("SavedContext used outside provider");
  return context;
}

export { SavedProvider, useSaved };
