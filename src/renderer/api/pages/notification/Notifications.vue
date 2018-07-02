<template>
    <div>
        <mau-spinner :medium="true" v-show="isDataLoading"></mau-spinner>
        <div>Hoja de ayuda</div>
    </div>
</template>

<script>
    export default {
      data () {
        return {
          notifications: '',
          isDataLoading: false
        }
      },
      created () {
      }
    }
</script>