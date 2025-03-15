document.addEventListener("DOMContentLoaded", () => {
  const movieContainer = document.getElementById("movies");
  const searchInput = document.getElementById("search");
  const filterButtons = document.querySelectorAll(".filter");

  const API_KEY = "YOUR_API_KEY_PLACEHOLDER"; // Placeholder for the API key

  const BASE_URL = "https://api.themoviedb.org/3";
  const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500"; // Movie poster base URL

  let movies = [];
  let genreMap = {};
  console.log("Hello from script.js");

  // Fetch genres and store them in a map
  async function fetchGenres() {
    try {
      const response = await fetch(
        `${BASE_URL}/genre/movie/list?api_key=${API_KEY}`
      );
      const data = await response.json();
      genreMap = data.genres.reduce((map, genre) => {
        map[genre.id] = genre.name;
        return map;
      }, {});
    } catch (error) {
      console.error("Error fetching genres:", error);
    }
  }

  // Fetch popular movies from TMDB API
  async function fetchPopularMovies() {
    try {
      await fetchGenres(); // Ensure genres are loaded first
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}`
      );
      const data = await response.json();
      const movieResults = data.results;

      const moviesWithDetails = await Promise.all(
        movieResults.map(async (movie) => {
          const trailerUrl = await fetchMovieTrailer(movie.id);
          return {
            title: movie.title,
            genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
            poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
            description: movie.overview,
            trailer: trailerUrl,
            rating: movie.vote_average.toFixed(1),
            year: movie.release_date.split("-")[0],
          };
        })
      );

      movies = moviesWithDetails;
      displayMovies(movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  // Fetch the actual movie trailer link from TMDB
  async function fetchMovieTrailer(movieId) {
    try {
      const response = await fetch(
        `${BASE_URL}/movie/${movieId}/videos?api_key=${API_KEY}`
      );
      const data = await response.json();
      const trailers = data.results.filter(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      );
      return trailers.length > 0
        ? `https://www.youtube.com/embed/${trailers[0].key}?autoplay=1&mute=1`
        : "";
    } catch (error) {
      console.error("Error fetching trailer:", error);
      return "";
    }
  }

  // Fetch top-rated movies from TMDB API
  async function fetchTopRatedMovies() {
    try {
      await fetchGenres(); // Ensure genres are loaded first
      const response = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`
      );
      const data = await response.json();
      const movieResults = data.results;

      const moviesWithDetails = await Promise.all(
        movieResults.map(async (movie) => {
          const trailerUrl = await fetchMovieTrailer(movie.id);
          return {
            title: movie.title,
            genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
            poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
            description: movie.overview,
            trailer: trailerUrl,
            rating: movie.vote_average.toFixed(1),
            year: movie.release_date.split("-")[0],
          };
        })
      );

      movies = moviesWithDetails;
      displayMovies(movies);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  }

  //fetch trending movies from TMDB API
  async function fetchTrendingMovies() {
    try {
      await fetchGenres(); // Ensure genres are loaded first

      const response = await fetch(
        `${BASE_URL}/trending/movie/day?api_key=${API_KEY}`
      );
      const data = await response.json();
      const movieResults = data.results;

      const moviesWithDetails = await Promise.all(
        movieResults.map(async (movie) => {
          const trailerUrl = await fetchMovieTrailer(movie.id);
          return {
            title: movie.title,
            genres: movie.genre_ids.map((id) => genreMap[id] || "Unknown"),
            poster: `${IMAGE_BASE_URL}${movie.poster_path}`,
            description: movie.overview,
            trailer: trailerUrl,
            rating: movie.vote_average.toFixed(1),
            year: movie.release_date.split("-")[0],
          };
        })
      );

      movies = moviesWithDetails;
      displayMovies(movies);
    } catch (error) {
      console.error("Error fetching Trending movies:", error);
    }
  }

  // Display movies on the page
  function displayMovies(filteredMovies) {
    movieContainer.innerHTML = "";
    if (filteredMovies.length === 0) {
      movieContainer.innerHTML = `<p class="no-movies">No movies found.</p>`;
      return;
    }
    filteredMovies.forEach((movie, index) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
          <div class="movie-card">
            <img src="${movie.poster}" alt="${movie.title}" />
            <h3>${movie.title}</h3>
            <p>${movie.year} | ⭐ ${movie.rating}</p>
            <p class="genres">${movie.genres.join(", ")}</p>
          </div>
        `;
      movieElement.addEventListener("click", () => navigateToDetails(movie));
      movieContainer.appendChild(movieElement);

      // Animation using GSAP
      gsap.from(movieElement, {
        opacity: 0,
        y: 30,
        duration: 0.5,
        delay: 0.2 + index * 0.1,
      });
    });
  }

  // Navigate to the movie details page
  function navigateToDetails(movie) {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    window.location.href = "movie-details.html";
  }

  // Display top-rated movies on click
  document
    .getElementById("toprated-link")
    .addEventListener("click", (event) => {
      event.preventDefault(); // Prevent default link behavior
      fetchTopRatedMovies();
    });

  // Display trending movies on click
  trendingLink = document.getElementById("trending-link");
  trendingLink.addEventListener("click", (event) => {
    event.preventDefault();
    fetchTrendingMovies();
  });

  // Filter movies by genre
  genreselect = document.getElementById("genre-select");
  genreselect.addEventListener("change", () => {
    const genre = genreselect.value.toLowerCase(); // Convert to lowercase
    const filteredMovies =
      genre === "all"
        ? movies
        : movies.filter((movie) =>
            movie.genres.some((g) => g.toLowerCase() === genre)
          ); // Case-insensitive comparison
    displayMovies(filteredMovies);
  });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const genre = button.getAttribute("data-genre").toLowerCase(); // Convert to lowercase
      const filteredMovies =
        genre === "all"
          ? movies
          : movies.filter((movie) =>
              movie.genres.some((g) => g.toLowerCase() === genre)
            ); // Case-insensitive comparison
      displayMovies(filteredMovies);
    });
  });

  // Search movies by title
  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
    displayMovies(filteredMovies);
  });

  // Fetch movies on page load
  fetchPopularMovies();
});
