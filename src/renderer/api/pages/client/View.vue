<template>
  <div class="container">
    <mau-crud-view>
      <template slot-scope="params">
        <persona-view :persona="params.entity"></persona-view>
      </template>
    </mau-crud-view>
  </div>
</template>

<script>
  import PersonaView from 'renderer/api/components/generic/persona/PersonaView.vue'
  export default {
    name: 'ViewClient',
    data () {
      return {
      }
    },
    components: {
      PersonaView
    },
    props: {
      id: null
    }
  }
</script>

<style lang="scss">

</style>
