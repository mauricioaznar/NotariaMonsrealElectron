<template>
  <div>
    <mau-crud-list :entityName="'Appointment'">
      <appointment-list :apiUrl="apiUrl" :canEdit="canEdit"></appointment-list>
    </mau-crud-list>
  </div>
</template>

<script>
  import AppointmentList from '../components/AppointmentList.vue'
  import GenericApiUrls from 'renderer/services/api/GenericApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'ListAppointment',
    data () {
      return {
        apiUrl: GenericApiUrls.createListUrl(EntityTypes.APPOINTMENT.apiName, {paginate: true}),
        canEdit: true
      }
    },
    components: {
      AppointmentList
    }
  }
</script>
