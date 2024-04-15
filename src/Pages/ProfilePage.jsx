// import React, { useEffect, useState } from "react";
// import { fetchPosts } from "../components/PostsData";

// function ProfilePage() {
//   const [userInfo, setUserInfo] = useState({});
//   const [products, setProducts] = useState([]);
//   const [services, setServices] = useState([]);
//   const [events, setEvents] = useState([]);
//   const [selectedCategory, setSelectedCategory] = useState(null);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       // Fetch data from API
//       const posts = await fetchPosts();

//       // Extract user info from the first post
//       const { name, residence, phoneNumber, bio, imageUrl } = posts[0]; // Assuming the user info is in the first post

//       // Set user info
//       setUserInfo({ name, residence, phoneNumber, bio, imageUrl });

//       // Filter posts by type
//       const productPosts = posts.filter((post) => post.type === "product");
//       const servicePosts = posts.filter((post) => post.type === "service");
//       const eventPosts = posts.filter((post) => post.type === "event");

//       // Set products, services, and events
//       setProducts(productPosts);
//       setServices(servicePosts);
//       setEvents(eventPosts);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   return (
//     <div className="flex flex-col items-center justify-center ml-20">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg mb-8 p-8">
//         {/* Underline above Personal Info */}
//         <div className="border-b-2 border-green-500 mb-4 py-8"></div>
//         {/* Personal Info */}
//         <div className="flex items-center justify-center mb-4 py-4">
//           <img
//             src={userInfo.imageUrl}
//             alt="Profile picture"
//             className="rounded-md shadow-md w-60 h-60 mr-4 p-2"
//           />
//           <div>
//             <h2 className="text-xl font-semibold mb-1">
//               Name: {userInfo.name}
//             </h2>
//             <p className="mb-1 text-green-600">
//               Phone Number: {userInfo.phoneNumber}
//             </p>
//             <p className="text-gray-400">Bio: {userInfo.bio}</p>
//             <p className="mb-1 text-lg">Residence: {userInfo.residence}</p>
//           </div>
//         </div>
//         {/* Divider Line */}
//         <div className="border-b-2 border-green-500 mb-4 p-8"></div>
//         {/* Posts */}
//         <div className="posts">
//           <h1 className="text-5xl text-green-600 mb-8 p-4">Posts</h1>
//           <div className="flex justify-between">
//             <CategoryCard
//               title="Products"
//               onClick={() => setSelectedCategory("products")}
//               selected={selectedCategory === "products"}
//             />
//             <CategoryCard
//               title="Services"
//               onClick={() => setSelectedCategory("services")}
//               selected={selectedCategory === "services"}
//             />
//             <CategoryCard
//               title="Events"
//               onClick={() => setSelectedCategory("events")}
//               selected={selectedCategory === "events"}
//             />
//           </div>
//           <div className="mt-8 grid grid-cols-3 gap-4">
//             {selectedCategory === "products" &&
//               products.map((product) => (
//                 <PostItem key={product.id} item={product} />
//               ))}
//             {selectedCategory === "services" &&
//               services.map((service) => (
//                 <PostItem key={service.id} item={service} />
//               ))}
//             {selectedCategory === "events" &&
//               events.map((event) => (
//                 <PostItem key={event.id} item={event} />
//               ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// const CategoryCard = ({ title, onClick, selected }) => (
//   <div
//     className={`cursor-pointer ${
//       selected ? "border-gray-300" : ""
//     } hover:border-green-500 hover:bg-gray-50`}
//     onClick={onClick}
//     style={{ margin: "auto" }}
//   >
//     <p className="text-lg font-semibold">{title}</p>
//   </div>
// );

// const PostItem = (/*{ item }*/) => (
//   <div className="bg-white rounded-md shadow-md overflow-hidden">
//     <img
//       src={item.imageUrl}
//       alt={item.name}
//       className="w-full h-48 object-cover"
//     />
//     <div className="p-4">
//       <h3 className="text-lg font-semibold mb-1">{item.name}</h3>
//       <p className="text-gray600">Rating: {item.rating}</p>
//       <p className="text-gray-600">Date: {item.date}</p>
//     </div>
//   </div>
// );

// export default ProfilePage;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useAuth } from "../Context/AuthContext";
import "ldrs/ring";
import Loader from "../components/Loaders/Loader";

const ProfilePage = () => {
  const [render, setRender] = useState([]);
  const [selectedPage, setSelectedPage] = useState("products");
  const { logout, user, isLoading, getUserFromToken } = useAuth();
  const navigate = useNavigate();
  useEffect(function () {
    async function apiCall(page) {
      try {
        setSelectedPage(page);
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setRender(data); // Set the selected page based on the button clicked
      } catch (err) {
        console.error(err);
      }
    }
    apiCall();
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (user) {
      return;
    }
    if (token) {
      getUserFromToken(token);
    }
  }, [isLoading]);
  function handleLogout(e) {
    e.preventDefault();
    const x = confirm("Do you really want to log out");
    console.log("x", x);
    if (x) {
      logout();
      navigate("/");
    }
  }

  const handleClick = async (page) => {
    setSelectedPage(page);
    setPage(page);
  };
  if (!user) {
    return <Loader />;
  }
  return (
    <div className="body">
      <div className="header_wrapper">
        <header></header>
        <div className="cols_container">
          <div className="left_col">
            <div className="img_container">
              <img src={user.profile} alt={user.first_name} />
              <span></span>
            </div>

            <div className="basic_data">
              <h2>
                {user ? (
                  `${user.first_name} ${user.last_name}`
                ) : (
                  <h3>Loading...</h3>
                )}
              </h2>
              <p>{user.username}</p>
              <p>{user.phone}</p>
            </div>

            <hr />

            <div className="content">
              <p>{user.bio}</p>

              <hr />

              <p className="residence">Residence: AASTU</p>
              <a href="/">
                <div
                  className="bg-orange-400 hover:bg-orange-500 text-black font-bold py-3 px-8 pr-5 rounded-xl mr-2 flex items-center"
                  onClick={handleLogout}
                >
                  <span className="ml-1 ">Logout</span>
                </div>
              </a>
            </div>
          </div>

          <div className="right_col">
            <div className="nav">
              <ul className="ul">
                <li
                  className={selectedPage === "products" ? "active" : ""}
                  onClick={() => handleClick("products")}
                >
                  PRODUCTS
                </li>
                <li
                  className={selectedPage === "services" ? "active" : ""}
                  onClick={() => handleClick("services")}
                >
                  SERVICES
                </li>
                <li
                  className={selectedPage === "events" ? "active" : ""}
                  onClick={() => handleClick("events")}
                >
                  EVENTS
                </li>
              </ul>
            </div>

            <div className="photos">
              {render.length > 0 ? (
                render.map((each) => (
                  <PostItem
                    key={each.id}
                    image={each.image}
                    title={each.title}
                  />
                ))
              ) : (
                <p>Loading...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PostItem = (props) => (
  <div className="bg-white rounded-md shadow-md overflow-hidden cursor-pointer">
    <img src={props.image} alt="item" className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-1">{props.title}</h3>
      <p className="text-gray600">Rating: Rating</p>
      <p className="text-gray-600">Date: date</p>
    </div>
  </div>
);

export default ProfilePage;
