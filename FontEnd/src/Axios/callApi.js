import axios from 'axios'

export default  function callApi(url,method = 'GET',data){
    return axios({
        method:method,
        url:url,
        data:data
    })
}



