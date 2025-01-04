import client from './client';

const endpoint = '/lessons/1';

const getLessons = (a) => { client.get(endpoint)
  .then(response => {
     console.log(response.data, response.ok)
  })
};

const getGrammarActivityText = async (setGrammarText) => { client.get(endpoint+'/grammarActivity')
    .then(response => {
        console.log(response.data);
        setGrammarText(response.data);
    });
};

// const getGrammarActivityText = () => { client.get(endpoint+'/grammarActivity');
//     // .then(response => {
//     //     setGrammarText(response.data);
//     // });
// };

export default {
    getLessons,
    getGrammarActivityText,
};