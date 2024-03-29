import { promiseAll } from './promiseAll.js';
import { describe, it } from 'vitest';

describe.concurrent('promiseAll', async () => {
  it.concurrent(
    'resolves with the values in the correct order after all promises given are resolved',
    async ({ expect }) => {
      const promise100ms = new Promise((resolve) => {
        setTimeout(() => {
          resolve('Done with 100ms promise!');
        }, 100);
      });

      const promise1ms = new Promise((resolve) => {
        setTimeout(() => {
          resolve('Done with 1ms promise!');
        }, 1);
      });

      const promise20ms = new Promise((resolve) => {
        setTimeout(() => {
          resolve(20);
        }, 20);
      });

      const promises = [promise100ms, promise1ms, promise20ms];

      await expect(promiseAll(promises)).resolves.toEqual([
        'Done with 100ms promise!',
        'Done with 1ms promise!',
        20,
      ]);
    },
  );

  it.concurrent('rejects if any single promise rejects', async ({ expect }) => {
    const promise100ms = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Done with 100ms promise!');
      }, 100);
    });

    const promise1ms = new Promise((resolve) => {
      setTimeout(() => {
        resolve('Done with 1ms promise!');
      }, 1);
    });

    const promise20ms = new Promise((_, reject) => {
      setTimeout(() => {
        reject('Rejected!');
      }, 20);
    });

    const promises = [promise100ms, promise1ms, promise20ms];

    await expect(promiseAll(promises)).rejects.toEqual('Rejected!');
  });
});
