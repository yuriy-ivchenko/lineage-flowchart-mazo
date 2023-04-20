/**
* Add functionality to page. This ist for testing only.
*/

var chart = null;

$(document).ready(function () {

  // create the flowchart instance
  chart = new FlowChart($);

  // add your node templates in a key-value format
  // where key is the name and css class of the node and value is the content
  chart.nodeTemplates = {
    "simple-node": "",
    "expression-node": "<svg width='100' height='50'><rect x='2' y='2' rx='10' ry='10' width='90' fill='transparent' height='40' /> </svg>",
    "decision-node": "<svg width='60' height='60' fill='transparent'><polygon points='30,5 55,30 30,55 5,30' /></svg>"
  };

  // set the root element position coordinates
  chart.rootElementPosition = { left: 450, top: 50 };

  // set offset between parent and child node
  // nodes are always added from left to right horizontally
  chart.offsetForNextElement = 150;

  // set the effect for node action end, like node creation or movement
  //chart.nodeActionEndEffect = 'bounce';

  // add nodes actions
  chart.addNodeActions = function (nodeObj, chartInstanceObj) {
    //nodeObj.click(function(){
    // chartInstanceObj.addNode('simple-node', nodeObj);
    //  });
    // nodeObj.on('contextmenu', function(event){
    // chartInstanceObj.deleteNode(nodeObj.attr('id'));
    //return false;
    //  });
  };
  //,content='11'
  // import flowchart
  var chartJSON = {
    nodes: [
      {
        id: 'God', type: 'simple-node', photoSpouse_1: '', nameSpouse_1: '',
        modalSpouse_1: '#GodModal', nameSpouse_2: 'God', photoSpouse_2: '', modalSpouse_2: '#GodModal', left: 430, top: -50
      },
      {
        id: 'adam', type: 'simple-node', photoSpouse_1: './photo/Adam-100.jpg', nameSpouse_1: 'Adam',
        modalSpouse_1: '#adamModal', nameSpouse_2: 'Eva', photoSpouse_2: './photo/Eva-100.jpg', modalSpouse_2:
          '#evaModal', left: 420, top: 100
      },
      { id: 'cain', type: 'simple-node', photoSpouse_1: './photo/cain-100.jpg', nameSpouse_1: 'Cain', modalSpouse_1: '#cainModal', nameSpouse_2: 'Wife', photoSpouse_2: './photo/wom.png', modalSpouse_2: '#wifecainModal', left: 220, top: 250 },
      {
        id: 'abel', type: 'simple-node', photoSpouse_1: './photo/abel-101.jpg', nameSpouse_1: 'Abel', modalSpouse_1: '#abelModal', nameSpouse_2: '-', photoSpouse_2: '', modalSpouse_2: '#', left: 420, top: 250
      }, {
        id: 'seth', type: 'simple-node', photoSpouse_1: './photo/seth-100.jpg', nameSpouse_1: 'Seth',
        modalSpouse_1: '#sethModal', nameSpouse_2: 'Azura', photoSpouse_2: 'photo/wom.png', modalSpouse_2:
          '#wifesethModal', left: 620, top: 250
      },
      { id: 'enos', type: 'simple-node', photoSpouse_1: './photo/enos-100.jpg', nameSpouse_1: 'Enos', modalSpouse_1: '#enosModal', nameSpouse_2: 'Wife', photoSpouse_2: './photo/wom.png', modalSpouse_2: '#wifeenosModal', left: 625, top: 400 }
    ],
    connections: [
      { start: 'God', end: 'adam' },
      { start: 'adam', end: 'cain' },
      { start: 'adam', end: 'abel' },
      { start: 'adam', end: 'seth' },
      { start: 'seth', end: 'enos' }
    ]
  };
  chart.importChart(chartJSON);

});
