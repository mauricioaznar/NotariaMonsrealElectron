<template>
  <div class="container">
    <mau-crud-create
      :entityName="'Document'"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
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
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateDocument',
    data () {
      return {
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name,
        relatedEntitiesRoutes: {
          [PropertiesReference.OPERATIONS.entityName]: ApiRoutes.documentOperation,
          [PropertiesReference.DOCUMENT_ATTACHMENTS.entityName]: ApiRoutes.documentAttachment,
          [PropertiesReference.GROUPS.entityName]: ApiRoutes.documentGroup,
          [PropertiesReference.USERS.entityName]: ApiRoutes.documentUser,
          [PropertiesReference.GRANTORS.entityName]: ApiRoutes.documentGrantor,
          [PropertiesReference.COMMENTS.entityName]: ApiRoutes.documentComment
        }
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
