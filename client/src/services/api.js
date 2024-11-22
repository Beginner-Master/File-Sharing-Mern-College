// import axios from 'axios';

// const API_URL = 'http://localhost:8000';

// export const uploadFile = async (data) => {
//     try {
//         let response = await axios.post(`${API_URL}/upload`, data);
//         return response.data;
//     } catch (error) {
//         console.error('Error while calling the api', error.message);
//     }
// }


import axios from 'axios';

// Replace localhost with your machine's local network IP address
const API_URL = 'http://localhost:8000'; // Replace with your laptop's local IP address

export const uploadFile = async (data) => {
    try {
        let response = await axios.post(`${API_URL}/upload`, data, {
            headers: {
                'Content-Type': 'multipart/form-data', // Important for file uploads
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error while calling the API', error.message);
    }
};
