import axios from 'axios';

export const apiClient = axios.create({
    baseURL: 'https://gamesrating-production.up.railway.app/api',
});
