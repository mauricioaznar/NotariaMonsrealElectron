<template>
    <div>
        <mau-spinner v-show="isUserLoading" :small="true"></mau-spinner>
        <div class="container mau-fade-component" v-show="!isUserLoading" :class="{'is-loaded': !isUserLoading}">
            <mau-entity-view v-if="entity !== null" :entity="entity" :propertiesReference="propertiesReference"></mau-entity-view>
        </div>
    </div>
</template>

<script>
  import PropertiesReference from 'renderer/api/pages/user/PropertiesReference'
  import GenericApiOperations from 'renderer/services/api/GenericApiOperations'
  export default {
    name: 'MyProfileAuth',
    data () {
      return {
        entity: null,
        isUserLoading: true,
        propertiesReference: [PropertiesReference.ID, PropertiesReference.NAME, PropertiesReference.LASTNAME, PropertiesReference.EMAIL, PropertiesReference.PHONE]
      }
    },
    created () {
      this.isUserLoading = true
      GenericApiOperations.getCurrentUser().then(result => {
        this.entity = result
        this.isUserLoading = false
      })
    },
    components: {
    },
    props: {
    }
  }
</script>

<style lang="scss">

</style>
