<template>
  <div class="container">
    <mau-entity-petitioner
      :entityType="userEntityType"
      :id="id"
      @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-crud-edit
      v-if="user"
      :entityType="userEntityType"
      :id="id"
      :callback="callback">
      <template slot-scope="params">
        <user-form
          :initialObject="user"
          :saveFunction="params.saveFunction">
        </user-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import UserForm from '../components/UserForm.vue'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-crud/MauEntityPetitioner'
  export default {
    name: 'EditUser',
    data () {
      return {
        user: null,
        userEntityType: EntityTypes.USER
      }
    },
    props: {
      id: null
    },
    components: {
      UserForm,
      MauEntityPetitioner
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.USER, ChildTypes.LIST)})
      },
      entityResultHandler: function (entityObj) {
        this.user = entityObj
      }
    }
  }
</script>
