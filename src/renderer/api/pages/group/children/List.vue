<template>
  <div>
    <mau-crud-list :entityName="'Group'">
      <group-list :apiUrl="apiUrl" :canEdit="canEdit"></group-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import GroupList from '../components/GroupList.vue'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListGroup',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.GROUP.apiName),
        canEdit: true
      }
    },
    components: {
      GroupList
    }
  }
</script>
