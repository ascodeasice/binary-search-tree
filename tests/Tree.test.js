import Tree from '../modules/Tree';

let tree;
const treeArr = [7, 6, 4, 2, 1, 3, 5]
beforeEach(() => {
  tree = Tree(treeArr);
});

describe('isBalanced', () => {
  it('new constructed tree is balanced', () => {
    expect(tree.isBalanced()).toBe(true);
  });

  it('unbalance the tree', () => {
    for (let i = 100; i < 110; i++) {
      tree.insertNode(i);
    }
    expect(tree.isBalanced()).toBe(false);
  });

});

describe('Traversal orders', () => {
  it('inorder', () => {
    expect(tree.inorder()).toEqual([1, 2, 3, 4, 5, 6, 7])
  });

  it('preorder', () => {
    expect(tree.preorder()).toEqual([4, 2, 1, 3, 6, 5, 7])
  });

  it('postorder', () => {
    expect(tree.postorder()).toEqual([1, 3, 2, 5, 7, 6, 4])
  });

  it('levelOrder', () => {
    expect(tree.levelOrder()).toEqual([4, 2, 6, 1, 3, 5, 7])
  });
});

describe('rebalance the tree', () => {
  it('too many big values', () => {
    for (let i = 100; i < 110; i++) {
      tree.insertNode(i);
    }

    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });

  it('too many small values', () => {
    for (let i = -100; i < -90; i++) {
      tree.insertNode(i);
    }

    tree.rebalance();
    expect(tree.isBalanced()).toBe(true);
  });
});

describe('find', () => {
  it('Not exist', () => {
    expect(tree.find(-1)).toBe(null);
  });

  it('Exist', () => {
    expect(tree.find(6)).toEqual({ val: 6, left: { val: 5, left: null, right: null }, right: { val: 7, left: null, right: null } });
  });
});

describe('deleteNode', () => {
  it('Not exist', () => {
    expect(tree.deleteNode(10)).toBe(null);
  });

  it('No child', () => {
    tree.deleteNode(7);
    expect(tree.inorder()).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('One child', () => {
    let newTree = Tree([1, 2, 3, 4, 5, 6]);
    newTree.deleteNode(2);
    expect(newTree.inorder()).toEqual([1, 3, 4, 5, 6]);
  });

  it('Two children', () => {
    tree.deleteNode(4);
    expect(tree.inorder()).toEqual([1, 2, 3, 5, 6, 7]);
  })
});

describe('height', () => {
  it('No node', () => {
    expect(Tree().height()).toBe(0);
  });

  it('With nodes', () => {
    expect(tree.height()).toBe(3);
  });
});

describe('depth', () => {
  it('Not exist', () => {
    expect(tree.depth(10)).toBe(-1);
  });

  it('Exist', () => {
    expect(tree.depth(4)).toBe(0);
    expect(tree.depth(2)).toBe(1);
    expect(tree.depth(1)).toBe(2);
  });
});