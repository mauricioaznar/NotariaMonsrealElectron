<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityName="'Group'"
      :entityAction="entityAction"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback">
      <template slot-scope="params">
        <group-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </group-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import GroupForm from '../components/GroupForm.vue'
  import PropertiesReference from '../PropertiesReference'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import EntityActions from 'renderer/api/store/entityActions'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditGroup',
    data () {
      return {
        relatedEntitiesRoutes: {[PropertiesReference.USERS.entityName]: ApiRoutes.userGroup},
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name,
        entityAction: EntityActions.GET_GROUPS
      }
    },
    props: {
      id: null
    },
    components: {
      GroupForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.GROUP, ChildTypes.LIST)})
      }
    }
  }
</script>
