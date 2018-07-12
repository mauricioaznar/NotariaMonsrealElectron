<template>
  <div v-if="routeObjects" class="auth-widget widget">
    <div class="widget-header w-100 d-flex justify-content-end align-content-center align-items-center">
      <div class="widget-buttons">
        <router-link
                :active-class="'active'"
                class="icon-button ml-2"
                v-for="(routeObj, index) in routeObjects"
                :to="createTo(routeObj)"
                :key="index">
          <span :class="routeObj.meta.childTypeIcon"></span>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
  import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import {getRouteObjectMetaPropertyValue} from 'renderer/services/api/RouteObject'
  export default {
    name: 'AuthWidget',
    data () {
      return {
        widgetTitle: '',
        widgetIcon: '',
        routeObjects: [],
        currentRouteObject: {}
      }
    },
    props: {
    },
    created () {
      let currentRouteObject = this.$route
      this.widgetTitle = getRouteObjectMetaPropertyValue(currentRouteObject, 'title')
      this.widgetIcon = getRouteObjectMetaPropertyValue(currentRouteObject, 'entityTypeIcon')
      this.routeObjects = this.$store.getters['authWidgetRouteObjects']
    },
    watch: {
      $route: function (currentRouteObject) {
        this.widgetTitle = getRouteObjectMetaPropertyValue(currentRouteObject, 'title')
        this.widgetIcon = getRouteObjectMetaPropertyValue(currentRouteObject, 'entityTypeIcon')
        this.routeObjects = this.$store.getters['authWidgetRouteObjects']
      }
    },
    methods: {
      createTo: function (routeObj) {
        let params = routeObj.meta.params
        if (!params) {
          return routeObj.path
        }
        let paramsLength = params.length
        let currentRoutObject = this.$route
        let newPath = routeObj.path
        let currentRouteObjectGlobalIdentificator = currentRoutObject.params[globalEntityIdentifier]
        if (currentRouteObjectGlobalIdentificator) {
          newPath = newPath.replace(':' + globalEntityIdentifier, currentRouteObjectGlobalIdentificator)
        }
        for (let i = 0; i < paramsLength; i++) {
          let iParam = params[i]
          newPath = newPath.replace('/:' + iParam, '')
        }
        return newPath
      }
    }
  }
</script>

<style lang="scss">
  @import "../../../sass/variables";

  .auth-widget {
    background: $widget-bg;
    box-shadow: $widget-box-shadow;
    margin-bottom: $widget-mb;
    padding: 0.5rem 1rem;
  }
</style>
