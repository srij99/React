import axios from 'axios'
const server = process.env.REACT_APP_API_URL
export const fetchData = async () => {
    return await axios({
      method:'get',
      url: server + '/posts',
      params: {
        _limit: 10
      }
    })
  }

export  const deleteData = async (id) => {
    return await axios({
      method:'delete',
      url: server+'/posts/'+id,
    })
  }

 export const addData = async () => {

    return await axios({
      method:'post',
      url: server+'/posts/',
      data:{
        "userId": 1,
        "id": 101,
        "title": "Test",
        "body": "Nothing"
      }
    })
  }