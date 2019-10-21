import * as vis from 'vis-network';
// todo :: import css stuff
// import 'vis-network';

import { CompletionEvent, EventController } from './events';
import defaultConfig from './defaultConfig';
import {
  forwardLinkGroup, appendDataToTitle, forwardNodeGroup, forwardLabel,
} from './utilElem';


// todo :: util function because i know nothing about js
function applyMap(map, func) {
  return Object.keys(map)
    .map((k) => func(map[k]));
}


export default class GraphViz {
  constructor(config) {
    this.config = config;
    this.nodes = {};
    this.edges = {};
    this.data = {};
    this.network = null;
    this.container = document.getElementById(config.container_id);
    this.events = new EventController();

    this.setData(config.data);
  }

  setData(data) {
    this.rawData = data;
    if (typeof data === 'object') {
      applyMap(
        typeof data.nodes === 'object' ? data.nodes : {},
        this.addNode.bind(this),
      );
      applyMap(
        typeof data.relationships === 'object' ? data.relationships : {},
        this.addEdge.bind(this),
      );
    }
  }

  addNode(node) {
    let nodeResult = appendDataToTitle(node, 'data', 'title');

    nodeResult = forwardLabel(nodeResult, this.config.node.labelMap,
      true,
      'label',
      'labels',
      'data');
    nodeResult = forwardNodeGroup(nodeResult, this.config.node.groups || []);
    // nodeResult.value = nodeResult.value || 1;
    this.nodes[nodeResult.id] = nodeResult;
  }

  addEdge(edge) {
    let edgeResult = appendDataToTitle(edge, 'data', 'title');
    edgeResult = forwardLabel(edgeResult, this.config.edge.labelMap,
      false,
      'label',
      'type',
      'data');
    edgeResult = forwardLinkGroup(edgeResult, this.config.edge.groups || []);
    // edgeResult.value = edgeResult.value || 1;
    this.edges[edgeResult.id] = edgeResult;
  }

  addRecord(record) {
    const self = this;

    Object.values(record)
      .forEach((v) => {
        if (v.constructor.name === 'Node') {
          const node = self.buildNodeVisObject(v);

          try {
            self.addNode(node);
          } catch (e) {
            console.log(e);
          }
        } else if (v.constructor.name === 'Relationship') {
          const edge = self.buildEdgeVisObject(v);

          try {
            self.addEdge(edge);
          } catch (e) {
            console.log(e);
          }
        }
      });
  }

  addEvent(eventName, func) {
    this.network.on(eventName, func);
  }

  getNode(id) {
    console.log(this.nodes);
    return this.nodes[id];
  }

  render() {
    console.log(this.nodes);
    console.log(this.edges);
    const config = defaultConfig;
    const { container } = this;
    this.data = {
      nodes: new vis.DataSet(Object.values(this.nodes)),
      edges: new vis.DataSet(Object.values(this.edges)),
    };

    this.network = new vis.Network(container, this.data, config);
    // todo :: move to the proper location
    // todo :: put the move location in the config
    // this.network.moveTo({});
    setTimeout(() => {
      this.network.stopSimulation();
    }, 10000);
    return this.network;
  }


  renderWithResults(results) {
    const self = this;
    self.clearNetwork();
    let recordCount = 0;
    results.forEach((record) => {
      recordCount += 1;
      self.consumeRecord(record);
    });
    self.render();
    self.events.generateEvent(CompletionEvent, { record_count: recordCount });
  }

  /**
   * Clear the data for the visualization
   */
  clearNetwork() {
    this.nodes = {};
    this.edges = {};
    this.network.setData([]);
  }

  /**
   *
   * @param {string} eventType Event type to be handled
   * @param {callback} handler Handler to manage the event
   */
  registerOnEvent(eventType, handler) {
    this.events.register(eventType, handler);
  }

  /**
   * Fetch live data form the server and reload the visualization
   */
  reload() {
    this.clearNetwork();
    this.render();
  }

  /**
   * Stabilize the visuzliation
   */
  stabilize() {
    this.network.stopSimulation();
    console.log('Calling stopSimulation');
  }
}
