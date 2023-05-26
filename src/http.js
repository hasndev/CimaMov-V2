import axios from "axios";
// Set config defaults when creating the instance
const api_token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjYwOGQzNjM4OTU1MmRmMWUzNzU3YWQxYmI5NDM1YyIsInN1YiI6IjY0NjY0NzQxYTUwNDZlMDE0NzRiY2RjOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cyuO_J2UjXn8kBP1E9GksynNa-rcMOjpUKS-UppNy7U";

const instance = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

// Alter defaults after instance has been created
instance.defaults.headers.common['Authorization'] = api_token;


export default instance;