<template>
    <div v-if="isUserDefined">
        <mau-editor :id="id" v-model="comment" :initialValue="initialComment"></mau-editor>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import isDefined from 'renderer/services/common/isDefined'
    import UserPropertiesReference from 'renderer/api/pages/user/PropertiesReference'
    import DocumentCommentPropertiesReference from '../DocumentCommentPropertiesReference'
    import {globalEntityIdentificator} from 'renderer/config'
    export default {
      name: 'CommentInput',
      data () {
        return {
          comment: '',
          initialComment: '',
          initialCommentObject: {}
        }
      },
      props: {
        commentObjects: {
          type: Array,
          required: true
        },
        id: {
          required: true
        }
      },
      computed: {
        ...mapState({
          user: state => state.api.auth.user
        }),
        isUserDefined: function () {
          return isDefined(this.user)
        }
      },
      created () {
        this.getUserComment()
      },
      watch: {
        user: function () {
          this.getUserComment()
        },
        comment: function (newComment) {
          if (!this.isUserDefined) {
            return
          }
          let commentStructuredObj = {}
          let crudOperations = {
            create: [],
            edit: [],
            del: []
          }
          commentStructuredObj[DocumentCommentPropertiesReference.COMMENT.name] = newComment
          commentStructuredObj[DocumentCommentPropertiesReference.USER.relationship_id_name] = this.user[globalEntityIdentificator]
          let initialCommentId = isDefined(this.initialCommentObject) ? this.initialCommentObject[globalEntityIdentificator] : null
          let hasCommentChanged = this.initialComment !== this.comment
          if (initialCommentId && hasCommentChanged) {
            commentStructuredObj[globalEntityIdentificator] = initialCommentId
            crudOperations.edit.push(commentStructuredObj)
          } else if (this.comment !== '' && hasCommentChanged) {
            crudOperations.create.push(commentStructuredObj)
          }
          this.$emit('input', crudOperations)
        }
      },
      methods: {
        getUserComment: function () {
          if (isDefined(this.user)) {
            this.initialCommentObject = this.commentObjects.find((commentObj) => {
              return commentObj[UserPropertiesReference.ID.relationship_id_name] === this.user[globalEntityIdentificator]
            })
            if (isDefined(this.initialCommentObject)) {
              this.initialComment = this.initialCommentObject[DocumentCommentPropertiesReference.COMMENT.name]
            }
          }
        }
      }
    }
</script>