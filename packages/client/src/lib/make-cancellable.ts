export class PromiseCancelledError extends Error {}

export function makeCancelable<T>(promise: Promise<T>) {
  let hasCanceled = false;

  const wrappedPromise = new Promise<T>((resolve, reject) => {
    promise.then(
      val => (hasCanceled ? reject(new PromiseCancelledError()) : resolve(val)),
      error =>
        hasCanceled ? reject(new PromiseCancelledError()) : reject(error),
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled = true;
    },
  };
}
