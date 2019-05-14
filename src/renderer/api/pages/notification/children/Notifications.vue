<template>
    <div>
        <mau-spinner :medium="true" v-show="isDataLoading"></mau-spinner>
        <b-card-group class="mau-fade-component" v-if="!isDataLoading" :class="{'is-loaded': !isDataLoading}" columns>
            <b-card v-for="notification in notifications"
                    :key="notification.id"
                    bg-variant="primary"
                    text-variant="white">
                    <h2>
                        {{notification.title}}
                    </h2>
                    <p>
                        {{notification.description}}
                    </p>
                    <footer>
                        <small>{{notification.created_at}}</small>
                    </footer>
            </b-card>
        </b-card-group>
    </div>
</template>

<script>
    import SpecificApiOperations from 'renderer/services/api/SpecificApiOperations'
    export default {
      data () {
        return {
          notifications: '',
          isDataLoading: true
        }
      },
      created () {
        this.isDataLoading = true
        SpecificApiOperations.getNotifications().then(result => {
          this.notifications = result.data
          this.isDataLoading = false
        })
      }
    }
</script>
