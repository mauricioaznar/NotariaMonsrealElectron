<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityName="'Grantor'"
      :entityAction="EntityActions.GET_GRANTORS"
      :callback="callback">
      <template slot-scope="params">
        <grantor-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </grantor-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import GrantorForm from '../components/GrantorForm.vue'
  import EntityActions from 'renderer/api/store/entityActions'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditGrantor',
    data () {
      return {
        EntityActions: EntityActions,
        client: null
      }
    },
    props: {
      id: null
    },
    components: {
      GrantorForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.GRANTOR, ChildTypes.LIST)})
      }
    }
  }
</script>
