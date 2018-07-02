<template>
  <div class="layout">
    <sidebar class="layout-sidebar" v-show="!isLoading"></sidebar>
    <div class="right">
      <navbar class="layout-navbar" v-show="!isLoading"></navbar>
      <auth-widget class="layout-auth-widget" v-show="!isLoading"></auth-widget>
      <div class="layout-content-wrap" id="content-wrap">
        <main id="content" class="content" role="main">
          <mau-spinner :tall="true" v-show="isRouteObjectLoading"></mau-spinner>
          <mau-widget v-show="!isRouteObjectLoading && currentRouteObjectUserAuth">
            <router-view></router-view>
          </mau-widget>
          <mau-widget v-show="!isLoading && !currentRouteObjectUserAuth">
            <h2 class="text-center">Ruta no autorizada</h2>
            <p class="text-center">La ruta que usted desea ingresar se encuntra restringida.</p>
          </mau-widget>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState, mapActions} from 'vuex'
  import Navbar from './navbar/Navbar'
  import Sidebar from './sidebar/Sidebar'
  import AuthWidget from './auth-widget/AuthWidget.vue'
  import EntityActions from 'src/api/store/entityActions'
  export default {
    name: 'layout',
    data () {
      return {
      }
    },
    components: {
      Navbar,
      Sidebar,
      AuthWidget
    },
    beforeMount () {
      this.getInitialData()
    },
    updated () {
    },
    watch: {
    },
    methods: {
      ...mapActions({
        toggleSidebar: 'toggleSidebar'
      }),
      getInitialData: function () {
        this.$store.dispatch(EntityActions.GET_BAGS)
        this.$store.dispatch(EntityActions.GET_BAG_TYPES)
        this.$store.dispatch(EntityActions.GET_BAG_PACKINGS)
        this.$store.dispatch(EntityActions.GET_EXPENSE_TYPES)
        this.$store.dispatch(EntityActions.GET_ORDER_ADJUSTMENT_TYPES)
        this.$store.dispatch(EntityActions.GET_SUPPLIERS)
        this.$store.dispatch(EntityActions.GET_CLIENTS)
      }
    },
    computed: {
      ...mapGetters([
        'currentRouteObjectUserAuth',
        'sidebarOpened',
        'toggleWithoutAnimation',
        'isLoading',
        'isRouteObjectLoading',
        'getRouteObjectsByEntity'
      ]),
      sidebarHiddenClass: function () {
        return {
          'sidebar-hidden': !this.sidebarOpened
        }
      },
      ...mapState({
        user: state => state.api.auth.user
      })
    }
  }
</script>

<style lang="scss">
  @import "../../sass/variables";
  $containers-width: calc(100% - #{$sidebar-width});
  .layout-navbar, .layout-auth-widget, .layout-content-wrap{
    width: $containers-width;
    margin-left: $sidebar-width;
    transition: margin-left 0.6s ease;
    &.sidebar-hidden {
      width: 100%;
      margin-left: 0;
    }
  }
  .layout-sidebar {
    opacity: 1;
    transform: translate(0,0);
    transition: all 0.6s ease;
    &.sidebar-hidden {
      opacity: 0;
      transform: translate(-100%,0);
    }
  }
</style>
