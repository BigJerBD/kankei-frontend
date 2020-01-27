<template>
  <div class="RectangleButton">
    <div id="box">
    <div id=text >{{text}}</div>
    <span v-if="textTooltip" id="tooltipText" v-html="textTooltip">
    </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RectangleButton',
  props: {
    text: String,
    textTooltip: String,
    clickCallBack: {
      type: Function,
      default: (x) => x,
    },
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style>
 .RectangleButton {
     background: rgb(65, 90, 145);
    -moz-border-radius: 70px;
    -webkit-border-radius: 70px;
    border-radius: 5px;
    padding-left: 12px;
    padding-right: 12px;
    padding-top: 3px;
    user-select: none;
 }

 .RectangleButton #tooltipText {
    visibility: hidden;
    background-color: rgb(65, 90, 145);
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px 0;

    /* Position the tooltip */
    position: absolute;
    z-index: 100;

    width: 250px;
    /* todo move */
    margin-left: -280px;
    margin-top: -30px;
  }

  .RectangleButton:hover #tooltipText {
    visibility: visible;
  }

</style>
