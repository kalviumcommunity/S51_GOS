import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";



export default function UpdateData() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [SneakerID, setSneakerID] = useState("");
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  const [Type, setType] = useState("");
  const [Color, setColor] = useState("");
  const [Size, setSize] = useState("");
  const [Price, setPrice] = useState("");
  const [SneakerURL, setSneakerURL] = useState("");
  const [Availability, setAvailability] = useState("");
 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch(
        `https://gallery-of-senakers.onrender.com/patch/${id}`,
        {
          SneakerID: SneakerID,
          Brand: Brand,
          Model: Model,
          Type: Type,
          Color: Color,
          Size: Size,
          Price: Price,
          SneakerURL: SneakerURL,
          Availability: Availability,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        console.log("Updated Sneaker:", response.data);
        navigate("/");
      } else {
        console.error("Update failed:", response.data.error);
      }
    } catch (error) {
      console.error("Error updating sneaker:", error);
    }
  };
  return (
    <>
      
      <div className="form-container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Update Data</h2>

          <div className="div">
            <label htmlFor="SneakerID">Sneaker ID</label>
            <input
              type="text"
              id="SneakerID"
              name="SneakerID"
              value={SneakerID}
              onChange={(e) => setSneakerID(e.target.value)}
            />
          </div>
          <div className="div">
            <label htmlFor="Brand">Brand</label>
            <input
              type="text"
              id="Brand"
              name="Brand"
              value={Brand}
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>
          <div className="div">
            <label htmlFor="Model">Model</label>
            <input
              type="text"
              id="Model"
              name="Model"
              value={Model}
              onChange={(e) => setModel(e.target.value)}
            />
          </div>
          <div className="div">
            <label htmlFor="Type">Type</label>
            <input
              type="text"
              id="Type"
              name="Type"
              value={Type}
              onChange={(e) => setType(e.target.value)}
            />
          </div>
          <div className="div">
            <label htmlFor="Color">Color</label>
            <input
              type="text"
              id="Color"
              name="Color"
              value={Color}
              onChange={(e) => setColor(e.target.value)}
            />
          </div>
          <div className="div">
            <label htmlFor="Size">Size</label>
            <input
              type="text"
              id="Size"
              name="Size"
              value={Size}
              onChange={(e) => setSize(e.target.value)}
            />
          </div>
          <div className="div">
            <label htmlFor="Price">Price</label>
            <input
              type="text"
              id="Price"
              name="Price"
              value={Price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="div">
            <label htmlFor="SneakerURL">Sneaker URL</label>
            <input
              type="text"
              id="SneakerURL"
              name="SneakerURL"
              value={SneakerURL}
              onChange={(e) => setSneakerURL(e.target.value)}
            />
          </div>
          <div className="div">
            <label htmlFor="Availability">Availability</label>
            <input
              type="text"
              id="Availability"
              name="Availability"
              value={Availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </div>
          <input type="submit" className="submit" value="Submit" />
        </form>
      </div>
    </>
  );
}




