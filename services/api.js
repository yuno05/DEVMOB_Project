import axios from 'axios';

// API Key from critical configuration
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZjMzNDRiMTkzMDI3NTY4MTkzMDQyYmI1MjRhYTg0MiIsIm5iZiI6MTczOTM0NzM3MC4wNDYwMDAyLCJzdWIiOiI2N2FjNTVhYTIxZDBhOTJkNGI5Yjk2M2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.yS6WPYjGcaxHkfsYrqmijak7A_NVuEawsL_mYKFdjEc';

const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
    },
});

export const getTrendingMovies = async () => {
    try {
        const response = await api.get('/trending/movie/day?language=en-US');
        return response.data.results;
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        return [];
    }
};

export const getPopularMovies = async () => {
    try {
        const response = await api.get('/movie/popular?language=en-US&page=1');
        return response.data.results;
    } catch (error) {
        console.error('Error fetching popular movies:', error);
        return [];
    }
};

export const getTopRatedMovies = async () => {
    try {
        const response = await api.get('/movie/top_rated?language=en-US&page=1');
        return response.data.results;
    } catch (error) {
        console.error('Error fetching top rated movies:', error);
        return [];
    }
};

export const getUpcomingMovies = async () => {
    try {
        const response = await api.get('/movie/upcoming?language=en-US&page=1');
        return response.data.results;
    } catch (error) {
        console.error('Error fetching upcoming movies:', error);
        return [];
    }
};

export const getTVShows = async (category) => {
    // category: 'airing_today', 'on_the_air', 'popular', 'top_rated'
    try {
        const response = await api.get(`/tv/${category}?language=en-US&page=1`);
        return response.data.results;
    } catch (error) {
        console.error(`Error fetching TV shows (${category}):`, error);
        return [];
    }
};

export const getDetails = async (type, id) => {
    try {
        // type: 'movie' or 'tv'
        const response = await api.get(`/${type}/${id}?prepend_to_response=credits,similar,videos`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching details for ${type}/${id}:`, error);
        return null;
    }
};

export const searchContent = async (query) => {
    try {
        const response = await api.get(`/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`);
        return response.data.results;
    } catch (error) {
        console.error('Error searching content:', error);
        return [];
    }
};

export default api;
