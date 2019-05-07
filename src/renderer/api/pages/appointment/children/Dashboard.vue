<template>
    <div v-if="!isLoading" class="mau-schedule" :class="{'is-first-time-loaded': isFirstTimeLoaded}">
        <div class="container">
            <div class="form-group">
                <p>Seleccione una fecha</p>
                <mau-form-input-date
                        v-model="selectedDate"
                        :type="'date'"
                        :name="'date'"
                        :error="''"
                >
                </mau-form-input-date>
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
  import globalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
  import {mapState} from 'vuex'
  import moment from 'moment'
  import ApiUrls from 'renderer/services/api/ApiUrls'
  import EntityTypes from 'renderer/api/EntityTypes'
  export default {
    name: 'Dashboard',
    data () {
      return {
        appointments: [],
        isFirstTimeLoaded: true,
        weekGround: [
          'Oficina 1'
        ],
        timeGround: ['07:00', '19:00'],
        taskDetail: [],
        selectedDate: '',
        initialDate: '',
        isDataLoading: false,
        isLoading: true,
        availableRooms: []
      }
    },
    created () {
      this.getAppointmentList()
      Promise.all([
        ApiFunctions.get(ApiUrls.createListUrl(EntityTypes.ROOM.apiName) + '?paginate=false')
      ]).then(result => {
        this.availableRooms = result[0]
      }).finally(() => {
        this.isLoading = false
      })
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
        if (this.availableRooms.length === 0) {
          return
        }
        let categoriesNames = []
        let categoriesIds = []
        this.availableRooms.forEach((roomObj, index) => {
          categoriesNames.push(roomObj.name)
          categoriesIds.push(roomObj[globalEntityIdentifier])
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
        ApiFunctions.get(ApiUrls.createListUrl(EntityTypes.APPOINTMENT.apiName) + extraQuery).then(function (result) {
          self.appointments = result
          self.setCategories()
          self.isDataLoading = false
        })
      }
    },
    watch: {
      availableRooms: function () {
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
