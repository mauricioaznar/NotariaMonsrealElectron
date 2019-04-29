<template>
    <div>
        <vue-select
                v-model="selected"
                :multiple="multiselect"
                :label="label"
                :onSearch="search"
                :track-by="'id'"
                :options="options">
            <template slot="option" slot-scope="option">
                {{option[label]}}
            </template>
            <span slot="no-options">No se encontraron resultados.</span>
        </vue-select>
    </div>
</template>

<script>
    import VueSelect from 'vue-select'
    import cloneDeep from 'renderer/services/common/cloneDeep'
    import ApiOperations from 'renderer/services/api/ApiOperations'
    import isObjectEmpty from 'renderer/services/common/isObjectEmpty'
    import _ from 'lodash'
    export default {
      name: 'MauFormInputSelectObjectDynamic',
      data () {
        return {
          selected: null,
          options: []
        }
      },
      props: {
        url: {
          type: String,
          required: true
        },
        label: {
          type: String,
          default: function () {
            return 'name'
          }
        },
        multiselect: {
          type: Boolean,
          default: function () {
            return false
          }
        },
        initialObject: {
          type: Object,
          default: function () {
            return {}
          }
        },
        initialObjects: {
          type: Array,
          default: function () {
            return []
          }
        },
        filterExacts: {
          type: Object,
          default: function () {
            return {}
          }
        },
        filterLikes: {
          type: Object,
          default: function () {
            return {}
          }
        },
        filterEntity: {
          type: String,
          default: function () {
            return ''
          }
        }
      },
      created () {
        if (this.multiselect === false) {
          this.selected = isObjectEmpty(this.initialObject) ? '' : this.initialObject
        } else {
          this.selected = cloneDeep(this.initialObjects)
        }
        ApiOperations.get(this.url, this.filterLikes, this.filterExacts, this.filterEntity).then(res => {
          this.options = res
        }).catch(e => {
          console.log(e)
        })
      },
      components: {
        VueSelect
      },
      methods: {
        search: function (search, loading) {
          if (this.url) {
            loading(true)
            this.getOptions(search, loading, this)
          }
        },
        getOptions: _.debounce((search, loading, vm) => {
          ApiOperations.get(vm.url, vm.filterLikes, vm.filterExacts, vm.filterEntity).then(res => {
            vm.options = res
            loading(false)
          }).catch(e => {
            console.log(e)
          })
        }, 250)
      },
      watch: {
        selected: function (newValue) {
          this.$emit('input', newValue)
        },
        initialObject: function (newInitialObject) {
          this.selected = isObjectEmpty(this.initialObject) ? '' : newInitialObject
        }
      }
    }
</script>

<style lang="scss">
    @import "../../../sass/variables";
    @import "../../../sass/material-forms";
    .v-select {
        position: relative;
        font-family: sans-serif;
        width: 100%;
    }
    .v-select,
    .v-select * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
    /* Rtl support */
    .v-select.rtl .open-indicator {
        left: 10px;
        right: auto;
    }
    .v-select.rtl .selected-tag {
        float: right;
        margin-right: 3px;
        margin-left: 1px;
    }
    .v-select.rtl .dropdown-menu {
        text-align: right;
    }
    .v-select.rtl .dropdown-toggle .clear {
        left: 30px;
        right: auto;
    }
    /* Open Indicator */
    .v-select .open-indicator {
        position: absolute;
        bottom: 6px;
        right: 10px;
        display: inline-block;
        cursor: pointer;
        pointer-events: all;
        transition: all 150ms cubic-bezier(1.000, -0.115, 0.975, 0.855);
        transition-timing-function: cubic-bezier(1.000, -0.115, 0.975, 0.855);
        opacity: 1;
        height: 20px; width: 10px;
    }
    .v-select .open-indicator:before {
        border-color: rgba(60, 60, 60, .5);
        border-style: solid;
        border-width: 3px 3px 0 0;
        content: '';
        display: inline-block;
        height: 10px;
        width: 10px;
        vertical-align: top;
        transform: rotate(133deg);
        transition: all 150ms cubic-bezier(1.000, -0.115, 0.975, 0.855);
        transition-timing-function: cubic-bezier(1.000, -0.115, 0.975, 0.855);
        box-sizing: inherit;
    }
    /* Open Indicator States */
    .v-select.open .open-indicator:before {
        transform: rotate(315deg);
    }
    .v-select.loading .open-indicator {
        opacity: 0;
    }
    .v-select.open .open-indicator {
        bottom: 1px;
    }
    /* Dropdown Toggle */
    .v-select .dropdown-toggle {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        display: block;
        padding: 0;
        border: 1px solid rgba(221, 221, 221, .26);
        border-radius: 4px;
        white-space: normal;
    }
    .v-select .dropdown-toggle:after {
        visibility: hidden;
        display: block;
        font-size: 0;
        content: " ";
        clear: both;
        height: 0;
    }
    /* Clear Button */
    .v-select .dropdown-toggle .clear {
        position: absolute;
        bottom: 9px;
        right: 30px;
        font-size: 23px;
        font-weight: 700;
        line-height: 1;
        color: rgba(60, 60, 60, .5);
        padding: 0;
        border: 0;
        background-color: transparent;
        cursor: pointer;
    }
    /* Dropdown Toggle States */
    .v-select.searchable .dropdown-toggle {
        cursor: text;
    }
    .v-select.unsearchable .dropdown-toggle {
        cursor: pointer;
    }
    .v-select.open .dropdown-toggle {
        border-bottom-color: transparent;
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
    /* Dropdown Menu */
    .v-select .dropdown-menu {
        display:block;
        position: absolute;
        top: 100%;
        left: 0;
        z-index: 1000;
        min-width: 160px;
        padding: 5px 0;
        margin: 0;
        width: 100%;
        overflow-y: scroll;
        border: 1px solid rgba(0, 0, 0, .26);
        box-shadow: 0px 3px 6px 0px rgba(0,0,0,.15);
        border-top: none;
        border-radius: 0 0 4px 4px;
        text-align: left;
        list-style: none;
        background: #fff;
    }
    .v-select .no-options {
        text-align: center;
    }
    /* Selected Tags */
    .v-select .selected-tag {
        color: #333;
        background-color: #f0f0f0;
        border: 1px solid #ccc;
        border-radius: 4px;
        height: 26px;
        margin: 4px 1px 0px 3px;
        padding: 1px 0.25em;
        float: left;
        line-height: 24px;
    }
    .v-select.single .selected-tag {
        background-color: transparent;
        border-color: transparent;
    }
    .v-select.single.open .selected-tag {
        position: absolute;
        opacity: .5;
    }
    .v-select.single.open.searching .selected-tag,
    .v-select.single.loading .selected-tag {
        display: none;
    }
    .v-select .selected-tag .close {
        float: none;
        margin-right: 0;
        font-size: 20px;
        appearance: none;
        padding: 0;
        cursor: pointer;
        background: 0 0;
        border: 0;
        font-weight: 700;
        line-height: 1;
        color: #000;
        text-shadow: 0 1px 0 #fff;
        filter: alpha(opacity=20);
        opacity: .2;
    }
    .v-select.single.searching:not(.open):not(.loading) input[type="search"] {
        opacity: .2;
    }
    /* Search Input */
    .v-select input[type="search"]::-webkit-search-decoration,
    .v-select input[type="search"]::-webkit-search-cancel-button,
    .v-select input[type="search"]::-webkit-search-results-button,
    .v-select input[type="search"]::-webkit-search-results-decoration {
        display: none;
    }
    .v-select input[type="search"]::-ms-clear {
        display: none;
    }
    .v-select input[type="search"],
    .v-select input[type="search"]:focus {
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        line-height: 1.42857143;
        font-size:1em;
        height: 34px;
        display: inline-block;
        border: none;
        outline: none;
        margin: 0;
        padding: 0 .5em;
        width: 10em;
        max-width: 100%;
        background: none;
        position: relative;
        box-shadow: none;
    }
    .v-select.unsearchable input[type="search"] {
        opacity: 0;
    }
    .v-select.unsearchable input[type="search"]:hover {
        cursor: pointer;
    }
    /* List Items */
    .v-select li {
        line-height: 1.42857143; /* Normalize line height */
    }
    .v-select li > a {
        display: block;
        padding: 3px 20px;
        clear: both;
        color: $body-color !important; /* Overrides most CSS frameworks */
        white-space: nowrap;
    }
    .v-select li:hover {
        cursor: pointer;
    }
    .v-select .dropdown-menu .active > a {
        color: #333;
        background: rgba(50, 50, 50, .1);
    }
    .v-select .dropdown-menu > .highlight > a {
        /*
         * required to override bootstrap 3's
         * .dropdown-menu > li > a:hover {} styles
         */
        background: $brand-primary !important;
        color: #fff;
    }
    .v-select .highlight:not(:last-child) {
        margin-bottom: 0; /* Fixes Bulma Margin */
    }
    .v-select .spinner,
    .v-select .spinner:after {
        border-radius: 50%;
        width: 5em;
        height: 5em;
    }
</style>