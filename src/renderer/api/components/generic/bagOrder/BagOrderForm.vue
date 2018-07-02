1<template>
  <div>
      <div>
          <div class="form-group">
              <div class="name">
                  <label>{{OrderPropertiesReference.NAME.title}}</label>
                  <b-form-input v-model="productionOrder.name"
                                type="text"
                                class="form-control"
                                v-validate="'required'"
                                :class="getBootstrapValidationClass(errors.has(OrderPropertiesReference.NAME.name))"
                                :data-vv-name="OrderPropertiesReference.NAME.name"
                                placeholder="Ejemplo: 0001">
                  </b-form-input>
                  <div class="invalid-feedback">
                      <span v-show="errors.has(OrderPropertiesReference.NAME.name)" class="help is-danger">
                            {{ errors.first(OrderPropertiesReference.NAME.name) }}
                      </span>
                  </div>
              </div>
          </div>
          <div class="form-group">
              <div class="date">
                  <mau-form-input-date-time
                          :name="OrderPropertiesReference.DATE.name"
                          :label="OrderPropertiesReference.DATE.title"
                          v-model="productionOrder.date"
                          :initialValue="initialValues[OrderPropertiesReference.DATE.name]"
                          :error="errors.first(OrderPropertiesReference.DATE.name)"
                          v-validate="'required'"
                  >
                  </mau-form-input-date-time>
              </div>
          </div>
          <div class="form-group" v-if="adjustmentsMode">
              <div class="expenseType">
                  <label>{{OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.title}}</label>
                  <mau-form-input-select
                          :availableObjects="availableBagOrderAdjustmentTypes"
                          :initialObject="initialValues[OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.name]"
                          :display="OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.display"
                          :label="'name'"
                          v-model="productionOrder.adjustmentType"
                          class="override-form-control form-control"
                          :name="OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.name"
                          v-validate="'required'"
                          :data-vv-name="OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.name"
                          :class="getBootstrapValidationClass(errors.has(OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.name))"
                  >
                  </mau-form-input-select>
                  <div class="invalid-feedback">
                      <span v-show="errors.has(OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.name)" class="help is-danger">
                        {{ errors.first(OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.name) }}
                      </span>
                  </div>
              </div>
          </div>
          <div class="form-group" v-if="salesMode">
              <div class="expenseType">
                  <mau-form-input-select
                          :availableObjects="availableClients"
                          :initialObject="initialValues[OrderSalePropertiesReference.CLIENT.name]"
                          :label="OrderSalePropertiesReference.CLIENT.title"
                          :displayProperty="'fullname'"
                          v-model="productionOrder.client"
                          :name="OrderSalePropertiesReference.CLIENT.name"
                          :error="errors.first(OrderSalePropertiesReference.CLIENT.name)"
                          v-validate="'object_required'"
                  >
                  </mau-form-input-select>
              </div>
          </div>
          <div class="form-group">
              <div class="bags">
                    <mau-many-to-many-selector
                            :label="OrderPropertiesReference.BAGS.title"
                            :initialObjects="initialValues[OrderPropertiesReference.BAGS.name]"
                            v-model="productionOrder.bags"
                            :selectedEntityIdentifierName="'bag_id'"
                            :availableObjects="availableBags"
                            :name="OrderPropertiesReference.BAGS.name"
                    >
                        <template slot-scope="params">
                            <order-sale-table
                                    v-if="salesMode"
                                    :structuredObjects="params.structuredObjects"
                                    @structuredObjectsChange="params.onTableChange"
                                    :hostEntityIdentifierName="'bag_id'"
                            >
                            </order-sale-table>
                            <order-table
                                v-else
                                :structuredObjects="params.structuredObjects"
                                @structuredObjectsChange="params.onTableChange"
                                :hostEntityIdentifierName="'bag_id'"
                            >
                            </order-table>
                        </template>
                    </mau-many-to-many-selector>
              </div>
          </div>
          <div class="container mb-2 text-right">
              <b-button :disabled="buttonDisabled" @click="save" type="button" variant="primary">Guardar</b-button>
          </div>
      </div>
  </div>
</template>

<script>
  import OrderPropertiesReference from 'src/api/propertiesReference/BagOrderPropertiesReference'
  import OrderAdjustmentPropertiesReference from 'src/api/propertiesReference/BagOrderAdjustmentPropertiesReference'
  import OrderSalePropertiesReference from 'src/api/propertiesReference/BagOrderSalePropertiesReference'
  import ValidatorHelper from 'src/services/form/ValidatorHelper'
  import FormSubmitEventBus from 'src/services/form/FormSubmitEventBus'
  import MauFormInputSelect from 'src/components/mau-components/mau-form-inputs/MauFormInputSelect.vue'
  import MauFormInputDateTime from 'src/components/mau-components/mau-form-inputs/MauFormInputDateTime.vue'
  import GlobalEntityIdentifier from 'src/services/api/GlobalEntityIdentifier'
  import OrderSaleTable from 'src/api/components/generic/bagOrder/components/BagOrderSaleTable.vue'
  import OrderTable from 'src/api/components/generic/bagOrder/components/BagOrderTable.vue'
  import {mapState} from 'vuex'
  export default {
    name: 'MauSimpleOrderForm',
    data () {
      return {
        getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
        OrderPropertiesReference: OrderPropertiesReference,
        OrderAdjustmentPropertiesReference: OrderAdjustmentPropertiesReference,
        OrderSalePropertiesReference: OrderSalePropertiesReference,
        productionOrder: {
          name: '',
          bags: [],
          date: '',
          adjustmentType: {},
          client: {}
        },
        initialValues: {},
        buttonDisabled: false
      }
    },
    components: {
      MauFormInputSelect,
      MauFormInputDateTime,
      OrderSaleTable,
      OrderTable
    },
    props: {
      initialObject: {
        type: Object
      },
      saveFunction: {
        type: Function,
        required: true
      },
      adjustmentsMode: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      salesMode: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    mounted () {
      FormSubmitEventBus.onEvent(function (isSuccess) {
        if (isSuccess === false) {
          this.buttonDisabled = false
        }
      }.bind(this))
    },
    created () {
      this.createDefaultInitialValues()
      if (this.initialObject) {
        this.setInitialValues(this.initialObject)
      }
    },
    computed: {
      ...mapState({
        availableBagOrderAdjustmentTypes: state => {
          return state.api.entity.bagOrderAdjustmentTypes
        },
        availableClients: state => {
          return state.api.entity.clients
        },
        availableBags: state => {
          return state.api.entity.bags
        }
      })
    },
    methods: {
      createDefaultInitialValues: function () {
        for (let propertyReference in OrderPropertiesReference) {
          if (OrderPropertiesReference.hasOwnProperty(propertyReference)) {
            this.initialValues[OrderPropertiesReference[propertyReference].name] = OrderPropertiesReference[propertyReference].defaultValue
          }
        }
        if (this.adjustmentsMode) {
          for (let propertyReference in OrderAdjustmentPropertiesReference) {
            if (OrderAdjustmentPropertiesReference.hasOwnProperty(propertyReference)) {
              this.initialValues[OrderAdjustmentPropertiesReference[propertyReference].name] = OrderAdjustmentPropertiesReference[propertyReference].defaultValue
            }
          }
        }
        if (this.salesMode) {
          for (let propertyReference in OrderSalePropertiesReference) {
            if (OrderSalePropertiesReference.hasOwnProperty(propertyReference)) {
              this.initialValues[OrderSalePropertiesReference[propertyReference].name] = OrderSalePropertiesReference[propertyReference].defaultValue
            }
          }
        }
      },
      setInitialValues: function () {
        this.productionOrder.name = this.initialObject[OrderPropertiesReference.NAME.name]
        this.initialValues[OrderPropertiesReference.BAGS.name] = this.initialObject[OrderPropertiesReference.BAGS.name]
        this.initialValues[OrderPropertiesReference.DATE.name] = this.initialObject[OrderPropertiesReference.DATE.name]
        if (this.adjustmentsMode) {
          this.initialValues[OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.name] = this.initialObject[OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.name]
        }
        if (this.salesMode) {
          this.initialValues[OrderSalePropertiesReference.CLIENT.name] = this.initialObject[OrderSalePropertiesReference.CLIENT.name]
        }
      },
      save: function () {
        let directParams = {
          [OrderPropertiesReference.NAME.name]: this.productionOrder.name,
          [OrderPropertiesReference.DATE.name]: this.productionOrder.date
        }
        if (this.adjustmentsMode) {
          directParams[OrderAdjustmentPropertiesReference.ADJUSTMENT_TYPE.relationship_id_name] = this.productionOrder.adjustmentType ? this.productionOrder.adjustmentType[GlobalEntityIdentifier] : 'null'
        }
        if (this.salesMode) {
          directParams[OrderSalePropertiesReference.CLIENT.relationship_id_name] = this.productionOrder.client ? this.productionOrder.client[GlobalEntityIdentifier] : 'null'
        }
        let indirectParams = {
          [OrderPropertiesReference.BAGS.entityName]: this.productionOrder.bags
        }
        this.$validator.validateAll().then((result) => {
          if (result) {
            this.buttonDisabled = true
            this.saveFunction(directParams, indirectParams)
          }
        })
      }
    },
    watch: {
      initialObject: function (initialObject) {
        this.setInitialValues(initialObject)
      }
    }
  }

</script>
