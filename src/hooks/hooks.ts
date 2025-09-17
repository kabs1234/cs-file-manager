import { REQUEST_ABORT_TIMEOUT } from '../const';
import type { MutationResultType, MutationType } from '../types/types';

export const useMutationAction = <ResultType, QueryArg>({
  mutation,
  onSuccess,
  onError,
  onFinally,
}: {
  mutation: MutationType<ResultType, QueryArg>;
  onSuccess?: () => void;
  onError?: () => void;
  onFinally?: () => void;
}): [(payload: QueryArg) => void, MutationResultType<ResultType, QueryArg>] => {
  const [action, actionResult] = mutation();

  const tryToExecuteAction = (payload: QueryArg): void => {
    const request = action(payload);

    const timer = setTimeout(() => {
      request.abort();
    }, REQUEST_ABORT_TIMEOUT);

    request
      .then((res) => {
        if ('error' in res) {
          throw new Error('Aborted');
        }

        onSuccess?.();
      })
      .catch((err: unknown) => {
        onError?.();

        throw err;
      })
      .finally(() => {
        onFinally?.();
        clearTimeout(timer);
      });
  };

  return [tryToExecuteAction, actionResult];
};
