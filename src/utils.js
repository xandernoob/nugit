import axios from 'axios';

export const fetchUser = async () => {
    try {
        return await axios.get(`https://api.github.com/search/users?q=a`)
    } catch (e) {
        return [];
    }
}