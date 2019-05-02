<template>
    <div>
        <div>
            <table class="mau-table table table-striped">
                <thead>
                <tr>
                    <th>
                        Predio
                    </th>
                    <th>
                        Folio electronico
                    </th>
                    <th>

                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item, index) in properties">
                    <td>
                        <mau-form-input-text
                                v-model="item.property"
                                @input="itemChanged"
                                :name="'property' + index"
                                :error="errors.has('property' + index) ? errors.first('property' + index) : ''"
                                :initialValue="item.initial_property"
                                v-validate="'required'"
                                :data-vv-name="'property' + index"
                                :data-vv-as="'predio'"
                                :placeholder="'Ejemplo: Calle 19 entre 22 y 22-c...'"
                        >
                        </mau-form-input-text>
                    </td>
                    <td>
                        <mau-form-input-number
                                v-model="item.electronic_folio"
                                @input="itemChanged"
                                :name="'electronic_folio' + index"
                                :error="errors.has('electronic_folio' + index) ? errors.first('electronic_folio' + index) : ''"
                                :initialValue="item.initial_electronic_folio"
                                v-validate="'required|numeric'"
                                :data-vv-name="'electronic_folio' + index"
                                :data-vv-as="'folio_electronico'"
                                :placeholder="'Ejemplo: 12345'"
                                :type="'regular'"
                        >
                        </mau-form-input-number>
                    </td>
                    <td>
                        <a href="#" class="icon-button danger" @click.prevent="removeItem(item)">
                            <span class="fa fa-close"></span>
                        </a>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <a href="#" class="icon-button" @click.prevent="addItem">
                            <span class="fa fa-plus"></span>
                        </a>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    </div>

</template>

<script>
  import cloneDeep from 'renderer/services/common/cloneDeep'
  import ValidatorHelper from 'renderer/services/form/ValidatorHelper'
  import ManyToManyHelper from 'renderer/services/form/ManyToManyHelper'
  import MauFormInputNumber from 'renderer/components/mau-components/mau-form-inputs/MauFormInputNumber'
  import MauFormInputText from 'renderer/components/mau-components/mau-form-inputs/MauFormInputText'
  export default {
    data () {
      return {
        properties: []
      }
    },
    inject: ['$validator'],
    props: {
      initialProperties: {
        type: Array,
        required: true
      }
    },
    created () {
      let initialPropertiesCopy = cloneDeep(this.initialProperties)
      for (let i = 0; i < initialPropertiesCopy.length; i++) {
        let initialPropertyObj = initialPropertiesCopy[i]
        initialPropertyObj.initial_property = initialPropertyObj.property
        initialPropertyObj.initial_electronic_folio = initialPropertyObj.electronic_folio
      }
      this.properties = initialPropertiesCopy
      this.propertiesUpdate()
    },
    components: {
      MauFormInputNumber,
      MauFormInputText
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      addItem: function () {
        this.properties.push({property: '', electronic_folio: '', initial_property: '', initial_electronic_folio: ''})
        this.propertiesUpdate()
      },
      removeItem: function (item) {
        this.properties = this.properties.filter(propertyObj => {
          return propertyObj !== item
        })
        this.propertiesUpdate()
      },
      itemChanged: function (item) {
        this.propertiesUpdate()
      },
      propertiesUpdate: function () {
        this.$emit('input', ManyToManyHelper.filterM2MStructuredObjectsByApiOperations(this.initialProperties, this.properties, 'id'))
      }
    }
  }
</script>

<style>
</style>
