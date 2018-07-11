<template>
  <div class="container">
    <mau-crud-edit
      :id="id"
      :entityName="'Appointment'"
      :callback="callback"
      :relatedEntitiesRoutes="relatedEntitiesRoutes"
      :relationshipIdName="hostRelationshipIdName"
    >
      <template slot-scope="params">
        <appointment-form
          :initialObject="params.entity"
          :saveFunction="params.saveFunction">
        </appointment-form>
      </template>
    </mau-crud-edit>
  </div>
</template>

<script>
  import AppointmentForm from '../components/AppointmentForm.vue'
  import PropertiesReference from '../PropertiesReference'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'EditAppointment',
    data () {
      return {
        relatedEntitiesRoutes: {
          [PropertiesReference.USERS.entityName]: ApiRoutes.appointmentUser,
          [PropertiesReference.CLIENTS.entityName]: ApiRoutes.appointmentClient
        },
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name
      }
    },
    props: {
      id: null
    },
    components: {
      AppointmentForm
    },
    methods: {
      callback: function () {
        this.$router.push({path: createRouteObjectPath(EntityTypes.APPOINTMENT, ChildTypes.LIST)})
      }
    }
  }
</script>
