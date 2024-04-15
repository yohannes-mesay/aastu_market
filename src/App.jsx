import LeftNav from "./components/Navbar/LeftNav";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Product from "./Pages/Product";
import Service from "./Pages/Service";
import Event from "./Pages/Event";
import "./App.css";
import Home from "./Pages/Home";
import Saved from "./Pages/Saved";

import ProfilePage from "./Pages/ProfilePage";
import MainContent from "./Pages/MainContent";
import Dashboard from "./Pages/Dashboard";
import ProductDetails from "./components/Details/ProductDetails";
import EventDetails from "./components/Details/EventDetails";
import ServiceDetails from "./components/Details/ServiceDetails";

import AboutUs from "./Pages/AboutUs";
import Footer from "./components/Footer/Footer";

import RegistrationForm from "./Pages/RegistrationForm";
import NotFound from "./Pages/NotFound";
import SignInForm from "./Pages/SignInForm";
import { useAuth } from "./Context/AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="App">
      <Router>
        <LeftNav />
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <Dashboard /> : <Home />}
          />
          <Route path="/Profile" element={<ProfilePage />} />
          <Route path="/Products" element={<Product />} />
          <Route path="/Services" element={<Service />} />
          <Route path="/Events" element={<Event />} />

          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/event/:id" element={<EventDetails />} />
          <Route path="/service/:id" element={<ServiceDetails />} />
          <Route path="/Saved" element={<Saved />} />
          <Route path="/Create" element={<MainContent />} />

          <Route path="/AboutUs" element={<AboutUs />} />

          <Route path="/SignIn" element={<SignInForm />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/Logout" />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
