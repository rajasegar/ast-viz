import Component from '@ember/component';
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";
import { parse } from 'recast';
import { findQuery } from 'ast-node-finder';

const query_map = {};

export default Component.extend({
  theme: 'solarized light',
  mode: 'javascript',

  code: `let a = 1; \nhello();\nfoo.bar();`,

  init() {
    this._super(...arguments);
  },

  didInsertElement() {
    this._super(...arguments);
    this._buildTree();
  },

  addQuery(id, node) {
    let str = '';

    switch(node.type) {
      case 'VariableDeclarator':
        str = findQuery(node);
        break;

      case 'CallExpression':
        str = findQuery(node);
        break;

      default:
        console.log('addQuery => ', node.type); // eslint-disable-line
        break;
    }
    query_map[id] = str;
  },

  createNode(node, parentId) {

    let newId = parentId + 1;
    let _node = { id: newId, label: node.type };
    let edge = { from: parentId, to: newId };
    this.addQuery(newId, node);
    this.get('nodes').push(_node);
    this.get('edges').push(edge);
  },

  _buildTree() {

    this.set('nodes', 
      [
        { id: 1, label: "Program" },
        { id: 2, label: "Body" },
      ]);

    this.set('edges', 
      [
        { from: 1, to: 2 },
      ]);

    let ast = parse(this.get('code'));
    console.log(ast); // eslint-disable-line
    let startId = 2;
    ast.program.body.forEach(n => {
      let newId = ++startId;
      this.get('nodes').push({ id: newId, label: n.type });
      this.get('edges').push({ from: 2, to: newId });
      switch(n.type) {
        case 'VariableDeclaration':
          n.declarations.forEach(d => {
            this.createNode(d, startId++);
          });
          break;

        case 'ExpressionStatement':
          this.createNode(n.expression, startId++);
          break;

        default:
          console.log('buildTree => ', n.type); // eslint-disable-line
          break;
      }
    });

    // create an array with nodes
    const dsNodes = new DataSet(this.get('nodes'));
    const dsEdges = new DataSet(this.get('edges'));

    // create a network
    const container = document.getElementById("mynetwork");
    const data = {
      nodes: dsNodes,
      edges: dsEdges
    };
    const options = {
      nodes: {
        shape: 'box'
      },
      edges: {
        arrows: 'to'
      },
      layout: {
        hierarchical: {
          direction: 'LR'
        }
      }
    };
    const network = new Network(container, data, options);
    network.on("selectNode", (params) => {
      this.set('transform', query_map[params.nodes[0]]);
    });
  },
  actions: {
    buildTree(newVal) {
      this.set('code', newVal);

    this._buildTree();
    }
  }
});
