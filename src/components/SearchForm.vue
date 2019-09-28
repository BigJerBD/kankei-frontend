<template>
  <div class="search-form">
    <h3 class="kankei-header"><b>{{title}}</b></h3>

    <div class="search-form-field ">
      <b-form-input v-model="searchInput"></b-form-input>
    </div>
    <div style="display: flex;padding-top: 10px;">
      <button class="search-button" @click="handleSearch"> Search</button>
      <div class="tooltip_button">
        <div>?</div>
        <span class="tooltiptext">
          <b>{{ tooltipOptions.map((x) => '#' + x).join(", ")}}</b> <br>Can be added to your search
        </span>
      </div>
    </div>


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
        </template>

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
    tooltipOptions: Array,
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

  .tooltip_button {
    background: rgb(65, 90, 145);
    -moz-border-radius: 70px;
    -webkit-border-radius: 70px;
    border-radius: 5px;
    margin-left: 125px;
    margin-top: -10px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 3px;

    user-select: none;
  }

  .search-form-field {
    margin-top: 15px;
    margin-bottom: 15px;
  }


  .tooltip_button .tooltiptext {
    visibility: hidden;
    width: 250px;
    background-color: rgb(65, 90, 145);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 1;

    margin-left: 30px;
    margin-bottom: 0px;
    margin-top: -70px;

  }

  .tooltip_button:hover .tooltiptext {
    visibility: visible;
  }
</style>
