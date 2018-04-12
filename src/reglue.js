import axios from 'axios'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = 'http://127.0.0.1:8084/glue';
export function fetch(url, params,reback) {
  // axios.post(url, params)
  //   .then(response => {
  //     // console.log(response.data)
  //     //response.data.data
  //     alert(JSON.stringify(response.data));
  //     return response.data;
  //     // console.log(response.data)
  //   }).catch(error => {error.message}
  // )
  return new Promise((resolve, reject) => {
    axios.post(url, params)
      .then(response => {

        reback=response.data;
       // alert(JSON.stringify(reback));
         resolve(
            response.data);
      })
      .catch((error) => {
        reject(error);
      })
  })
}
export default {
  glueApi(url, params,reback) {
    return fetch(url, params,reback)
  }
}
