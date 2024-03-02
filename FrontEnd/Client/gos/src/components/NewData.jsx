import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./../App.css";

export default function NewData() {
  const [SneakerID, setSneakerID] = useState("");
  const [Brand, setBrand] = useState("");
  const [Model, setModel] = useState("");
  const [Type, setType] = useState("");
  const [Color, setColor] = useState("");
  const [Size, setSize] = useState("");
  const [Price, setPrice] = useState("");
  const [SneakerURL, setSneakerURL] = useState("");
  const [Availability, setAvailability] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("https://gallery-of-senakers.onrender.com/post", {
        SneakerID,
        Brand,
        Model,
        Type,
        Color,
        Size,
        Price,
        SneakerURL,
        Availability,
      })
      .then((res) => {
        console.log(res);
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="form-container">
      <h2>NewData</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="Brand">Brand:</label>
          <input
            type="text"
            id="Brand"
            name="Brand"
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Model">Model:</label>
          <input
            type="text"
            id="Model"
            name="Model"
            onChange={(e) => setModel(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Type">Type:</label>
          <input
            type="text"
            id="Type"
            name="Type"
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Color">Color:</label>
          <input
            type="text"
            id="Color"
            name="Color"
            onChange={(e) => setColor(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Size">Size:</label>
          <input
            type="text"
            id="Size"
            name="Size"
            onChange={(e) => setSize(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Price">Price:</label>
          <input
            type="text"
            id="Price"
            name="Price"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="SneakerURL">Sneaker URL:</label>
          <input
            type="text"
            id="SneakerURL"
            name="SneakerURL"
            onChange={(e) => setSneakerURL(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="Availability">Availability:</label>
          <input
            type="text"
            id="Availability"
            name="Availability"
            onChange={(e) => setAvailability(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="SneakerID">Sneaker ID:</label>
          <input
            type="text"
            id="SneakerID"
            name="SneakerID"
            onChange={(e) => setSneakerID(e.target.value)}
          />
        </div>

        <div className="form-group">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}
