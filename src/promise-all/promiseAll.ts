/**
 * My own quick and dirty version of Promise.all()
 *
 * @param promises A list of promises to run all of
 * @returns a new Promise that resolves when all input promises are resolved or rejects as soon as any fail
 */
export function promiseAll<T>(promises: Promise<T>[]): Promise<T[]> {
  promises;
  return new Promise((resolve, reject) => {
    const resolvedData = [];
    let resolvedCount = 0;

    for (let i = 0; i < promises.length; ++i) {
      promises[i]
        .then((result) => {
          resolvedData[i] = result;
          ++resolvedCount;
          if (resolvedCount === promises.length) {
            resolve(resolvedData);
          }
        })
        .catch((result) => {
          reject(result);
        });
    }
  });
}

promiseAll([
  new Promise((resolve) => resolve('hi')),
  new Promise((resolve) => resolve(1)),
]);
