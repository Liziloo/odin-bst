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

    prettyPrint(node, prefix = "", isLeft = true) {
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
}

const testArray = [2, 2, 2, 2, 2, 2, 2, 1, 88, 8, 8, 19];

const testTree = new Tree(testArray);
