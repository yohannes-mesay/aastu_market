import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "https://aguero.pythonanywhere.com";

const ProductContext = createContext();
// const initialState = {
//   user: null,
//   isLoading: false,
//   error: "",
// };
// function reducer(state, action) {
//   switch (action.type) {
//     case "product/upload":
//       return {
//         ...state,
//       };
//     default:
//       throw new Error("Unknown action");
//   }
// }
function ProductProvider({ children }) {
  const token = localStorage.getItem("token");
  let config = null;

  if (token) {
    config = {
      headers: {
        Authorization: `JWT ${token}`,
      },
    };
  } else {
    console.error("Token not found in localStorage");
  }
  async function uploadProduct(productData) {
    try {
      console.log("productData", productData);
      const formData = new FormData();
      Object.entries(productData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log("formdta", formData);
      const res = await axios.post(`${BASE_URL}/product/`, formData, config); // Make sure BASE_URL is defined somewhere
      console.log(config);
      alert("Product uploaded successfully");
      console.log("uploaded value:", res);

      return res.data;
    } catch (err) {
      console.error("Error uploading product:", err);
    }
  }
  async function uploadService(serviceData) {
    try {
      console.log("serviceData", serviceData);
      const formData = new FormData();
      Object.entries(serviceData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log("formdta", formData);
      const res = await axios.post(`${BASE_URL}/service/`, formData, config); // Make sure BASE_URL is defined somewhere
      console.log(config);
      alert("Service uploaded successfully");
      console.log("uploaded value:", res);
      return res.data;
    } catch (err) {
      console.error("Error uploading service:", err);
    }
  }

  async function uploadEvent(eventData) {
    try {
      console.log("eventData", eventData);
      const formData = new FormData();
      Object.entries(eventData).forEach(([key, value]) => {
        formData.append(key, value);
      });
      console.log("formdta", formData);
      const res = await axios.post(`${BASE_URL}/event/`, formData, config); // Make sure BASE_URL is defined somewhere
      console.log(config);
      alert("Event uploaded successfully");
      console.log("uploaded value:", res);
      return res.data;
    } catch (err) {
      console.error("Error uploading event:", err);
    }
  }

  async function getProduct() {
    try {
      const res = await axios.get(`${BASE_URL}/product/`);
      console.log("Product:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error getting product:", err);
    }
  }

  async function rater(product_id, rating) {
    try {
      const res = await axios.post(
        `${BASE_URL}/product/${product_id}/rating/`,
        { rate: rating },
        config
      );
      console.log("Rated successfully:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error in rater", err);
    }
  }
  async function raterService(service_id, rating) {
    try {
      const res = await axios.post(
        `${BASE_URL}/service/${service_id}/rating/`,
        { rate: rating },
        config
      );
      console.log("Rated successfully:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error in rater", err);
    }
  }
  async function raterEvent(event_id, rating) {
    try {
      const res = await axios.post(
        `${BASE_URL}/event/${event_id}/rating/`,
        { rate: rating },
        config
      );
      console.log("Rated successfully:", res.data);
      return res.data;
    } catch (err) {
      console.error("Error in rater", err);
    }
  }

  async function reviewer(product_id, review) {
    try {
      const res = await axios.post(
        `${BASE_URL}/product/${product_id}/review/`,
        { review: review },
        config
      );
      console.log("Reviewd successfully:", res);
      return res.data;
    } catch (err) {
      console.error("Error in reviewer", err);
    }
  }
  async function reviewerService(service_id, review) {
    try {
      const res = await axios.post(
        `${BASE_URL}/service/${service_id}/review/`,
        { review: review },
        config
      );
      console.log("Reviewd successfully:", res);
      return res.data;
    } catch (err) {
      console.error("Error in reviewer", err);
    }
  }
  async function reviewerEvent(event_id, review) {
    try {
      const res = await axios.post(
        `${BASE_URL}/event/${event_id}/review/`,
        { review: review },
        config
      );
      console.log("Reviewd successfully:", res);
      return res.data;
    } catch (err) {
      console.error("Error in reviewer", err);
    }
  }

  async function getReviews(product_id) {
    try {
      const res = await axios.get(
        `${BASE_URL}/product/${product_id}/review`,
        config
      );
      if (!res) throw new Error("Errorn in getting reviews");
      console.log("reviews", res.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }

  async function getRatings(product_id) {
    try {
      const res = await axios.get(
        `${BASE_URL}/product/${product_id}/rating`,
        config
      );
      if (!res) throw new Error("Errorn in getting ratings");
      console.log("ratings", res.data);
      return res.data;
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <ProductContext.Provider
      value={{
        rater,
        raterService,
        raterEvent,
        reviewer,
        reviewerService,
        reviewerEvent,
        getRatings,
        uploadService,
        uploadProduct,
        uploadEvent,
        getReviews,
        getProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}

function useProduct() {
  const context = useContext(ProductContext);
  if (context === undefined)
    throw new Error("ProductContext used outside provider");
  return context;
}

export { ProductProvider, useProduct };
