<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityName="'User'"
      :entityAction="entityAction"
      :callback="callback">
      <template slot-scope="params">
        <user-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </user-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import UserForm from '../components/UserForm.vue'
  import EntityActions from 'renderer/api/store/entityActions'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditUser',
    data () {
      return {
        entityAction: EntityActions.GET_USERS,
        user: null
      }
    },
    props: {
      id: null
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
