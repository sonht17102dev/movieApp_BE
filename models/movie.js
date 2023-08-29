const fs = require("fs");
const path = require("path");
const movieList = path.join(__dirname, "../data/movieList.json");
const genreList = path.join(__dirname, "../data/genreList.json");
const mediaTypeList = path.join(__dirname, "../data/mediaTypeList.json");
const userToken = path.join(__dirname, "../data/userToken.json");
const videoList = path.join(__dirname, "../data/videoList.json");
const readFileToArray = (array) => {
  return JSON.parse(fs.readFileSync(array, "utf8"));
};

class Movie {
  all() {
    return readFileToArray(movieList);
  }
  getGenreListFromData() {
    return readFileToArray(genreList);
  }
  getMediaTypeListFromData() {
    return readFileToArray(mediaTypeList);
  }
  getUserTokenFromData() {
    return readFileToArray(userToken);
  }
  getVideoListFromData() {
    return readFileToArray(videoList);
  }
  // getMoviesTrending() {
  //   const trending = readFileToArray(movieList).sort(
  //     (firstMovie, secondMovie) =>
  //       secondMovie.popularity - firstMovie.popularity
  //   );
  //   return trending;
  // }
  // getMoviesTopRate() {
  //   const topRate = readFileToArray(movieList).sort(
  //     (firstMovie, secondMovie) =>
  //       secondMovie.vote_average - firstMovie.vote_average
  //   );
  //   return topRate;
  // }
  // getMoviesDiscover() {
  //   const genre = readFileToArray(genreList);
  //   const discover = readFileToArray(movieList);
  //   return { discover, genre };
  // }
  // getMoviesDiscover() {
  //   const genre = readFileToArray(genreList);
  //   const discover = readFileToArray(movieList);
  //   return { discover, genre };
  // }
}

module.exports = new Movie();
