import axios from "axios";

export default {
    
  getQuestionById: (id) => {
    return axios.get(`/api/question?id=${id}`);
  },
  getQuestionByUser: (id) => {
    return axios.get(`/api/question?userId=${id}`);
  },
  getQuestionsByTagName: tagName => {
    return axios.get(`/api/question?tag=${tagName}`);
  },
  getQuestionsBySearch: search => {
    return axios.get(`/api/question?search=${search}`);
  },
  getAllQuestions: () => {
    return axios.get(`/api/question`);
  }
  
};
