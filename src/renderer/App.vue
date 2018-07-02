<template>
  <div id="app" class="app">
    <mau-spinner :tall="true" v-show="isAppLoading"></mau-spinner>
    <notifications classes="mau-notification" :duration="5000" :group="'right-corner'"></notifications>
    <auth-layout v-if="isAuth" v-show="!isAppLoading">
    </auth-layout>
    <layout v-else v-show="!isAppLoading"></layout>
  </div>
</template>

<script>
  import Layout from 'src/app/layout/Layout'
  import AuthLayout from 'src/app/layout/AuthLayout'
  import {mapGetters} from 'vuex'
  import AppActions from 'src/app/store/AppActions'

  export default {
    name: 'app',
    components: {
      AuthLayout,
      Layout
    },
    updated () {
      this.$store.dispatch(AppActions.SET_IS_APP_LOADING, false)
    },
    computed: {
      ...mapGetters([
        'isAppLoading'
      ]),
      isAuth () {
        return this.$route.meta.requiresAuth === false
      }
    }
  }
</script>

<style lang="scss">
  @import "sass/main";
  body {
    height: 100%;
    .app {
      height: 100%;
    }
  }
</style>
