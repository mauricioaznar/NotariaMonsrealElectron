<template>
  <div>
    <mau-crud-list :entityName="'User'">
      <user-list :apiUrl="apiUrl" :canEdit="canEdit"></user-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import UserList from '../components/UserList.vue'
  import GenericApiUrls from 'renderer/services/api/GenericApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListUser',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.USER.apiName, {paginate: true}),
        canEdit: true
      }
    },
    components: {
      UserList
    }
  }
</script>
