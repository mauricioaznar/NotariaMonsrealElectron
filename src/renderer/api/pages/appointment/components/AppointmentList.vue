<template>
  <div>
    <mau-data-table :apiUrl="apiUrl"
                    :tableFields="tableFields"
                    :editFunction="canEdit ? editFunction : null"
                    :viewFunction="viewFunction"
    ></mau-data-table>
  </div>
</template>

<script>
  // import {mapState} from 'vuex'
  import PropertiesReference from '../PropertiesReference'
  import TableFields from '../TableFields'
  export default {
    name: 'AppointmentList',
    data () {
      return {
        tableFields: TableFields
      }
    },
    computed: {
    },
    props: {
      apiUrl: {
        type: String,
        required: true
      },
      canEdit: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    components: {
    },
    created () {
    },
    methods: {
      viewFunction: function (entity) {
        this.$router.push({
          name: 'ViewAppointment',
          params: { id: entity[PropertiesReference.ID.name] }})
      },
      editFunction: function (entity) {
        this.$router.push(
          {name: 'EditAppointment',
            params: { id: entity[PropertiesReference.ID.name] }})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
