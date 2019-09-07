export default class GraphViz {
  /**
   * simple graph visualizer that uses neovis.js
   * todo:: configurable label/type field
   * todo:: use something that is not neovis instead
   * todo:: handle coloring :)
   */
  // eslint-disable-next-line no-useless-constructor,no-unused-vars
  constructor(settings) {

    // console.debug(settings);
    // const { data } = settings;
    // Object.keys(data.nodes).map((key, index) => {
    //   data.nodes[key] = hydrateNode(data.nodes[key], settings.nodeLabelMapping,
    //   settings.nodeColoringTypes);
    // });
    // Object.keys(data.relationships).map((key, index) => {
    //   data.relationships[key] = hydrateEdge(data.relationships[key],
    //   settings.edgeLabelMapping, settings.linkColoringTypes);
    // });
    //
    // console.log(nodeGroups);
    // const config = {
    //   container_id: 'canvas',
    //   server_user: '',
    //   server_password: '',
    //   labels: {},
    //   relationships: {},
    //   initial_cypher: '-',
    //   arrows: true,
    //   data,
    //   visjs: {
    //     groups: nodeGroups,
    //   },
    // };
    //
    // this.renderer = new Neovis.default(config);
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    // this.renderer.render();
  }

  // eslint-disable-next-line class-methods-use-this
  cleanup() {
    // this.renderer.clearNetwork();
  }
}
//
// function hydrateNode(node, nodeLabelMapping, coloringType) {
//   node = appendDataToTitle(node, 'data', 'title');
//   node = forwardLabel(node, nodeLabelMapping, true, 'label', 'labels', 'data');
//
//   if (coloringType) {
//     node = forwardNodeGroup(node, coloringType);
//   }
//   node.value = node.value || 1;
//   console.debug(node);
//   return node;
// }
//
// function hydrateEdge(edge, edgeLabelMapping, coloringType) {
//   edge = appendDataToTitle(edge, 'data', 'title');
//   edge = forwardLabel(edge, edgeLabelMapping, false, 'label', 'type', 'data');
//
//   if (coloringType) {
//     edge = forwardLinkGroup(edge, coloringType);
//   }
//
//   edge.value = edge.value || 1;
//   return edge;
// }
//

// function forwardLabel(elem, mapping, multipleType, labelField, typeField, dataField) {
//   const typedata = elem[typeField] || null;
//   let key;
//   if (multipleType) {
//     key = typedata ? mapping.find((dt) => typedata.includes(dt[0])) : null || null;
//   } else {
//     key = typedata ? mapping.find((dt) => typedata === dt[0]) : null || null;
//   }
//   if (key && key[1] === '__self__') {
//     // note :: __self__ on multipleType will break
//     elem[labelField] = typedata;
//   } else {
//     const labelVal = key ? elem[dataField][key[1]] || null : null;
//     if (labelVal) {
//       elem[labelField] = labelVal;
//     }
//   }
//
//   return elem;
// }
//
// function forwardNodeGroup(elem, groups) {
//   elem.group = 'none';
//   for (const i in groups) {
//     const group = groups[i];
//     if (elem.labels.includes(group)) {
//       elem.group = group;
//       break;
//     }
//   }
//   return elem;
// }
//
// function forwardLinkGroup(elem, groups) {
//   const res = elem;
//   res.group = 'none';
//   Object.keys(groups).forEach((id) => {
//     const group = groups[id];
//     if (elem.type === id) {
//       res.group = group;
//     }
//   });
//   return res;
// }
