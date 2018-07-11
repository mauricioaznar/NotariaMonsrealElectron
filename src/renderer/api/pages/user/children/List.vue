<template>
  <div>
    <mau-crud-list :entityName="'User'">
      <user-list :apiUrl="apiUrl" :canEdit="canEdit"></user-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import UserList from '../components/UserList.vue'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  export default {
    name: 'ListUser',
    data () {
      return {
        apiUrl: ApiRoutes.user.list,
        canEdit: true
      }
    },
    components: {
      UserList
    }
  }
</script>
