<template>
  <div class="container">
    <mau-crud-create
      :entityName="'Grantor'"
      :entityAction="EntityActions.GET_GRANTORS"
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
  import EntityActions from 'renderer/api/store/entityActions'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateGrantor',
    data () {
      return {
        EntityActions: EntityActions
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
