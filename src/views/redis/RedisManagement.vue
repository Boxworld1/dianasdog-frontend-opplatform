<template>
  <div>
    {{ content }}
  </div>
</template>

<script>
// import request_json from "../../utils/communication";
export default {
  name: "RedisManagement",
  props:{
    content:{
      type:String,
      defaule: () => "redis数据管理"
    }
  },
  beforeRouteEnter(to, from, next) {
    console.log("进入数据管理页面");
    // next(() => {
    //   request_json.GET((val) => {
    //     this.content = val;
    //   });
    // });
    next();
  },
  beforeRouteLeave(to, from, next) {
    // ...
    next();
  },
  methods: {
    //   getData: function() {
    //     this.axios({
    //       method: 'get',
    //       url: '/data.json',//todo
    //     }).then(function(repos) {
    //       console.log(repos);
    //     }).catch(function(error) {
    //       console.log(error);
    //     });
    //   }
  },
};
</script>

<style>
</style>
