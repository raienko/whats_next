import Node from 'src/models/Node';
import Edge from 'src/models/Edge';
import * as types from './types';
import {status} from './constants';

export const initialState = {
  nodes: [],
  edges: [],
  currentNode: undefined,
  status: status.loading,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.START:
      return start(state, action.payload);
    case types.UPDATE_NODE:
      return updateNode(state, action.payload);
    case types.CREATE_BREAKPOINT:
      return createBreakpoint(state, action.payload);
    case types.SET_CURRENT_NODE:
      return setCurrentNode(state, action.payload);
    case types.SET_STATUS:
      return setStatus(state, action.payload);
    case types.RESET_STATE:
      return resetState();
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const start = (state) => {
  const node = new Node(0);
  return {...state, nodes: [node], currentNode: node.id};
};

const updateNode = (state, {id, changes}) => {
  const nodes = state.nodes.filter((n) => n.id !== id);
  const node = state.nodes.find((n) => n.id === id);
  Object.keys(changes).forEach((key) => {
    node[key] = changes[key];
  });
  const updated = nodes.concat(node);
  updated.sort(sortById);
  return {...state, nodes: updated};
};

const createBreakpoint = (state) => {
  const nodeA = new Node(state.nodes.length);
  const nodeB = new Node(state.nodes.length + 1);
  const edgeA = new Edge(state.currentNode, nodeA.id);
  const edgeB = new Edge(state.currentNode, nodeB.id);
  const nodes = state.nodes.concat(nodeA, nodeB);
  const edges = state.edges.concat(edgeA, edgeB);
  return {
    ...state,
    nodes,
    edges,
    status: status.splitting,
  };
};

const setCurrentNode = (state, {id}) => {
  return {
    ...state,
    currentNode: id,
  };
};

const setStatus = (state, {status}) => {
  return {
    ...state,
    status,
  };
};

const resetState = () => {
  return {
    ...initialState,
  };
};

const sortById = (a, b) => {
  return a.id > b.id ? 1 : -1;
};
