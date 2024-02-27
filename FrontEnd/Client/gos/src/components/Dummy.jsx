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
//           <strong>SneakerURL:</strong> {sneaker.SneakerURL} <br />
//           <strong>Availability:</strong> {sneaker.Availability} <br />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default SneakerProfile;


import React, { useState, useEffect } from 'react';
import './../App.css';

function SneakerProfile() {
  const [sneakerData, setSneakerData] = useState([]);

  useEffect(() => {
    fetchSneakers();
  }, []);

  const fetchSneakers = async () => {
    try {
      const response = await fetch('https://gallery-of-senakers.onrender.com/get');
      const data = await response.json();
      setSneakerData(data);
    } catch (error) {
      console.error('Error fetching sneakers:', error);
    }
  };

  return (
   
    <div className='dummy'> 
      {sneakerData.map((sneaker) => (
        <div key={sneaker.SneakerID} className="box">
          <div className='main'>
            <p>Sneaker ID: {sneaker.SneakerID}</p>
            <p>Brand: {sneaker.Brand}</p>
            <p>Model: {sneaker.Model}</p>
            <p>Type: {sneaker.Type}</p>
            <p>Color: {sneaker.Color}</p>
            <p>Size: {sneaker.Size}</p>
            <p>Price: {sneaker.Price}</p>
            <p>Sneaker URL: {sneaker.SneakerURL}</p>
            <p>Availability: {sneaker.Availability}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SneakerProfile;
