
const defaultConfig = {
  nodes: {
    shape: 'dot',
    font: {
      size: 26,
      strokeWidth: 4,
    },
    scaling: {
      label: {
        enabled: true,
      },
    },
  },
  edges: {
    arrows: {
      to: { enabled: true },
    },
    length: 1000,
  },
  layout: {
    improvedLayout: true,
    hierarchical: {
      enabled: true,
      levelSeparation: 150,
      nodeSpacing: 200,
      treeSpacing: 400,
      blockShifting: true,
      edgeMinimization: true,
      parentCentralization: true,
      direction: 'UD', // UD, DU, LR, RL
      sortMethod: 'hubsize', // hubsize, directed
    },
  },
  physics: {
    solver: 'repulsion',
    adaptiveTimestep: true,
    repulsion: {
      centralGravity: 0.2,
      springLength: 200,
      springConstant: 0.05,
      nodeDistance: 100,
      damping: 0.09,
    },
    stabilization: {
      iterations: 200,
      fit: true,
    },

  },
  groups: {
    Character: {
      color: { background: 'blue' },
      borderWidth: 3,
    },
    Component: {
      color: { background: 'blue' },
      borderWidth: 3,
    },
    Radical: {
      color: { background: 'blue' },
      borderWidth: 3,
    },
    Kanji: {
      color: { background: 'blue' },
      borderWidth: 3,
    },
    Stroke: {
      color: { background: 'blue' },
      borderWidth: 3,
    },
    Meaning: {
      color: { background: 'green' },
      borderWidth: 3,
    },
    Definition: {
      color: { background: 'green' },
      borderWidth: 3,
    },
    WordInfo: {
      color: { background: 'grey' },
      borderWidth: 3,
    },
    Word: {
      color: { background: 'red' },
      borderWidth: 3,
    },
    Reading: {
      color: { background: 'orange' },
      borderWidth: 3,
    },
  },
};


export default defaultConfig;
