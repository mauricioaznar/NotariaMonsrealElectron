<template>
  <div>
    <flat-pickr
            v-model="value"
            :config="config"
            class="form-control"
            :class="className"
    >
    </flat-pickr>
      <!--<div class="input-group">-->
        <!--<div class="input-group-btn">-->
          <!--<button class="btn btn-default" type="button" title="Clear" @click="clear" data-clear>-->
            <!--<i class="fa fa-times">-->
              <!--<span aria-hidden="true" class="sr-only">Clear</span>-->
            <!--</i>-->
          <!--</button>-->
        <!--</div>-->
      <!--</div>-->
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component'
  import {Spanish} from '../../../../../node_modules/flatpickr/dist/l10n/es'
  import 'flatpickr/dist/flatpickr.css'
  const rangeSeparator = ' al '
  Spanish.rangeSeparator = rangeSeparator
  export default {
    name: 'MauFormInputDateTime',
    data () {
      return {
        value: '',
        recentlyCreated: true,
        config: {
        },
        rangeConfig: {
          conjunction: ' - ',
          mode: 'range',
          locale: Spanish
        },
        dateConfig: {
          wrap: true,
          altInput: true,
          dateFormat: 'Y-m-d',
          locale: Spanish
        },
        timeConfig: {
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          locale: Spanish,
          time_24hr: true,
          minDate: '7:00',
          maxDate: '19:00',
          minuteIncrement: 10
        }
      }
    },
    props: {
      label: {
        type: String
      },
      initialValue: {
      },
      hasError: {
        type: Function
      },
      inputType: {
        type: String,
        default: function () {
          return 'date'
        }
      },
      className: {
        type: Object
      }
    },
    components: {
      flatPickr
    },
    methods: {
      clear: function () {
        this.value = ''
      }
    },
    watch: {
      value: function (value) {
        this.$emit('input', value)
      }
    },
    created () {
      this.value = this.initialValue
      if (this.inputType === 'date') {
        this.config = this.dateConfig
      } else if (this.inputType === 'time') {
        this.config = this.timeConfig
      } else if (this.inputType === 'range') {
        this.config = this.rangeConfig
      } else {
        console.log('please specify a valid dateTime input type')
      }
    }
  }
</script>

<style lang="scss">

</style>
