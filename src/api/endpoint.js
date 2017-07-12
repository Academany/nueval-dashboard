
export default {

  get(vm, resource, callback) {
    let token = localStorage.getItem("token");
    if (!token) {
      return callback("Can't find token", null);
    }
    // console.log('found token ' + token)
    vm.$http.get('/api' + resource + '?access_token=' + token).then((response) => {
      // console.log(response);
      callback(null, response);
    }, (response) => {
      // console.log(response);
      callback("Error");
    })
  },

}
