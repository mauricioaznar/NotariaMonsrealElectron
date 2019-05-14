<template>
  <div class="filter-bar">
    <div class="form-group form-row">
      <mau-form-input-select-static
              :displayProperty="'text'"
              :name="'filterBarSelect'"
              :availableObjects="options"
              :trackBy="'value'"
              v-model="selectedOption"
              class="col-sm-12 col-md-4"
      >
      </mau-form-input-select-static>
      <mau-form-input-text
                    v-model="filteredText"
                    type="text"
                    @keyup.enter.native="doFilter"
                    class="col-sm-12 col-md-7"
                    placeholder="Buscar..."
                    :name="'inputText'"
                    :error="''"
                    :initialValue="''"
      >
      </mau-form-input-text>
      <div class="col-md-1 col-sm-12">
        <button class="btn-submit btn btn-primary" @click="doFilter">Buscar</button>
      </div>
    </div>
    <div class="form-group">

    </div>
  </div>
</template>

<script>
  export default {
    name: 'FilterBar',
    data () {
      return {
        filteredText: '',
        options: [],
        selectedOption: '',
        initialObject: {},
        relationshipTableFields: ''
      }
    },
    props: {
      tableFields: {
        type: Array,
        required: true
      }
    },
    components: {
    },
    created () {
      this.getTableFieldOptions(this.tableFields)
    },
    methods: {
      getTableFieldOptions: function (tableFields) {
        let options = []
        let tableFieldsLength = tableFields.length
        for (let i = 0; i < tableFieldsLength; i++) {
          let option = {}
          let tableFieldObj = tableFields[i]
          option.value = tableFieldObj.name
          option.text = tableFieldObj.title
          if (tableFieldObj.default) {
            this.selectedOption = option.value
          }
          if (!tableFieldObj.hidden) {
            options.push(option)
          }
        }
        this.options = options
      },
      doFilter () {
        let filterParams = {
          'filter': this.selectedOption,
          'filter_value': this.filteredText
        }
        this.$emit('filter', filterParams)
      }
    },
    watch: {
    }
  }
</script>

<style lang="scss" scoped>
</style>
