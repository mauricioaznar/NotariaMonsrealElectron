<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityName="'Document'"
      :callback="callback"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
      :relationshipIdName="hostRelationshipIdName"
    >
      <template slot-scope="params">
        <document-editor-tabs
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </document-editor-tabs>
      </template>
    </mau-crud-edit>
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
    name: 'EditDocument',
    data () {
      return {
        relatedEntitiesRoutes: {
          [PropertiesReference.OPERATIONS.entityName]: ApiRoutes.documentOperation,
          [PropertiesReference.DOCUMENT_ATTACHMENTS.entityName]: ApiRoutes.documentAttachment,
          [PropertiesReference.GROUPS.entityName]: ApiRoutes.documentGroup,
          [PropertiesReference.USERS.entityName]: ApiRoutes.documentUser,
          [PropertiesReference.GRANTORS.entityName]: ApiRoutes.documentGrantor,
          [PropertiesReference.COMMENTS.entityName]: ApiRoutes.documentComment
        },
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name
      }
    },
    props: {
      id: null
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
