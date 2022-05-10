import axios from 'axios'

axios.defaults.withCredentials = true

//todo:后端接口 与 数据格式 对接
const request_json = {
  GET: (get_function, url) => {
    axios.get(url)
      .then((res) => {
        get_function(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  GET_WITH_PARAMS: (get_function, url, params) => {
    axios.get(url, { params: params })
      .then((res) => {
        get_function(res.data)
      })
      .catch(function (error) {
        console.log(error)
      })
  },
  POST: async (post_function, new_message, url) => {
    await axios.post(url, JSON.stringify(new_message))
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          post_function(true)
        }
      })
      .catch(function (error) {
        post_function(false)
        console.log(error)
      })
  },
  POST_Userlevel: (post_function, new_message) => {
    console.log(new_message)
    axios.post('/login', JSON.stringify(new_message))
      .then((res) => {
        console.log(res)
        if (res.status === 201 || res.status === 200) {
          let level = res.data.level
          console.log(level)
          post_function(level)
        }
      })
      .catch(function (error) {
        post_function(false)
        console.log(error)
      })
  },
  POST_User: async (post_function, new_message) => {
    await axios.post('/login', JSON.stringify(new_message))
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          let pass = res.data.password
          post_function(pass)
        }
      })
      .catch(function (error) {
        post_function(false)
        console.log(error)
      })
  },
  POST_File: (post_function, new_message, url) => {
    let config = {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    }
    console.log(new_message)
    axios.post(url, new_message, config)
      .then((res) => {
        if (res.status === 201 || res.status === 200) {
          post_function(true)
        }
      })
      .catch(function (error) {
        post_function(false)
        console.log(error)
      })
  }
}

export default request_json
