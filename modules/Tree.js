import Node from './Node';

const Tree = (arr = []) => {
  // Turn array into balanced BST, returns root 
  const buildTree = (array) => {
    if (array.length === 0) {
      return null;
    }
    array.sort((a, b) => a - b);// ascending

    const mid = Math.floor(array.length / 2);
    const root = Node(array[mid], buildTree(array.slice(0, mid)), buildTree(array.slice(mid + 1)));
    return root;
  }
  let root = buildTree(arr);

  // use Binary Search to find node with value
  // if exist, return that value, if not, return null
  const find = (val, node = root) => {
    if (node === null || node.val === val) {
      return node;
    }

    if (node.val < val) {
      return find(val, node.right);
    }

    if (node.val > val) {
      return find(val, node.left);
    }
  }

  const insertNode = (val, node = root) => {
    // duplicate
    if (find(val) !== null) {
      return;
    }
    if (node.left === null && node.right === null) {
      if (node.val < val) {
        node.right = Node(val);
      } else {
        node.left = Node(val);
      }
    } else if (node.val > val) {
      insertNode(val, node.left);
    } else if (node.val < val) {
      insertNode(val, node.right);
    }
  }

  // helper function, get minValue of the tree
  const getMinValue = (node) => {
    if (node === null) {
      throw new Error("Can't get min value of null node");
    }
    let minVal = node.val;
    while (node.left !== null) {
      minVal = node.left.val;
      node = node.left;
    }
    return minVal;
  }

  // const deleteNode = (val) => {
  // deleteHelper(val, root);
  // }

  // NOTE need to change node's left/right to modify original tree
  // return node after deleting
  const deleteNode = (val, node = root) => {
    if (find(val) === null || node === null) {
      return null;
    }

    if (node.val < val) {
      node.right = deleteNode(val, node.right);
    } else if (node.val > val) {
      node.left = deleteNode(val, node.left);
    } else {
      // one child or no child
      if (node.left === null) {
        return node.right;
      } else if (node.right === null) {
        return node.left;
      }
      // two children
      node.val = getMinValue(node.right);
      node.right = deleteNode(getMinValue(node.right), node.right);
    }

    return node;
  }

  // BFS the tree, and provide each node as callback argument
  // if no function is given, return array of values
  const levelOrder = (callback) => {
    const queue = [root];
    const result = []

    // no function parameter is given
    if (typeof callback === 'undefined') {
      callback = (node) => {
        result.push(node.val);
      }
    }

    while (queue.length !== 0) {
      const node = queue.shift();
      if (node.left !== null) {
        queue.push(node.left);
      }
      if (node.right !== null) {
        queue.push(node.right);
      }
      callback(node);
    }

    return result;
  }

  // if no function is given, return array of values
  const inorder = (callback, node = root) => {
    const result = []
    if (typeof callback === 'undefined') {
      callback = (node) => {
        result.push(node.val);
      }
    }

    if (node === null) {
      return result;
    }
    inorder(callback, node.left);
    callback(node);
    inorder(callback, node.right);
    return result;
  }

  // if no function is given, return array of values
  const preorder = (callback, node = root) => {
    const result = []
    if (typeof callback === 'undefined') {
      callback = (node) => {
        result.push(node.val);
      }
    }

    if (node === null) {
      return result;
    }
    callback(node);
    preorder(callback, node.left);
    preorder(callback, node.right);
    return result;
  }

  // if no function is given, return array of values
  const postorder = (callback, node = root) => {
    const result = []
    if (typeof callback === 'undefined') {
      callback = (node) => {
        result.push(node.val);
      }
    }

    if (node === null) {
      return result;
    }
    postorder(callback, node.left);
    postorder(callback, node.right);
    callback(node);
    return result;
  }

  const height = (node = root) => {
    if (node === null) {
      return 0;
    } else {
      return Math.max(height(node.left) + 1, height(node.right) + 1);
    }
  }

  // return depth of node
  // depth:number of edges in path from a given node to the tree’s root node.
  const depth = (val, rootNode = root) => {
    // not exist
    if (find(val, rootNode) === null) {
      return -1;
    }
    if (rootNode === null) {
      return 0;
    }

    return Math.max(depth(val, rootNode.left) + 1, depth(val, rootNode.right) + 1);
  }

  // difference of heights of left subtree and right subtree of every node <= 1
  const isBalanced = (node = root) => {
    if (node === null) {
      return true;
    }
    return (Math.abs(height(node.left) - height(node.right)) <= 1
      && isBalanced(node.left) && isBalanced(node.right));
  }

  const rebalance = () => {
    root = buildTree(inorder());
  }

  return {
    root, buildTree, find, insertNode, deleteNode,
    levelOrder, inorder, preorder, postorder,
    height, depth, isBalanced, rebalance
  };
}

export default Tree;