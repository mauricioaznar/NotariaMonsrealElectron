<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityApiName="entityApiName"
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
  import GrantorForm from './components/GrantorForm.vue'
  import EntityActions from 'renderer/api/store/entityActions'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditGrantor',
    data () {
      return {
        EntityActions: EntityActions,
        entityApiName: EntityTypes.GRANTOR.apiName,
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
        this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.GRANTOR, ChildTypes.LIST)})
      }
    }
  }
</script>
