import { DependencyList, useEffect } from 'react';
import { useAsyncAction } from './use-async-action';

export function useAsync<T>(
  action: () => Promise<T>,
  dependencies: DependencyList,
) {
  const { data, loading, error, trigger, cancel } = useAsyncAction(action, {
    loading: true,
  });

  useEffect(() => {
    trigger();
  }, [trigger, ...dependencies]);

  return { data, loading, error, reload: trigger, cancel };
}
