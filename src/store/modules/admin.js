const admin = {
  state: {
    admin:{
      admin1: '123456',
      admin2: '123456'
    }
  },

  //监听state对象的值的最新状态（计算属性）
  getters: {
    getAdmin(state) {
      return state.admin;
    }
  },
};

export default admin;
