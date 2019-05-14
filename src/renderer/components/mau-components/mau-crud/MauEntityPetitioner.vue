<template>
    <div>

    </div>
</template>

<script>
  import GenericApiOperations from 'renderer/services/api/GenericApiOperations'
  export default {
    name: 'MauEntityPetitioner',
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
      }
    },
    created () {
      GenericApiOperations.getById(this.entityType.name, this.id).then(result => {
        this.entity = result
      })
    },
    components: {
    },
    methods: {
    },
    watch: {
      entity: function (entityObj) {
        this.$emit('entityResult', entityObj)
      }
    }
  }
</script>
