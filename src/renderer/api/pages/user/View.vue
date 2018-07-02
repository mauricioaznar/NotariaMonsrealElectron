<template>
  <div class="container">
    <mau-crud-view>
      <template slot-scope="params">
        <div>
          <mau-entity-view :entity="params.entity" :propertiesReference="propertiesReference"></mau-entity-view>
          <user-reset-password :user="params.entity"></user-reset-password>
        </div>
      </template>
    </mau-crud-view>
  </div>
</template>

<script>
  import PropertiesReference from './PropertiesReference'
  import UserResetPassword from './components/UserResetPassword.vue'
  export default {
    name: 'ViewUser',
    data () {
      return {
        propertiesReference: [
          PropertiesReference.COST,
          PropertiesReference.NICKNAME,
          PropertiesReference.EMAIL,
          PropertiesReference.ROLE,
          PropertiesReference.PHONE
        ]
      }
    },
    components: {
      UserResetPassword
    },
    props: {
      id: null
    }
  }
</script>

<style lang="scss">

</style>
