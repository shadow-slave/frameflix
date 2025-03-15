document.addEventListener("DOMContentLoaded", () => {
  const movies = [
    {
      title: "Inception",
      genre: "sci-fi",
      poster: "images/inception.jpg",
      description:
        "Inception is a mind-bending science fiction thriller directed by Christopher Nolan. The film follows Dom Cobb, a skilled thief who specializes in stealing secrets from within the subconscious during the dream state. Cobb is offered a chance to have his criminal record erased if he can successfully plant an idea in a target's mind, a process known as 'inception.' As Cobb and his team delve deeper into the layers of dreams, they face increasingly complex challenges and must confront Cobb's own haunting past.",
      trailer: "https://www.youtube.com/embed/YoHD9XEInc0",
      rating: "8.8",
      year: "2010",
    },
    {
      title: "The Dark Knight",
      genre: "action",
      poster: "images/darknight.jpeg",
      description:
        "The Dark Knight, directed by Christopher Nolan, is the second installment in the Batman trilogy. The film follows Batman as he faces his greatest challenge yet: the Joker, a chaotic and anarchic criminal mastermind who seeks to plunge Gotham City into chaos. With the help of Lieutenant Jim Gordon and District Attorney Harvey Dent, Batman struggles to stop the Joker's reign of terror. The film explores themes of justice, morality, and the fine line between heroism and vigilantism.",
      trailer: "https://www.youtube.com/embed/EXeTwQWrcwY",
      rating: "9.0",
      year: "2008",
    },
    {
      title: "Interstellar",
      genre: "sci-fi",
      poster: "images/interstellar.jpeg",
      description:
        "Interstellar, directed by Christopher Nolan, is an epic science fiction film set in a future where Earth is becoming uninhabitable due to environmental collapse. A group of astronauts, led by former NASA pilot Cooper, embarks on a journey through a newly discovered wormhole near Saturn to find a new home for humanity. As they travel across galaxies, they must confront the vastness of space, the relativity of time, and the enduring power of love. The film combines stunning visuals with a deeply emotional narrative.",
      trailer: "https://www.youtube.com/embed/zSWdZVtXT7E",
      rating: "8.6",
      year: "2014",
    },
    {
      title: "Superbad",
      genre: "comedy",
      poster: "images/superbad.jpg",
      description:
        "Superbad is a raucous comedy directed by Greg Mottola and produced by Judd Apatow. The film follows two high school seniors, Seth and Evan, who are determined to have one last wild night before graduation. Their plan to buy alcohol for a party leads to a series of hilarious misadventures, including encounters with eccentric cops, fake IDs, and awkward romantic pursuits. The film is a coming-of-age story that captures the chaos and humor of teenage life.",
      trailer: "https://www.youtube.com/embed/4eaZ_48ZYog",
      rating: "7.6",
      year: "2007",
    },
    {
      title: "Avengers: Endgame",
      genre: "action",
      poster: "images/avengers.jpg",
      description:
        "Avengers: Endgame, directed by Anthony and Joe Russo, is the epic conclusion to the Marvel Cinematic Universe's Infinity Saga. After the devastating events of Avengers: Infinity War, the remaining Avengers must come together to undo Thanos' catastrophic snap, which wiped out half of all life in the universe. The film features a time-traveling mission, emotional reunions, and an ultimate showdown with Thanos. Endgame is a celebration of over a decade of Marvel films, delivering action, heart, and closure to beloved characters.",
      trailer: "https://www.youtube.com/embed/TcMBFSGVi1c",
      rating: "8.4",
      year: "2019",
    },
  ];

  const movieContainer = document.getElementById("movies");
  const searchInput = document.getElementById("search");
  const filterButtons = document.querySelectorAll(".filter");

  function displayMovies(filteredMovies) {
    movieContainer.innerHTML = "";
    filteredMovies.forEach((movie, index) => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `
        <div class="movie-card">
          <img src="${movie.poster}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>${movie.year} | ⭐ ${movie.rating}</p>
        </div>
      `;
      movieElement.addEventListener("click", () => navigateToDetails(movie));
      movieContainer.appendChild(movieElement);

      gsap.from(movieElement, {
        opacity: 0,
        y: 10,
        duration: 0.5,
        delay: 0.2 + index * 0.1,
      });
    });
  }

  function navigateToDetails(movie) {
    localStorage.setItem("selectedMovie", JSON.stringify(movie));
    window.location.href = "movie-details.html";
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const genre = button.getAttribute("data-genre");
      const filteredMovies =
        genre === "all"
          ? movies
          : movies.filter((movie) => movie.genre === genre);
      displayMovies(filteredMovies);
    });
  });

  searchInput.addEventListener("input", () => {
    const query = searchInput.value.toLowerCase();
    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(query)
    );
    displayMovies(filteredMovies);
  });

  displayMovies(movies);
});
