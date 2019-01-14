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
                        <b-form-input
                                v-model="item.property"
                                type="text"
                                class="form-control"
                                @input="itemChanged"
                        >
                        </b-form-input>
                    </td>
                    <td>
                        <b-form-input
                                v-model="item.electronic_folio"
                                type="text"
                                class="form-control"
                                @input="itemChanged"
                        >
                        </b-form-input>
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
      if (this.initialProperties.length > 0) {
        let initialPropertiesMod = []
        for (let i = 0; i < this.initialProperties.length; i++) {
          let initialPropertyObj = cloneDeep(this.initialProperties[i])
          initialPropertiesMod.push(initialPropertyObj)
        }
        this.properties = initialPropertiesMod
      }
    },
    components: {
    },
    methods: {
      getBootstrapValidationClass: ValidatorHelper.getBootstrapValidationClass,
      addItem: function () {
        this.properties.push({property: '', electronic_folio: ''})
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