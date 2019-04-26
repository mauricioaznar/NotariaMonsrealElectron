<template>
  <div class="container">
    <mau-entity-petitioner
      :id="id"
      :entityType="grantorEntityType"
      @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-crud-edit
      v-if="grantor"
      :id="id"
      :entityType="grantorEntityType"
      :callback="callback">
      <template slot-scope="params">
        <grantor-form
          :initialObject="grantor"
          :saveFunction="params.saveFunction">
        </grantor-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import GrantorForm from '../components/GrantorForm.vue'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-crud/MauEntityPetitioner'
  export default {
    name: 'EditGrantor',
    data () {
      return {
        grantor: null,
        grantorEntityType: EntityTypes.GRANTOR
      }
    },
    props: {
      id: null
    },
    components: {
      GrantorForm,
      MauEntityPetitioner
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.GRANTOR, ChildTypes.LIST)})
      },
      entityResultHandler: function (entityObj) {
        this.grantor = entityObj
      }
    }
  }
</script>
