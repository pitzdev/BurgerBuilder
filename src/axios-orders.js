import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://my-burger-36992.firebaseio.com/'
});

export default instance;