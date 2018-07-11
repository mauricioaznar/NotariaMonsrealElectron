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
    name: 'UserList',
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
          return true
        }
      }
    },
    methods: {
      viewFunction: function (client) {
        this.$router.push({
          name: 'ViewUser',
          params: { id: client[PropertiesReference.ID.name] }})
      },
      editFunction: function (client) {
        this.$router.push(
          {name: 'EditUser',
            params: { id: client[PropertiesReference.ID.name] }})
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>
