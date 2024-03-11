const express = require("express");
const getRouter = express.Router();
const postRouter = express.Router();
const patchRouter = express.Router();
const deleteRouter = express.Router();
const Senaker = require("./../models/senakers.model.js");
const updateAndPostJoi = require("../validator.js");
const bcrypt = require("bcrypt")
const User = require("./../models/user.model.js");
const jwt = require('jsonwebtoken');

getRouter.get("/get", async (req, res) => {
  try {
    const senaker = await Senaker.find();

    res.status(200).json(senaker);
  } catch (error) {
    console.log(error);

    return res.status(500).send({
      error: "Something went wrong",
    });
  }
});

postRouter.post("/post", async (req, res) => {
  try {
    console.log(req.body);
    const { error, value } = updateAndPostJoi(req.body);
    if (error) {
      return res.status(400).json(error.details);
    } else {
      const {
        SneakerID,
        Brand,
        Model,
        Type,
        Color,
        Size,
        Price,
        Availability,
        CreatedBy,
      } = req.body;
      const newsenaker = await Senaker.create({
        SneakerID,
        Brand,
        Model,
        Type,
        Color,
        Size,
        Price,
        Availability,
        CreatedBy,
      });
      res.status(200).json(newsenaker);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send({
      error: "Something went wrong",
    });
  }
});

patchRouter.patch("/patch/:SneakerID", async (req, res) => {
  try {
    const { error, value } = updateAndPostJoi(req.body);
    if (error) {
      return res.status(400).json(error.details);
    } else {
      const { SneakerID } = req.params;
      const deletedFields = req.body;

      const deletedSneaker = await Senaker.findOneAndUpdate(
        { SneakerID: SneakerID },
        deletedFields,
        { new: true }
      );

      if (!deletedSneaker) {
        return res.status(404).json({ error: "Sneaker not found" });
      }

      res.status(200).json(deletedSneaker);
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

deleteRouter.delete("/delete/:SneakerID", async (req, res) => {
  try {
    const { SneakerID } = req.params;
    const deletedFields = req.body;

    const deletedSneaker = await Senaker.findOneAndDelete(
      { SneakerID: SneakerID },
      deletedFields,
      { new: true }
    );

    if (!deletedSneaker) {
      return res.status(404).json({ error: "Sneaker not found" });
    }

    res.status(200).json(deletedSneaker);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Something went wrong" });
  }
});

//Login

postRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;
  console.log("user", username, password)

  try {
      const user = await User.findOne({ username });
      if (!user) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }
      const isPasswordValid =  bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
          return res.status(401).json({ error: 'Invalid username or password' });
      }
      const token = jwt.sign({ username: user.username }, process.env.ACCESS_TOKEN);
      res.cookie('token', token, { httpOnly: true });
      console.log("token", token, user.username)
      res.json({ token, username: user.username });
  } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Something went wrong' });
  }
});

getRouter.get("/logout", (req, res)=>{
  res.clearCookie('token');
  res.send('Logout successful');
});


module.exports = { getRouter, postRouter, patchRouter, deleteRouter };
