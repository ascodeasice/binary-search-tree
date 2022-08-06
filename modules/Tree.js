import Node from './Node';

const Tree = (arr) => {
  // Turn array into balanced BST, returns root 
  const buildTree = (array) => {
    if (array.length === 0) {
      return null;
    }
    array.sort((a, b) => b - a);// ascending

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

  //NOTE might not change the original value of the leaf
  const insertNode = (val, node = root) => {
    // duplicate
    if (find(val) !== null) {
      return;
    }
    if (node === null) {
      node = Node(root, null, null);
    } else if (node.val > val) {
      insertNode(val, node.left);
    } else if (node.val < val) {
      insertNode(val, node.right);
    }
  }

  // helper function, get minValue of the tree
  const getMinValue = (node = root) => {
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

  // NOTE removing node gotten from find() might not change the original tree
  const deleteNode = (val) => {
    // node not exist in tree
    if (find(val) === null) {
      return;
    }

    let node = find(val);

    // two children
    if (node.left !== null && node.right !== null) {
      node.val = getMinValue(node);
      deleteNode(getMinValue(node));
    }
    // no child(delete the node)
    else if (node.left === null && node.right === null) {
      node = null;
    }
    // only one child(copy the child)
    else {
      if (node.left === null) {
        node.val = node.right.val;
        node.right = null;
      } else {
        node.val = node.left.val;
        node.left = null;
      }
    }
  }

  // BFS the tree, and provide each node as callback argument
  // if no function is given, return array of values
  const levelOrder = (callback) => {
    const queue = [root];

    // no function parameter is given
    if (typeof callback === 'undefined') {
      const result = []
      callback = (val) => {
        result.push(val);
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
    if (typeof callback === 'undefined') {
      const result = []
      callback = (val) => {
        result.push(val);
      }
    }

    if (node === null) {
      return result;
    }
    inorder(callback, node.left);
    callback(node);
    inorder(node.right);
    return result;
  }

  // if no function is given, return array of values
  const preorder = (callback, node = root) => {
    if (typeof callback === 'undefined') {
      const result = []
      callback = (val) => {
        result.push(val);
      }
    }

    if (node === null) {
      return result;
    }
    callback(node);
    preorder(callback, node.left);
    preorder(node.right);
    return result;
  }

  // if no function is given, return array of values
  const postorder = (callback, node = root) => {
    if (typeof callback === 'undefined') {
      const result = []
      callback = (val) => {
        result.push(val);
      }
    }

    if (node === null) {
      return result;
    }
    postorder(callback, node.left);
    postorder(node.right);
    callback(node);
    return result;
  }

  const height = (node) => {
    if (node === null) {
      return 0;
    } else {
      return Math.max(height(node.left) + 1, height(node.right) + 1);
    }
  }

  // return depth of node
  // depth:number of edges in path from a given node to the tree’s root node.
  const depth = (node, rootNode = root) => {
    // not exist
    if (find(node.val, rootNode) === null) {
      return -1;
    }
    if (rootNode === null) {
      return 0;
    }

    return Math.max(depth(node, rootNode.left) + 1, depth(node, rootNode.right) + 1);
  }

  // difference of heights of left subtree and right subtree of every node <= 1
  const isBalanced = (node = root) => {
    if (node === null) {
      return true;
    }
    return (abs(height(node.left) - height(node.right)) <= 1
      && isBalanced(node.left) && isBalanced(node.right));
  }

  const rebalance = () => {
    root = buildTree(inorder());
  }

  return {
    root, buildTree, insertNode, deleteNode,
    levelOrder, inorder, preorder, postorder,
    height, depth, isBalanced, rebalance
  };
}

export default Tree;