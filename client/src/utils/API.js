import axios from "axios";

const url = "http://localhost:3001";

export default {
    
  getQuestionById: id => {
    console.log(`${url}/api/question?id=${id}`);
    return axios.get(`${url}/api/question?id=${id}`);
  },
  getQuestionByUser: id => {
    console.log(`${url}/api/question?userId=${id}`);
    return axios.get(`${url}/api/question?userId=${id}`);
  },
  getQuestionsByTagName: tagName => {
    console.log(`${url}/api/question?tag=${tagName}`);
    return axios.get(`${url}/api/question?tag=${tagName}`);
  },
  getQuestionsBySearch: search => {
    console.log(`${url}/api/question?search=${search}`);
    return axios.get(`${url}/api/question?search=${search}`);
  },
  getAllQuestions: () => {
    console.log(`${url}/api/question`);
    return axios.get(`${url}/api/question`);
  },
  createQuestion: data => {
    console.log(`${url}/api/question`);
    return axios.post(`${url}/api/question`, data);
  },
  createTag: data => {
    console.log((`${url}/api/tag/`));
    console.log(data);
    return axios.post(`${url}/api/tag/`, data)
  },
  linkTagToQuestion: data => {
    console.log((`${url}/api/tag/question/`));
    console.log(data);
    return axios.put(`${url}/api/tag/question/`, data)
  },
  getAllTags: () => {
    console.log((`${url}/api/tag/`));
    return axios.get(`${url}/api/tag/`)
  },
  getTagById: id => {
    console.log(`${url}/api/tag?id=${id}`);
    return axios.get(`${url}/api/tag?id=${id}`);
  },
  getTagBySearch: search => {
    console.log(`${url}/api/tag?search=${search}`);
    return axios.get(`${url}/api/tag?search=${search}`);
  },
  getServicesByUser: id =>{
    console.log((`${url}/api/service?user=${id}`));
    return axios.get(`${url}/api/service?user=${id}`)
  },
  getServiceById: id => {
    console.log((`${url}/api/service?id=${id}`));
    return axios.get(`${url}/api/service?id=${id}`)
  },
  createService: data => {
    console.log((`${url}/api/service/`));
    console.log(data);
    return axios.post(`${url}/api/service/`, data)
  },
  linkServiceToTag: data => {
    console.log((`${url}/api/tag/service/`));
    console.log(data);
    return axios.put(`${url}/api/tag/service/`, data)
  },
  getUserById: id => {
    console.log((`${url}/api/user?id=${id}`));
    return axios.get(`${url}/api/user?id=${id}`)
  },
  createAnswer: data => {
    console.log((`${url}/api/answer/`));
    console.log(data);
    return axios.post(`${url}/api/answer/`, data)
  },
  getAnswersByQuestion: id => {
    console.log((`${url}/api/answer?question=${id}`));
    return axios.get(`${url}/api/answer?question=${id}`)
  },
  getAnswersByUser: id => {
    console.log((`${url}/api/answer?user=${id}`));
    return axios.get(`${url}/api/answer?user=${id}`)
  }
};
