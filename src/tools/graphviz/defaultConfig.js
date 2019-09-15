import {
  blue, green, grey, orange, red,
} from './colors';

const defaultConfig = {
  nodes: {
    mass: 2,
    shape: 'circle',
    labelHighlightBold: false,
    font: {
      color: 'white',
      bold: {
        // color: '#343434',
        size: 14, // px
        face: 'arial',
        vadjust: 0,
        mod: 'bold',
      },
    },
    borderWidth: 3,
    borderWidthSelected: 3,
    widthConstraint: {
      minimum: 40,
    },
    heightConstraint: {
      minimum: 40,
    },
  },
  edges: {
    arrows: {
      to: { enabled: true },
    },
    width: 5,
    length: 25,
  },
  layout: {
    improvedLayout: false,
    hierarchical: {
      enabled: false,
      sortMethod: 'hubsize',
    },
  },
  physics: {
    adaptiveTimestep: true,
    stabilization: {
      iterations: 200,
      fit: true,
    },
  },
  interaction: {
    hover: true,
    // hoverConnectedEdges: true,
    selectConnectedEdges: false,
  },
  groups: {
    Character: {
      color: blue,
    },
    Component: {
      color: blue,
    },
    Kanji: {
      color: blue,
    },
    Radical: {
      color: blue,
    },
    Stroke: {
      color: blue,
    },
    Meaning: {
      color: green,
      shape: 'box',
    },
    WordInfo: {
      color: grey,
    },
    Word: {
      color: red,
    },
    Definition: {
      color: red,
      size: 1,
      widthConstraint: {
        minimum: 5,
      },
      heightConstraint: {
        minimum: 5,
      },
    },
    Reading: {
      color: orange,
    },
    Japanese: {
      color: orange,
    },
  },
};


export default defaultConfig;
