<template>
  <search-form
    id="KanjiSearchForm"
    :hitlist-id="'KanjiSearchFormHitList'"
    :tooltipOptions="['kanji','reading','word','meaning']"
    :title="'Search kanji'"
    :search-callback="searchKanji"
    :select-callback="forwardToCanvas"
    :format-reading-callback="splitOnKun"
    :format-meaning-callback="(val) => val.join()"
    :meaning-first="true"
  />
</template>

<script>
import SearchForm from './SearchForm.vue';
import { runGet } from '../tools/querying';

export default {
  name: 'KanjiSearchForm',
  components: {
    SearchForm,
  },
  methods: {
    searchKanji(val) {
      return runGet(`${process.env.VUE_APP_BACKEND_URL}/api/search/kanji`, { value: val });
    },
    async forwardToCanvas(val) {
      const resultInfo = await runGet(`${process.env.VUE_APP_BACKEND_URL}/api/info/kanji`, { value: val });
      console.log(resultInfo);
      if (resultInfo) {
        this.$eventBus.$emit('graph-result', {
          result: resultInfo,
          linkColoringTypes: {
            HasMeaning: 'Meaning',
            HasReading: 'Reading',
            HasCharacter: 'Word',
          },
        });
      }
    },
    splitOnKun(val) {
      return `On: ${val.onyomi}  <br> Kun: ${val.kunyomi}`;
    },
  },
};
</script>

<style>

  #KanjiSearchForm.search-form {
    padding-left: 5px;
    padding-top: 10px;
    padding-right: 25px;
    scrollbar-color: rgb(98, 131, 203) rgb(78, 111, 183);
    transition: opacity 2s ease 2s;
  }

  #KanjiSearchForm .search-button {
    transition: all 0.20s ease 0s;
    color: white;
    bottom: 0;
    margin: -10px 0px 0px 0px;
    padding: 3px 5px 3px 5px;
    border-radius: 10px;
    border-width: 0px;
    background-color: #66B245;
  }

  #KanjiSearchForm .search-button:hover {
    background-color: #7ecd48;
  }

  #KanjiSearchForm .hit-list {
    width: 300px;
    left: 0px;
    padding-left: 20px;
    margin-left: -25px;
    margin-top: 20px;
    overflow-y: auto;
    height: calc(100vh - var(--kankei-header-height) - var(--kankei-searchpanel-height));
  }

  #KanjiSearchForm .hit-writing {
    font-size: 45px;
  }

  #KanjiSearchForm .hit-element {
    padding-top: 10px;
    border-top-style: solid;
    border-top-color: rgb(68, 97, 160);
    border-top-width: 1px;
    padding-left: 20px;
    padding-bottom: 7px;
    margin-left: -25px;
    transition: all 0.30s ease 0s;
  }

  #KanjiSearchForm .hit-element:hover {
    background-color: rgb(65, 90, 145);
  }

  #KanjiSearchForm .hit-meaning {
    margin-top: -65px;
    margin-left: 60px;
    font-size: 20px;
  }

  #KanjiSearchForm .hit-reading {
    font-size: 20px;
    margin-left: 60px;
  }

</style>
