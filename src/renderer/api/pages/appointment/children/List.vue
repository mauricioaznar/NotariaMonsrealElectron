<template>
  <div>
    <mau-crud-list :entityName="'Appointment'">
      <appointment-list :apiUrl="apiUrl" :canEdit="canEdit"></appointment-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import AppointmentList from '../components/AppointmentList.vue'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  export default {
    name: 'ListAppointment',
    data () {
      return {
        apiUrl: ApiRoutes.appointment.list,
        canEdit: true
      }
    },
    components: {
      AppointmentList
    }
  }
</script>
