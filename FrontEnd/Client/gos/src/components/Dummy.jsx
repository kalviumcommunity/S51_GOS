import React from 'react';
import data from '../data.json';
import './../App.css'


function SneakerProfile() {
  return (
    <div className='dummy'>
      <h2>Sneaker Profiles</h2>
      {data.map((sneaker) => (
        <div key={sneaker.SneakerID}>
          <strong>SneakerID:</strong> {sneaker.SneakerID} <br />  
          <strong>Brand:</strong> {sneaker.Brand} <br />
          <strong>Model:</strong> {sneaker.Model} <br />
          <strong>Type:</strong> {sneaker.Type} <br />
          <strong>Color:</strong> {sneaker.Color} <br />
          <strong>Size:</strong> {sneaker.Size} <br />
          <strong>Price:</strong> {sneaker.Price} <br />
          <strong>SneakerURL:</strong> {sneaker.SneakerURL} <br />
          <strong>Availability:</strong> {sneaker.Availability} <br />
        </div>
      ))}
    </div>
  );
}

export default SneakerProfile;
