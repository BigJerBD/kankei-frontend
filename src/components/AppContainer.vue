<template>
  <div class="AppContainer">
    <graph-control-panel/>
    <div id="visual-panel">
      <div id="canvas"></div>
    </div>
  </div>
</template>

<script>
import GraphControlPanel from './GraphControlPanel.vue';
import '../styles/BaseStyle.css';
import GraphViz from '../tools/graphviz/graphviz';
import { runGet } from '../tools/querying';

import 'vis-network/dist/vis-network.css';

let canvas;
export default {
  name: 'AppContainer',
  components: {
    GraphControlPanel,
  },
  methods: {
    draw_data(
      datadict,
      shownProperties = this.defaultShownProperties,
      nodeColoringTypes = this.defaultNodeColoringTypes,
      linkColoringTypes,
    ) {
      if (canvas) {
        canvas.clearNetwork();
      }

      canvas = new GraphViz({
        data: datadict,
        container_id: 'canvas',
        node: {
          labelMap: shownProperties.nodes,
          groups: nodeColoringTypes,
        },
        edge: {
          labelMap: shownProperties.relationships,
          groups: linkColoringTypes,
        },
      });

      canvas.render();
    },
  },

  async mounted() {
    try {
      const result = await runGet(`${process.env.VUE_APP_BACKEND_URL}/api/graph_info`);
      this.defaultNodeColoringTypes = result.coloring_types;
      this.defaultShownProperties = result.shown_properties;
    } catch (err) {
      console.error(`could not fetch graph visualiation defaultinfo : ${err}`);
    }
    console.log(process.env);
    this.$eventBus.$on('graph-result', (payLoad) => {
      console.debug(payLoad);
      if (payLoad.result) {
        this.noDataReceived = false;
        this.draw_data(
          payLoad.result,
          payLoad.shownProperties,
          payLoad.nodeColoringTypes,
          payLoad.linkColoringTypes,
        );
      } else {
        this.noDataReceived = true;
        if (canvas) {
          canvas.cleanup();
        }
      }
    });
  },
  data() {
    return {
      noDataReceived: false,
      defaultColoringTypes: [],
      defaultShownProperties: [],
    };
  },

};
</script>

<style>

  #visual-panel {
    box-shadow: inset 0 25px 18px -25px rgba(0, 0, 0, 0.75);
    width: 100%;
    height: calc(100% - 80px);
    border-right: 2px;

    position: absolute;
    z-index: 10;
  }

  #canvas {
    width: 100%;
    height: 100%;
  }


</style>
