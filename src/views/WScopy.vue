<template>
  <div>
    <resource-select :options="options" :value="value_option" />

  </div>
</template>

<script>
import resourceSelect from '../components/resourceSelect.vue'
export default {
  name: WriteSettingCopy,
  components: resourceSelect,
  data() {
    return {
      options: [],
      value_option: '',
      labels: [],
    }
  },
}
</script>
