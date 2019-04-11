<template>
    <div class="form-group">
        <div class="form-check"  v-for="(item, index) in availableObjects">
            <input
                    class="form-check-input"
                    :class="error !== '' ? 'is-invalid' : ''"
                    v-model="selectedObjectId"
                    type="radio"
                    :title="'radio-title' + name + index"
                    :id="'radio' + name + index"
                    :name="name"
                    :value="item[idName]">
            <label class="form-check-label" :for="'radio' + name + index">
                {{item[display]}}
            </label>
            <div v-show="error !== ''" class="invalid-feedback">
                <span class="help is-danger">
                  {{ error }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
    import GlobalEntityIdentifier from 'renderer/services/api/GlobalIdentifier'
    export default {
      name: 'MauFormInputRadio',
      data () {
        return {
          selectedObjectId: '',
          idName: GlobalEntityIdentifier
        }
      },
      props: {
        availableObjects: {
          type: Array,
          required: true
        },
        name: {
          type: String,
          required: true
        },
        initialObject: {
          type: Object,
          required: true
        },
        error: {
          required: {
            type: String,
            required: true
          }
        },
        display: {
          type: String,
          required: true
        }
      },
      created () {
        if (this.initialObject[GlobalEntityIdentifier]) {
          this.selectedObjectId = this.initialObject[GlobalEntityIdentifier]
        }
      },
      watch: {
        selectedObjectId: function () {
          let foundObject = this.availableObjects.find(availableObj => { return availableObj[GlobalEntityIdentifier] === this.selectedObjectId })
          this.$emit('input', foundObject)
        }
      }
    }
</script>

<style lang="scss" scoped>
    .form-check-label {
        font-weight: 100;
        font-size: 0.8rem;
    }
</style>