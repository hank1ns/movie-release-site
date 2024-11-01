const apiKey = 'YOUR_TMDB_API_KEY';  // Replace with your TMDB API key
const baseUrl = 'https://api.themoviedb.org/3';
const moviesContainer = document.getElementById('movies');

async function fetchMovies() {
    try {
        const response = await fetch(`${baseUrl}/movie/now_playing?api_key=${apiKey}&region=US&language=en-US`);
        const data = await response.json();
        
        // Clear any existing content
        moviesContainer.innerHTML = '';
        
        data.results.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.className = 'bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300';
            
            const moviePoster = movie.poster_path 
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
                : 'https://via.placeholder.com/500x750?text=No+Image';
            
            movieCard.innerHTML = `
                <img src="${moviePoster}" alt="${movie.title}" class="w-full h-72 object-cover">
                <div class="p-4">
                    <h2 class="text-xl font-semibold">${movie.title}</h2>
                    <p class="text-sm text-gray-400">Release Date: ${movie.release_date}</p>
                    <p class="text-sm mt-2">${movie.overview.substring(0, 100)}...</p>
                </div>
            `;
            
            moviesContainer.appendChild(movieCard);
        });
        
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

// Load movies on page load
fetchMovies();