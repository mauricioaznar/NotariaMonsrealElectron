<template>
  <div>
    <mau-crud-list :entityName="'Group'">
      <group-list :apiUrl="apiUrl" :canEdit="canEdit"></group-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import GroupList from '../components/GroupList.vue'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  export default {
    name: 'ListGroup',
    data () {
      return {
        apiUrl: ApiRoutes.group.list,
        canEdit: true
      }
    },
    components: {
      GroupList
    }
  }
</script>
