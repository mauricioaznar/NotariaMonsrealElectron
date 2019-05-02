<template>
    <div>
        <mau-form-input-select-static
                v-model="selected"
                :availableObjects="options"
                :initialObject="initialSelected"
                :displayProperty="'text'"
                :name="name"
                :label="label"
                :error="error"

        ></mau-form-input-select-static>
    </div>
</template>

<script>
  import MauFormInputSelectStatic from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelectStatic'
  export default {
    name: 'MauFormInputTripleBoolean',
    data () {
      return {
        selected: null,
        initialSelected: null,
        options: [
          { value: 1, text: 'Completado' },
          { value: 0, text: 'Incompleto' },
          { value: -1, text: 'No aplica' }
        ]
      }
    },
    $_veeValidate: {
      name () {
        return this.name
      },
      value () {
        return this.value
      }
    },
    props: {
      initialValue: {
        type: Number,
        required: true
      },
      name: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      error: {
        type: String,
        required: true
      }
    },
    created () {
      this.initialSelected = this.options.find(optionObj => { return optionObj.value === this.initialValue }) || this.options[2]
    },
    components: {
      MauFormInputSelectStatic
    },
    watch: {
      selected: function () {
        this.$emit('input', this.selected.value)
      }
    }
  }
</script>
