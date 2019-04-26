<template>
  <div class="container">
    <mau-crud-create
      :entityType="groupEntityType"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback"
    >
      <template slot-scope="params">
        <group-form :saveFunction="params.save"></group-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import GroupForm from '../components/GroupForm.vue'
  import PropertiesReference from '../PropertiesReference'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateGroup',
    data () {
      return {
        groupEntityType: EntityTypes.GROUP,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name
      }
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
