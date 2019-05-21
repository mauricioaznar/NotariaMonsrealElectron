<template>
  <b-navbar toggleable="md" type="dark" variant="info">
    <button class="navbar-toggler navbar-link" type="button" aria-label="Toggle navigation" aria-controls="nav_collapse" aria-expanded="false">
      <span @click="toggle" class="fa fa-angle-left"></span>
    </button>
    <b-navbar-brand href="#">{{navbarTitle}}</b-navbar-brand>
    <b-navbar-toggle class="navbar-link" target="nav_collapse"><span class="fa fa-bars"></span></b-navbar-toggle>
    <b-collapse is-nav id="nav_collapse">

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right class="text-right">
          <!-- Using button-content slot -->
          <template slot="button-content">
            <span>{{user.fullname}}</span>
          </template>
          <!--<b-dropdown-item class="dropdown-item text-right" href="#" @click="changeRoute(notificationsPathObject)">Notificaciones</b-dropdown-item>-->
          <b-dropdown-item class="dropdown-item text-right" href="#" @click="changeRoute(myProfilePathObject)">Mi Perfil</b-dropdown-item>
          <b-dropdown-item class="dropdown-item text-right" href="#" @click="changeRoute(apiChangesLogPathObject)">Cambios</b-dropdown-item>
          <b-dropdown-item class="dropdown-item text-right" href="#" v-on:click.prevent="logout">Cerrar sesion</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>

    </b-collapse>
  </b-navbar>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import authActions from 'renderer/api/store/authActions'
  import EntityTypes from 'renderer/api/EntityTypes'
  import AppActions from 'renderer/app/store/AppActions'
  import {createRouteObjectPath, getRouteObjectMetaPropertyValue} from 'renderer/services/api/RouteObject'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'navbar',
    data () {
      return {
        notificationsPathObject: {path: createRouteObjectPath(EntityTypes.NOTIFICATION, ChildTypes.NOTIFICATIONS)},
        myProfilePathObject: {path: createRouteObjectPath(EntityTypes.AUTH, ChildTypes.MY_PROFILE)},
        apiChangesLogPathObject: {path: createRouteObjectPath(EntityTypes.AUTH, ChildTypes.API_CHANGES_LOG)},
        navbarTitle: '',
        navbarIcon: '',
        isSidebarActive: true
      }
    },
    directives: {
    },
    computed: mapGetters([
      'user',
      'sidebarOpened',
      'toggleWithoutAnimation'
    ]),
    created () {
      let currentRouteObject = this.$route
      this.navbarTitle = getRouteObjectMetaPropertyValue(currentRouteObject, 'title')
      this.navbarIcon = getRouteObjectMetaPropertyValue(currentRouteObject, 'entityTypeIcon')
    },
    watch: {
      $route: function (currentRouteObject) {
        this.navbarTitle = getRouteObjectMetaPropertyValue(currentRouteObject, 'title')
        this.navbarIcon = getRouteObjectMetaPropertyValue(currentRouteObject, 'entityTypeIcon')
      }
    },
    methods: {
      ...mapActions([
        AppActions.TOGGLE_SIDEBAR
      ]),
      logout: function () {
        this.$store.dispatch(authActions.UNSET_USER).then(result => {
          this.$router.push({name: 'LoginAuth'})
        })
      },
      toggle: function () {
        this[AppActions.TOGGLE_SIDEBAR]()
      },
      changeRoute: function (pathObject) {
        this.$router.push(pathObject)
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";

  a.navbar-brand {
    color: $white !important;
    margin-right: 0px;
    text-align: center;
  }
  .dropdown-menu:after {
   display: none !important;
  }
  .navbar .navbar-link {
    z-index: 300;
    color: $body-color;
  }
  .custom-navbar-name {
    width: 100%;
    text-align: left;
  }
</style>
