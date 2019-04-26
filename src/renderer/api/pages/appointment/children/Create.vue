<template>
  <div class="container">
    <mau-crud-create
      :entityType="appointmentEntityType"
      :callback="callback"
      :relationshipIdName="hostRelationshipIdName"
    >
      <template slot-scope="params">
        <appointment-form :saveFunction="params.save"></appointment-form>
      </template>
    </mau-crud-create>
  </div>
</template>

<script>
  import AppointmentForm from '../components/AppointmentForm.vue'
  import PropertiesReference from '../PropertiesReference'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import EntityTypes from 'renderer/api/EntityTypes'
  import ChildTypes from 'renderer/api/ChildTypes'
  export default {
    name: 'CreateAppointment',
    data () {
      return {
        appointmentEntityType: EntityTypes.APPOINTMENT,
        hostRelationshipIdName: PropertiesReference.ID.relationship_id_name
      }
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
