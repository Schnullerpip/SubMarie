export class ObjectPool<T> {
  private objects: (T | undefined)[] = [];
  private idx = 0;

  constructor(private readonly prototype: T, private readonly limit = 30) {}

  getInstance(): T {
    const result =
      this.objects[this.idx] ??
      (() => {
        const newInstance = { ...this.prototype };
        this.objects[this.idx] = newInstance;
        return newInstance;
      })();

    if (++this.idx === this.limit) {
      this.idx = 0;
    }

    return result;
  }
}
