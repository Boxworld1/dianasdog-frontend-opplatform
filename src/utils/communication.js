// import axios from 'axios'

// axios.defaults.withCredentials = true
// //todo:后端接口 与 数据格式 对接
// const request_json = {
//   GET: (get_function) => {
//     axios.get('/api/message')
//       .then((res) => {
//         get_function(res.data.data)
//       })
//       .catch(function (error) {
//         console.log(error)
//       })
//   },
//   POST: (post_function, new_message) => {
//     axios.post('/api/message', JSON.stringify(new_message))
//       .then((res) => {
//         if (res.data.code === 201 || res.data.code === 200) {
//           post_function(true)
//         }
//         else {
//           post_function(false)
//         }
//       })
//       .catch(function (error) {
//         console.log(error)
//       })
//   }
// }

// export default request_json
