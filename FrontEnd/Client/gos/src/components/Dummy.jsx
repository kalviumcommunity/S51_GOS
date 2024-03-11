// import React from 'react';
// import data from '../data.json';
// import './../App.css'

// function SneakerProfile() {
//   return (
//     <div className='dummy'>
//       <h2>Sneaker Profiles</h2>
//       {data.map((sneaker) => (
//         <div key={sneaker.SneakerID}>
//           <strong>SneakerID:</strong> {sneaker.SneakerID} <br />
//           <strong>Brand:</strong> {sneaker.Brand} <br />
//           <strong>Model:</strong> {sneaker.Model} <br />
//           <strong>Type:</strong> {sneaker.Type} <br />
//           <strong>Color:</strong> {sneaker.Color} <br />
//           <strong>Size:</strong> {sneaker.Size} <br />
//           <strong>Price:</strong> {sneaker.Price} <br />
//           <strong>Availability:</strong> {sneaker.Availability} <br />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SneakerProfile;



import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../App.css";

function SneakerProfile() {
  const [sneakerData, setSneakerData] = useState([]);
  const [selectedCreatedBy, setSelectedCreatedBy] = useState("All");
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    fetchSneakers();
  }, []);

  const fetchSneakers = async () => {
    try {
      const response = await fetch(
        "https://s51-gos-1.onrender.com/get"
      );
      const data = await response.json();
      setSneakerData(data);
    } catch (error) {
      console.error("Error fetching sneakers:", error);
    }
  };
  const checkLoginStatus = () => {
    const token = getCookie('token');
    setIsLoggedIn(!!token);
};
useEffect(() => {
    checkLoginStatus();
}, []);
const handleLogout = () => {
    document.cookie = 'token=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    setIsLoggedIn(false);
    window.location.reload();
};
const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

  const handleDelete = async (sneakerID) => {
    try {
      const response = await fetch(
        `https://s51-gos-1.onrender.com/delete/${sneakerID}`,
        {
          method: "DELETE",
        }
      );
      if (response.ok) {
        const updatedData = sneakerData.filter(
          (item) => item.SneakerID !== sneakerID
        );
        setSneakerData(updatedData);
        console.log("Sneaker item deleted successfully");
      } else {
        console.error("Failed to delete sneaker item");
      }
    } catch (error) {
      console.error("Error deleting sneaker item:", error);
    }
  };

  const handleCreatedByFilter = (event) => {
    setSelectedCreatedBy(event.target.value);
  };

  const filteredSneakers =
    selectedCreatedBy === "All"
      ? sneakerData
      : sneakerData.filter((sneaker) => sneaker.CreatedBy === selectedCreatedBy);

  return (
    <>
      <h1 className="landingpage">Welcome to GALLERY OF SNEAKER!</h1>
      <h3 className="landingpage">
        An exhibit that takes you on a journey through a diverse collection of
        footwear. Explore this gallery to discover a wide range of styles,
        brands, and designs, from classic to avant-garde. Each pair featured in
        this display tells a unique story of fashion and functionality.
      </h3>
      <br />
      <hr className="line" />
      <div className="container">
        <h1 className="h1">Sneaker Profiles  <div className="drop" >{isLoggedIn && <Link to="/newdata">
          <button className="add">ADD</button>
        </Link>}
      <select className="dropdown" onChange={handleCreatedByFilter} value={selectedCreatedBy}>
          <option value="All">All</option>
          <option value="Ranjan">Ranjan</option>
          <option value="Kevin">Kevin</option>
          <option value="Alex">Alex</option>
          <option value="Mogi">Mogi</option>
          <option value="Digeo">Digeo</option>
          <option value="Navas">Navas</option>
          <option value="King">King</option>
        </select>

      </div> </h1>
        
        {isLoggedIn ? (
                    <button className="log" onClick={handleLogout}>LOGOUT</button>
                ) : (
                    <Link to='/login'><button className="log">LOGIN</button></Link>
                )}

        
      </div>
     
      <div className="dummy">
        {filteredSneakers.map((sneaker) => (
          <div key={sneaker.SneakerID} className="box">
            <div className="main">
              <p>Sneaker ID: {sneaker.SneakerID}  </p>
              <p>Brand: {sneaker.Brand}</p>
              <p>Model: {sneaker.Model}</p>
              <p>Type: {sneaker.Type}</p>
              <p>Color: {sneaker.Color}</p>
              <p>Size: {sneaker.Size}</p>
              <p>Price: {sneaker.Price}</p>
              <p>Availability: {sneaker.Availability}</p>
              <p>Created By: {sneaker.CreatedBy}</p>

              {isLoggedIn && <Link to={`/update/${sneaker.SneakerID}`}>
                <button className="edit">Edit</button>
              </Link>}
              {isLoggedIn && <button
                onClick={(e) => handleDelete(sneaker.SneakerID)}
                className="edit"
              >
                Delete
              </button>}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SneakerProfile;
