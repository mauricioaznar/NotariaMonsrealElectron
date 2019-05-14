<template>
  <div>
    <mau-crud-list :entityName="'Group'">
      <group-list :apiUrl="apiUrl" :canEdit="canEdit"></group-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import GroupList from '../components/GroupList.vue'
  import GenericApiUrls from 'renderer/services/api/GenericApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListGroup',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.GROUP.apiName, {paginate: true}),
        canEdit: true
      }
    },
    components: {
      GroupList
    }
  }
</script>
