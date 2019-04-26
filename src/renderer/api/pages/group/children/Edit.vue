<template>
  <div class="container">
    <mau-entity-petitioner
      :id="id"
      :entityType="groupEntityType"
      @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-crud-edit
      v-if="group"
      :id="id"
      :entityType="groupEntityType"
      :relationshipIdName="hostRelationshipIdName"
      :callback="callback">
      <template slot-scope="params">
        <group-form
          :initialObject="group"
          :saveFunction="params.saveFunction">
        </group-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import GroupForm from '../components/GroupForm.vue'
  import PropertiesReference from '../PropertiesReference'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-crud/MauEntityPetitioner'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditGroup',
    data () {
      return {
        group: null,
        groupEntityType: EntityTypes.GROUP,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name
      }
    },
    props: {
      id: null
    },
    components: {
      GroupForm,
      MauEntityPetitioner
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.GROUP, ChildTypes.LIST)})
      },
      entityResultHandler: function (entityObj) {
        this.group = entityObj
      }
    }
  }
</script>
