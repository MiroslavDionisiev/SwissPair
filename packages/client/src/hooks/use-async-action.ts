import { useCallback, useEffect, useRef, useState } from 'react';
import { makeCancelable, PromiseCancelledError } from '../lib/make-cancellable';

interface AsyncAction<T> {
  data: T | undefined;
  loading: boolean;
  error: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAsyncAction<T, Args extends any[]>(
  action: (...args: Args) => Promise<T>,
  initialState: Pick<AsyncAction<T>, 'loading'> = {
    loading: false,
  },
) {
  const [state, setState] = useState<AsyncAction<T>>({
    data: undefined,
    error: undefined,
    ...initialState,
  });

  const actionRef = useRef(action);
  actionRef.current = action;

  const cancelActionRef = useRef<() => void>();

  const perform = useCallback(async (...args: Args) => {
    const handler = async () => {
      try {
        setState({ data: undefined, loading: true, error: undefined });

        const data = await actionRef.current(...args);

        setState({ data, loading: false, error: undefined });

        return data;
      } catch (error) {
        if (error instanceof PromiseCancelledError) {
          return;
        }

        setState({ data: undefined, loading: false, error });

        throw error;
      }
    };

    const { promise, cancel } = makeCancelable(handler());

    cancelActionRef.current = cancel;

    return promise;
  }, []);

  const trigger = useCallback(
    (...args: Args) => {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      perform(...args).catch(() => {});
    },
    [perform],
  );

  const cancel = useCallback(() => cancelActionRef.current?.(), []);

  useEffect(() => () => cancel(), [cancel]);

  return {
    ...state,
    perform,
    trigger,
    cancel,
  };
}
