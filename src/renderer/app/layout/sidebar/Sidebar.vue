<template>
  <aside class="sidebar">
      <ul class="sidebar-menu">
        <li v-for="(routeObj, index) in routeObjects" v-if="routeObj.meta.sidebar">
          <router-link :to="routeObj.path"
                       class="sidebar-link"
                       v-if="routeObj.path">
            <div class="d-flex flex-column">
              <span
                      class="sidebar-menu-item-icon"
                      v-bind:class="routeObj.meta.sidebarIcon ? routeObj.meta.sidebarIcon : routeObj.meta.entityTypeIcon">

              </span>
              <p>{{routeObj.meta.sidebarTitle}}</p>
            </div>
          </router-link>
        </li>
      </ul>
  </aside>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'sidebar',

    components: {
    },
    computed: {
      ...mapState({
        routeObjects: state => state.api.routeObject.sidebarRouteObjects
      })
    },
    methods: {
      ...mapActions({
        toggleSidebar: 'toggleSidebar'
      })
    },
    watch: {
    },
    data () {
      return {
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .sidebar {
    height: $sidebar-viewport-height;
    background: $sidebar-bg;
    .vuestic-scrollbar {
      height: 100%;
      .scrollbar-wrapper {
        box-shadow: $sidebar-box-shadow;
      }
      .scrollbar-content {
        background: $sidebar-bg;
      }
    }

    position: absolute;
    width: $sidebar-width;
    .sidebar-hidden_without-animation & {
      transition: none;
    }

    .sidebar-hidden & {
      top: $sidebar-hidden-top;
      opacity: 0;
      z-index: $min-z-index;

    }

    .sidebar-link {
      position: relative;
      height: $sidebar-link-height;
      padding-left: $sidebar-link-pl;
      display: flex;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      text-decoration: none;

      &.router-link-active, &:hover {
        color: $white;
        background-color: $sidebar-link-active-bg;

        .sidebar-menu-item-icon, .expand-icon {
          color: $white;
        }
      }

      .expand-icon {
        position: absolute;
        right: $sidebar-arrow-right;
        top: calc(50% - #{$font-size-root}/2);
        font-weight: bold;
        transition: transform 0.3s ease;
      }

      &.expanded {
        .expand-icon {
          transform: rotate(180deg);
        }
      }

      .sidebar-menu-item-icon {
        font-size: $sidebar-menu-item-icon-size;
        color: $sidebar-submenu-icon-color;
        margin-right: 14px;

        &.fa-dashboard {       /* Temp fix */
          position: relative;
          top: -2px
        }
      }
    }

    .sidebar-submenu-link {
      height: $sidebar-submenu-link-height;
    }

    .sidebar-menu, .sidebar-submenu {
      list-style: none;
      padding-left: 0;

      li {
        display: block;
        padding-left: 0;
      }
    }

    .sidebar-submenu {
      .sidebar-link {
        padding-left: $sidebar-submenu-link-pl;
        font-size: $font-size-smaller;
      }
    }

    .sidebar-menu {
      max-height: 100%;
      margin-bottom: 0;
    }

    .expand-icon {
      color: $body-color;
    }

    a {
      color: $body-color;
      text-decoration: none;
    }
  }
</style>
