<template>
  <div>
    <label
            v-if="label"
            class="form__label">
      {{ label }}
    </label>
    <flat-pickr
            :key="keyValue"
            v-model="date"
            :config="config"
            @input="updateValue"
            @change="updateValue"
    >
    </flat-pickr>
    <div class="invalid-feedback">
        <span v-show="error" class="help is-danger">
          {{error}}
        </span>
    </div>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component'
  import {Spanish} from '../../../../../node_modules/flatpickr/dist/l10n/es'
  import 'flatpickr/dist/flatpickr.css'
  import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
  const rangeSeparator = ' al '
  Spanish.rangeSeparator = rangeSeparator
  export default {
    name: 'MauFormInputDateTime',
    data () {
      return {
        date: '',
        recentlyCreated: true,
        keyValue: 0,
        config: {
        },
        rangeConfig: {
          conjunction: ' - ',
          mode: 'range',
          altInputClass: 'form-control mau-form-input-date-time',
          locale: Spanish
        },
        dateConfig: {
          wrap: true,
          altInput: true,
          altInputClass: 'form-control mau-form-input-date-time',
          dateFormat: 'Y-m-d',
          locale: Spanish
        },
        timeConfig: {
          enableTime: true,
          noCalendar: true,
          dateFormat: 'H:i',
          locale: Spanish,
          altInputClass: 'form-control mau-form-input-date-time',
          time_24hr: true,
          minDate: '7:00',
          maxDate: '19:00',
          minuteIncrement: 10
        }
      }
    },
    $_veeValidate: {
      name () {
        return this.name
      },
      value () {
        return this.date
      }
    },
    props: {
      value: String,
      initialValue: String,
      name: {
        type: String,
        required: true
      },
      error: {
        type: String,
        required: false
      },
      label: {
        type: String
      },
      inputType: {
        type: String,
        default: function () {
          return 'date'
        }
      }
    },
    components: {
      flatPickr
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      updateValue: function (val) {
        this.$emit('input', val)
      }
    },
    created () {
      this.date = this.value
      if (this.initialValue && this.initialValue !== '0000-00-00') {
        this.date = this.initialValue
      }
      if (this.inputType === 'date') {
        this.config = this.dateConfig
      } else if (this.inputType === 'time') {
        this.config = this.timeConfig
      } else if (this.inputType === 'range') {
        this.config = this.rangeConfig
      } else {
        console.log('please specify a valid dateTime input type')
      }
      this.updateValue(this.date)
    },
    watch: {
      error: function () {
        let prevAltInputClass = this.config.altInputClass
        let bootstrapValidationClass = this.getBootstrapValidationClass(this.error)
        if (this.error !== '') {
          if (!prevAltInputClass.includes(bootstrapValidationClass)) {
            this.config.altInputClass = prevAltInputClass + ' ' + bootstrapValidationClass
            this.keyValue++
          }
        } else {
          this.config.altInputClass = 'form-control mau-form-input-date-time'
          this.keyValue++
        }
      }
    }
  }
</script>

<style lang="scss">
  .mau-form-input-date-time {
    background-color: #ffffff;
  }
</style>
