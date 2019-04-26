<template>
  <div class="container">
    <mau-crud-create
      :entityType="userEntityType"
      :callback="callback"
    >
      <template slot-scope="params">
        <user-form :saveFunction="params.save"></user-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import UserForm from '../components/UserForm.vue'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateUser',
    data () {
      return {
        userEntityType: EntityTypes.USER
      }
    },
    components: {
      UserForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.USER, ChildTypes.LIST)})
      }
    }
  }
</script>
