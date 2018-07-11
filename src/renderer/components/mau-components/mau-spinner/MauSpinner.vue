<template>
    <div
            class="mau-spinner"
            :class="{
                'small': small,
                'medium': medium,
                'tall': tall
            }"
    >
        <!--<hollow-dots-spinner-->
                <!--:animation-duration="750"-->
                <!--:dot-size="10"-->
                <!--:dots-num="5"-->
                <!--color="#263E66"-->
                <!--ref="preLoader"-->
                <!--class="pre-loader">-->
        <!--</hollow-dots-spinner>-->
    </div>
</template>

<script>
  //  import {HollowDotsSpinner} from 'epic-spinners'
  export default {
    name: 'MauSpinner',
    data () {
      return {}
    },
    props: {
      small: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      medium: {
        type: Boolean,
        default: function () {
          return false
        }
      },
      tall: {
        type: Boolean,
        default: function () {
          return false
        }
      }
    },
    components: {
      //      HollowDotsSpinner
    }
  }
</script>

<style lang="scss">
    @import "../../../sass/variables";
    .mau-spinner {
        position: relative;
        &.tall {
            height: 90vh;
        }
        &.medium {
            height: 70vh;
        }
        &.small {
            height: 40vh;
        }
    }
    .pre-loader {
        position: absolute;
        left: $vuestic-preloader-left;
        top: $vuestic-preloader-top;
    }
</style>