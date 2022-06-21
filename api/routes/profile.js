const express = require("express");
const router = express.Router();
const db = require("./firebase");
var dotenv = require("dotenv").config();

const {
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
} = require("firebase/firestore");

let posts = [];

router.get("/info", async (req, res, next) => {
  const allDocData = [];
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const docs = await getDocs(collection(db, "profile"));
  docs.forEach((doc) => {
    const object = doc.data();
    allDocData.push(object);
  });
  res.json({ result: allDocData });
});

router.get("/likedSongs/:username", async (req, res, next) => {
  const allDocData = [];
  console.log(req.params.username)
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const docs = await getDocs(collection(db, "profile", req.params.username, "likedSongs"));
  docs.forEach((doc) => {
    if (allDocData.length < 5) {
    const object = doc.data();
    allDocData.push(object);
    }
  });
  return res.json({ result: allDocData });
});

router.get("/topSongs/:username", async (req, res, next) => {
  const allDocData = [];
  console.log(req.params.username)
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const docs = await getDocs(collection(db, "profile", req.params.username, "topSongs"));
  docs.forEach((doc) => {
    if (allDocData.length < 5) {
    const object = doc.data();
    allDocData.push(object);
    }
  });
  return res.json({ result: allDocData });
});

router.get("/topArtists/:username", async (req, res, next) => {
  const allDocData = [];
  console.log(req.params.username)
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const docs = await getDocs(collection(db, "profile", req.params.username, "topArtists"));
  docs.forEach((doc) => {
    if (allDocData.length < 5) {
    const object = doc.data();
    allDocData.push(object);
    }
  });
  return res.json({ result: allDocData });
});

router.get("/userInfo/:username", async (req, res, next) => {
  const allDocData = [];
  // console.log(req.query)  // shows the URL params (stuff after the ? in the URL)
  const docs = await getDocs(collection(db, "profile", req.params.username));
  docs.forEach((doc) => {
    const object = doc.data();
    allDocData.push(object);
  });
  res.json({ result: allDocData });
});

module.exports = router;
