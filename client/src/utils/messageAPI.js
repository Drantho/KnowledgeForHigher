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

    getThreads: (userID) => {
        return axios.get(`${url}/api/thread/?=$${userID}`);
    },

    getThreadMessages: (threadID) => {

    },

    sendMessage: (threadID) => {

    }
}