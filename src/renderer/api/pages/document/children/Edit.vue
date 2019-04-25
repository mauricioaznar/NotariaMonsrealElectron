<template>
  <div class="container">
    <mau-entity-petitioner
      :entityType="documentEntityType"
      :id="id"
      @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-crud-edit
      v-if="entity"
      :id="id"
      :entityType="documentEntityType"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
    >
      <template slot-scope="params">
        <document-editor-tabs
          :initialObject="entity"
          :saveFunction="params.saveFunction">
        </document-editor-tabs>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import DocumentEditorTabs from '../components/DocumentEditorTabs.vue'
  import PropertiesReference from '../PropertiesReference'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-crud/MauEntityPetitioner'
  export default {
    name: 'EditDocument',
    data () {
      return {
        documentEntityType: EntityTypes.DOCUMENT,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name,
        entity: null
      }
    },
    props: {
      id: null
    },
    components: {
      DocumentEditorTabs,
      MauEntityPetitioner
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.DOCUMENT, ChildTypes.HISTORY)})
      },
      entityResultHandler: function (entityObj) {
        this.entity = entityObj
      }
    }
  }
</script>
