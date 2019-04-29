<template>
    <div>
        <label v-if="label">
            {{label}}
        </label>
        <div
            class="form-control p-0 d-flex align-content-stretch align-items-stretch"
            :class="getBootstrapValidationClass(error)"
        >
            <mau-form-input-select-static
                    :id="name"
                    :name="name"
                    :data-vv-name="name"
                    v-model="hour"
                    :availableObjects="hourOptions"
                    :initialObject="initialHour"
                    :displayProperty="displayProperty"
                    class="h-100"
            >
            </mau-form-input-select-static>
            <mau-form-input-select-static
                    :id="name"
                    :name="name"
                    :data-vv-name="name"
                    v-model="hour"
                    :availableObjects="hourOptions"
                    :initialObject="initialHour"
                    :displayProperty="displayProperty"
                    class="h-100"
            >
            </mau-form-input-select-static>
        </div>
        <div class="invalid-feedback">
          <span v-show="error" class="help is-danger">
            {{error}}
          </span>
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
          hour: '',
          initialHour: this.hourOptions[0],
          initialMinute: this.hourOptions[0]
        }
      },
      created () {
        this.setInitialValues()
      },
      props: {
        initialTime: {
          required: true,
          validator: function (value) {
            return moment(value, 'HH:mm').isValid()
          }
        },
        label: {
          type: String
        },
        error: {
          type: String
        },
        displayProperty: {
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
        setInitialValues: function () {
        }
      }
    }
</script>
