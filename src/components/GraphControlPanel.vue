<template>
  <div>
    <div id="GraphControlPanel" v-bind:class="{active:isActive}">
      <b-card no-body class="panel-box nav-panel">
        <b-tabs pills card>
          <b-tab title="" active>
            <div slot="title" class="kankei-tab" id="SearchTab"></div>
            <h3 class="kankei-header"><b>Queries</b></h3>
            <graph-query-list v-bind:style="{ paddingRight : ScrollBarAlign + 'px' }"/>
          </b-tab>
          <b-tab title="">
            <div slot="title" class="kankei-tab" id="KanjiTab"></div>
            <kanji-search-form/>
          </b-tab>

          <b-tab title="">
            <div slot="title" class="kankei-tab" id="WordTab"></div>
            <word-search-form/>
          </b-tab>

        </b-tabs>
        <div @click='toggle()' id="ControlPanelCloseButton">X</div>
        <div @click='toggle()'
             id="ControlPanelOpenButton"
             class="arrow-button"
             v-bind:class="{active:isActive}">
          <div class="arrow-cover">
            <div class="arrow-right"></div>
          </div>
        </div>

      </b-card>
    </div>
    <graph-query-form id="GraphQueryForm"/>
  </div>
</template>

<script>
import '../styles/BaseStyle.css';
import GraphQueryList from './GraphQueryList.vue';
import GraphQueryForm from './GraphQueryForm.vue';
import KanjiSearchForm from './KanjiSearchForm.vue';
import WordSearchForm from './WordSearchForm.vue';

export default {
  name: 'GraphControlPanel',
  components: {
    GraphQueryList,
    GraphQueryForm,
    KanjiSearchForm,
    WordSearchForm,
  },
  methods: {
    toggle() {
      this.isActive = !this.isActive;
    },
  },
  data() {
    return {
      isActive: true,
      // used to fix chrome-firefox bar allignement problem
      ScrollBarAlign: (navigator.appVersion.indexOf('Chrome/') !== -1) ? '0' : '15',
    };
  },
};
</script>

<style>

  /* CONTAINER */

  #GraphControlPanel {
    display: flex;
    box-shadow: -20px 0px 20px 25px rgba(0, 0, 0, 0.75);
    flex-direction: column;
    background-color: rgb(78, 111, 183);
    color: white;
    font-size: 18px;
    height: calc(100% - 80px);
    width: 300px;
    z-index: 50;
    position: absolute;
    left: 0px;

    transition: all 1s ease;
  }

  #GraphControlPanel:not(.active) {
    left: -300px
  }

  #GraphControlPanel:not(.active) + #GraphQueryForm {
    left: -300px;
    transition: all 1.0s ease;
  }

  #GraphControlPanel:not(.active) + #GraphQueryForm .query-state-msg {
    left:0vh;
    transition: all 1.0s ease;
  }

  .nav-panel {
    background-color: rgb(78, 111, 183);
    padding-top: 20px;
  }

  #GraphQueryForm {
    display: flex;
    box-shadow: -20px 0px 20px 25px rgba(0, 0, 0, 0.75);
    flex-direction: column;
    background-color: white;
    font-size: 20px;
    height: calc(100% - 80px);
    width: 300px;
    z-index: 25;
    position: absolute;
    left: 300px;
    color: rgb(65, 90, 145);
    transition: all 1s ease-out;
  }

  #GraphQueryForm:not(.active) {
    left: -300px
  }

  /* TABS */
  .nav-pills .nav-link.active, .nav-link:hover {
    transition: all 0.20s ease 0s;
    background-color: rgb(65, 90, 145);
    color: rgb(65, 90, 145);
  }

  .nav-pills .nav-link {
    border-radius: 10px;
    height: 60px;
    width: 60px;
  }

  .nav-item {
    padding-right: 12px;
    padding-left: 12px;
    padding-bottom: 10px;
  }

  .kankei-tab {
    height: 50px;
    width: 50px;
    margin-left: -12px;
    margin-top: -2px;
  }

  #SearchTab {
    background-image: url("../assets/icon-queries.png");
    background-size: 52px;
  }

  #KanjiTab {
    margin-left: -10px;
    background-image: url("../assets/icon-kanji.png");
    background-size: 50px;

  }

  #WordTab {
    margin-left: -10px;
    background-image: url("../assets/icon-words.png");
    background-size: 50px;

  }

  .kankei-header {
    user-select: none;
  }

  /* Accordion */
  .kankei-acc-item .accordion-body {
    background-color: rgb(78, 111, 183);
  }

  .kankei-acc-item .card-header {
    padding-top: 15px;
    background-color: rgb(78, 111, 183);
    user-select: none;
  }

  .kankei-acc-item .card-header:first-child {
    border-radius: 0 0 0 0;
  }

  .kankei-acc-item .accordion-body .card-footer {
    background-color: rgb(78, 111, 183);
    border-top: 0px;
  }

  /* OPEN/CLOSE BUTTONS */

  #ControlPanelCloseButton {
    height: 25px;
    width: 25px;
    box-shadow: inset 0px 25px 18px -25px rgba(0, 0, 0, 0.75);
    background-color: rgb(55, 80, 135);
    color: rgb(78, 111, 183);
    position: absolute;
    text-align: center;
    top: 0;
    border-bottom-left-radius: 20%;
    right: 0;
    font-size: 18px;
    font-family: Roboto, sans-serif ;
    transition: all 0.1s ease 0s;
    user-select: none;
  }

  #ControlPanelCloseButton:hover {
    color: white;
  }

  /*this style should be over the arrow and all, so it has more control */
  #ControlPanelOpenButton {
    background-color: rgb(78, 111, 183);
    position: fixed;
    left: 0px;
    top: calc((100% + 80px) * 0.50);
    height: 60px;
    width: 35px;
    transition: all 1.0s ease 0s;
    border-width: 2px 3px 3px 0px;
    border-color: rgb(55, 80, 135);
    border-style: solid;

  }

  #ControlPanelOpenButton.active {
    left: -50px;
  }

  .arrow-button {
    border-radius: 0px 40% 40% 0px;
    background-color: rgb(78, 111, 183);
  }

  .arrow-right {
    transition: all 0.2s ease 0s;
    position: absolute;
    width: 55px;
    height: 55px;
    right: 15px;
    background: rgb(65, 90, 145);
    -webkit-transform: rotate(45deg);
    transform: rotate(45deg);
    border-radius: 5px;
  }

  .arrow-cover {
    position: absolute;
    height: 60px;
    width: 25px;
    overflow: hidden;
    margin-left: 6px;
  }

  #ControlPanelOpenButton:hover .arrow-cover .arrow-right {
    background-color: white;
  }
</style>
