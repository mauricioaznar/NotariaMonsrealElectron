<template>
    <div class="mau-schedule" :class="{'is-first-time-loaded': isFirstTimeLoaded}">
        <div class="container">
            <div class="form-group">
                <p>Seleccione una fecha</p>
                <mau-form-input-date-time
                        v-model="selectedDate"
                        :type="'date'"
                        class="form-control override-form-control"
                >
                </mau-form-input-date-time>
            </div>
        </div>
        <mau-spinner
                v-show="isDataLoading && !isFirstTimeLoaded"
                :medium="true"
        >
        </mau-spinner>
        <div v-show="!isDataLoading && !isFirstTimeLoaded" v-if="areAppointmentObjectsReady">
            <mau-schedule
                    :class="{'is-loaded': !isDataLoading}"
                    class="mau-fade-component"
                    :time-ground="timeGround"
                    :week-ground="weekGround"
                    :taskDetail="taskDetail">
            </mau-schedule>
        </div>
    </div>
</template>

<script>
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  import {globalEntityIdentificator} from 'renderer/config'
  import {mapState} from 'vuex'
  import moment from 'moment'
  import {ApiRoutes} from 'renderer/api/ApiRoutes'
  export default {
    name: 'Dashboard',
    data () {
      return {
        appointments: [],
        isDataLoading: false,
        isFirstTimeLoaded: true,
        weekGround: [
          'Oficina 1'
        ],
        timeGround: ['07:00', '19:00'],
        taskDetail: [],
        selectedDate: '',
        initialDate: ''
      }
    },
    created () {
      this.getAppointmentList()
    },
    computed: {
      ...mapState({
        rooms: state => state.api.entity.rooms
      }),
      areAppointmentObjectsReady: function () {
        return this.weekGround.length > 0 && this.taskDetail.length > 0
      }
    },
    props: {
    },
    components: {
    },
    methods: {
      setCategories: function () {
        if (this.rooms.length === 0) {
          return
        }
        let categoriesNames = []
        let categoriesIds = []
        this.rooms.forEach((roomObj, index) => {
          categoriesNames.push(roomObj.name)
          categoriesIds.push(roomObj[globalEntityIdentificator])
        })
        let categoriesDetails = []
        categoriesIds.forEach(categorieId => {
          let filteredAppointments = this.appointments.filter(appointmentObj => {
            return appointmentObj.room_id === categorieId
          })
          let categoryDetails = []
          filteredAppointments.forEach((appointmentObj, index) => {
            let startDateString = appointmentObj.start_date
            let startDateMoment = moment(startDateString, 'YYYY-MM-DD HH:mm:ss')
            let startDateFormatted = startDateMoment.format('HH:mm')
            let endDateString = appointmentObj.end_date
            let endDateMoment = moment(endDateString, 'YYYY-MM-DD HH:mm:ss')
            let endDateFormatted = endDateMoment.format('HH:mm')
            let detailObj = {
              dateStart: startDateFormatted,
              dateEnd: endDateFormatted,
              title: appointmentObj.name
            }
            categoryDetails.push(detailObj)
          })
          categoriesDetails.push(categoryDetails)
        })
        // console.log(categoriesDetails)
        this.taskDetail = categoriesDetails
        this.weekGround = categoriesNames
      },
      getAppointmentList (date = '1970/01/01') {
        this.taskDetail = []
        this.appointments = []
        this.isDataLoading = true
        let extraQuery = ''
        if (date) {
          extraQuery = '?filter=start_date&filter_value=' + date
        }
        let self = this
        ApiFunctions.get(ApiRoutes.appointment.list + extraQuery).then(function (result) {
          self.appointments = result
          self.setCategories()
          self.isDataLoading = false
        })
      }
    },
    watch: {
      rooms: function () {
        this.setCategories()
      },
      selectedDate: function (val) {
        console.log(val)
        if (this.isFirstTimeLoaded === true && val !== undefined) {
          this.isFirstTimeLoaded = false
        }
        this.getAppointmentList(val)
      }
    }
  }
</script>

<style lang="scss">
    .mau-schedule {
        height: 1500px;
        &.is-first-time-loaded {
            height: auto;
        }
    }
    .schedule {
        height: 1300px;
        width: 100%;
        li {
            list-style: none !important;
            margin: 0;
        }
        .time-ground {
            ul {
                padding: 0 !important;
            }
        }
        .task-ground {
            .task-list {
                ul {
                    padding: 0 !important;
                }
            }
        }
    }
</style>