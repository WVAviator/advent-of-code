/**
 * A heap data structure constructed with a custom type and a custom comparator predicate.
 */
export class CustomHeap<T> {
  private values: T[] = [];
  private comparator: (a: T, b: T) => number;

  /**
   *
   * @param comparator A custom comparator predicate that will be used internally to arrange the heap elements. This functions similarly to the built in Array.prototype.sort method. The callback accepts two values, (a, b), and should return a number. Returning a positive number will move 'b' towards the top of the heap. Returning a negative number will move 'a' towards the top of the heap. By default a min-heap can be implemented by returning 'a - b' and a max heap can be implemented by returning 'b - a'.
   * @param array An optional array of type T with which to initialize the heap. An existing array can be used but will be shallow-copied leaving the original array sort order unaffected. The new copied array will be automatically heapified on initialization.
   */
  constructor(comparator: (a: T, b: T) => number, array: T[] = []) {
    this.values = [...array];
    this.comparator = comparator;
    this.heapify();
  }

  /**
   * Invoking heapify will rearrange the elements in the heap to satisfy the heap condition. This should be used anytime you change any properties or values that exist within the heap to ensure accuracy.
   */
  public heapify() {
    for (let i = this.parentIndex(this.values.length - 1); i >= 0; i--) {
      this.shiftDown(i);
    }
  }

  /**
   * Pushes a value onto the heap and reorders elements until the heap condition is satisfied.
   * @param value
   */
  public push(value: T) {
    this.values.push(value);
    this.shiftUp(this.values.length - 1);
  }

  /**
   * Removes and returns the top value of the heap and reoders elements until the heap condition is satisfied.
   * @returns
   */
  public pop(): T | undefined {
    this.swap(0, this.values.length - 1);
    const value = this.values.pop();
    this.shiftDown(0);
    return value;
  }

  /**
   * Returns the topmost value of the heap without removing it.
   */
  public get top(): T {
    return this.values[0];
  }

  /**
   * The total number of values within the heap.
   */
  public get length(): number {
    return this.values.length;
  }

  /**
   * Returns the value at the specified index within the heap without removing it.
   * @param index
   * @returns
   */
  public at(index: number): T {
    return this.values[index];
  }

  private shiftDown(startIndex: number) {
    let i = startIndex;
    while (i < this.parentIndex(this.values.length)) {
      const child = this.childIndex(i);

      if (this.comparator(this.values[i], this.values[child]) > 0) {
        this.swap(i, child);
        i = child;
      } else {
        break;
      }
    }
  }

  private shiftUp(startIndex: number) {
    let i = startIndex;
    while (i > 0) {
      const parent = this.parentIndex(i);
      if (this.comparator(this.values[i], this.values[parent]) < 0) {
        this.swap(i, parent);
        i = parent;
      } else {
        break;
      }
    }
  }

  private swap(i1: number, i2: number) {
    [this.values[i1], this.values[i2]] = [this.values[i2], this.values[i1]];
  }

  private parentIndex(index: number): number {
    return Math.floor((index - 1) / 2);
  }

  private childIndex(index: number) {
    const c1 = index * 2 + 1;
    const c2 = index * 2 + 2;

    if (this.comparator(this.values[c2], this.values[c1]) < 0) return c2;
    return c1;
  }
}

/**
 * A number heap that ensures the top value is always the smallest in the heap.
 */
export class MinHeap extends CustomHeap<number> {
  constructor(array = []) {
    super((a, b) => a - b, array);
  }
}

/**
 * A number heap that ensures the top value is always the lalrgest in the heap.
 */
export class MaxHeap extends CustomHeap<number> {
  constructor(array = []) {
    super((a, b) => b - a, array);
  }
}
