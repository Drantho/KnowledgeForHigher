import axios from "axios";

const url = "http://localhost:3001";

export default {
    createThread: (data, token) => {
        return axios.post(`${url}/api/thread`, data, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        });
    },

    getThreads: (token) => {
        return axios.get(`${url}/api/thread/`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        });
    },

    getThreadMessages: (threadID, token) => {
        return axios.get(`${url}/api/message/?thread=${threadID}`, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        });
    },

    sendMessage: (threadID, data, token) => {
        return axios.post(`${url}/api/message`, data, {
            headers: {
                authorization: `Bearer: ${token}`
            }
        })
    }
}