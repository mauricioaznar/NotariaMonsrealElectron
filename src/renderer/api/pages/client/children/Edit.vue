<template>
  <div class="container">
    <mau-entity-petitioner
      :id="id"
      :entityType="clientEntityType"
      @entityResult="entityResultHandler"
    >

    </mau-entity-petitioner>
    <mau-crud-edit
      v-if="client"
      :id="id"
      :entityType="clientEntityType"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
    >
      <template slot-scope="params">
        <client-form
          :initialObject="client"
          :saveFunction="params.saveFunction">
        </client-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import ClientForm from '../components/ClientForm.vue'
  import PropertiesReference from '../PropertiesReference'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-crud/MauEntityPetitioner'
  export default {
    name: 'EditClient',
    data () {
      return {
        client: null,
        clientEntityType: EntityTypes.CLIENT,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name
      }
    },
    props: {
      id: null
    },
    components: {
      ClientForm,
      MauEntityPetitioner
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.CLIENT, ChildTypes.LIST)})
      },
      entityResultHandler: function (entityObj) {
        this.client = entityObj
      }
    }
  }
</script>
