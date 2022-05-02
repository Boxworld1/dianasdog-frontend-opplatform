<template>
  <div>
    <resource-select :options="options" :value="value_option" :get_options="get_options"/>
    <div>
      <el-table :data="labels" style="width: 100%" max-height="250">
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

        <el-table-column label="操作" align="right">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <template>
        <el-button type="primary" @click="dialogLabelVisible = true"
          >增加标签</el-button
        >
        <el-button type="primary" @click="dialogResourceVisible = true"
          >增加特性卡片</el-button
        >
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
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogLabelVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialogLabel">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog title="增加特性卡片" :visible.sync="dialogResourceVisible">
      特性卡片名字：
      <el-input v-model="newResourceName" autocomplete="off" />
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogResourceVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitDialogResource"
          >确 定</el-button
        >
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
      labels: [{ name: "car", es: true, redis: true, sql: false }],
      dialogLabelVisible: false,
      dialogResourceVisible: false,
      //formLabel用于新增label
      formLabel: {
        name: "",
        es: true,
        redis: true,
        sql: true,
      },
      newResourceName: "",
    };
  },
  methods: {
    get_options(bool) {
      if (bool) {
        var url = "/category";
        request_json.GET(this.set_options, url);
        console.log("aaa");
      }
    },
    set_options(val) {
      this.options = val.data;
    },

    set_labels(val) {
      var items = JSON.parse(val)["data"]["write_setting"];
      console.log(items);
    }, //todo: convert val to list items
    handleDelete(index) {
      this.labels.splice(index, 1);
    },
    resetFormLabel() {
      this.formLabel = {
        name: "",
        es: true,
        redis: true,
        sql: true,
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
      //todo: send this resource and labels to backend
    },
  },
  watch: {
    value_option: {
      handler(value) {
        if (value == this.newResourceName) {
          return;
        }
        //do: set msg and url
        url = "/setting";
        params = {
          resource: value,
        };
        request_json.GET_WITH_PARAMS(this.set_labels, url, params);
      },
    },
  },
};
</script>

<style>
.foot {
  margin-top: 20px;
}
</style>
