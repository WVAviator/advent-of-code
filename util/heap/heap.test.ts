import { CustomHeap } from './heap';

describe('custom heap', () => {
  let minHeap;
  let maxHeap;

  beforeEach(() => {
    const array = [3, 1, 5, 4, 7, 6, 9, 3, 2];
    minHeap = new CustomHeap((a, b) => a - b, [...array]);
    maxHeap = new CustomHeap((a, b) => b - a, [...array]);
  });

  it('should pop min heap elements in the correct order', () => {
    expect(minHeap.pop()).toEqual(1);
    expect(minHeap.pop()).toEqual(2);
    expect(minHeap.pop()).toEqual(3);
    expect(minHeap.pop()).toEqual(3);
    expect(minHeap.pop()).toEqual(4);
    expect(minHeap.pop()).toEqual(5);
    expect(minHeap.pop()).toEqual(6);
    expect(minHeap.pop()).toEqual(7);
    expect(minHeap.pop()).toEqual(9);
    expect(minHeap.pop()).toBeUndefined();
  });

  it('should pop max heap elements in the correct order', () => {
    expect(maxHeap.pop()).toEqual(9);
    expect(maxHeap.pop()).toEqual(7);
    expect(maxHeap.pop()).toEqual(6);
    expect(maxHeap.pop()).toEqual(5);
    expect(maxHeap.pop()).toEqual(4);
    expect(maxHeap.pop()).toEqual(3);
    expect(maxHeap.pop()).toEqual(3);
    expect(maxHeap.pop()).toEqual(2);
    expect(maxHeap.pop()).toEqual(1);
    expect(maxHeap.pop()).toBeUndefined();
  });

  it('should properly rearrange through a sequence of pushes and pops', () => {
    minHeap.push(-1);
    minHeap.push(0);
    expect(minHeap.pop()).toEqual(-1);
    expect(minHeap.pop()).toEqual(0);
    expect(minHeap.pop()).toEqual(1);
    minHeap.push(-2);
    minHeap.push(8);
    expect(minHeap.pop()).toEqual(-2);
    expect(minHeap.pop()).toEqual(2);
  });

  it('should allow checking the top value without removing', () => {
    expect(minHeap.top).toEqual(1);
    expect(minHeap.top).toEqual(1);
  });
});
