<template>
    <div>
        <div>
            <b-button @click="resetPassword" type="button" variant="primary">Reiniciar contraseña</b-button>
        </div>
    </div>
</template>

<script>
    import PropertiesReference from 'src/api/pages/user/PropertiesReference'
    import ApiOperations from 'src/services/api/ApiOperations'
    import {getApiRoute, ApiRouteTypes} from 'src/api/ApiRoutes'
    import Notifications from 'src/services/api/Notifications'
    import EntityTypes from 'src/api/EntityTypes'
    export default {
      name: 'UserResetPassword',
      data () {
        return {

        }
      },
      methods: {
        resetPassword: function () {
          ApiOperations.create(getApiRoute(EntityTypes.AUTH, ApiRouteTypes.RESET), {email: this.user[PropertiesReference.EMAIL.name]}).then(result => {
            Notifications.info(this, 'Contraseña ha sido restablecida correctamente. Cheque su correo.')
          }).catch(e => {
            Notifications.info(this, 'Hubo un problema con el email')
          })
        }
      },
      props: {
        user: {
          type: Object,
          required: true
        }
      }
    }
</script>