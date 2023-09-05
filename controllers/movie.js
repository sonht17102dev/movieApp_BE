const movie = require("../models/Movie");
const pagingHelper = require("../utils/paging");
const getTrending = (req, res) => {
  const page = parseInt(req.query.page);
  const data = movie
    .all()
    .sort(
      (firstMovie, secondMovie) =>
        secondMovie.popularity - firstMovie.popularity
    );
  page ? res.json(pagingHelper(page, data)) : res.json(pagingHelper(1, data));
};
const getTopRate = (req, res) => {
  const page = parseInt(req.query.page);
  const data = movie
    .all()
    .sort(
      (firstMovie, secondMovie) =>
        secondMovie.vote_average - firstMovie.vote_average
    );

  page ? res.json(pagingHelper(page, data)) : res.json(pagingHelper(1, data));
};
const getDiscover = (req, res) => {
  const page = parseInt(req.query.page);
  const genreIdParam = parseInt(req.query.genre);

  const data = movie
    .all()
    .filter((movie) => movie.genre_ids.find((id) => id === genreIdParam));
  const genreName = movie
    .getGenreListFromData()
    .find((genre) => genre.id === genreIdParam);
  const results = {};
  const startIndex = (page - 1) * 20;
  const endIndex = page * 20;
  if (page && genreIdParam) {
    results.results = data.slice(startIndex, endIndex);
    results.page = page;
    results.total_pages = Math.round(data.length / 20);
    results.genre_name = genreName.name;
    res.json(results);
  } else if (!genreIdParam) {
    res.status(400).json({ message: "Not found gerne param" });
  } else if (!genreName) {
    res.status(400).json({ message: "Not found that gerne id" });
  } else {
    results.results = data.slice(0, 20);
    results.page = 1;
    results.total_pages = Math.round(data.length / 20);
    results.genre_name = genreName.name;
    res.json(results);
  }
};

const getVideo = (req, res) => {
  if (!req.query.hasOwnProperty("film_id")) {
    // Nếu không có param hoặc param ko phải số
    // -> message : "Not found film_id param"
    res.status(400).json({ message: "Not found film_id param" });
    return;
  }

  const idParam = parseInt(req.query.film_id);
  try {
    if (idParam && !isNaN(idParam)) {
      const dataVideo = movie
        .getVideoListFromData()
        .sort((publishedFirst, publishedSecond) => {
          publishedSecond - publishedFirst;
        })
        .filter((video) => video.id === idParam);

      let videoFindById = dataVideo[0].videos.find(
        (rule) =>
          (rule.official === true &&
            rule.site === "YouTube" &&
            rule.type === "Trailer") ||
          (rule.official === true &&
            rule.site === "YouTube" &&
            rule.type === "Teaser")
      );
      if (videoFindById) {
        res.json(videoFindById);
      } else {
        res.status(404).json({ message: "Not found video" });
      }
    } else {
      // Nếu không có param hoặc param ko phải số
      // -> message : "Not found film_id param"
      res.status(400).json({ message: "Not found film_id param" });
    }
  } catch (e) {
    // Xử lý lỗi nếu param film_id không nằm trong danh sách videoList
    res.status(400).json({ message: "Not found film_id param" });
  }
};
const getSearch = (req, res) => {
  if (!req.query.hasOwnProperty("keyword")) {
    // Nếu không có param hoặc param ko phải số
    // -> message : "Not found film_id param"
    res.status(400).json({ message: "Not found keyword param" });
    return;
  } else {
    const keyword = req.query.keyword.toLowerCase().trim();
    console.log(keyword);
    console.log(movie.all()[0].title);
    const page = parseInt(req.query.page);
    const data = movie
      .all()
      .filter((item) => item.overview.toLowerCase().indexOf(keyword) !== -1);
    res.json(pagingHelper(page, data));
  }
};
module.exports = {
  getTrending,
  getTopRate,
  getDiscover,
  getVideo,
  getSearch,
};
