<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityApiName="entityApiName"
      :entityAction="EntityActions.GET_USERS"
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
  import UserForm from './components/UserForm.vue'
  import EntityActions from 'src/api/store/entityActions'
  import RouteObjectHelper from 'src/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'src/api/EntityTypes'
  import ChildTypes from 'src/api/ChildTypes'
  export default {
    name: 'EditUser',
    data () {
      return {
        EntityActions: EntityActions,
        entityApiName: EntityTypes.USER.apiName,
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
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.USER, ChildTypes.LIST)})
      }
    }
  }
</script>
