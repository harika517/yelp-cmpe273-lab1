//Function that takes in the token, if the token is there then its gonna add it to the headers
//if not its gonna delete from the headers
import axios from 'axios';

const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common['x-auth-token'] = token;
    } else {
        delete axios.defaults.headers.common['x-auth-token'];
    }
};

export default setAuthToken;