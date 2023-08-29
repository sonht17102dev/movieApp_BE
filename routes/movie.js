const express = require("express");
const router = express.Router();
const movie = require("../controllers/movie");

router.get("/movies/trending", movie.getTrending);
router.get("/movies/top-rate", movie.getTopRate);
router.get("/movies/discover", movie.getDiscover);
router.get("/movies/video", movie.getVideo);

module.exports = router;
