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
  getQuestionsByTags: tags => {
    return axios.get(`${url}/api/question?tags=${tags}`);
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
  getPopularTags: () =>{
    console.log((`${url}/api/tag/popular`));
    return axios.get(`${url}/api/tag/popular`)
  },
  getTagById: id => {
    console.log(`${url}/api/tag?id=${id}`);
    return axios.get(`${url}/api/tag?id=${id}`);
  },
  getTagbyName: name => {
    return axios.get(`${url}/api/tag?name=${name}`);
  },
  getTagBySearch: search => {
    console.log(`${url}/api/tag?search=${search}`);
    return axios.get(`${url}/api/tag?search=${search}`);
  },
  getTagsByUser: id => {
    console.log(`${url}/api/tag?user=${id}`);
    return axios.get(`${url}/api/tag?user=${id}`);
  },
  getTagQuestionFeed: (tags) => {
    console.log((`${url}/api/question/feed`));
    return axios.get(`${url}/api/question/feed?tags=${tags}`);
  },
  getTagServiceFeed: (data, token) => {
    console.log((`${url}/api/service/uniqueServicesByTags`));
    console.log(data);
    return axios.post(`${url}/api/service/uniqueServicesByTags`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })  
  },
  linkTagToUser: (tag, token) => {
    console.log((`${url}/api/tag/user`));
    console.log(tag);
    return axios.put(`${url}/api/tag/user/${tag}`,{}, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })  
  },
  unLinkTagFromUser: (tag, token) => {
    return axios.delete(`${url}/api/tag/user/${tag}`, {
      headers: { authorization: `Bearer: ${token}` }
    })
  },
  getServicesByTag: id =>{
    console.log((`${url}/api/service?tag=${id}`));
    return axios.get(`${url}/api/service?tag=${id}`)
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
  getAllServiceComments: id => {
    console.log((`${url}/api/comment?service=${id}`));
    return axios.get(`${url}/api/comment?service=${id}`)
  },
  createServiceCommet: (data, token) => {
    console.log((`${url}/api/comment`));
    console.log(`data at API`, data);
    return axios.post(`${url}/api/comment`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })
  },
  getAllQuestionComments: id => {
    console.log((`${url}/api/comment?question=${id}`));
    return axios.get(`${url}/api/comment?question=${id}`)
  },
  createQuestionComment: (data, token) => {
    console.log((`${url}/api/comment`));
    console.log(data);
    return axios.post(`${url}/api/comment`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })
  },
  getCommentsByUser: id => {
    return axios.get(`${url}/api/comment?user=${id}`)
  },
  getAnswersByUser: id => {
    console.log((`${url}/api/answer?user=${id}`));
    return axios.get(`${url}/api/answer?user=${id}`)
  },
  getAnswersByQuestion: id => {
    console.log((`${url}/api/answer?question=${id}`));
    return axios.get(`${url}/api/answer?question=${id}`)
  },
  getAnswerById: id => {
    return axios.get(`${url}/api/answer?id=${id}`)
  },
  createAnswer: (data, token) => {
    console.log((`${url}/api/answer`));
    console.log(data);
    return axios.post(`${url}/api/answer`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })
  },
  getUserById: id => {
    console.log((`${url}/api/user?id=${id}`));
    return axios.get(`${url}/api/user/?id=${id}`)
  },
  updateUser: (data, token) => {
    console.log((`${url}/api/user`));
    console.log(data);
    return axios.put(`${url}/api/user`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })
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
  },
  createRating: (data, token) => {
    console.log((`${url}/api/rating`));
    console.log(data);
    return axios.post(`${url}/api/rating`, data, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })
  },
  getRating: (id, type) => {
    console.log((`${url}/api/rating?ref=${id}&type=${type}`));
    return axios.get(`${url}/api/rating?ref=${id}&type=${type}`)
  },
  getRatingsByUser: (id) => {
    return axios.get(`${url}/api/rating/all?user=${id}`)
  },
  uploadPhoto: (data, token) => {
    console.log((`${url}/api/user/portrait`));
    console.log(data);
    return axios.post(`${url}/api/user/portrait`, {data: data}, {
      headers:{
          authorization: `Bearer: ${token}`
      }
    })
  },
  getAnswerComments: (ref, token) => {
    return axios.get(`${url}/api/comment?answer=${ref}`, {
      headers: {
        authorization: `Bearer: ${token}`
      }
    });
  },
  createAnswerComment: (data, token) => {
    return axios.post(`${url}/api/comment`, data, {
      headers: {
        authorization: `Bearer: ${token}`
      }
    });
  },
  updateUserBio: (newBio, token) => {
    return axios.put(`${url}/api/user`, {bio: newBio}, {
      headers: {
        authorization: `Bearer: ${token}`
      }
    });
  },
  getActivityFeed: ( userID ) => {
    return axios.get(`${url}/api/user/feed?user=${userID}`);
  },
  getRelatedUsers: (tags, username) => {
    return axios.get(`${url}/api/user/related?username=${username}&tags=${tags}`)
  }
};
