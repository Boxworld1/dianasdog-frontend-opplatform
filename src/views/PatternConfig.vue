<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="配置目标" prop="target">
        <el-select v-model="form.target" placeholder="请选择配置目标">
          <el-option label="目标一" value="car"></el-option>
          <el-option label="目标二" value="poem"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="模版文件">
        <el-input type="textarea" v-model="form.pattern"></el-input>
      </el-form-item>
      <el-form-item>
        <el-upload
        class="upload-demo"
        :file-list="fileList"
        :http-request="uploadFile">
        <el-button size="small" type="primary" :disabled="uploadDisable">点击上传</el-button>
        </el-upload>
        <el-button type="primary" @click="onSubmit('form')">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import request_json from '../utils/communication'
export default {
  name: "PatternConfig",
  data() {
    return {
      form: {
        target: "",
        pattern: "",
      },
      rules: {
        target: [{ required: true, message: "目标不能为空", trigger: "blur" }],
      },
      uploadDisable:true,
      fileList:[]
    };
  },
  methods: {
    upload_succ(bool) {
      return bool;
    },
    uploadFile(item) {
      let formData = new FormData();
      formData.append('file', item.file);
      formData.append('resource', this.form.pattern);
      request_json.POST_File(this.upload_succ, formData, '/pattern');
    },
    check_post(bool) {
            if (bool) {
        alert("查询成功！");
      } else {
        alert("查询失败！");
      }
    },
    onSubmit(form) {
      //todo:与后端通信，提交文件
      this.$refs[form].validate((valid) => {
        if (valid) {
          let formData = new FormData();
          formData.append('resource', this.form.target)
          formData.append('data', this.form.pattern)
          console.log("hello")
          request_json.POST_File(this.check_post, formData, '/pattern')
          console.log("hellll"                         )
          this.form.target = "";
          this.form.pattern = "";
        } else {
          this.$message({
            message: "请输入配置目标",
            type: "warning",
          });
          return false;
        }
      });
    },
  },
  watch:{
    "form.target": {
      handler(target) {
        if (target === "") {
          this.uploadDisable = true;
        } else {
          this.uploadDisable = false;
        }
      }
    }
  }
};
</script>

<style>
</style>
