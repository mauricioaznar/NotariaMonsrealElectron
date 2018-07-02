<template>
  <div>
    <mau-entity-view-row
      v-for="(value, key) in filteredProperties"
      :key="key"
      :label="value.title"
      :value="value.display(entity[value.name])">
    </mau-entity-view-row>
  </div>
</template>

<script>
  import MauEntityViewRow from './MauEntityViewRow.vue'
  import cloneDeep from 'clone-deep'

  export default {
    name: 'MauEntityView',
    data () {
      return {

      }
    },
    props: {
      entity: {
        type: Object,
        required: true
      },
      propertiesReference: {
        type: Array,
        required: true
      },
      hiddenPropertiesReference: {
        type: Array,
        default: function () {
          return []
        }
      }
    },
    computed: {
      filteredProperties: function () {
        let properties = cloneDeep(this.propertiesReference)
        this.hiddenPropertiesReference.forEach(hiddenPropertiesObj => {
          for (let key in properties) {
            if (properties.hasOwnProperty(key)) {
              if (JSON.stringify(properties[key]) === JSON.stringify(hiddenPropertiesObj)) {
                delete properties[key]
              }
            }
          }
        })
        return properties
      }
    },
    components: {
      MauEntityViewRow
    },
    methods: {

    },
    created () {

    }
  }
</script>

<style lang="scss">

</style>
