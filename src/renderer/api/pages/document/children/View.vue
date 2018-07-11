<template>
  <div class="container">
    <mau-crud-view>
      <template slot-scope="params">
        <div class="d-flex flex-column justify-content-around flex-lg-row">
          <div class="flex-same-width mr-lg-3">
            <mau-entity-view :entity="params.entity" :propertiesReference="propertiesReference" :hiddenPropertiesReference="hiddenProperties"></mau-entity-view>
          </div>
          <div class="flex-same-width ml-lg-3">
            <div class="cards">
              <comment-list :commentObjects="params.entity[propertiesReference.COMMENTS.name]"></comment-list>
            </div>
          </div>
        </div>
      </template>
    </mau-crud-view>
  </div>
</template>

<script>
  import PropertiesReference from '../PropertiesReference'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import { VueEditor } from 'vue2-editor'
  import CommentList from '../components/CommentList.vue'
  export default {
    name: 'ViewDocument',
    data () {
      return {
        propertiesReference: PropertiesReference,
        hiddenProperties: [PropertiesReference.COMMENTS],
        routeObjects: ApiRoutes
      }
    },
    components: {
      VueEditor,
      CommentList
    },
    props: {
      id: null
    }
  }
</script>

<style lang="scss">

</style>
