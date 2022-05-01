<template>
  <div>
    <resource-select :options="options" :value="value_option" />
    <div>
      <el-table :data="labels" style="width: 100%" max-height="250">
        <el-table-column fixed prop="name" label="标签名字" width="200" />
        <el-table-column prop="es" label="是否插入es">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.es">
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>
        <el-table-column prop="redis" label="是否插入redis">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.es">
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
            </el-radio-group>
          </template>
        </el-table-column>

        <el-table-column prop="sql" label="是否插入sql">
          <template slot-scope="scope">
            <el-radio-group v-model="scope.row.es">
              <el-radio-button label="是"></el-radio-button>
              <el-radio-button label="否"></el-radio-button>
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
      labels: [{ name: "car", es: "是", redis: "是", sql: "否" }],
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
