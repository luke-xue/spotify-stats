var express = require("express");
var router = express.Router();
var fetch = require("node-fetch");
const db = require("./firebase");

const {
  getDocs,
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} = require("firebase/firestore");

const client_id = "fe69a3c9692249358020d4a7cabd0df4";
const client_secret = "d3f7397926fa4b1592abf9046355b052";
const redirect_uri = "http://localhost:3000";
const scope = "user-top-read user-library-read"; //<- needs to be updated based on what you want to dogit
let access_token = null;

router.get("/", async (req, res, next) => {
  try {
    const url =
      "https://accounts.spotify.com/authorize?client_id=" +
      client_id +
      "&response_type=code&redirect_uri=" +
      redirect_uri +
      "&scope=" +
      scope;
    res.status(200).json({ url: url });
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/messages", async (req, res, next) => {
  await setDoc(doc(db, "profile", req.query.id, "messengers", req.query.user, "messages", "messageHistory"), {
    created: true
  });
  const messages = [];
  const docs = await getDocs(collection(db, "profile", req.query.id, "messengers", req.query.user, "messages"));
  docs.forEach((message) =>
    messages.push({ ...message.data() })
  );
  res.json({ result: messages });
});

router.get("/messengers", async (req, res, next) => {
  const messages = [];
  const docs = await getDocs(collection(db, "profile", req.query.id, "messengers"));
  docs.forEach((message) => {
    messages.push({ id: message.id })
});
  res.json({ result: messages });
});

router.post("/message", async (req, res, next) => {
  await addDoc(collection(db, "profile", req.query.from, "messengers", req.query.to, "messages"), {
    content: req.body.content,
    user: req.query.from
  });
  await addDoc(collection(db, "profile", req.query.to, "messengers", req.query.from, "messages"), {
    content: req.body.content,
    user: req.query.from
  });
});

router.get("/callback", async (req, res, next) => {
  try {
    const code = req.query.code;
    const url =
      "https://accounts.spotify.com/api/token?grant_type=authorization_code&code=" +
      code +
      "&redirect_uri=" +
      redirect_uri;
    const headers = {
      Authorization:
        "Basic " +
        Buffer.from(client_id + ":" + client_secret, "utf8").toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    };
    fetch(url, { method: "post", headers: headers })
      .catch((err) => console.log(err))
      .then((res) => res.json())
      .then((data) => {
        obj = {
          token: data.access_token,
        };
        access_token = data.access_token;
        return obj;
      })
      .then((obj) => res.json(obj));
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/userCreation", async (req, res, next) => {
  await setDoc(doc(db, "profile", req.body.name), {name: req.body.name});
  const docs = await getDocs(collection(db, "profile"));
  docs.forEach((messenger) => {
    setDoc(doc(db, "profile", req.body.name, "messengers", messenger.id), {
      created: true
    })
  });
  const url = "https://api.spotify.com/v1/me/tracks?offset=0&limit=10";
  await fetch(url, {
    headers: {
      Authorization: "Bearer " + req.query.token,
    },
  })
    .catch((err) => console.log(err))
    .then((res) => res.json())
    .then((data) =>
      data.items.map((val, key) => {
        setDoc(
          doc(db, "profile", req.body.name, "likedSongs", val.track.name),
          {
            title: val.track.name,
            cover: val.track.album.images[0].url,
            artist: val.track.artists[0].name,
          }
        );
      })
    );
  const topurl =
    "https://api.spotify.com/v1/me/top/tracks?offset=0&limit=10&time_range=long_term";
  await fetch(topurl, {
    headers: {
      Authorization: "Bearer " + req.query.token,
    },
  })
    .catch((err) => console.log(err))
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.items.map((val, key) => {
        setDoc(doc(db, "profile", req.body.name, "topSongs", val.name), {
          title: val.name,
          cover: val.album.images[0].url,
          artist: val.artists[0].name,
        });
      });
    });

  const artisturl =
    "https://api.spotify.com/v1/me/top/artists?offset=0&limit=10&time_range=long_term";
  await fetch(artisturl, {
    headers: {
      Authorization: "Bearer " + req.query.token,
    },
  })
    .catch((err) => console.log(err))
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.items.map((val, key) => {
        setDoc(doc(db, "profile", req.body.name, "topArtists", val.name), {
          name: val.name,
          cover: val.images[0].url,
        });
      });
    });
  return res.json({ message: "It works" });
});

router.get("/user", async (req, res, next) => {
  try {
    const url = "https://api.spotify.com/v1/me";
    const data = await fetch(url, {
      headers: {
        Authorization: "Bearer " + req.query.temp,
      },
    })
      .catch((err) => console.log(err))
      .then((res) => res.json())
      .then((data) => data);
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

module.exports = router;
