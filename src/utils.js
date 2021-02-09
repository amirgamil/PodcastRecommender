import axios from 'axios';

const makeRequestCreator = () => {
  let token;

  return async (access_token, query) => {
    // Check if we made a request
    if(token){
      // Cancel the previous request before making a new request
      token.cancel()
    }
    // Create a new CancelToken
    token = axios.CancelToken.source()
    try {

      let myHeaders = new Headers();
      myHeaders.append('Authorization', `Bearer ${access_token}`);

      const res = await axios(query, {
        headers: {
          'Authorization': `Bearer ${access_token}`
        }
      }, {cancelToken: token.token})
      //add what to return specifically
      const result = res.data
      return result;
    } catch(error) {
        if(axios.isCancel(error)) {
          // Handle if request was cancelled
          console.log('Request canceled', error.message);
        } else {
          // Handle usual errors
          console.log('Something went wrong: ', error.message)
        }
    }
  }
}

export const search = makeRequestCreator()
