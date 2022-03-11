/*
 * @author: Archy
 * @Date: 2022-03-10 14:35:17
 * @LastEditors: Archy
 * @LastEditTime: 2022-03-10 14:36:50
 * @FilePath: \arkgen\react\src\shared\stack.ts
 * @description: 
 */
/*
 * @author: Archy
 * @Date: 2021-11-18 13:51:26
 * @LastEditors: Archy
 * @LastEditTime: 2021-11-18 13:51:27
 * @FilePath: \sgd-frontend-vite\src\utils\stack.js
 * @description:
 */
export default class Stack<T> {
  private items: Array<T>
  constructor() {
    this.items = [];
  }

  push(item: T) {
    this.items.push(item);
  }

  pop() {
    if (this.isEmpty()) throw new Error("stack is empty!");
    return this.items.pop();
  }

  peek() {
    if (this.isEmpty()) throw new Error("stack is empty!");
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }

  size() {
    return this.items.length;
  }

  toString() {
    let result = "";
    for (let item of this.items) {
      result += item + " ";
    }
    return result;
  }
}
