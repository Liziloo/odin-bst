class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        const preppedArray = this.sortAndTrim(array);
        return this.sortedArrayToBST(preppedArray, 0, preppedArray.length - 1);
    }

    insert(value, currentNode = this.root) {
        if (currentNode === null) return new Node(value);
        if (currentNode.data === value) return currentNode;
        if (currentNode.data <= value) {
            currentNode.left = this.insert(value, currentNode.left);
        } else if (value > currentNode.data) {
            currentNode.right = this.insert(value, currentNode.right);
        }
        return currentNode;
    }

    deleteItem(value, currentNode = this.root) {
        if (currentNode === null) return currentNode;
        if (currentNode.data > value) {
            currentNode.left = this.deleteItem(value, currentNode.left);
        } else if (currentNode.data < value) {
            currentNode.right = this.deleteItem(value, currentNode.right);
        } else {
            if (currentNode.left === null) {
                return currentNode.right;
            }

            if (currentNode.right === null) {
                return currentNode.left;
            }

            const successor = this.getSuccessor(currentNode);
            currentNode.data = successor.data;
            currentNode.right = this.deleteItem(currentNode.data, currentNode.right);
        }

        return currentNode;
    }

    find(value, currentNode = this.root) {
        if (currentNode === null) return false;
        if (currentNode.data === value) {
            return currentNode
        }
        if (currentNode.data < value) {
            return this.find(value, currentNode.right);
        }
        if (currentNode.data > value) {
            return this.find(value, currentNode.left);
        }
    }

    levelOrder(callback, currentNode = this.root) {
        if (currentNode === null) return
        if (!callback) throw new Error('Callback function required.');
        const q = [];
        
        q.push(currentNode);
        while (q[0]) {
            currentNode = q.shift();
            callback(currentNode);
            if (currentNode.left !== null) q.push(currentNode.left);
            if (currentNode.right !== null) q.push(currentNode.right);
        }
    }

    inOrder(callback, currentNode = this.root) {
        if (currentNode === null) return;
        if (!callback) throw new Error('Callback function required.');

        this.inOrder(callback, currentNode.left);
        callback(currentNode);
        this.inOrder(callback, currentNode.right);
    }

    preOrder(callback, currentNode = this.root) {
        if (currentNode === null) return;
        if (!callback) throw new Error('Callback function required.');

        callback(currentNode);
        this.preOrder(callback, currentNode.left);
        this.preOrder(callback, currentNode.right);
    }

    getSuccessor(node) {
        node = node.right;
        while (node !== null && node.left !== null) {
            node = node.left;
        }
        return node;
    }

    sortedArrayToBST(array, start, end) {
        if (start > end) return null;

        const mid = start + Math.floor((end - start) / 2);

        const root = new Node(array[mid]);

        root.left = this.sortedArrayToBST(array, start, mid - 1);
        root.right = this.sortedArrayToBST(array, mid + 1, end);

        return root;
    }

    sortAndTrim(array) {
        const sortedArray = this.mergeSort(array);
        for (let i = 0; i < sortedArray.length; i++) {
            while (sortedArray[i] === sortedArray[i + 1]) {
                sortedArray.splice(i + 1, 1);
            }
        }
        return sortedArray;
    }

    mergeSort(array) {
        if (array.length < 2) {
            return array
        }
        const halfLength = Math.floor(array.length / 2);
        const leftHalf = array.slice(0, halfLength);
        const rightHalf = array.slice(halfLength, array.length);
        const newLeft = this.mergeSort(leftHalf);
        const newRight = this.mergeSort(rightHalf);
        return this.merge(newLeft, newRight);
    }

    merge(arr1, arr2) {
        const sortedArr = [];
        for (let i = 0, j = 0; i < arr1.length; ) {
            if (arr1[i] < arr2[j]) {
                sortedArr.push(arr1[i]);
                i++;
            } else if (j < arr2.length) {
                sortedArr.push(arr2[j]);
                j++;
            } else {
                sortedArr.push(arr1[i])
                i++
            }
            if (i === arr1.length && j < arr2.length) {
                const newArr2 = arr2.slice(j);
                sortedArr.push(...newArr2);
            }
        }
        return sortedArr;
    }
}


const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const testTree = new Tree(testArray);

prettyPrint(testTree.root);

function printNode(node) {
    console.log(node.data);
}

testTree.preOrder(printNode);

prettyPrint(testTree.root);