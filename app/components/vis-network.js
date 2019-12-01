import Component from '@ember/component';
import { DataSet, Network } from "vis-network/standalone/esm/vis-network";
import { parse } from 'recast';
import { findQuery } from 'ast-node-finder';

const _nodes = [
  { id: 1, label: "Program" },
  { id: 2, label: "Body" },
];

// create an array with edges
const _edges = [
  { from: 1, to: 2 },
];

const query_map = {};

export default Component.extend({
  theme: 'solarized light',
  mode: 'javascript',

  code: `let a = 1; hello(); foo.bar();`,

  init() {
    this._super(...arguments);
  },

  didInsertElement() {
    this._super(...arguments);
    const source = `
let a = 1;
hello();
foo.bar();
`;

    this.buildTree(source);

  },

  addQuery(id, node) {
    let str = '';

    switch(node.type) {
      case 'VariableDeclarator':
        str  = `
            root.find(j.VariableDeclarator, {
            id: { name: '${node.id.name}' }
            })
            `; 
        break;

      case 'CallExpression':
        str = `
            root.find(j.CallExpression, {
            callee: { name: '${node.callee.name}' }
            })
            `;
        str = findQuery(node);

        break;

      default:
        console.log('addQuery => ', node.type);
        break;
    }
    query_map[id] = str;
  },
  createNode(node, parentId) {

    let newId = parentId + 1;
    let _node = { id: newId, label: node.type };
    let edge = { from: parentId, to: newId };
    this.addQuery(newId, node);
    _nodes.push(_node);
    _edges.push(edge);
  },

  buildTree(source) {

    let ast = parse(source);
    console.log(ast); // eslint-disable-line
    let startId = 2;
    ast.program.body.forEach(n => {
      let newId = ++startId;
      _nodes.push({ id: newId, label: n.type });
      _edges.push({ from: 2, to: newId });
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
    const nodes = new DataSet(_nodes);
    const edges = new DataSet(_edges);

    // create a network
    const container = document.getElementById("mynetwork");
    const data = {
      nodes: nodes,
      edges: edges
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
          direction: 'UD'
        }
      }
    };
    const network = new Network(container, data, options);
    network.on("selectNode", (params) => {
        console.log('selectNode Event:', params);
      console.log(query_map[params.nodes[0]]);
      this.set('transform', query_map[params.nodes[0]]);
    });
  }
});
