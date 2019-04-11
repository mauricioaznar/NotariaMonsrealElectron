<template>
    <div>
        <input type="checkbox" v-model="check">
    </div>
</template>


<script>
    export default {
      name: 'MauFormInputCheckBox',
      data () {
        return {
          check: false
        }
      },
      props: {
        initialValue: {
          required: true,
          type: Number
        }
      },
      created () {
        if (this.initialValue === 0) {
          this.check = false
        } else if (this.initialValue === 1) {
          this.check = true
        }
      },
      watch: {
        check: function () {
          if (this.check) {
            this.$emit('input', 1)
          } else {
            this.$emit('input', 0)
          }
        }
      }
    }
</script>