<template>
  <div class="container">
    <mau-entity-petitioner
      :id="id"
      :entityType="appointmentEntityType"
      @entityResult="entityResultHandler"
    >
    </mau-entity-petitioner>
    <mau-crud-edit
      v-if="appointment"
      :id="id"
      :entityType="appointmentEntityType"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
    >
      <template slot-scope="params">
        <appointment-form
          :initialObject="appointment"
          :saveFunction="params.saveFunction">
        </appointment-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import AppointmentForm from '../components/AppointmentForm.vue'
  import PropertiesReference from '../PropertiesReference'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  import MauEntityPetitioner from 'renderer/components/mau-components/mau-crud/MauEntityPetitioner'
  export default {
    name: 'EditAppointment',
    data () {
      return {
        appointment: null,
        appointmentEntityType: EntityTypes.APPOINTMENT,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name
      }
    },
    props: {
      id: null
    },
    components: {
      AppointmentForm,
      MauEntityPetitioner
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.APPOINTMENT, ChildTypes.LIST)})
      },
      entityResultHandler: function (entityObj) {
        this.appointment = entityObj
      }
    }
  }
</script>
