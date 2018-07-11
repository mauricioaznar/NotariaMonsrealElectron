<template>
    <div>
        <div :class="innerPaddingClass" v-for="commentObj in commentObjects">
            <mau-card v-if="commentObj.comment !== ''" :title="commentObj.user.name + ' ' + commentObj.user.lastname" :body="commentObj.comment" :footer="commentObj.created_at"></mau-card>
        </div>
    </div>
</template>

<script>
    export default {
      name: 'CommentList',
      data () {
        return {

        }
      },
      props: {
        commentObjects: {
          type: Array,
          required: true
        },
        innerPaddingClass: {
          type: String,
          default: function () {
            return 'py-2'
          }
        }
      }
    }
</script>
