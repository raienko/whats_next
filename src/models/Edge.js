export default class Edge {
  constructor(from, to) {
    this.id = `${from}_${to}`;
    this.from = from;
    this.to = to;
  }
}
