export class BinaryNode<ValueType = number, DataType = undefined> {
  public left: BinaryNode<ValueType, DataType> | null;
  public right: BinaryNode<ValueType, DataType> | null;

  constructor(
    public value: ValueType,
    public data?: DataType,
    public parent: BinaryNode<ValueType, DataType> | null = null,
  ) {
    this.left = null;
    this.right = null;
  }
}
