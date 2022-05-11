<template>
  <div>
    <el-row  style="margin-bottom: 10px;">
      <el-col :span="6">特型卡名称：</el-col>
      <el-col :span="12">
    <resource-select
      :options="options"
      @changeValue="changeValue"
      :get_options="get_options"
      :value="value_option"
    />
      </el-col>
    </el-row>
    <div>
      <el-table :data="labels" style="width: 100%" height="500">
        <el-table-column fixed prop="name" label="标签名字" width="200" />
        <el-table-column prop="es" label="是否插入es">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.es">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="redis" label="是否插入redis">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.redis">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>

        <el-table-column prop="sql" label="是否插入sql">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.sql">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="pic" label="是否是图片">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.pic">
              <el-radio-button :label="true">是</el-radio-button>
              <el-radio-button :label="false">否</el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>

        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index)">Delete</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <template>
        <el-button type="primary" @click="dialogLabelVisible = true">增加标签</el-button>
        <el-button type="primary" @click="dialogResourceVisible = true">增加特性卡片</el-button>
        <el-button type="danger" @click="submitChange">提交更改</el-button>
      </template>
    </div>
    <el-dialog title="增加标签" :visible.sync="dialogLabelVisible">
      <el-form :model="formLabel">
        <el-form-item label="标签名字">
          <el-input v-model="formLabel.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否插入es">
          <el-radio-group v-model="formLabel.es">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否插入redis">
          <el-radio-group v-model="formLabel.redis">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否插入sql">
          <el-radio-group v-model="formLabel.sql">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="是否是图片">
          <el-radio-group v-model="formLabel.pic">
            <el-radio :label="true">是</el-radio>
            <el-radio :label="false">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLabelVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialogLabel">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="增加特型卡片" :visible.sync="dialogResourceVisible">
      特型卡片名字：
      <el-input v-model="newResourceName" autocomplete="off" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResourceVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialogResource">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import resourceSelect from "../components/resourceSelect.vue";
import request_json from "../utils/communication";
export default {
  name: "WScopy",
  components: {
    resourceSelect,
  },
  data() {
    return {
      options: [],
      value_option: "",
      labels: [],
      dialogLabelVisible: false,
      dialogResourceVisible: false,
      //formLabel用于新增label
      formLabel: {
        name: "",
        es: true,
        redis: true,
        sql: true,
        pic: true,
      },
      newResourceName: "",
    };
  },
  methods: {
    get_options(bool) {
      if (bool) {
        request_json.GET(this.set_options, '/category');
        console.log("aaa");
      } else {
        //do: set msg and url
        var params = {
          resource: this.value_option,
        };
        request_json.GET_WITH_PARAMS(this.set_labels, '/setting', params);

      }
    },
    set_options(val) {
      this.options = val.data;
    },
    changeValue(value) {
      this.value_option = value;
    },
    set_labels(val) {
      this.labels = [];
      var items = val.data.write_setting;
      for (var i in items) {
        this.labels.push({
          name: i,
          es: items[i].dump_invert_idx,
          redis: items[i].dump_digest,
          sql: items[i].dump_dict,
          pic: items[i].is_picture,
        });
      }
    }, //do: convert val to list items
    handleDelete(index) {
      this.labels.splice(index, 1);
    },
    resetFormLabel() {
      this.formLabel = {
        name: "",
        es: true,
        redis: true,
        sql: true,
        pic: true,
      };
    },
    submitDialogLabel() {
      this.dialogLabelVisible = false;
      this.labels.push(this.formLabel);
      this.resetFormLabel();
    },
    submitDialogResource() {
      this.dialogResourceVisible = false;
      this.options.push(this.newResourceName);
      this.value_option = this.newResourceName;
      this.labels = [];
      this.newResourceName = "";
    },
    submitChange() {
      //构造json
      this.$confirm('确认修改'+this.value_option+"的写入描述文件？", '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
      var dict = {};
      for (var i in this.labels) {
        dict[this.labels[i].name] = {
          dump_dict: this.labels[i].sql,
          dump_digest: this.labels[i].redis,
          dump_invert_idx: this.labels[i].es,
          is_picture: this.labels[i].pic,
        };
      }
      var setting_file = {
        resource: this.value_option,
        write_setting: dict,
      };
      var formData = new FormData();
      formData.append("resource", this.value_option);
      formData.append("data", JSON.stringify(setting_file));
      request_json.POST_File(this.submit_check, formData, "/setting");
      this.value_option = '';
      this.labels = [];
        }).catch(() => {
        });
    },
    submit_check(bool) {
      if (bool) {
        this.$message({message: "更改成功！", type: "success"});
      } else {
        this.$message({message: "更改失败！", type: "error"});
      }
    },
  },
};
</script>

<style>
.foot {
  margin-top: 20px;
}
</style>
