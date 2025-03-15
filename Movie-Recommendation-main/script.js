document.getElementById('movie-form').addEventListener('submit', function(event) {
    event.preventDefault();  // Prevent the form from submitting

    const genre = document.getElementById('genre').value;
    const movieList = document.getElementById('movie-list');
    movieList.innerHTML = '';  // Clear the current list of recommendations

    let recommendations = [];

    const movieImages = {
        action: [
            { title: 'Mad Max: Fury Road', image: 'images/madmax.jpg' },
            { title: 'The Dark Knight', image: 'images/darkknight.jpg' },
            { title: 'Avengers: Endgame', image: 'images/avengers.jpg' },
            { title: 'Gladiator', image: 'images/gladiator.jpg' }
        ],
        comedy: [
            { title: 'Superbad', image: 'images/superbad.jpg' },
            { title: 'The Hangover', image: 'images/hangover.jpg' },
            { title: 'Dumb and Dumber', image: 'images/dumbdumber.jpg' },
            { title: 'Step Brothers', image: 'images/stepbrothers.jpg' }
        ],
        drama: [
            { title: 'The Shawshank Redemption', image: 'images/shawshank.jpg' },
            { title: 'Forrest Gump', image: 'images/forrestgump.jpg' },
            { title: 'The Pursuit of Happyness', image: 'images/pursuit.jpg' },
            { title: 'A Beautiful Mind', image: 'images/beautifulmind.jpg' }
        ],
        horror: [
            { title: 'The Conjuring', image: 'images/conjuring.jpg' },
            { title: 'Annabelle', image: 'images/Annabelle.jpg' },
            { title: 'A Quiet Place', image: 'images/aquietplace.jpg' },
            { title: 'Hereditary', image: 'images/hereditary.jpg' }
        ],
        romance: [
            { title: 'The Notebook', image: 'images/notebook.jpg' },
            { title: 'Titanic', image: 'images/titanic.jpg' },
            { title: 'Pride and Prejudice', image: 'images/pride.jpg' },
            { title: 'La La Land', image: 'images/lalaland.jpg' }
        ]
    };

    recommendations = movieImages[genre] || [];

    recommendations.forEach(function(movie) {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        
        const movieImage = document.createElement('img');
        movieImage.src = movie.image;
        movieImage.alt = movie.title;

        const movieTitle = document.createElement('h3');
        movieTitle.textContent = movie.title;

        movieItem.appendChild(movieImage);
        movieItem.appendChild(movieTitle);
        
        movieList.appendChild(movieItem);
    });
});
