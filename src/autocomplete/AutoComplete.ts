class AutocompleteTrieNode {
  public _children: AutocompleteTrieNode[];

  constructor(public character: string = '', public isEndOfWord = false) {
    this._children = Array(26);
  }

  get children() {
    return this._children;
  }

  private validateChild(character: string) {
    if (character.length !== 1) {
      throw new Error('addChild requires "character" to be of length 1');
    }

    const index = character.charCodeAt(0) - 'a'.charCodeAt(0);

    if (index < 0 || index >= this._children.length) {
      throw new Error(
        'addChild requires "character" to be a lowercase English letter',
      );
    }
  }

  addChild(character: string): AutocompleteTrieNode {
    this.validateChild(character);
    const index = character.charCodeAt(0) - 'a'.charCodeAt(0);
    const newNode = new AutocompleteTrieNode(character);

    this._children[index] = newNode;

    return newNode;
  }

  getChild(character: string): AutocompleteTrieNode | undefined {
    this.validateChild(character);
    const index = character.charCodeAt(0) - 'a'.charCodeAt(0);
    return this._children[index];
  }
}

export class AutoComplete {
  private root: AutocompleteTrieNode;

  constructor(initialEntries: string[] = []) {
    this.root = new AutocompleteTrieNode();

    for (const entry of initialEntries) {
      this.insert(entry);
    }
  }

  insert(word: string): void {
    let currentNode = this.root;

    for (const char of word) {
      const child = currentNode.getChild(char);
      currentNode = child || currentNode.addChild(char);
    }

    currentNode.isEndOfWord = true;
  }

  contains(word: string): boolean {
    let currentNode = this.root;

    for (const char of word) {
      const child = currentNode.getChild(char);
      if (child) {
        currentNode = child;
      } else {
        return false;
      }
    }

    return currentNode.isEndOfWord;
  }

  startsWith(prefix: string): string[] {
    let currentNode = this.root;
    const result: string[] = [];

    for (const char of prefix) {
      currentNode = currentNode.getChild(char);
      if (!currentNode) {
        return result;
      }
    }

    this.dfsHelper(currentNode, result, prefix.substring(0, prefix.length - 1));

    return result;
  }

  private dfsHelper(
    currentNode: AutocompleteTrieNode,
    result: string[],
    prefix: string,
  ) {
    if (currentNode.isEndOfWord) {
      result.push(prefix + currentNode.character);
    }
    for (const child in currentNode.children) {
      this.dfsHelper(
        currentNode.children[child],
        result,
        prefix + currentNode.character,
      );
    }
  }
}
