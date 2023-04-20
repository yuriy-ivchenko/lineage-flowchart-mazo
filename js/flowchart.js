/**
* Basic flow chart to draw connections between nodes and lines.
* requires jQuery and jQuery UI.
*/
var FlowChart = function (jQueryLibraryObj) {
  var _t = this;
  _t.jQueryLibraryObj = jQueryLibraryObj;
  _t.jQueryLibraryObj('body').append(_t.connectionsLayerTemplate);
  _t.jQueryLibraryObj('body').append(_t.nodesLayerTemplate);
};

/**
 * jQuery library object.
 *
 * @type {jQuery}
 */
FlowChart.prototype.jQueryLibraryObj = {};

/**
 * Connections layer template.
 * This layer is for connection lines only.
 *
 * @type {string}
 */
FlowChart.prototype.connectionsLayerTemplate = "<svg id='connections-layer' class='layer'><svg>";

/**
 * Nodes layer template.
 * This layer is for nodes only. Each node is can be whatever absolute positioned DOM element.
 *
 * @type {string}
 */
FlowChart.prototype.nodesLayerTemplate = "<div id='nodes-layer' class='layer'></div>";

/**
 * Default node templates. Node templates are key - value objects, where key is in the same time the node type
 * and node css class. Value is the node content template. Node content is wrapped in a node wrapper DOM element.
 * Node wrapper DOM element is absolute positioned and placed in the nodes layer.
 *
 * @type {{simple-node: string}}
 */
FlowChart.prototype.nodeTemplates = {
  "simple-node": "simple node"
};

/**
 * Default root node position in the nodes layer.
 *
 * @type {{left: number, top: number}}
 */
FlowChart.prototype.rootElementPosition = { left: 210, top: 610 };

/**
 * Default offset for the next child node element. If not explicitly specified, the child nodes are added on the
 * right side of the parent node with this particular offset.
 *
 * @type {number}
 */
FlowChart.prototype.offsetForNextElement = 200;

/**
 * Default node action end effect name.
 *
 * @type {string}
 */
FlowChart.prototype.nodeActionEndEffect = 'none';

/**
 * Default node actions for each node added to the nodes layer.
 * Default action adds a new simple node when user clicks on the node.
 *
 * @param nodeObj
 * @param chartInstanceObj

FlowChart.prototype.addNodeActions = function(nodeObj, chartInstanceObj){
  nodeObj.click(function(){
    chartInstanceObj.addNode('simple-node', nodeObj);
  });
}
 */
/**
 * Elements index counter used to generate unique id for the nodes and layers.
 *
 * @type {number}
 */
FlowChart.prototype.elementIndex = 0;

/**
 * Returns next available element index.
 *
 * @returns {number}
 */
FlowChart.prototype.nextElementIndex = function () {
  this.elementIndex = this.elementIndex + 1;
  return this.elementIndex;
}

/**
 * Chart connections collection.
 *
 * @type {{}}
 */
FlowChart.prototype.connections = {};

/**
 * Adds or updates a connection in the connections collection.
 *
 * @param connId
 * @param startNodeId
 * @param endNodeId
 * @param connD
 */
FlowChart.prototype.addOrUpdateConnectionInConnectionsObject = function (connId, startNodeId, endNodeId, connD) {
  this.connections[connId] = {
    start: startNodeId,
    end: endNodeId,
    d: connD
  };
};

/**
 * Deletes connection from connections collection.
 *
 * @param connId
 
FlowChart.prototype.deleteConnectionFromConnectionsObject = function(connId){
  delete this.connections[connId];
};
*/
/**
 * Gets a connection from connections collection.
 *
 * @param connId
 * @returns {collection object}
 */
FlowChart.prototype.getConnectionFromConnectionsObject = function (connId) {
  return this.connections[connId];
};

/**
 * Chart Nodes collection.
 *
 * @type {{}}
 */
FlowChart.prototype.nodes = {};

/**
 * Adds or updates node in the nodes collection.
 *
 * @param nodeId
 * @param nodeType
 * @param nodeContent
 * * @param nodeLeftPos
 * @param nodeTopPos
 * @param startpointFor
 * @param endpointFor
 */
FlowChart.prototype.addOrUpdateNodeInNodesObject = function (nodeId, nodeType, nodeContent, nodeLeftPos, nodeTopPos, startpointFor, endpointFor) {
  this.nodes[nodeId] = {
    type: nodeType,
    content: nodeContent,
    left: nodeLeftPos,
    top: nodeTopPos,
    startFor: startpointFor,
    endFor: endpointFor
  };
};

/**
 * Deletes node from the nodes collection.
 *
 * @param nodeId
 
FlowChart.prototype.deleteNodeFromNodesObject = function(nodeId){
  delete this.nodes[nodeId];
};
*/
/**
 * Gets node from the nodes collection.
 *
 * @param nodeId
 * @returns {*}
 */
FlowChart.prototype.getNodeFromNodesObject = function (nodeId) {
  return this.nodes[nodeId];
};

/**
 * Positions single connection point (start- or endpoint).
 *
 * @param left
 * @param top
 * @param linePointType
 * @param lineObj
 * @param finishArrangement
 */
FlowChart.prototype.positionConnectionPoint = function (left, top, linePointType, lineObj, finishArrangement) {
  var d = this.getConnectionFromConnectionsObject(lineObj.attr('id')).d.split(' ');
  if (linePointType === 'endpoint') {
    d[3] = left + ',' + top;
    if (finishArrangement) {
      d[2] = left + ',' + top;
    }
  }
  if (linePointType === 'startpoint') {
    d[0] = 'M' + left + ',' + top;
    if (finishArrangement) {
      d[1] = 'C' + left + ',' + top;
    }
  }
  d = d.join(' ');
  lineObj.attr('d', d);
  this.connections[lineObj.attr('id')].d = d;
}

/**
 * Positions connections of the node.
 *
 * @param nodeObj
 * @param finishArrangement
 */
FlowChart.prototype.positionConnectionLines = function (nodeObj, finishArrangement) {
  var _t = this;
  var t = nodeObj;
  var left = t.offset().left + t.outerWidth() / 2;
  var top = t.offset().top + 1 + t.outerHeight() / 1;

  var linesRight = _t.nodes[t.attr('id')].startFor;
  var linesLeft = _t.nodes[t.attr('id')].endFor;

  for (var i = 0; i < linesRight.length; i++) {
    this.positionConnectionPoint(left, top, 'startpoint', _t.jQueryLibraryObj('#' + linesRight[i]), finishArrangement);
  }


  for (var i = 0; i < linesLeft.length; i++) {
    this.positionConnectionPoint(left, top - 110, 'endpoint', _t.jQueryLibraryObj('#' + linesLeft[i]), finishArrangement);
  }
}

/**
 * Adds new node both in nodes collection and in the DOM.
 *
 * @param nodeId
 * @param nodeType
 * @param nodeContent
 * @param nodePhotoSpouse_1
 *  @param nodePhotoSpouse_2
 * @param nodeNameSpouse_1
 * @param nodeNameSpouse_2
 * @param nodeModalSpouse_1
 * @param nodeModalSpouse_2
 * @param posLeft
 * @param posTop
 * @returns {string}
 */
FlowChart.prototype.addNodeWithIdContentAndPosition = function (nodeId, nodeType, nodeContent, nodePhotoSpouse_1, nodePhotoSpouse_2, nodeNameSpouse_1, nodeNameSpouse_2, nodeModalSpouse_1, nodeModalSpouse_2, posLeft, posTop) {
  var _t = this;

  // if no content specified, just get the template
  if (!nodeContent || nodeContent === '') {
    nodeContent = _t.nodeTemplates[nodeType];
  }

  // add new node to nodes layer
  var nodesLayer = this.jQueryLibraryObj('#nodes-layer');
  var nodeClass = 'node ' + nodeType;
  var node = "<div id='" + nodeId + "' class='" + nodeClass + "'><div style='margin-bottom:4px;border-bottom:1px solid beige;'>" + nodeContent + '<img src="' + nodePhotoSpouse_1 + '" width=30 >' + "<a href='" + nodeModalSpouse_1 + "' role='button' class='btn btn-light' data-bs-toggle='modal'>" + nodeNameSpouse_1 + "</a></div><div style='border-top:1px solid gold;'>" + '<img src="' + nodePhotoSpouse_2 + '" width=30 >' + "<a href='" + nodeModalSpouse_2 + "' role='button' class='btn btn-light' data-bs-toggle='modal'>" + nodeNameSpouse_2 + "</a></div></div>";
  nodesLayer.append(node);
  node = this.jQueryLibraryObj('#' + nodeId);

  // add node
  _t.addOrUpdateNodeInNodesObject(nodeId, nodeType, _t.nodeTemplates[nodeType], 0, 0, [], [], [], [], []);

  // define node position
  node.offset({ left: posLeft, top: posTop });
  _t.nodes[nodeId].left = posLeft;
  _t.nodes[nodeId].top = posTop;

  // make node draggable
  node.draggable({
    drag: function () {
      _t.positionConnectionLines(_t.jQueryLibraryObj(this), false);
    },
    stop: function () {
      var t = _t.jQueryLibraryObj(this);
      _t.nodes[t.attr('id')].left = t.offset().left;
      _t.nodes[t.attr('id')].top = t.offset().top;
      _t.positionConnectionLines(t, true);
      _t.adjustLayersSize();
      if (_t.nodeActionEndEffect) {
        t.effect(_t.nodeActionEndEffect, {}, 500, function () { });
      }
    }
  });

  // make node droppable if we have drop action
  node.droppable({
    drop: function (event, ui) {
      var targetNode = _t.jQueryLibraryObj(this);
      var droppedNode = ui.draggable;
      _t.addConnectionBetween(droppedNode, targetNode);
    }
  });

  // add other defined node actions
  _t.addNodeActions(node, _t);

  // adjust layers size to avoid scrolling out of viewport
  _t.adjustLayersSize();

  // nice appearing effect
  if (_t.nodeActionEndEffect) {
    node.effect(_t.nodeActionEndEffect, {}, 500, function () { });
  }

  return node;
}

/**
 * Adds new node both in nodes collection and in the DOM.
 *
 * @param nodeType
 * @param posLeft
 * @param posTop
 * @returns {*}
 
FlowChart.prototype.addNodeWithPosition = function(nodeType, posLeft, posTop){
  var _t = this;
  return _t.addNodeWithIdContentAndPosition("node-" + _t.nextElementIndex(), nodeType, _t.nodeTemplates[nodeType], posLeft, posTop);
}
*/
/**
 * Adds new node both in nodes collection and in the DOM.
 *
 * @param nodeType
 * @param parentNode
 * @returns {*}
 

 */
FlowChart.prototype.addConnectionBetween = function (startNode, endNode) {
  var _t = this;

  // add connection line and register it to start and end nodes
  var conId = this.addConnection(startNode, endNode);

  var startpointFor = this.nodes[startNode.attr('id')].startFor;
  startpointFor.push(conId);
  this.nodes[startNode.attr('id')].startFor = startpointFor;

  var endpointFor = this.nodes[endNode.attr('id')].endFor;
  endpointFor.push(conId);
  this.nodes[endNode.attr('id')].endFor = endpointFor;

  // reposition connection lines
  _t.positionConnectionLines(startNode, true);
  _t.positionConnectionLines(endNode, true);
}

/**
 * Adds connection between two nodes without registering it to these nodes.
 *
 * @param startNode
 * @param endNode
 * @returns {string}
 */

FlowChart.prototype.addConnection = function (startNode, endNode) {

  var conLayer = this.jQueryLibraryObj('#connections-layer');

  var currentDate = new Date();
  var startNodePos = startNode.offset();
  var endNodePos = endNode.offset();
  var conCoordinates = "M" + startNodePos.left + "," + startNodePos.top +
    " C" + startNodePos.left + "," + startNodePos.top +
    " " + endNodePos.left + "," + endNodePos.top +
    " " + endNodePos.left + "," + endNodePos.top;

  var newpath = document.createElementNS("http://www.w3.org/2000/svg", "path");
  newpath.setAttributeNS(null, "id", "arrow-" + this.nextElementIndex());
  newpath.setAttributeNS(null, "d", conCoordinates);
  conLayer[0].appendChild(newpath);

  this.addOrUpdateConnectionInConnectionsObject("arrow-" + this.elementIndex, startNode.attr('id'), endNode.attr('id'), conCoordinates);

  return "arrow-" + this.elementIndex;
}

/**
 * Adjusts layers sizes so it can pass to the layers content.
 */
FlowChart.prototype.adjustLayersSize = function () {
  this.jQueryLibraryObj('.layer').width(this.jQueryLibraryObj(document).width())
    .height(this.jQueryLibraryObj(document).height());
}

/**
 * Exports chart as a JSON object.
 *
 * @returns {{nodes: Array, connections: Array}}
 */


/**
 * Imports chart as a JSON object.
 *
 * @param chartJSON {{nodes: Array, connections: Array}}
 */
FlowChart.prototype.importChart = function (chartJSON) {
  var _t = this;
  var nodes = chartJSON.nodes;
  var conns = chartJSON.connections;
  for (var i = 0; i < nodes.length; i++) {
    _t.addNodeWithIdContentAndPosition(
      nodes[i].id,
      nodes[i].type,
      nodes[i].content,
      nodes[i].photoSpouse_1,
      nodes[i].photoSpouse_2,
      nodes[i].nameSpouse_1,
      nodes[i].nameSpouse_2,
      nodes[i].modalSpouse_1,
      nodes[i].modalSpouse_2,
      nodes[i].left,
      nodes[i].top);
  }
  for (var i = 0; i < conns.length; i++) {
    var startNode = _t.jQueryLibraryObj('#' + conns[i].start);
    var endNode = _t.jQueryLibraryObj('#' + conns[i].end);
    _t.addConnectionBetween(startNode, endNode);
  }
}
//////////////
FlowChart.prototype.draw = function () {

  if (forDraw5.getElementById(this.id))
    forDraw5.getElementById(this.id).remove();
  forDraw5.innerHTML += `
 
	  <rect id="${this.id}" name="${this.name}"  x="${this.location.x}" 
  y="${this.location.y}" width="${this.width}" 
       height="${this.height}" fill="${this.fill}" 
	   stroke="${this.stroke}" rx="10" ry="10" stroke-width="5" />
	   <text x="${this.TitleName.x}" y="${this.TitleName.y}" 
	   data-toggle="modal" style="cursor:pointer"
	   data-target="#${this.idModal}" id="" font-size="14">${this.name} </text>
	   <image x="${this.location.x + 5}" y="${this.location.y + 5}" width="50" height="70" xlink:href="${this.pathPhoto}" />
	   	 
	   `
  document.body.innerHTML += `   
	   <!-- Modal son1-->
  <foreignObject x="600" width="600" height="450">
	  <!-- Modal son1-->
  <div class="modal fade" id="${this.idModal}" style="left:0px;position:absolute;z-index:9999;"   role="dialog" xmlns="http://www.w3.org/1999/xhtml">
    <div class="modal-dialog" >
    
      <!-- Modal content-->
      <div class="modal-content" >
        <div class="modal-header"  >
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h4 class="modal-title">${this.id}</h4>
        </div>
       <div class="modal-body">
	     <img width="50" height="60" src="${this.pathPhoto}" />
	 
          <p>${this.modalContent}</p><p>${this.modalContent}</p><p>${this.modalContent}</p>
        </div>
        <div class="modal-footer" >
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
        </div>
      </div>
      
    </div>
  </div>
  `
    ;
};
Object.defineProperty(FlowChart.prototype, "posTitleName", {
  get: function () {
    this.location.x;
    return this.location.y;
  },
  set: function (value) {
    this.location.x;
    this.location.y;
  }
});
Object.defineProperty(FlowChart.prototype, "modalContentView", {
  get: function () {
    return this.modalContent = '';
  },
  set: function (value) {
    this.modalContent = '';
  }
});