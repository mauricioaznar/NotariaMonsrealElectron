<template>
  <div class="container">
    <mau-crud-create
      :entityType="documentEntityType"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
    >
      <template slot-scope="params">
        <document-editor-tabs :saveFunction="params.save"></document-editor-tabs>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import DocumentEditorTabs from '../components/DocumentEditorTabs.vue'
  import PropertiesReference from '../PropertiesReference'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateDocument',
    data () {
      return {
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name,
        documentEntityType: EntityTypes.DOCUMENT
      }
    },
    components: {
      DocumentEditorTabs
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.DOCUMENT, ChildTypes.HISTORY)})
      }
    }
  }
</script>
