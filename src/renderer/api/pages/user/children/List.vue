<template>
  <div>
    <mau-crud-list :entityName="'User'">
      <user-list :apiUrl="apiUrl" :canEdit="canEdit"></user-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import UserList from '../components/UserList.vue'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListUser',
    data () {
      return {
        apiUrl: ApiUrls.createListUrl(EntityTypes.USER.apiName),
        canEdit: true
      }
    },
    components: {
      UserList
    }
  }
</script>
