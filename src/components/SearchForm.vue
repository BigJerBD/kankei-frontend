<template>
  <div class="search-form">
    <h3 class="kankei-header"><b>{{title}}</b></h3>

    <div class="search-form-field ">
      <b-form-input v-model="searchInput"></b-form-input>
    </div>
    <button class="search-button" @click="handleSearch"> Search</button>
    <div class="hit-list" v-bind:id="hitlistId">
      <div class="hit-element"
           v-for="hit in hits"
           v-bind:key="hit.writing"
           @click="handleSelect"
           :data-hit="hit.writing">
        <div class="hit-writing" v-html="formatWritingCallback(hit['writing'])">
        </div>

        <template v-if="meaningFirst">
          <div class="hit-meaning" v-html="formatMeaningCallback(hit['meanings'])">
          </div>
          <div class="hit-reading" v-html="formatReadingCallback(hit['readings'])">
          </div>
        </template>
        <template v-else>
          <div class="hit-reading" v-html="formatReadingCallback(hit['readings'])">
          </div>
          <div class="hit-meaning" v-html="formatMeaningCallback(hit['meanings'])">
          </div>
        </template >

      </div>
    </div>

  </div>

</template>

<script>
export default {
  name: 'SearchForm',
  props: {
    title: String,
    hitlistId: String,
    searchCallback: Function,
    selectCallback: Function,
    formatReadingCallback: {
      type: Function,
      default: (x) => x,
    },
    formatMeaningCallback: {
      type: Function,
      default: (x) => x,
    },
    formatWritingCallback: {
      type: Function,
      default: (x) => x,
    },
    meaningFirst: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      hits: [],
      currentlySelected: null,
      searchInput: '',
    };
  },
  methods: {
    async handleSearch() {
      if (this.searchInput) {
        console.info('sending search');
        this.hits = await this.searchCallback(this.searchInput);
        document.getElementById(this.hitlistId).scrollTop = 0;
      }
    },
    async handleSelect(event) {
      const kanji = (event.target.className === 'hit-element')
        ? event.target.dataset.hit : event.target.parentNode.dataset.hit;
      this.selectCallback(kanji);
    },
  },

};
</script>

<style>

  .search-form-field {
    margin-top: 15px;
    margin-bottom: 15px;
  }
</style>
