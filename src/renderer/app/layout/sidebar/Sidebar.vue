<template>
  <aside class="sidebar">
      <ul class="sidebar-menu">
        <li v-for="(category, index) in categories">
          <a
              @click="goToDefaultCategoryRouteObject(category)"
             class="sidebar-link"
             :class="{'router-link-active': category.name === currentCategoryName}">
            <div class="d-flex flex-column">
              <span
                      class="sidebar-menu-item-icon"
                      v-bind:class="category.iconClass">

              </span>
              <p>{{category.title}}</p>
            </div>
          </a>
        </li>
      </ul>
  </aside>
</template>

<script>
  import { mapGetters, mapActions } from 'vuex'
  import Categories from 'renderer/api/Categories'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'

  export default {
    name: 'sidebar',
    data () {
      return {
        routeObjects: [],
        categories: Categories
      }
    },
    created () {
    },
    components: {
    },
    computed: {
      ...mapGetters([
        'getDefaultRouteObjectByCategory'
      ]),
      currentCategoryName: function () {
        let category = RouteObjectHelper.getRouteObjectMetaPropertyValue(this.$route, 'category')
        return category ? category.name : ''
      }
    },
    methods: {
      ...mapActions({
        toggleSidebar: 'toggleSidebar'
      }),
      goToDefaultCategoryRouteObject: function (category) {
        this.$router.push({path: this.getDefaultRouteObjectByCategory(category).path})
      }
    },
    watch: {
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
