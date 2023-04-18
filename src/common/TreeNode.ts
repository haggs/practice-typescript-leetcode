export class TreeNode<T> {
  public children: TreeNode<T>[];
  constructor(public value: T, public parent?: TreeNode<T>) {
    this.children = [];
  }
}
