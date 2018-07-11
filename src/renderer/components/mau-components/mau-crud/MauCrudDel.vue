<template>
    <div>
        <mau-responsive-button :onPositive="del"
                               :positiveName="'Eliminar'"
        >
        </mau-responsive-button>
        <vuestic-modal :show.sync="show"
                       :ref="'confirmAction'"
                       v-on:ok="confirm"
        >
            <div slot="title">Desea realizar dicha accion</div>
        </vuestic-modal>
    </div>
</template>

<script>
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  import {getApiRoute, ApiRouteTypes} from 'renderer/api/ApiRoutes'
  import RouteObjectHelper from 'renderer/services/routeObject/RouteObjectHelper'
  import ChildTypes from 'renderer/api/ChildTypes'
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
      del: function () {
        this.$refs.confirmAction.open()
      },
      confirm: function () {
        let _this = this
        ApiFunctions.del(getApiRoute(this.entityType, ApiRouteTypes.DEL), this.id, this.entity)
          .then(
            result => {
              this.$notify({
                group: 'foo',
                type: 'success',
                title: 'Operacion exitosa',
                text: '<span class="fa fa-check"></span>'
              })
              if (this.callback) {
                this.callback()
              }
              setTimeout(function () {
                _this.$router.push(RouteObjectHelper.createPath(_this.entityType, ChildTypes.LIST))
              }, 2000)
            })
          .catch(
            error => {
              this.$notify({
                group: 'foo',
                type: 'danger',
                title: error,
                text: '<span class="fa fa-exclamation-circle"></span>'
              })
            }
          )
      }
    }
  }
</script>
