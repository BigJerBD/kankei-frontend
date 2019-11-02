<template>
  <div class="AppContainer">
    <graph-control-panel/>
    <div id="visual-panel">
      <div id="canvas-tooltip" class="tooltip_button">
        <div>?</div>
        <span class="ttooltiptext">
          You can doubleclick on
          <br> <b>Kanji</b> and <b>Words</b>
          <br> to see what is around them !
        </span>
      </div>
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
      this.renderWithEvent();
    },
    renderWithEvent() {
      canvas.render();
      canvas.addEvent('doubleClick', async (payload) => {
        const nodeId = (payload.nodes.length > 0) ? payload.nodes[0] : null;
        const nodeInfo = canvas.getNode(nodeId);

        if (nodeInfo.labels.includes('Kanji')) {
          const resultInfo = await runGet(`${process.env.VUE_APP_BACKEND_URL}/api/info/kanji`, { value: nodeInfo.label });
          this.undoStack.push(canvas.rawData);
          canvas.clearNetwork();
          this.$eventBus.$emit('undo-empty', false);
          canvas.setData(resultInfo);
          this.renderWithEvent(canvas);
        } else if (nodeInfo.labels.includes('Word')) {
          const resultInfo = await runGet(`${process.env.VUE_APP_BACKEND_URL}/api/info/word`, { value: nodeInfo.label });
          canvas.clearNetwork();
          this.undoStack.push(canvas.rawData);
          this.$eventBus.$emit('undo-empty', false);
          canvas.setData(resultInfo);
          this.renderWithEvent(canvas);
        }
      });
    },
    undo() {
      if (this.undoStack.length !== 0) {
        const lastFrame = this.undoStack.pop();
        canvas.clearNetwork();
        canvas.setData(lastFrame);
        this.renderWithEvent(canvas);
      }
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
    this.$eventBus.$on('undo-run', (payload) => {
      console.debug(payload);
      this.undo();
      if (this.undoStack.length === 0) {
        this.$eventBus.$emit('undo-empty', true);
      }
    });
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
      undoStack: [],
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

  .AppContainer {
    color: white;
    font-size: 18px;
  }

  #canvas {
    width: 100%;
    height: 100%;
  }

  #canvas-tooltip {
    top: 10px;
    position: absolute;
    right: 0px;
    margin:  10px 30px 20px 20px;
    padding: 3px 12px;
    z-index: 101;
  }

  #canvas-tooltip .ttooltiptext {
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
    margin-left: -280px;
    margin-top: -30px;

  }

  #canvas-tooltip:hover .ttooltiptext {
    visibility: visible;
  }
</style>
