// Simulated data representing personal information
const personalInfo = {
<<<<<<< HEAD
    imageUrl: "https://via.placeholder.com/150",
    name: "John Doe",
    residence: "New York City",
    phoneNumber: "123-456-7890",
    bio: "I love coding and exploring new technologies.",
  };
  
  // Simulated data representing posts
  const postsData = [
    {
      id: 1,
      name: "Amazing Product",
      type: "product",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
      rating: 4.5,
      date: "2024-03-29",
      ...personalInfo, // Spread the personalInfo object to include personal information in each post
    },
    {
      id: 2,
      name: "Exciting Event",
      type: "event",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
      rating: 4.8,
      date: "2024-04-10",
      ...personalInfo, // Spread the personalInfo object to include personal information in each post
    },
    {
      id: 3,
      name: "Reliable Service",
      type: "service",
      imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
      rating: 5.0,
      date: "2024-03-20",
      ...personalInfo, // Spread the personalInfo object to include personal information in each post
    },
  ];
  
  // Simulated API function to fetch posts data
  export const fetchPosts = () => {
    return new Promise((resolve, reject) => {
      // Simulate network delay with setTimeout
      setTimeout(() => {
        // Resolve with the simulated posts data
        resolve(postsData);
      }, 1000); // Simulated delay of 1 second
    });
  };
  
=======
  imageUrl: "https://via.placeholder.com/150",
  name: "John Doe",
  residence: "New York City",
  phoneNumber: "123-456-7890",
  bio: "I love coding and exploring new technologies.",
};

// Simulated data representing posts
const postsData = [
  {
    id: 1,
    name: "Amazing Product",
    type: "product",
    imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    rating: 4.5,
    date: "2024-03-29",
    ...personalInfo, // Spread the personalInfo object to include personal information in each post
  },
  {
    id: 2,
    name: "Exciting Event",
    type: "event",
    imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    rating: 4.8,
    date: "2024-04-10",
    ...personalInfo, // Spread the personalInfo object to include personal information in each post
  },
  {
    id: 3,
    name: "Reliable Service",
    type: "service",
    imageUrl: "https://via.placeholder.com/150", // Placeholder image URL
    rating: 5.0,
    date: "2024-03-20",
    ...personalInfo, // Spread the personalInfo object to include personal information in each post
  },
];

// Simulated API function to fetch posts data
export const fetchPosts = () => {
  return new Promise((resolve, reject) => {
    // Simulate network delay with setTimeout
    setTimeout(() => {
      // Resolve with the simulated posts data
      resolve(postsData);
    }, 1000); // Simulated delay of 1 second
  });
};
>>>>>>> e8b3d9d0653fa1eb08bd97ab20114b068cb387ce
