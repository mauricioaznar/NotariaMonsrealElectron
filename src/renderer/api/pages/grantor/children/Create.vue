<template>
  <div class="container">
    <mau-crud-create
      :entityType="grantorEntityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <grantor-form :saveFunction="params.save"></grantor-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import GrantorForm from '../components/GrantorForm.vue'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateGrantor',
    data () {
      return {
        grantorEntityType: EntityTypes.GRANTOR
      }
    },
    components: {
      GrantorForm
    },
    props: {
      onTheFly: {
        type: Function
      }
    },
    methods: {
      callback: function () {
        if (this.onTheFly) {
          this.onTheFly()
        } else {
          this.$router.push({path: createRouteObjectPath(EntityTypes.GRANTOR, ChildTypes.LIST)})
        }
      }
    }
  }
</script>
