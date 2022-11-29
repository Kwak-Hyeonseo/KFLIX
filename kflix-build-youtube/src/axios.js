import axios from 'axios'

const instance = axios.creat({
    baseURL: "https://api.themoviedb.org/3",
});

export default instance;