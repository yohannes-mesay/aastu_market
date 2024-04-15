import React from 'react'
import axios from 'axios';

const deletePost = (product,saveId,setSaveState) => {
    async function deleteProduct() {
        const token = localStorage.getItem("token");
        let config = null;
  
        if (token) {
          config = {
            headers: {
              Authorization: `JWT ${token}`,
              "Content-Type": "application/json",
            },
          };
        } else {
          console.error("Token not found in localStorage");
        }
  
        try {
          console.log(config);
          console.log(saveId)
          const res = await axios.delete(
            `https://aguero.pythonanywhere.com/product/${product.id}/save/${saveId.id}/`,
            config
          );
          console.log(config);
          alert("Product deleted successfully" + saveId.id);
          console.log("deleted:", res);
  
          return res.data;
        } catch (err) {
          console.error("Error deleting product:", err);
        }
      }
  
      deleteProduct().then(() => {
        setSaveState(false);
      });
  return (
    <div>
      
    </div>
  )
}

export default deletePost
