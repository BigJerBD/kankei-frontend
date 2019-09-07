<template>
  <search-form
    id="WordSearchForm"
    :hitlist-id="'WordSearchFormHitList'"
    :title="'Search word'"
    :search-callback="searchWord"
    :select-callback="forwardToCanvas"
    :format-reading-callback="(val) => val.join()"
    :format-meaning-callback="(val) => val.join()"
  />
</template>

<script>
import SearchForm from './SearchForm.vue';
import { runGet } from '../tools/querying';

export default {
  name: 'WordSearchForm',
  components: {
    SearchForm,
  },
  methods: {
    searchWord(val) {
      return runGet(`${process.env.VUE_APP_BACKEND_URL}/api/search/word`, { value: val });
    },
    async forwardToCanvas(val) {
      const resultInfo = await runGet(`${process.env.VUE_APP_BACKEND_URL}/api/info/word`, { value: val });
      console.log(resultInfo);
      if (resultInfo) {
        this.$eventBus.$emit('graph-result', {
          result: resultInfo,
          linkColoringTypes: {},
        });
      }
    },
  },
};
</script>

<style>

  #WordSearchForm.search-form {
    padding-left: 5px;
    padding-top: 10px;
    padding-right: 25px;
    scrollbar-color: rgb(98, 131, 203) rgb(78, 111, 183);
    transition: opacity 2s ease 2s;
  }

  #WordSearchForm .search-button {
    transition: all 0.20s ease 0s;
    color: white;
    bottom: 0;
    margin: -10px 0px 0px 160px;
    padding: 3px 5px 3px 5px;
    border-radius: 10px;
    border-width: 0px;
    background-color: #66B245;
  }

  #WordSearchForm .search-button:hover {
    background-color: #7ecd48;
  }

  #WordSearchForm .hit-list {
    width: 300px;
    left: 0px;
    padding-left: 20px;
    margin-left: -25px;
    margin-top: 20px;
    overflow-y: auto;
    height: calc(100vh - var(--kankei-header-height) - var(--kankei-searchpanel-height));
  }

  #WordSearchForm .hit-writing {
    font-size: 30px;
  }

  #WordSearchForm .hit-element {
    padding-top: 10px;
    border-top-style: solid;
    border-top-color: rgb(68, 97, 160);
    border-top-width: 1px;
    padding-left: 20px;
    padding-bottom: 7px;
    margin-left: -30px;
    transition: all 0.30s ease 0s;
  }

  #WordSearchForm .hit-element:hover {
    background-color: rgb(65, 90, 145);
  }

  #WordSearchForm .hit-meaning {
    font-size: 20px;
    margin-left: 0px;
  }

  .hit-reading {
    font-size: 20px;
    margin-left: 0px;
  }

</style>
