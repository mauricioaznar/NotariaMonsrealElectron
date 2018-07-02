<template>
  <div class="container">
    <mau-crud-create
      :entityApiName="entityApiName"
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
  import GrantorForm from './components/GrantorForm.vue'
  import EntityActions from 'src/api/store/entityActions'
  import RouteObjectHelper from 'src/services/routeObject/RouteObjectHelper'
  import EntityTypes from 'src/api/EntityTypes'
  import ChildTypes from 'src/api/ChildTypes'
  export default {
    name: 'CreateGrantor',
    data () {
      return {
        EntityActions: EntityActions,
        entityApiName: EntityTypes.GRANTOR.apiName
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
          this.$router.push({path: RouteObjectHelper.createPath(EntityTypes.GRANTOR, ChildTypes.LIST)})
        }
      }
    }
  }
</script>
