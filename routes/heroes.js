const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken")
const SECRET_KEY = "12345678"

const Hero = require("../models/hero");

router.get("/", async (req, res) => {
  try {
    let heros = await Hero.find();
    res.send(heros);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.get("/:heroId", async (req, res) => {
  let requestedHero = await Hero.findById(req.params.heroId);
  //let requestedHero = await Hero.find({ _id: /req.params.heroId });

  if (!requestedHero) {
    return res.status(404).send("Requested Id does not exist on our server");
  }

  return res.status(200).send(requestedHero);
});

router.post("/", async (req, res) => {

  // check oke in reques header and see if the token is valid or not 
  
  const token = req.header("x-jwt-token")

  if (!token){
    return res.status(401).send("Access denied!");
  }

  try {
    jwt.verify(token,SECRET_KEY);
  }catch (e){
    return res.status(400).send("Invalied  token!");
  }



  if (!req.body.name) {
    return res.status(400).send("Please check request again!");
  }

  try {
    let heroToAdd = new Hero({
      name: req.body.name,
      birthname: req.body.birthname,
      superPowers: req.body.superPowers,
      movies: req.body.movies,
      likeCount: req.body.likeCount,
      deceased: req.body.deceased,
      imgUrl: req.body.imgUrl
    });

    heroToAdd = await heroToAdd.save();
    res.send(heroToAdd);
  } catch (ex) {
    return res.status(500).send(ex.message);
  }
});

router.put("/:heroId", async (req, res) => {
  if (!req.body.likeCount) {
    return res.status(400).send("Request does not contain all values");
  }
  // First call findById to find the object from the db
  // Then updte it'
  let heroToEdit = await Hero.findById(req.params.heroId);

  if (!heroToEdit) {
    return res.status(404).send("Given Id does not exist");
  }

  heroToEdit.set({ likeCount: req.body.likeCount });
  heroToEdit = await heroToEdit.save();

  res.send(heroToEdit);
});

router.delete("/:heroId", async (req, res) => {
  let hero = await Hero.findOneAndDelete({ _id: req.params.heroId });
  if (!hero) return res.status(404).send("Does not exist");

  res.send(hero);
});

module.exports = router;