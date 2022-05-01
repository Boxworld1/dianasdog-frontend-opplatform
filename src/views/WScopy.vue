<template>
  <div>
    <resource-select :options="options" :value="value_option" />
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
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
              >Edit</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
              >Delete</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="foot">
      <template>
        <el-button type="primary" @click="dialogLabelVisible = true">增加标签</el-button>
        <el-button type="primary" @click="dialogResourceVisible = true"
          >增加特性卡片</el-button
        >
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
        <el-button type="primary" @click="submitDialogLabel"
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="增加特性卡片" :visible.sync="dialogResourceVisible">

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
    };
  },
  methods: {
    set_labels(val) {}, //todo: convert val to list items
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    },
    resetFormLabel() {
      this.formLabel={
        name: "",
        es: true,
        redis: true,
        sql: true,
      }
    },
    submitDialogLabel() {
      this.dialogLabelVisible = false;
      this.labels.push(this.formLabel);
      this.resetFormLabel();
    },
    submitDialogResource() {
      this.dialogResourceVisible = true;
    },
  },
  watch: {
    value_option: {
      handler(value) {
        //todo: set mdg and url
        // request_json.POST(this.set_labels, msg, url);
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
