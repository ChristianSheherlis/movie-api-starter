import { genres } from "./Genres";
import { DOMSelectors } from "./DOM";

const key = "f704efb92e04f3cc013b7eb337280371";
const query = ` https://api.themoviedb.org/3/discover/movie?api_key=${key}&language=en-US&sort_by=vote_average.desc&include_adult=false&include_video=false&page=1&vote_count.gte=10000&vote_average.gte=8`;

const init = async function () {
  try {
    const response = await fetch(query);
    const data = await response.json();
    data.results.forEach((movie) => {
      let genre_ids = [];
      genres.map((el) => (genre_ids[el.id] = el.name));
      DOMSelectors.grid.insertAdjacentHTML(
        "beforeend",
        `<div class="movie-card">
      <div class="movie-card-front">
        <img
          src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
          alt=""
          class="poster"
        />
      </div>
      <div class="movie-card-back">
        <h3 class="movie-card-header">${movie.original_title}</h3>
        <div class="score-box">
          <p class="user-score">Community Score</p>
          <p class="user-score">${movie.vote_average}</p>
        </div>

        <div class="release-box">
          <p class="release-date">Released</p>
          <p class="release-date">${movie.release_date}</p>
        </div>

        <div class="movie-genres">
          <div>${movie.genre_ids.map((id) => genre_ids[id])}</div>
        </div>
      </div>
    </div>`
      );
    });
  } catch (error) {
    console.log(error);
  }
};
init();
