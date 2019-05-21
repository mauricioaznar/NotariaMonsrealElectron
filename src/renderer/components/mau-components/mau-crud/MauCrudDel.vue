<template>
    <div class="d-flex justify-content-center">
        <mau-responsive-button :onPositive="confirm"
                               :positiveName="'Confirmar eliminación'"
        >
        </mau-responsive-button>
    </div>
</template>

<script>
  import GenericApiOperations from 'renderer/services/api/GenericApiOperations'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import ChildTypes from 'renderer/api/ChildTypes'
  import Notifications from 'renderer/services/api/Notifications'
  import cloneDeep from 'renderer/services/common/cloneDeep'
  export default {
    name: 'MauCrudDel',
    data () {
      return {
        entity: '',
        show: true
      }
    },
    props: {
      id: {
        required: true
      },
      entityType: {
        type: Object,
        required: true
      },
      callback: {
        type: Function
      }
    },
    created () {
      this.entity = cloneDeep(this.$store.getters.requestedEntity)
    },
    components: {
    },
    methods: {
      confirm: function () {
        let _this = this
        GenericApiOperations.del(this.entityType.apiName, this.id, this.entity)
          .then(
            result => {
              Notifications.success(_this)
              if (this.callback) {
                this.callback()
              }
              setTimeout(function () {
                _this.$router.push(createRouteObjectPath(_this.entityType, ChildTypes.LIST))
              }, 2000)
            })
          .catch(
            error => {
              Notifications.error(_this, error)
            }
          )
      }
    }
  }
</script>
