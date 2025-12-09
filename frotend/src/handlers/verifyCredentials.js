import axios from 'axios';
export const verifyCredentials = async (email,password) => {
    await axios.post('/api/login',{email,password})
    .then( response => {return {credentials: response.data.credentials, data: response.data} })
    .catch(error => {
        if (error.response) {
            return {credentials: false, error: error.response.data.error};
        } else {
            return {credentials: false, error: 'Network or server error'};
        }
})
    return {credentials: false, error: 'Unexpected error'};
}