import client from './client';

const endpoint = '/db';

const postUser = (user) => {client.post(endpoint, user)
  .then(response => {
    console.log(response);
  });
};

const getUser = (userId) => { client.get(endpoint + '/' + userId)
  .then(response => {
     console.log(response.data);
     return response.data;
  })
};

export default {
    postUser,
    getUser
};
