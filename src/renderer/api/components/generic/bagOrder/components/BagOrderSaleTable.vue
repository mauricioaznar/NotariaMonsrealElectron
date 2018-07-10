<template>
    <div class="x-overflow">
        <table class="mau-table table table-striped">
            <thead>
                <tr>
                    <th class="mau-text-center">Producto</th>
                    <th class="mau-text-center">Descripción</th>
                    <th class="mau-text-center">Cantidad en kilos</th>
                    <th class="mau-text-center">Precio unitario</th>
                    <th class="mau-text-center">Peso por bulto</th>
                    <th class="mau-text-center">Bultos</th>
                    <th class="mau-text-center">Costo Total</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(currentStructuredObj, index) in currentStructuredObjects" :key="index">
                    <td class="mau-text-center">{{getProductName(currentStructuredObj)}}</td>
                    <td class="mau-text-center">{{getProductDescription(currentStructuredObj)}}</td>
                    <td class="mau-text-center">
                        <mau-form-input-regular-number
                                :name="OrderProductPropertiesReference.UNITS.name"
                                v-model="currentStructuredObj.units"
                                @input="unitsHasChanged(currentStructuredObj)"
                        >
                        </mau-form-input-regular-number>
                    </td>
                    <td class="mau-text-center">
                        <mau-form-input-regular-number
                                :name="OrderProductSalePropertiesReference.UNIT_PRICE.name"
                                v-model="currentStructuredObj.unit_price"
                                :initialValue="getProductInitialUnitPrice(currentStructuredObj)"
                                @input="unitPriceHasChanged(currentStructuredObj)"
                        >
                        </mau-form-input-regular-number>
                    </td>
                    <td class="mau-text-center">
                        <mau-form-input-regular-number
                                v-if="hasGroupWeight(currentStructuredObj)"
                                :name="OrderProductPropertiesReference.GROUP_WEIGHT.name"
                                v-model="currentStructuredObj.group_weight"
                                :initialValue="getProductInitialGroupWeight(currentStructuredObj)"
                                @input="groupWeightHasChanged(currentStructuredObj)"
                        >
                        </mau-form-input-regular-number>
                    </td>
                    <td class="mau-text-center">
                        <mau-form-input-regular-number
                                v-if="!hasGroupWeight(currentStructuredObj)"
                                :name="OrderProductPropertiesReference.GROUPS.name"
                                v-model="currentStructuredObj.groups"
                                @input="groupsHasChanged(currentStructuredObj)"
                        >
                        </mau-form-input-regular-number>
                        <div v-else>
                            {{currentStructuredObj.groups}}
                        </div>
                    </td>
                    <td class="mau-text-center">
                        <!--<mau-form-input-regular-number-->
                                <!--:name="OrderProductSalePropertiesReference.TOTAL_COST.name"-->
                                <!--v-model="currentStructuredObj.total_cost"-->
                                <!--@input="unitsHasChanged(currentStructuredObj)"-->
                        <!--&gt;-->
                        <!--</mau-form-input-regular-number>-->
                        {{currentStructuredObj.total_cost}}
                    </td>
                </tr>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td class="text-right"><b>TOTAL:</b></td>
                    <td>
                        {{total}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    import OrderProductPropertiesReference from 'renderer/api/propertiesReference/BagOrderProductPropertiesReference'
    import OrderProductSalePropertiesReference from 'renderer/api/propertiesReference/BagOrderProductSalePropertiesReference'
    import ProductPropertiesReference from 'renderer/api/propertiesReference/BagPropertiesReference'
    import MauFormInputRegularNumber from 'renderer/components/mau-components/mau-form-inputs/MauFormInputRegularNumber.vue'
    import {mapGetters} from 'vuex'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    export default {
      name: 'OrderSaleTable',
      data () {
        return {
          currentStructuredObjects: [],
          OrderProductPropertiesReference: OrderProductPropertiesReference,
          OrderProductSalePropertiesReference: OrderProductSalePropertiesReference,
          total: 0
        }
      },
      components: {
        MauFormInputRegularNumber
      },
      created () {
      },
      computed: {
        ...mapGetters([
          'getBagById'
        ])
      },
      props: {
        structuredObjects: {
          type: Array,
          required: true
        },
        hostEntityIdentifierName: {
          type: String,
          required: true
        }
      },
      methods: {
        hasGroupWeight: function (structuredObject) {
          let bag = this.getBagById(structuredObject[this.hostEntityIdentifierName])
          return !!bag[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name]
        },
        emitStructureChangeEvent: function () {
          this.$emit('structuredObjectsChange', this.currentStructuredObjects)
        },
        getProductName: function (structuredObject) {
          return this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.NAME.name]
        },
        getProductDescription: function (structuredObject) {
          return this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.DESCRIPTION.name]
        },
        getProductInitialUnitPrice: function (structuredObject) {
          let currentUnitPrice = this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.CURRENT_UNIT_PRICE.name]
          if (structuredObject[OrderProductSalePropertiesReference.UNIT_PRICE.name]) {
            currentUnitPrice = structuredObject[OrderProductSalePropertiesReference.UNIT_PRICE.name]
          }
          return currentUnitPrice
        },
        getProductInitialGroupWeight: function (structuredObject) {
          let currentGroupWeight = this.getBagById(structuredObject[this.hostEntityIdentifierName])[ProductPropertiesReference.CURRENT_GROUP_WEIGHT.name]
          if (structuredObject[OrderProductSalePropertiesReference.GROUP_WEIGHT.name]) {
            currentGroupWeight = structuredObject[OrderProductSalePropertiesReference.GROUP_WEIGHT.name]
          }
          return currentGroupWeight
        },
        unitsHasChanged: function (currentStructuredObj) {
          this.setCurrentStructuredObjectGroup(currentStructuredObj)
          this.setCurrentStructureObjectCost(currentStructuredObj)
          this.emitStructureChangeEvent()
        },
        unitPriceHasChanged: function (currentStructuredObj) {
          this.setCurrentStructuredObjectGroup(currentStructuredObj)
          this.setCurrentStructureObjectCost(currentStructuredObj)
          this.emitStructureChangeEvent()
        },
        groupWeightHasChanged: function (currentStructuredObj) {
          this.setCurrentStructuredObjectGroup(currentStructuredObj)
          this.setCurrentStructureObjectCost(currentStructuredObj)
          this.emitStructureChangeEvent()
        },
        groupsHasChanged: function (currentStructuredObj) {
          this.setCurrentStructureObjectCost(currentStructuredObj)
          this.emitStructureChangeEvent()
        },
        setCurrentStructuredObjectGroup: function (currentStructuredObj) {
          let units = currentStructuredObj[OrderProductSalePropertiesReference.UNITS.name] ? currentStructuredObj[OrderProductSalePropertiesReference.UNITS.name] : 0
          let groupWeight = currentStructuredObj[OrderProductSalePropertiesReference.GROUP_WEIGHT.name] ? currentStructuredObj[OrderProductSalePropertiesReference.GROUP_WEIGHT.name] : 0
          if (units && groupWeight) {
            currentStructuredObj.groups = (units / groupWeight).toFixed(2)
          }
        },
        setCurrentStructureObjectCost: function (currentStructuredObj) {
          let currentObjUnitCost = currentStructuredObj[OrderProductSalePropertiesReference.UNIT_PRICE.name]
          let currentObjQuantity = currentStructuredObj[OrderProductPropertiesReference.UNITS.name]
          currentStructuredObj[OrderProductSalePropertiesReference.TOTAL_COST.name] = (currentObjUnitCost || 0) * (currentObjQuantity || 0)
          this.calculateTotal()
        },
        calculateTotal: function () {
          let total = 0
          this.currentStructuredObjects.forEach((currentStructuredObjLoop, index) => {
            let cost = currentStructuredObjLoop[OrderProductSalePropertiesReference.TOTAL_COST.name] || 0
            total += cost
          })
          this.total = total
        }
      },
      watch: {
        structuredObjects: function () {
          let tempCurrentStructuredObjects = []
          for (let i = 0; i < this.structuredObjects.length; i++) {
            let structuredObj = this.structuredObjects[i]
            let currentStructuredObjFound = this.currentStructuredObjects.find(currentStructuredObj => {
              return currentStructuredObj[this.hostEntityIdentifierName] === structuredObj[this.hostEntityIdentifierName]
            })
            if (currentStructuredObjFound) {
              tempCurrentStructuredObjects.push(cloneDeep(currentStructuredObjFound))
            } else {
              tempCurrentStructuredObjects.push(cloneDeep(structuredObj))
            }
          }
          this.currentStructuredObjects = tempCurrentStructuredObjects
          this.calculateTotal()
        }
      }
    }
</script>