<template>
  <div class="AppContainer">
    <graph-control-panel/>
    <div id="visual-panel">
      <div id=topRightCorner>
        <rectangle-button
        id="canvasTooltip"
        :text="'?'"
        :textTooltip="'You can doubleclick on ' +
                      '<br> <b>Kanji</b> and <b>Words</b>   '+
                      '<br> to see what is around them !'"
      />
      </div>
      <div id="canvas"></div>
    </div>
  </div>
</template>

<script>
import GraphControlPanel from './GraphControlPanel.vue';
import RectangleButton from '../componentsDumb/RectangleButton.vue';
import '../styles/BaseStyle.css';
import GraphViz from '../tools/graphviz/graphviz';
import { runGet } from '../tools/querying';

import 'vis-network/dist/vis-network.css';

let canvas;
export default {
  name: 'AppContainer',
  components: {
    GraphControlPanel,
    RectangleButton,
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
    this.draw_data({});
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


  #topRightCorner {
    top: 10px;
    position: absolute;
    right: 0px;
    margin:  10px 30px 20px 20px;
    z-index: 100;
  }

  div.vis-network div.vis-navigation div.vis-button.vis-zoomExtends {
    background-image: url(../assets/icon-zoom-extends.png);
    right: 30px;
    bottom: 60px;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-zoomIn {
    background-image: url(../assets/icon-zoom-in.png);
    right: 30px;
    bottom: 20px;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-zoomOut {
    background-image: url(../assets/icon-zoom-out.png);
    right: 70px;
    bottom: 20px;
  }


 div.vis-network div.vis-navigation div.vis-button.vis-right {
    visibility: hidden;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-left {
    visibility: hidden;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-down {
    visibility: hidden;
  }
  div.vis-network div.vis-navigation div.vis-button.vis-up{
    visibility: hidden;
  }

  div.vis-network div.vis-navigation div.vis-button:hover {
    box-shadow: 0 0 3px 3px rgba(56, 21, 207, 0.30);
  }
</style>
