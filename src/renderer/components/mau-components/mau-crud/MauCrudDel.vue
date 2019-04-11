<template>
    <div class="d-flex justify-content-center">
        <mau-responsive-button :onPositive="confirm"
                               :positiveName="'Confirmar eliminación'"
        >
        </mau-responsive-button>
    </div>
</template>

<script>
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  import {getApiRoute, ApiRouteTypes} from 'renderer/api/ApiRoutes'
  import {createRouteObjectPath} from 'renderer/services/api/RouteObject'
  import ChildTypes from 'renderer/api/ChildTypes'
  import Notifications from 'renderer/services/api/Notifications'
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
      this.entity = this.$store.getters.requestedEntity
    },
    components: {
    },
    methods: {
      confirm: function () {
        let _this = this
        ApiFunctions.del(getApiRoute(this.entityType, ApiRouteTypes.DEL), this.id, this.entity)
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
