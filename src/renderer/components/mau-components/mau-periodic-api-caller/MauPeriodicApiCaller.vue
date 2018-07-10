<template>
  <div>

  </div>
</template>

<script>
  import ApiFunctions from 'renderer/services/api/ApiOperations'
  export default {
    name: 'MauPeriodicApiCaller',
    data () {
      return {
        interval: null
      }
    },
    computed: {

    },
    props: {
      callback: {
        type: Function,
        required: true
      },
      url: {
        type: String,
        required: true
      },
      seconds: {
        type: Number,
        default: function () {
          return 3000
        }
      }
    },
    created () {
      this.periodicFunction()
      let self = this
      this.interval = setInterval(function () {
        self.periodicFunction()
      }, self.seconds)
    },
    components: {
    },
    methods: {
      periodicFunction: function () {
        ApiFunctions.get(this.url)
          .then(
            result => {
              this.callback(result)
            })
          .catch(
            error => {
              console.log(error)
            }
          )
      }
    },
    beforeDestroy: function () {
      clearInterval(this.interval)
    }
  }
</script>

<style lang="scss">

</style>
