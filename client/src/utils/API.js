import axios from "axios";

const url = "http://localhost:3001";

export default {
    
  getQuestionById: id => {
    console.log(`${url}/api/question?id=${id}`);
    return axios.get(`${url}/api/question?id=${id}`);
  },
  getQuestionByUser: id => {
    console.log(`${url}/api/question?user=${id}`);
    return axios.get(`${url}/api/question?user=${id}`);
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
  createQuestion: (data, token) => {
    console.log(`${url}/api/question`);
    return axios.post(`${url}/api/question`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    });
  },
  createTag: (data, token) => {
    console.log((`${url}/api/tag/`));
    console.log(data);
    return axios.post(`${url}/api/tag/`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })
  },
  linkTagToQuestion: (data, token) => {
    console.log((`${url}/api/tag/question/`));
    console.log(data);
    return axios.put(`${url}/api/tag/question/`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })
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
  createService: (data, token) => {
    console.log((`${url}/api/service/`));
    console.log(data);
    return axios.post(`${url}/api/service/`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })      
  },
  linkServiceToTag: (data, token) => {
    console.log((`${url}/api/tag/service/`));
    console.log(data);
    return axios.put(`${url}/api/tag/service/`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })
  },
  getUserById: id => {
    console.log((`${url}/api/user?id=${id}`));
    return axios.get(`${url}/api/user?id=${id}`)
  },
  signIn: data => {
    console.log((`${url}/api/user/signin`));
    console.log(data);
    return axios.post(`${url}/api/user/signin`, data)
  },
  signUp: data => {
    console.log((`${url}/api/user/signup`));
    console.log(data);
    return axios.post(`${url}/api/user/signup`, data)
  },
  authenticate: token => {
    console.log((`${url}/api/user/authenticate`));
    return axios.get(`${url}/api/user/authenticate`,{
      headers:{
          authorization: `Bearer: ${token}`
      }
  })
  }
};
