type Fetch = {fetchTrending: string, fetchNetflixOriginals: string, fetchTopRated: string, fetchActionMovies: string, fetchComedyMovies: string, fetchHorrorMovies: string, fetchRomanceMovies: string, fetchDocumentaries: string}

// Typically we would store in {process.env.API_KEY}
const API_KEY: string = "662e6b633afa2b84779ac71bdaa40947";

const requests: Fetch = {
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
    fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

export default requests;