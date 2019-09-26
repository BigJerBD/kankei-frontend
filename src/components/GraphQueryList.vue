<template>
  <div class="graph-query-list">
    <div v-if="currentError" class="kankei-error">
      {{currentError}}
    </div>

    <BulmaAccordion
      :dropdown="true"
      :icon="'caret'"
      :caretAnimation="{duration: '.6s',timerFunc: 'ease-in-out',}"
      :slide="{duration: '.9s',timerFunc: 'ease',}"
      v-for="(list,grp) in queries"
      class="kankei-accordion"
      v-bind:key="grp">

      <BulmaAccordionItem class=kankei-acc-item>
        <i slot="icon" class="material-icons">_</i>
        <h4 slot="title" class="query-grp">{{grp}}</h4>
        <ul slot="content" class="query-list"
            v-for="(info,query_id) in list"
            v-bind:key="query_id">
          <a class="query-list-elem" @click="handleListItemClick" :data-query="query_id"
             :data-grp="grp"
             :data-info="info">{{query_id}}</a>
        </ul>
      </BulmaAccordionItem>
    </BulmaAccordion>
  </div>

</template>

<script>
import '../styles/BaseStyle.css';
import { BulmaAccordion, BulmaAccordionItem } from 'vue-bulma-accordion';
import { runGet } from '../tools/querying';

export default {
  name: 'GraphQueryList',
  components: {
    BulmaAccordion,
    BulmaAccordionItem,
  },
  data() {
    return {
      queries: {},
      currentlySelected: null,
      currentError: null,
    };
  },
  async mounted() {
    try {
      this.queries = await runGet(`${process.env.VUE_APP_BACKEND_URL}/api/queries_info`);
    } catch (err) {
      console.error(`could not fetch queries info : ${err}`);
      this.currentError = err;
    }

    this.$eventBus.$on('query-list', (payLoad) => {
      if (!payLoad && this.currentlySelected) {
        this.currentlySelected.classList.toggle('active');
        this.currentlySelected = null;
      }
    });
  },
  methods: {
    handleListItemClick(event) {
      event.target.classList.toggle('active');

      if (this.currentlySelected && this.currentlySelected !== event.target) {
        this.currentlySelected.classList.toggle('active');
      }

      if (this.currentlySelected !== event.target) {
        this.currentlySelected = event.target;
        this.$eventBus.$emit('query-form', this.createQueryForm(event));
      } else {
        this.currentlySelected = null;
        this.$eventBus.$emit('query-form', null);
      }
    },

    createQueryForm(event) {
      const { query } = event.target.dataset;
      const { grp } = event.target.dataset;
      return {
        name: query,
        group: grp,
        info: this.queries[grp][query],
      };
    },
  },
};

</script>

<style>
  /*noinspection CssUnknownProperty*/
  .graph-query-list {
    overflow-y: auto;
    position: fixed;
    height: calc(100vh - var(--kankei-header-height) - var(--kankei-navpanel-height));
    scrollbar-color: rgb(98, 131, 203) rgb(78, 111, 183);
  }

  #first-item {
    border-radius: 0px;
  }

  .query-grp {
    cursor: pointer;
  }

  .query-list {
    padding-top: 10px;
    padding-left: 20px;
  }

  .query-list-elem {
    cursor: pointer;
    transition: all 0.20s ease 0s;
    border-radius: 10px;
    padding: 8px 8px 8px 8px;
    user-select: none;
  }

  .query-list-elem:hover, .query-list-elem.active {
    background-color: #66B245;
    /*margin-right: 80px;*/
  }

  .card-header {
    background-color: rgb(78, 111, 183);
  }

  .card-footer {
    padding-top: 5px;
  }

  .card-header-icon {
    width: 25px;
    fill: white;

    margin-left: 200px;
    margin-top: -45px;
  }
</style>
