<template>
    <div class="form-group form-row">
        <div class="col-md-6 col-sm-12">
            <mau-form-input-select-static
                    v-model="hours"
                    :availableObjects="hourOptions"
                    :initialObject="initialHours"
                    :displayProperty="displayProperty"
                    :label="'Hora de ' + label"
                    :error="error"
                    :name="name + '1'"
            >
            </mau-form-input-select-static>
        </div>
        <div class="col-md-6 col-sm-12">
            <mau-form-input-select-static
                    v-model="minutes"
                    :availableObjects="minuteOptions"
                    :initialObject="initialMinutes"
                    :displayProperty="displayProperty"
                    :error="error"
                    :name="name + '2'"
                    :label="'Minuto de ' + label"
            >
            </mau-form-input-select-static>
        </div>
    </div>
</template>

<script>
    import MauFormInputSelectStatic from 'renderer/components/mau-components/mau-form-inputs/MauFormInputSelectStatic'
    import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
    import moment from 'moment'
    export default {
      data () {
        return {
          time: '',
          hours: '',
          minutes: '',
          initialHours: {},
          initialMinutes: {},
          displayProperty: 'value'
        }
      },
      created () {
        this.setInitialValues()
      },
      $_veeValidate: {
        name () {
          return this.name
        },
        value () {
          return this.time
        }
      },
      props: {
        initialTime: {
          required: true,
          validator: function (value) {
            return value === '' || moment(value, 'HH:mm:ss').isValid()
          }
        },
        label: {
          type: String
        },
        error: {
          type: String,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        hourOptions: {
          type: Array,
          default: function () {
            return [
              {value: '00'},
              {value: '01'},
              {value: '02'},
              {value: '03'},
              {value: '04'},
              {value: '05'},
              {value: '06'},
              {value: '07'},
              {value: '08'},
              {value: '09'},
              {value: '10'},
              {value: '11'},
              {value: '12'},
              {value: '13'},
              {value: '14'},
              {value: '15'},
              {value: '16'},
              {value: '17'},
              {value: '18'},
              {value: '19'},
              {value: '20'},
              {value: '21'},
              {value: '22'},
              {value: '23'}
            ]
          }
        },
        minuteOptions: {
          type: Array,
          default: function () {
            return [
              {value: '00'},
              {value: '05'},
              {value: '10'},
              {value: '15'},
              {value: '20'},
              {value: '25'},
              {value: '30'},
              {value: '35'},
              {value: '40'},
              {value: '45'},
              {value: '50'},
              {value: '55'}
            ]
          }
        }
      },
      components: {
        MauFormInputSelectStatic
      },
      methods: {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        emitChanges: function () {
          let time = this.hours.value + ':' + this.minutes.value + ':00'
          this.time = time
          this.$emit('input', time)
        },
        setInitialValues: function () {
          if (moment(this.initialTime, 'HH:mm:ss').isValid()) {
            this.initialHours = {value: moment(this.initialTime, 'HH:mm:ss').format('HH')}
            this.initialMinutes = {value: moment(this.initialTime, 'HH:mm:ss').format('mm')}
            this.time = this.initialHours.value + ':' + this.initialMinutes.value + ':00'
          }
        }
      },
      watch: {
        hours: function () {
          this.emitChanges()
        },
        minutes: function () {
          this.emitChanges()
        }
      }
    }
</script>
